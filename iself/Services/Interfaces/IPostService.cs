using iself.Data.Models;
using iself.Models.Request;
using iself.Models.Response;
using static iself.Models.ApiResponse;

namespace iself.Services.Interfaces
{
    public interface IPostService
    {
        Task<PostResponse?> GetPost(string id);
        Task<PaginatedResponse<PostResponse>> GetPostByOwner(string createdBy, int take = 20, int skip = 0);
        Task<PaginatedResponse<PostResponse>> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0);
        Task<PaginatedResponse<PostResponse>> GetPosts(string query, string? createdBy, int take = 20, int skip = 0);
        Task<PostResponse?> AddPostAsync(NewPostRequest request);
        Task<bool> DeletePostAsync(string id);
        Task<bool> UpdatePostAsync(string id, PostUpdateRequest post);
    }
}
