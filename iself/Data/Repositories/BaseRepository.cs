using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;
using static iself.Models.ApiResponse;

namespace iself.Data.Repositories
{
    //public abstract class BaseRepository<T> where T : class
    //{
    //    protected DataStore store = new("data.json");
    //    protected IDocumentCollection<T> _collection;

    //    public BaseRepository()
    //    {
    //        _collection = store.GetCollection<T>();
    //    }
    //}
    public abstract class BaseRepository<T> where T : class
    {
        protected readonly IMongoCollection<T> _collection;
        public BaseRepository(MongoDbContext<T> dbContex)
        {
            _collection = dbContex.Collection;
        }

        public virtual async Task<T> Create(T item)
        {
            await _collection.InsertOneAsync(item);
            return item;
        }

        public virtual async Task<bool> DeleteAsync(Expression<Func<T, bool>> filter)
        {
            var result = await _collection.DeleteOneAsync(filter);
            return result.IsAcknowledged && result.DeletedCount > 0;
        }

        public virtual async Task<bool> UpdateAsync(Expression<Func<T, bool>> filter, UpdateDefinition<T> update, UpdateOptions updateOptions = null)
        {
            var result = await _collection.UpdateOneAsync(filter, update, updateOptions);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        public virtual async Task<bool> UpdateAsync(FilterDefinition<T> filter, UpdateDefinition<T> update, UpdateOptions updateOptions = null)
        {
            var result = await _collection.UpdateOneAsync(filter, update, updateOptions);
            return result.IsAcknowledged && result.ModifiedCount > 0;
        }

        protected async Task<PaginatedResponse<T>> GetFilterResultWithPagingAsync(IFindFluent<T, T> query, int skip, int take, string sortBy, bool ascending)
        {
            if (!string.IsNullOrWhiteSpace(sortBy))
                query = query.Sort(new BsonDocument(sortBy, ascending ? 1 : -1));

            var finalData = await query.Skip(skip)
                .Limit(take)
                .ToListAsync();

            var result = new PaginatedResponse<T>(finalData, take, skip + finalData.Count, finalData.Count < take);
            return result;
        }

        protected async Task<PaginatedResponse<T>> GetFilterResultWithPagingAsync(FilterDefinition<T> filter, int skip, int take, string sortBy, bool ascending = true)
        {
            var query = _collection.Find(filter);

            if (!string.IsNullOrWhiteSpace(sortBy))
                query = query.Sort(new BsonDocument(sortBy, ascending ? 1 : -1));

            var finalData = await query.Skip(skip)
                .Limit(take)
                .ToListAsync();

            var result = new PaginatedResponse<T>(finalData, take, skip + finalData.Count, finalData.Count < take);
            return result;
        }
    }

}
