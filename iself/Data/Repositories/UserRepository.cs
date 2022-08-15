using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using MongoDB.Driver;
using static iself.Models.ApiResponse;

namespace iself.Data.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private static bool IsIndexCreated { get; set; }
        public UserRepository(MongoDbContext<User> dbContex) : base(dbContex)
        {
            if (!IsIndexCreated)
            {
                var indexOptions = new CreateIndexOptions();
                var indexKeys = Builders<User>.IndexKeys.Ascending(i => i.Id);
                var indexModel = new CreateIndexModel<User>(indexKeys, indexOptions);
                _collection.Indexes.CreateOneAsync(indexModel);

                indexOptions = new CreateIndexOptions();
                indexKeys = Builders<User>.IndexKeys.Ascending(i => i.Email);
                indexModel = new CreateIndexModel<User>(indexKeys, indexOptions);

                _collection.Indexes.CreateOneAsync(indexModel);

                IsIndexCreated = true;
            }
        }

        public async Task<User?> AddUserAsync(User user)
        {
            await Create(user);
            return user;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            return await DeleteAsync(a => a.Id == id);
        }

        public async Task<User?> GetUser(string id)
        {
            return (await _collection.FindAsync(p => p.Id == id))
                      .FirstOrDefault();
        }

        public async Task<List<User>> GetUserByIds(List<string> ids)
        {
            return (await _collection.FindAsync(p => ids.Contains(p.Id)))
                    .ToList();
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            var res = await _collection.Find(p => p.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
            return res;
        }

        public async Task<PaginatedResponse<User>> GetUsers(string query, int take = 20, int skip = 0)
        {
            query = query.ToLower();

            var combind = new List<FilterDefinition<User>>();
            if (!string.IsNullOrWhiteSpace(query))
            {

                combind.Add(Builders<User>.Filter.Where(a => (a.FullName != null && a.FullName.ToLower().Contains(query))));
                combind.Add(Builders<User>.Filter.Where(a => (a.UserName != null && a.UserName.ToLower().Contains(query))));
                combind.Add(Builders<User>.Filter.Where(a => (a.Email != null && a.Email.ToLower().Contains(query))));
                combind.Add(Builders<User>.Filter.Where(a => (a.PhoneNumber != null && a.PhoneNumber.ToLower().Contains(query))));
            }


            var fullCondition = combind.Count == 0 ? Builders<User>.Filter.Empty : Builders<User>.Filter.Or(combind);

            return await GetFilterResultWithPagingAsync(fullCondition, skip, take, nameof(User.FullName));
        }

        public async Task<bool> UpdateUserAsync(string id, UpdateUserRequest request)
        {
            var update = Builders<User>.Update
                .Set(nameof(User.FullName), request.FullName)
                .Set(nameof(User.PhoneNumber), request.PhoneNumber);

            return await UpdateAsync(a => a.Id == id, update);
        }
    }
}
