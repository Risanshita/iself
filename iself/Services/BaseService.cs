using AutoMapper;
using static iself.Models.ApiResponse;

namespace iself.Services
{
    public abstract class BaseService
    {
        private readonly IMapper _mapper;

        public BaseService(IMapper mapper)
        {
            _mapper = mapper;
        }

        protected TResponse MappedResult<TModel, TResponse>(TModel source)
        {
            return _mapper.Map<TResponse>(source);
        }

        protected List<TResponse> MappedResult<TModel, TResponse>(List<TModel> source)
        {
            return _mapper.Map<List<TResponse>>(source);
        }

        protected PaginatedResponse<TResponse> MappedResult<TModel, TResponse>(PaginatedResponse<TModel> source)
        {
            return new PaginatedResponse<TResponse>(_mapper.Map<List<TResponse>>(source.Data), source.Take, source.Skip, source.IsLast);
        }
    }
}
