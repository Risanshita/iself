using JsonFlatFileDataStore;

namespace iself.Data.Repositories
{
    public abstract class BaseRepository<T> where T : class
    {
        protected DataStore store = new("data.json");
        protected IDocumentCollection<T> _collection;
        public BaseRepository()
        {
            _collection = store.GetCollection<T>();
        }
    }
}
