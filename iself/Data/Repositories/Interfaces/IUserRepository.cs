using iself.Data.Models;
using iself.Models.Request;

namespace iself.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        User? GetUserByEmail(string email);
        User? GetUser(string id);
        List<User> GetUsers(string query, int take = 20, int skip = 0);
        Task<User?> AddUserAsync(User User);
        Task<bool> DeleteUserAsync(string id);
        Task<bool> UpdateUserAsync(string id, UpdateUserRequest request);
        List<User> GetUserByIds(List<string> ids);
    }
}
