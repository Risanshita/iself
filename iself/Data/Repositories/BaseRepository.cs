using Firebase.Database;
using Firebase.Database.Query;
using JsonFlatFileDataStore;

namespace iself.Data.Repositories
{
    public abstract class BaseRepository<T> where T : class
    {
        protected DataStore store = new("data.json");
        protected IDocumentCollection<T> _collection;

        protected ChildQuery _child;
        public BaseRepository()
        {
            _collection = store.GetCollection<T>();
            var firebase = new FirebaseClient("https://iself-a253a-default-rtdb.asia-southeast1.firebasedatabase.app", new FirebaseOptions
            {
                
            });
            _child = firebase.Child(nameof(T));
        }
    }
}
