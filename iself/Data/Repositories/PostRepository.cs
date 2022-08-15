using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using MongoDB.Driver;
using static iself.Models.ApiResponse;

namespace iself.Data.Repositories
{
    public class PostRepository : BaseRepository<Post>, IPostRepository
    {
        private static bool IsIndexCreated { get; set; }
        public PostRepository(MongoDbContext<Post> dbContex) : base(dbContex)
        {
            if (!IsIndexCreated)
            {
                var indexOptions = new CreateIndexOptions();
                var indexKeys = Builders<Post>.IndexKeys.Ascending(i => i.Id);
                var indexModel = new CreateIndexModel<Post>(indexKeys, indexOptions);
                _collection.Indexes.CreateOneAsync(indexModel);

                indexOptions = new CreateIndexOptions();
                indexKeys = Builders<Post>.IndexKeys.Ascending(i => i.CreatedBy);
                indexModel = new CreateIndexModel<Post>(indexKeys, indexOptions);

                _collection.Indexes.CreateOneAsync(indexModel);

                IsIndexCreated = true;
            }
        }

        public async Task<Post?> AddPostAsync(Post post)
        {
            await Create(post);
            return post;
        }

        public async Task<bool> DeletePostAsync(string id)
        {
            return await DeleteAsync(a => a.Id == id);
        }

        public async Task<Post?> GetPost(string id)
        {
            return (await _collection.FindAsync(p => p.Id == id)).FirstOrDefault();
        }

        public async Task<PaginatedResponse<Post>> GetPostByOwner(string createdBy, int take = 20, int skip = 0)
        {

            var combind = new List<FilterDefinition<Post>>() { };
            combind.Add(Builders<Post>.Filter.Where(a => a.CreatedBy == createdBy));
            var fullCondition = Builders<Post>.Filter.Or(combind);
            return await GetFilterResultWithPagingAsync(fullCondition, skip, take, nameof(Post.CreatedAt), false);
        }

        public async Task<PaginatedResponse<Post>> GetPostByType(PostType type, string? createdBy = null, int take = 20, int skip = 0)
        {

            var combind = new List<FilterDefinition<Post>>() { };

            combind.Add(Builders<Post>.Filter.Where(a => a.Type == type));
            if (!string.IsNullOrWhiteSpace(createdBy))
                combind.Add(Builders<Post>.Filter.Where(a => a.CreatedBy == createdBy));

            var fullCondition = combind.Count == 0 ? Builders<Post>.Filter.Empty : Builders<Post>.Filter.And(combind);

            return await GetFilterResultWithPagingAsync(fullCondition, skip, take, nameof(Post.CreatedAt), false);
        }

        public async Task<PaginatedResponse<Post>> GetPosts(string query, string? createdBy, int take = 20, int skip = 0)
        {
            var combind = new List<FilterDefinition<Post>>() { };

            if (!string.IsNullOrWhiteSpace(query))
            {
                combind.Add(Builders<Post>.Filter.Where(a => a.Type.ToString().ToLower() == query));
                combind.Add(Builders<Post>.Filter.Where(a => a.Source.ToLower().Contains(query)));
                combind.Add(Builders<Post>.Filter.Where(a => a.Title.ToLower().Contains(query)));
                combind.Add(Builders<Post>.Filter.Where(a => a.Author.ToLower().Contains(query)));
                combind.Add(Builders<Post>.Filter.Where(a => a.Data1.ToLower().Contains(query)));
                combind.Add(Builders<Post>.Filter.Where(a => a.Data2.ToLower().Contains(query)));
            }

            var combindCreatedBy = new List<FilterDefinition<Post>>() { };
            if (!string.IsNullOrWhiteSpace(createdBy))
            {
                combindCreatedBy.Add(Builders<Post>.Filter.Where(a => a.CreatedBy == createdBy));
            }

            var fullCondition = combind.Count == 0 ? Builders<Post>.Filter.Empty : Builders<Post>.Filter.Or(combind);
            if (combind.Count > 0 && combindCreatedBy.Count > 0)
                combindCreatedBy.Add(fullCondition);

            fullCondition = combindCreatedBy.Count == 0 ? fullCondition : Builders<Post>.Filter.And(combindCreatedBy);

            return await GetFilterResultWithPagingAsync(fullCondition, skip, take, nameof(Post.CreatedAt), false);
        }

        public async Task<bool> UpdatePostAsync(string id, PostUpdateRequest post)
        {
            var update = Builders<Post>.Update
                .Set(nameof(Post.Title), post.Title)
                .Set(nameof(Post.Language), post.Language)
                .Set(nameof(Post.Data2), post.Data2)
                .Set(nameof(Post.Language), post.Language)
                .Set(nameof(Post.Data1), post.Data1)
                .Set(nameof(Post.Source), post.Source)
                .Set(nameof(Post.Type), post.Type)
                .Set(nameof(Post.UpdatedAt), post.UpdatedAt)
                .Set(nameof(Post.UpdatedBy), post.UpdatedBy);

            return await UpdateAsync(e => e.Id == id, update);
        }
    }
}
