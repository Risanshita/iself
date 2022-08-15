using iself.Controllers.Validators;
using iself.Models.Request;
using iself.Services.Interfaces;
using iself.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace iself.Controllers
{
    [ApiController]
    [Authorize]
    [Route("users")]
    public class UserController : BaseController
    {
        private readonly NewUserValidator _validationRules;
        private readonly IUserService _userService;

        public UserController(IUserService UserService, NewUserValidator validationRules)
        {
            _validationRules = validationRules;
            _userService = UserService;
        }


        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? query, [FromQuery] int take = 20, [FromQuery] int skip = 0)
        {
            try
            {
                return (await _userService.GetUsers(query ?? string.Empty, take, skip)).GetSuccessResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewUserRequest request)
        {
            try
            {
                if (UserRole != UserRoles.SuperAdmin)
                    return Forbid();

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
        public async Task<IActionResult> CurrentUserDetails()
        {
            try
            {
                var id = CurrentUser;
                if (string.IsNullOrWhiteSpace(id))
                    return Unauthorized();

                var result = await _userService.GetUser(id);
                if (result == null)
                    return "User not found".GetErrorResponse(HttpStatusCode.NotFound);
                return result.GetSuccessResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }

        [HttpPatch("admin")]
        public async Task<IActionResult> MakeSuperAdminAsync()
        {
            try
            {
                var result = await _userService.MakeSuperAdminAsync(CurrentUser);
                return result.GetResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] UpdateUserRequest request)
        {
            try
            {
                var result = await _userService.GetUser(CurrentUser);
                if (result == null)
                    return "User not found".GetErrorResponse(HttpStatusCode.NotFound);

                if (!string.IsNullOrWhiteSpace(request.FullName))
                {
                    var response = await _userService.UpdateUserAsync(result.Id, request);
                    return response.GetResponse();
                }
                return "Full name cannot be empty.".GetErrorResponse(HttpStatusCode.BadRequest);
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            try
            {
                if (UserRole != UserRoles.SuperAdmin)
                    return Forbid();

                var result = await _userService.GetUser(id);
                if (result == null)
                    return "User not found".GetErrorResponse(HttpStatusCode.NotFound);

                var res = await _userService.DeleteUserAsync(id);
                return res.GetResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }
    }
}
