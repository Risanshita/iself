using AutoMapper;
using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;
using iself.Services.Interfaces;

namespace iself.Services
{
    public class AppFeedbackService : IAppFeedbackService
    {
        private readonly IMapper _mapper;
        private readonly IAppFeedbackRepository _appFeedbackRepository;

        public AppFeedbackService(IAppFeedbackRepository appFeedbackRepository, IMapper mapper)
        {
            _mapper = mapper;
            _appFeedbackRepository = appFeedbackRepository;
        }

        public async Task<bool> AddOrUpdateAsync(NewFeedbackRequest request)
        {
            return await _appFeedbackRepository.AddOrUpdateAsync(_mapper.Map<AppFeedback>(request));
        }
    }
}
