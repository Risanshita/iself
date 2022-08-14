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

        public List<User> GetUserByIds(List<string> ids)
        {
            return _collection
                    .AsQueryable()
                    .Where(p => ids.Contains(p.Id))
                    .ToList();
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
            return _collection.AsQueryable().Where(a => (a.FullName != null && a.FullName.ToLower().Contains(query))
                    || (a.UserName != null && a.UserName.ToLower().Contains(query))
                    || (a.Email != null && a.Email.ToLower().Contains(query))
                    || (a.PhoneNumber != null && a.PhoneNumber.ToLower().Contains(query))
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
            user.PhoneNumber = request.PhoneNumber;

            return await _collection.UpdateOneAsync(e => e.Id == id, request);
        }
    }
}
