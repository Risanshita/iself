using iself.Data.Models;
using iself.Models.Request;
using iself.Models.Response;

namespace iself.Services.Interfaces
{
    public interface IPostService
    {
        PostResponse? GetPost(string id);
        List<PostResponse> GetPostByOwner(string createdBy, int take = 20, int skip = 0);
        List<PostResponse> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0);
        List<PostResponse> GetPosts(string query, string? createdBy, int take = 20, int skip = 0);
        Task<PostResponse?> AddPostAsync(NewPostRequest request);
        Task<bool> DeletePostAsync(string id);
        Task<bool> UpdatePostAsync(string id, PostUpdateRequest post);
    }
}
