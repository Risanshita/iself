using iself.Controllers.Validators;
using iself.Models.Request;
using iself.Services.Interfaces;
using iself.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iself.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly NewUserValidator _validationRules;
        private readonly IUserService _userService;

        public UserController(IUserService UserService, NewUserValidator validationRules)
        {
            _validationRules = validationRules;
            _userService = UserService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewUserRequest request)
        {
            try
            {
                var result = await _validationRules.ValidateAsync(request);
                if (result.IsValid)
                {
                    request.CreatedBy = CurrentUser;
                    var post = await _userService.AddUserAsync(request);
                    if (post != null)
                        return post.GetSuccessResponse(HttpStatusCode.Created);
                    else
                        return false.GetResponse();
                }
                return result.Errors.GetErrorResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }
         
        [HttpGet("me")]
        public IActionResult CurrentUserDetails()
        {
            try
            {
                var email = CurrentUser;
                if (string.IsNullOrWhiteSpace( email ))
                    return Unauthorized();

                var result = _userService.GetUserByEmail(email);
                if (result == null)
                    return "Post not found".GetErrorResponse(HttpStatusCode.NotFound);
                return result.GetSuccessResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        } 

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] string id, [FromBody] UpdateUserRequest request)
        {
            try
            {
                var post = _userService.GetUser(id);
                if (post == null)
                    return "Post not found".GetErrorResponse(HttpStatusCode.NotFound);

                var result = await _validationRules.ValidateAsync(new NewUserRequest
                {
                    Email = request.Email,
                    PhoneNumber = request.PhoneNumber,
                    UserName = request.UserName,
                    FullName = request.FullName,
                    Password = "test"
                });
                if (result.IsValid)
                {
                    var response = await _userService.UpdateUserAsync(id, request);
                    return response.GetResponse();
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
