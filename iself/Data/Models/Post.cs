﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace iself.Data.Models
{
    public enum PostType
    {
        InfoByte,
        Paraphrase,
        CodeTip,
        Refactor, 
        Notification
    }

    public class Post
    {
        [BsonId]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Title { get; set; } = string.Empty;
        [BsonRepresentation(BsonType.String)]
        public PostType Type { get; set; }
        public string Data1 { get; set; } = string.Empty;
        public string Data2 { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public string CreatedBy { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string UpdatedBy { get; set; } = string.Empty;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
