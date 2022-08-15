using iself.Models.Request;
using iself.Models.Response;
using static iself.Models.ApiResponse;

namespace iself.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse?> GetUser(string id);
        Task<PaginatedResponse<UserResponse>> GetUsers(string query, int take = 20, int skip = 0);
        Task<UserResponse?> AddUserAsync(NewUserRequest request);
        Task<bool> DeleteUserAsync(string id);
        Task<bool> UpdateUserAsync(string id, UpdateUserRequest request);
        Task<UserResponse?> GetUserByEmail(string email); 
        Task<bool> MakeSuperAdminAsync(string id);
    }
}
