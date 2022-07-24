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

        public PostService(IPostRepository postRepository, IMapper mapper)
        {
            _mapper = mapper;
            _postRepository = postRepository;
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
            return _mapper.Map<List<PostResponse>>(_postRepository.GetPostByOwner(createdBy, take, skip));
        }

        public List<PostResponse> GetPostByType(PostType type, string? createdBy, int take = 20, int skip = 0)
        {
            return _mapper.Map<List<PostResponse>>(_postRepository.GetPostByType(type, createdBy, take, skip));
        }

        public List<PostResponse> GetPosts(string query, string? createdBy, int take = 20, int skip = 0)
        {
            return _mapper.Map<List<PostResponse>>(_postRepository.GetPosts(query, createdBy, take, skip));
        }

        public async Task<bool> UpdatePostAsync(string id, PostUpdateRequest post)
        {
            return await _postRepository.UpdatePostAsync(id, post);
        }
    }
}
