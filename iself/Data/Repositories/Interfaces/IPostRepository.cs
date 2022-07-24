using iself.Data.Models;
using iself.Models.Request;

namespace iself.Data.Repositories.Interfaces
{
    public interface IPostRepository
    {
        Post? GetPost(string id);
        List<Post> GetPostByOwner(string createdBy, int take = 20, int skip = 0);
        List<Post> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0);    
        List<Post> GetPosts(string query, string? createdBy, int take = 20, int skip = 0);
        Task<Post?> AddPostAsync(Post post);
        Task<bool> DeletePostAsync(string id);
        Task<bool> UpdatePostAsync(string id, PostUpdateRequest post);
    }
}
