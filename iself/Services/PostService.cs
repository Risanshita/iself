using AutoMapper;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Models.Response;
using iself.Services.Interfaces;

namespace iself.Services
{
    public class PostService : IPostService
    {
        private readonly IMapper _mapper;
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;

        public PostService(IPostRepository postRepository, IMapper mapper, IUserRepository userRepository)
        {
            _mapper = mapper;
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public async Task<PostResponse?> AddPostAsync(NewPostRequest request)
        {
            return _mapper.Map<PostResponse>(await _postRepository.AddPostAsync(_mapper.Map<Post>(request)));
        }

        public async Task<bool> DeletePostAsync(string id)
        {
            return await _postRepository.DeletePostAsync(id);
        }

        public PostResponse? GetPost(string id)
        {
            return _mapper.Map<PostResponse>(_postRepository.GetPost(id));
        }

        public List<PostResponse> GetPostByOwner(string createdBy, int take = 20, int skip = 0)
        {
            return UpdateOwnerName(_mapper.Map<List<PostResponse>>(_postRepository.GetPostByOwner(createdBy, take, skip)));
        }

        public List<PostResponse> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0)
        {
            return UpdateOwnerName(_mapper.Map<List<PostResponse>>(_postRepository.GetPostByType(type, createdBy, take, skip)));
        }

        public List<PostResponse> GetPosts(string query, string? createdBy, int take = 20, int skip = 0)
        {
            return UpdateOwnerName(_mapper.Map<List<PostResponse>>(_postRepository.GetPosts(query, createdBy, take, skip)));
        }

        public async Task<bool> UpdatePostAsync(string id, PostUpdateRequest post)
        {
            return await _postRepository.UpdatePostAsync(id, post);
        }

        public List<PostResponse> UpdateOwnerName(List<PostResponse> postResponses)
        {
            var userIds = postResponses.Select(a => a.CreatedBy).Distinct().ToList();
            var userDetails = _userRepository.GetUserByIds(userIds).ToDictionary(a => a.Id, a => a.FullName);
            postResponses.ForEach(postResponse =>
            {
                if (!string.IsNullOrWhiteSpace(postResponse.CreatedBy) && userDetails.TryGetValue(postResponse.CreatedBy, out string? name))
                    postResponse.OwnerName = name;
            });
            return postResponses;
        }
    }
}
