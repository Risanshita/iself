using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using static iself.Models.ApiResponse;

namespace iself.Utils
{

    public class ValidationErrorMessage
    {
        public string? ErrorMessage { get; set; }
        public string? ErrorCode { get; set; }
        public string? StackTrace { get; set; }
    }

    public static class ResponseExtentions
    {
        public static TSelf TrimStringProperties<TSelf>(this TSelf l_Data)
        {
            var stringProperties = l_Data.GetType().GetProperties()
              .Where(p => p.PropertyType == typeof(string) && p.CanWrite);

            foreach (var stringProperty in stringProperties)
            {
                string currentValue = (string)stringProperty.GetValue(l_Data, null);
                if (currentValue != null)
                    stringProperty.SetValue(l_Data, currentValue.Trim(), null);
            }
            return l_Data;
        }

        private static ValidationErrorMessage GetFormattedErrors(this List<ValidationFailure> failures)
        {
            var res = failures != null ? failures.Select(a => new ValidationErrorMessage { ErrorCode = a.ErrorCode, ErrorMessage = a.ErrorMessage }).FirstOrDefault() : null;

            return res;
        }

        public static ObjectResult GetErrorResponse(this List<ValidationFailure> failures, HttpStatusCode httpStatusCode = HttpStatusCode.BadRequest)
        {
            var res = failures.GetFormattedErrors(); 

            ObjectResult result = new(new Response { Errors = res, Succeeded = false })
            {
                StatusCode = (int)httpStatusCode
            };
            return result;
        }

        public static ObjectResult GetSuccessResponse(this object data, HttpStatusCode httpStatusCode = HttpStatusCode.OK)
        {
            ObjectResult result = new(new Response { Data = data, Succeeded = true, Message = "Request successful." })
            {
                StatusCode = (int)httpStatusCode
            };
            return result;
        }

        public static ObjectResult GetResponse(this bool isSuccess)
        {
            ObjectResult result = new(new Response
            {
                Message = isSuccess ? "Request successful." : "Something went wrong.",
                Succeeded = isSuccess
            })
            {
                StatusCode = (int)(isSuccess ? HttpStatusCode.OK : HttpStatusCode.BadRequest)
            };
            return result;
        }
         

        public static ObjectResult GetErrorResponse(this string message, HttpStatusCode httpStatusCode = HttpStatusCode.OK)
        {
            ObjectResult result = new(new Response
            {
                Message = message,
                Succeeded = false
            })
            {
                StatusCode = (int)(httpStatusCode)
            };
            return result;
        }
         
        public static ObjectResult GetResponse(this Exception exception)
        {
            ObjectResult result = new(new Response
            {
                Message = $"Internal error.",
                Succeeded = false,
                Errors = new ValidationErrorMessage
                {
                    ErrorMessage = $"{exception.Message}\n{(exception.InnerException != null ? exception.InnerException.Message : string.Empty)}",
                    ErrorCode = "999",
                    StackTrace = exception.StackTrace
                }
            })
            {
                StatusCode = (int)HttpStatusCode.InternalServerError
            };
            return result;
        }
         
    }
}
