using iself.Models.Request;

namespace iself.Services.Interfaces
{
    public interface IAppFeedbackService
    {
        Task<bool> AddOrUpdateAsync(NewFeedbackRequest request);
    }
}
