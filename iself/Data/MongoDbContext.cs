using iself.Data.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Core.Events;

namespace iself.Data
{
    public class MongoDbContext<T>
    {
        private readonly static Dictionary<string, string> Collections = new Dictionary<string, string>
            {
                { nameof(Post), "Posts" },
                { nameof(AppFeedback), "AppFeedbacks" },
                { nameof(User), "Users" }
            };
        private IMongoDatabase Database { get; }
        public IMongoCollection<T> Collection { get; }

        public MongoDbContext(IOptions<MongoDbConfigs> connectionSettings)
        {
            MongoDbConfigs mongoDbConfigs = connectionSettings.Value;
            MongoClientSettings clientSettings = MongoClientSettings.FromConnectionString(mongoDbConfigs.ConnectionString);

            if (mongoDbConfigs.EnableCommandTracing)
            {
                var logger = Serilog.Log.Logger;
                clientSettings.ClusterConfigurator = builder =>
                {
                    builder.Subscribe<CommandStartedEvent>(_ =>
                    {
                        logger.Debug($"Mongo Command started: {_.Command}");
                    });
                };
            }

            var client = new MongoClient(clientSettings);
            Database = client.GetDatabase(mongoDbConfigs.DatabaseName);

            Collection = Database.GetCollection<T>(GetCollectionName());
        }

        public string GetCollectionName()
        {
            string collName = string.Empty;
            try
            {
                Type type = typeof(T);
                collName = Collections[type.Name];
            }
            catch { }
            if (string.IsNullOrWhiteSpace(collName))
            {
                throw new ArgumentNullException("Collection name is empty.");
            }
            return collName;
        }
    }

}
