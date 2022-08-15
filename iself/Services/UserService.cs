using AutoMapper;
using FirebaseAdmin.Auth;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Models.Response;
using iself.Services.Interfaces;
using iself.Utils;
using static iself.Models.ApiResponse;

namespace iself.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration) : base(mapper)
        {
            _configuration = configuration;
            _userRepository = userRepository;
        }

        public async Task<UserResponse?> AddUserAsync(NewUserRequest request)
        {
            var user = MappedResult<NewUserRequest, User>(request);

            var args = new UserRecordArgs()
            {
                Uid = Guid.NewGuid().ToString(),
                Email = user.Email,
                DisplayName = user.FullName,
                Password = request.Password
            };

            // Create user in firebase
            var response = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);
            var claims = new Dictionary<string, object>()
                            {
                                { "user_email", user.Email},
                                {"user_role", request.Role.ToString()},
                            };
            user.Id = response.Uid;
            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(user.Id, claims);
            return MappedResult<User, UserResponse>(await _userRepository.AddUserAsync(user));
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(id);
            return await _userRepository.DeleteUserAsync(id);
        }

        public async Task<UserResponse?> GetUser(string id)
        {
            return MappedResult<User, UserResponse>(await _userRepository.GetUser(id));
        }

        public async Task<UserResponse?> GetUserByEmail(string email)
        {
            return MappedResult<User, UserResponse>(await _userRepository.GetUserByEmail(email));
        }

        public async Task<PaginatedResponse<UserResponse>> GetUsers(string query, int take = 20, int skip = 0)
        {
            return MappedResult<User, UserResponse>(await _userRepository.GetUsers(query, take, skip));
        }

        public async Task<bool> UpdateUserAsync(string id, UpdateUserRequest request)
        {
            return await _userRepository.UpdateUserAsync(id, request);
        }

        public async Task<bool> MakeSuperAdminAsync(string id)
        {
            var user = await _userRepository.GetUser(id);
            if (user == null || user.Email != _configuration.GetValue<string>("AdminUserConfig:Email"))
                return false;

            var claims = new Dictionary<string, object>()
                        {
                            {"user_role", UserRoles.SuperAdmin.ToString()},
                            {"user_email", user.Email},
                        };

            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(id, claims);
            return true;
        }
    }
}
