using iself.Controllers.Validators;
using iself.Models.Request;
using iself.Services.Interfaces;
using iself.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iself.Controllers
{
    [Route("feedbacks")]
    [ApiController]
    [Authorize]
    public class AppFeedbackController : BaseController
    {
        private readonly NewFeedbackValidator _validationRules;
        private readonly IAppFeedbackService _appFeedbackService;

        public AppFeedbackController(IAppFeedbackService appFeedbackService, NewFeedbackValidator validationRules)
        {
            _validationRules = validationRules;
            _appFeedbackService = appFeedbackService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewFeedbackRequest request)
        {
            try
            {
                var result = await _validationRules.ValidateAsync(request);
                if (result.IsValid)
                {
                    request.CreatedBy = CurrentUser;
                    var feedback = await _appFeedbackService.AddOrUpdateAsync(request);
                    if (feedback)
                        return feedback.GetSuccessResponse(HttpStatusCode.Created);
                    else
                        return feedback.GetResponse();
                }
                return result.Errors.GetErrorResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        } 
    }
}
