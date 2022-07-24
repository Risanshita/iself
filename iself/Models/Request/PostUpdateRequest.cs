using iself.Data.Models;
using System.Text.Json.Serialization;

namespace iself.Models.Request
{
    public class PostUpdateRequest
    {
        public string Title { get; set; } = string.Empty;
        public PostType? Type { get; set; }
        public string Data1 { get; set; } = string.Empty;
        public string Data2 { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        [JsonIgnore]
        public string UpdatedBy { get; set; } = string.Empty;
        [JsonIgnore]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
