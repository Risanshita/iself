using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using System;

namespace iself.Logger
{
    public static class ConfigureLogger
    {
        public static void ConfigureSerilog()
        {
            Log.Logger = new LoggerConfiguration()
                   //.Enrich.With(new HttpRequestIdEnricher())
                   .Enrich.FromLogContext()
                   .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                   .MinimumLevel.Override("System", LogEventLevel.Information)
                   .WriteTo.Console(new RenderedCompactJsonFormatter())
                   .WriteTo.Debug(outputTemplate: DateTime.Now.ToString())
                   //.WriteTo.File("./log.txt", rollingInterval: RollingInterval.Hour)
                   .CreateBootstrapLogger();
        }
    }
}
