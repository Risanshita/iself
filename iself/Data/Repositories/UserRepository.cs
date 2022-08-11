using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;

namespace iself.Data.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository() : base()
        {

        }

        public async Task<User?> AddUserAsync(User user)
        {
            if (await _collection.InsertOneAsync(user))
                return user;
            return null;
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            return await _collection.DeleteOneAsync(id);
        }

        public User? GetUser(string id)
        {
            return _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.Id == id);
        }
        public User? GetUserByEmail(string email)
        {
            return _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.Email.ToLower() == email.ToLower());
        }

        public List<User> GetUsers(string query, int take = 20, int skip = 0)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return _collection.AsQueryable().OrderBy(a => a.FullName).Skip(skip).Take(take).ToList();
            }
            query = query.ToLower();
            return _collection.AsQueryable().Where(a => a.FullName.ToLower().Contains(query)
                    || a.UserName.ToLower().Contains(query)
                    || a.Email.ToLower().Contains(query)
                    || a.PhoneNumber.ToLower().Contains(query)
                    )
                .OrderBy(a => a.FullName)
                .Skip(skip)
                .Take(take)
                .ToList();
        }

        public async Task<bool> UpdateUserAsync(string id, UpdateUserRequest request)
        {
            var user = _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.Id == id);
            if (user == null) return false;

            user.FullName = request.FullName;
            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.UserName = request.UserName;
            
            return await _collection.UpdateOneAsync(e => e.Id == id, request);
        }
    }
}
