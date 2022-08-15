using iself.Data.Models;
using iself.Data.Repositories.Interfaces;
using MongoDB.Driver;

namespace iself.Data.Repositories
{
    public class AppFeedbackRepository : BaseRepository<AppFeedback>, IAppFeedbackRepository
    {
        private static bool IsIndexCreated { get; set; }
        public AppFeedbackRepository(MongoDbContext<AppFeedback> dbContex) : base(dbContex)
        {
            if (!IsIndexCreated)
            {
                var indexOptions = new CreateIndexOptions();
                var indexKeys = Builders<AppFeedback>.IndexKeys.Ascending(i => i.Id);
                var indexModel = new CreateIndexModel<AppFeedback>(indexKeys, indexOptions);
                _collection.Indexes.CreateOneAsync(indexModel);

                indexOptions = new CreateIndexOptions();
                indexKeys = Builders<AppFeedback>.IndexKeys.Ascending(i => i.Rating);
                indexModel = new CreateIndexModel<AppFeedback>(indexKeys, indexOptions);

                indexOptions = new CreateIndexOptions();
                indexKeys = Builders<AppFeedback>.IndexKeys.Ascending(i => i.CreatedBy);
                indexModel = new CreateIndexModel<AppFeedback>(indexKeys, indexOptions);

                _collection.Indexes.CreateOneAsync(indexModel);

                IsIndexCreated = true;
            }
        }

        public async Task<bool> AddOrUpdateAsync(AppFeedback appFeedback)
        {
            var feedback = _collection
                    .AsQueryable()
                    .FirstOrDefault(p => p.CreatedBy == appFeedback.CreatedBy);

            if (feedback == null)
            {
                await Create(appFeedback);
                    return true;
            }

            var update = Builders<AppFeedback>.Update
                .Set(nameof(AppFeedback.Rating), appFeedback.Rating)
                .Set(nameof(AppFeedback.FeedbackMessage), appFeedback.FeedbackMessage);

            return await UpdateAsync(e => e.Id == feedback.Id, update);
        }
    }
}
