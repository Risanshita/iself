using AutoMapper;
using iself.Data.Models;
using iself.Models.Request;
using iself.Models.Response;

namespace iself.Utils
{
    public class AutoMapperConfig : Profile
    {
        public AutoMapperConfig()
        {
            CreateMap<Post, NewPostRequest>().ReverseMap();
            CreateMap<Post, PostResponse>().ReverseMap();
        }
    }
}
