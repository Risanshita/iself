using iself.Data.Models;

namespace iself.Data.Repositories.Interfaces
{
    public interface IAppFeedbackRepository
    {
        Task<bool> AddOrUpdateAsync(AppFeedback appFeedback);
    }
}
