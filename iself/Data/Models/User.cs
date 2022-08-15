using iself.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace iself.Data.Models
{
    public class User
    {
        [BsonId]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FullName { get; set; } = string.Empty;
        [BsonRepresentation(BsonType.String)]
        public UserRoles Role { get; set; } = UserRoles.User;
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        //public string? Password { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
