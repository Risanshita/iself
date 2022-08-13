using iself.Models.Request;
using iself.Models.Response;

namespace iself.Services.Interfaces
{
    public interface IUserService
    {
        UserResponse? GetUser(string id);
        List<UserResponse> GetUsers(string query, int take = 20, int skip = 0);
        Task<UserResponse?> AddUserAsync(NewUserRequest request);
        Task<bool> DeleteUserAsync(string id);
        Task<bool> UpdateUserAsync(string id, UpdateUserRequest request);
        UserResponse? GetUserByEmail(string email); 
        Task<bool> MakeSuperAdminAsync(string id);
    }
}
