using Microsoft.IO;
using Serilog;
using Serilog.Events;
using System.Diagnostics;
using System.Text.RegularExpressions;
using ILogger = Serilog.ILogger;

namespace iself.Logger
{
    public class SerilogMiddleware
    {
        private readonly List<LoggerExcludePath> ExcludePaths = new List<LoggerExcludePath>();
        private bool IsOnlyApi = true;
        private const string ApiStartPath = "/api";
        private const string SwaggerPath = "/swagger";

        private readonly ILogger Log = Serilog.Log.ForContext<SerilogMiddleware>();
        private readonly RecyclableMemoryStreamManager _recyclableMemoryStreamManager;

        const string ResponseMessageTemplate =
              "HTTP Response Information: TimeTaken: {TimeTaken} ms\nStatusCode:{StatusCode}\nMethod: {RequestMethod}\nScheme: {Scheme}\nHost: {Host}\nPath: {Path}\nQueryString: {QueryString}\nResponseBody: {nResponseBody}";

        readonly RequestDelegate _next;

        public SerilogMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));

            _recyclableMemoryStreamManager = new RecyclableMemoryStreamManager();

        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (httpContext == null) throw new ArgumentNullException(nameof(httpContext));

            //Ignore log if condition satisfied
            if (IsSwagger(httpContext) || IsApi(httpContext) || IsExclude(httpContext))
                await _next(httpContext);
            else
            {
                var sw = Stopwatch.StartNew();
                try
                {
                    await LogRequest(httpContext);

                    // _next will be inside LogResponse
                    await LogResponse(httpContext, sw);
                }
                // Never caught, because `LogException()` returns false.
                catch (Exception ex) when (LogException(httpContext, sw, ex)) { }
            }
        }

        private bool LogException(HttpContext httpContext, Stopwatch sw, Exception ex)
        {
            sw.Stop();

            if (httpContext.Response.HasStarted) { LogResponseHasStartedError(); }

            LogForErrorContext(httpContext)
                .Error(ex, ResponseMessageTemplate,
                       sw.Elapsed.TotalMilliseconds,
                       500,
                       httpContext.Request.Method,
                       httpContext.Request.Scheme,
                       httpContext.Request.Host,
                       httpContext.Request.Path,
                       httpContext.Request.QueryString,
                       string.Empty
                );
            return false;
        }

        private ILogger LogForErrorContext(HttpContext httpContext)
        {
            var request = httpContext.Request;

            var result = Log
                .ForContext("RequestHeaders", request.Headers.ToDictionary(h => h.Key, h => h.Value.ToString()), destructureObjects: true)
                .ForContext("RequestHost", request.Host)
                .ForContext("RequestProtocol", request.Protocol);

            if (request.HasFormContentType)
                result = result.ForContext("RequestForm", request.Form.ToDictionary(v => v.Key, v => v.Value.ToString()));

            return result;
        }

        private async Task LogRequest(HttpContext httpContext)
        {
            const string RequestMessageTemplate =
                "HTTP Request Information: Method: {RequestMethod}\nScheme: {Scheme}\nHost: {Host}\nPath: {Path}\nQueryString: {QueryString}\nRequestBody: {RequestBody}";

            httpContext.Request.EnableBuffering();
            await using var requestStream = _recyclableMemoryStreamManager.GetStream();
            await httpContext.Request.Body.CopyToAsync(requestStream);
            var str = ReadStreamInChunks(requestStream);
            Log.Write(LogEventLevel.Information,
                RequestMessageTemplate,
                httpContext.Request.Method,
                httpContext.Request.Scheme,
                httpContext.Request.Host,
                httpContext.Request.Path,
                httpContext.Request.QueryString,
                str
            );

            ////Trim all string values
            //var obj = jsonconvert.deserializeobject(str);
            //obj = obj.trimstringproperties();
            //str = jsonconvert.serializeobject(obj);

            //httpContext.Request.Body = new MemoryStream(Encoding.UTF8.GetBytes(str));
            httpContext.Request.Body.Position = 0;
        }

        private static string ReadStreamInChunks(Stream stream)
        {
            const int readChunkBufferLength = 4096;
            stream.Seek(0, SeekOrigin.Begin);
            using var textWriter = new StringWriter();
            using var reader = new StreamReader(stream);
            var readChunk = new char[readChunkBufferLength];
            int readChunkLength;
            do
            {
                readChunkLength = reader.ReadBlock(readChunk,
                                                   0,
                                                   readChunkBufferLength);
                textWriter.Write(readChunk, 0, readChunkLength);
            } while (readChunkLength > 0);
            return textWriter.ToString();
        }

        private async Task LogResponse(HttpContext httpContext, Stopwatch sw)
        {
            //Before execute controller
            var originalBodyStream = httpContext.Response.Body;
            await using var responseBody = _recyclableMemoryStreamManager.GetStream();
            httpContext.Response.Body = responseBody;

            //Excecute controller
            await _next(httpContext);
            if (httpContext.Response.HasStarted) { LogResponseHasStartedError(); return; }

            //After excecute controller
            httpContext.Response.Body.Seek(0, SeekOrigin.Begin);
            var text = await new StreamReader(httpContext.Response.Body).ReadToEndAsync();
            httpContext.Response.Body.Seek(0, SeekOrigin.Begin);

            //Generate logger
            var statusCode = httpContext.Response?.StatusCode;
            var level = statusCode > 499 ? LogEventLevel.Error : LogEventLevel.Information;
            var log = level == LogEventLevel.Error ? LogForErrorContext(httpContext) : Log;
            sw.Stop();

            //Log information
            log.Write(level,
               ResponseMessageTemplate,
               sw.Elapsed.TotalMilliseconds,
               statusCode,
               httpContext.Request.Method,
               httpContext.Request.Scheme,
               httpContext.Request.Host,
               httpContext.Request.Path,
               httpContext.Request.QueryString,
               text
           );

            //Set original response to httpresonse
            await responseBody.CopyToAsync(originalBodyStream);
        }

        public bool IsSwagger(HttpContext context)
        {
            return context.Request.Path.StartsWithSegments(new PathString(SwaggerPath));
        }

        private void LogResponseHasStartedError()
        {
            Log.Warning("The response has already started, the middleware will not be executed.");
        }

        public bool IsExclude(HttpContext context)
        {
            if (ExcludePaths == null || ExcludePaths.Count() == 0)
            {
                return false;
            }

            return ExcludePaths.Any(x =>
            {
                switch (x.ExcludeMode)
                {
                    default:
                    case ExcludeMode.Strict:
                        return context.Request.Path.Value == x.Path;
                    case ExcludeMode.StartWith:
                        return context.Request.Path.StartsWithSegments(new PathString(x.Path));
                    case ExcludeMode.Regex:
                        Regex regExclude = new Regex(x.Path);
                        return regExclude.IsMatch(context.Request.Path.Value);
                }
            });
        }

        public bool IsApi(HttpContext context)
        {
            if (IsOnlyApi
                && !context.Request.Path.Value.Contains(".js")
                && !context.Request.Path.Value.Contains(".css")
                && !context.Request.Path.Value.Contains(".html"))
                return !context.Request.Path.StartsWithSegments(new PathString(ApiStartPath));

            return true;
        }

    }
    public class LoggerExcludePath
    {
        public LoggerExcludePath(string path, ExcludeMode excludeMode = ExcludeMode.Strict)
        {
            Path = path;
            ExcludeMode = excludeMode;
        }

        public string Path { get; set; }

        public ExcludeMode ExcludeMode { get; set; }
    }

    public enum ExcludeMode
    {
        Strict = 1,
        StartWith = 2,
        Regex = 3
    }
}
