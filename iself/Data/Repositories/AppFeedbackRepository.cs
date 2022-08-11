using iself.Data.Models;
using iself.Data.Repositories.Interfaces; 

namespace iself.Data.Repositories
{
    public class AppFeedbackRepository : BaseRepository<AppFeedback>, IAppFeedbackRepository
    {
        public AppFeedbackRepository() : base()
        {

        }

        public async Task<bool> AddOrUpdateAsync(AppFeedback appFeedback)
        {
            var feedback = _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.CreatedBy == appFeedback.CreatedBy);

            if (feedback == null)
                return await _collection.InsertOneAsync(appFeedback);
            
            feedback.Rating = appFeedback.Rating;
            feedback.FeedbackMessage = appFeedback.FeedbackMessage;

            return await _collection.UpdateOneAsync(e => e.Id == feedback.Id, feedback);
        }
    }
}
