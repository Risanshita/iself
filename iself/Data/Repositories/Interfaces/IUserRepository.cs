using iself.Data.Models;
using iself.Models.Request;
using static iself.Models.ApiResponse;

namespace iself.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmail(string email);
        Task<User?> GetUser(string id);
        Task<PaginatedResponse<User>> GetUsers(string query, int take = 20, int skip = 0);
        Task<User?> AddUserAsync(User User);
        Task<bool> DeleteUserAsync(string id);
        Task<bool> UpdateUserAsync(string id, UpdateUserRequest request);
        Task<List<User>> GetUserByIds(List<string> ids);
    }
}
