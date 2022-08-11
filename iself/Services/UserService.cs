using AutoMapper;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Models.Response;
using iself.Services.Interfaces;

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
            return _mapper.Map<UserResponse>(await _userRepository.AddUserAsync(_mapper.Map<User>(request)));
        }

        public async Task<bool> DeleteUserAsync(string id)
        {
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
    }
}
