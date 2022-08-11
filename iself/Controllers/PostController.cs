using iself.Controllers.Validators;
using iself.Data.Models;
using iself.Models.Request;
using iself.Services.Interfaces;
using iself.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace iself.Controllers
{
    [ApiController]
    [Route("posts")]
    [Authorize]
    public class PostController : BaseController
    {
        private readonly NewPostValidator _validationRules;
        private readonly IPostService _postService;

        public PostController(IPostService postService, NewPostValidator validationRules)
        {
            _validationRules = validationRules;
            _postService = postService;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get([FromQuery] string? createdBy, [FromQuery] PostType? type, [FromQuery] string? query, [FromQuery] int take = 20, [FromQuery] int skip = 0)
        {
            try
            {
                if (type != null)
                    return _postService.GetPostByType((PostType)type, createdBy, take, skip).GetSuccessResponse();

                return _postService.GetPosts(query, createdBy, take, skip).GetSuccessResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] string id)
        {
            try
            {
                var result = _postService.GetPost(id);
                if (result == null)
                    return "Post not found".GetErrorResponse(HttpStatusCode.NotFound);
                return result.GetSuccessResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewPostRequest request)
        {
            try
            {
                var result = await _validationRules.ValidateAsync(request);
                if (result.IsValid)
                {
                    request.CreatedBy = CurrentUser;
                    var post = await _postService.AddPostAsync(request);
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

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] string id, [FromBody] PostUpdateRequest request)
        {

            try
            {
                var post = _postService.GetPost(id);
                if (post == null && post?.CreatedBy?.ToLower() == CurrentUser.ToLower())
                    return "Post not found".GetErrorResponse(HttpStatusCode.NotFound);

                var result = await _validationRules.ValidateAsync(new NewPostRequest
                {
                    Type = request.Type,
                    Language = request.Language,
                    Data1 = request.Data1,
                    Data2 = request.Data2,
                    Author = request.Author,
                    Source = request.Source,
                    Title = request.Title,
                    CreatedBy = CurrentUser
                });
                if (result.IsValid)
                {
                    var response = await _postService.UpdatePostAsync(id, request);
                    return response.GetResponse();
                }
                return result.Errors.GetErrorResponse();
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
                var post = _postService.GetPost(id);
                if (post == null && post?.CreatedBy?.ToLower() == CurrentUser.ToLower())
                    return "Post not found".GetErrorResponse(HttpStatusCode.NotFound);

                var result = await _postService.DeletePostAsync(id);
                return result.GetResponse();
            }
            catch (Exception ex)
            {
                return ex.GetResponse();
            }
        }
    }
}
