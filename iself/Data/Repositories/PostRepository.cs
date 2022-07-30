using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;

namespace iself.Data.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        public PostRepository() : base()
        {

        }

        public async Task<Post?> AddPostAsync(Post post)
        {
            if (await _collection.InsertOneAsync(post))
                return post;
            return null;
        }

        public async Task<bool> DeletePostAsync(string id)
        {
            return await _collection.DeleteOneAsync(id);
        }

        public Post? GetPost(string id)
        {
            return _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.Id == id);
        }

        public List<Post> GetPostByOwner(string createdBy, int take = 20, int skip = 0)
        {
            return _collection
                    .AsQueryable().OrderByDescending(a => a.UpdatedAt).Where(a => a.CreatedBy == createdBy).Skip(skip).Take(take).ToList();
        }

        public List<Post> GetPostByType(PostType type, string? createdBy = null, int take = 20, int skip = 0)
        {
            if (string.IsNullOrWhiteSpace(createdBy))
                return _collection
                        .AsQueryable().Where(a => a.Type == type).OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList();

            return _collection
                    .AsQueryable().Where(a => a.Type == type && a.CreatedBy == createdBy).OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList();
        }

        public List<Post> GetPosts(string query, string? createdBy, int take = 20, int skip = 0)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                if (!string.IsNullOrWhiteSpace(createdBy))
                    return _collection
                    .AsQueryable().Where(a => a.CreatedBy == createdBy).OrderByDescending(a => a.UpdatedAt).OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList();
                return _collection.AsQueryable().OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList();
            }

            return !string.IsNullOrWhiteSpace(createdBy) ?

                _collection.AsQueryable().Where(a => a.CreatedBy == createdBy && (a.Language.ToLower() == query
                    || a.Type.ToString().ToLower() == query
                    || a.Source.ToLower().Contains(query)
                    || a.Title.ToLower().Contains(query)
                    || a.Author.ToLower().Contains(query)
                    || a.Data1.ToLower().Contains(query)
                    || a.Data2.ToLower().Contains(query)))
                .OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList() :
                    _collection.AsQueryable().Where(a => a.Language.ToLower() == query
                    || a.Type.ToString().ToLower() == query
                    || a.Source.ToLower().Contains(query)
                    || a.Title.ToLower().Contains(query)
                    || a.Author.ToLower().Contains(query)
                    || a.Data1.ToLower().Contains(query)
                    || a.Data2.ToLower().Contains(query))
                .OrderByDescending(a => a.UpdatedAt).Skip(skip).Take(take).ToList();
        }

        public async Task<bool> UpdatePostAsync(string id, PostUpdateRequest post)
        {
            return await _collection.UpdateOneAsync(e => e.Id == id, post);
        }
    }
}
