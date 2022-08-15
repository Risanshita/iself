using iself.Data.Models;
using iself.Models.Request;
using static iself.Models.ApiResponse;

namespace iself.Data.Repositories.Interfaces
{
    public interface IPostRepository
    {
        Task<Post?> GetPost(string id);
        Task<PaginatedResponse<Post>> GetPostByOwner(string createdBy, int take = 20, int skip = 0);
        Task<PaginatedResponse<Post>> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0);
        Task<PaginatedResponse<Post>> GetPosts(string query, string? createdBy, int take = 20, int skip = 0);
        Task<Post?> AddPostAsync(Post post);
        Task<bool> DeletePostAsync(string id);
        Task<bool> UpdatePostAsync(string id, PostUpdateRequest post);
    }
}
