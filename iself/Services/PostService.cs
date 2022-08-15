using AutoMapper;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Models.Response;
using iself.Services.Interfaces;
using static iself.Models.ApiResponse;

namespace iself.Services
{
    public class PostService : BaseService, IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserRepository _userRepository;

        public PostService(IPostRepository postRepository, IMapper mapper, IUserRepository userRepository) : base(mapper)
        {
            _postRepository = postRepository;
            _userRepository = userRepository;
        }

        public async Task<PostResponse?> AddPostAsync(NewPostRequest request)
        {
            return MappedResult<Post, PostResponse>(await _postRepository.AddPostAsync(MappedResult<NewPostRequest, Post>(request)));
        }

        public async Task<bool> DeletePostAsync(string id)
        {
            return await _postRepository.DeletePostAsync(id);
        }

        public async Task<PostResponse?> GetPost(string id)
        {
            return MappedResult<Post, PostResponse>(await _postRepository.GetPost(id));
        }

        public async Task<PaginatedResponse<PostResponse>> GetPostByOwner(string createdBy, int take = 20, int skip = 0)
        {
            return await UpdateOwnerName(MappedResult<Post, PostResponse>(await _postRepository.GetPostByOwner(createdBy, take, skip)));
        }

        public async Task<PaginatedResponse<PostResponse>> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0)
        {
            return await UpdateOwnerName(MappedResult<Post, PostResponse>(await _postRepository.GetPostByType(type, createdBy, take, skip)));
        }

        public async Task<PaginatedResponse<PostResponse>> GetPosts(string query, string? createdBy, int take = 20, int skip = 0)
        {
            return await UpdateOwnerName(MappedResult<Post, PostResponse>(await _postRepository.GetPosts(query, createdBy, take, skip)));
        }

        public async Task<bool> UpdatePostAsync(string id, PostUpdateRequest post)
        {
            return await _postRepository.UpdatePostAsync(id, post);
        }

        public async Task<PaginatedResponse<PostResponse>> UpdateOwnerName(PaginatedResponse<PostResponse> postResponses)
        {
            var userIds = postResponses.Data.Select(a => a.CreatedBy).Distinct().ToList();
            var userDetails = (await _userRepository.GetUserByIds(userIds)).ToDictionary(a => a.Id, a => a.FullName);
            postResponses.Data.ForEach(postResponse =>
            {
                if (!string.IsNullOrWhiteSpace(postResponse.CreatedBy) && userDetails.TryGetValue(postResponse.CreatedBy, out string? name))
                    postResponse.OwnerName = name;
            });
            return postResponses;
        }
    }
}
