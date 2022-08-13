using AutoMapper;
using FirebaseAdmin.Auth;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Models.Response;
using iself.Services.Interfaces;
using iself.Utils;

namespace iself.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<UserResponse?> AddUserAsync(NewUserRequest request)
        {
            var user = _mapper.Map<User>(request);

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
                                {"user_role", UserRoles.User.ToString()},
                            };
            user.Id = response.Uid;
            await FirebaseAuth.DefaultInstance.SetCustomUserClaimsAsync(user.Id, claims);
            return _mapper.Map<UserResponse>(await _userRepository.AddUserAsync(user));
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
            await FirebaseAuth.DefaultInstance.DeleteUserAsync(id);
            return await _userRepository.DeleteUserAsync(id);
        }

        public UserResponse? GetUser(string id)
        {
            return _mapper.Map<UserResponse>(_userRepository.GetUser(id));
        }

        public UserResponse? GetUserByEmail(string email)
        {
            return _mapper.Map<UserResponse>(_userRepository.GetUserByEmail(email));
        }

        public List<UserResponse> GetUsers(string query, int take = 20, int skip = 0)
        {
            return _mapper.Map<List<UserResponse>>(_userRepository.GetUsers(query, take, skip));
        }

        public async Task<bool> UpdateUserAsync(string id, UpdateUserRequest request)
        {
            return await _userRepository.UpdateUserAsync(id, request);
        }

        public async Task<bool> MakeSuperAdminAsync(string id)
        {
            var user = _userRepository.GetUser(id);
            if (user == null || user.Email != Environment.GetEnvironmentVariable("AdminEmail"))
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
