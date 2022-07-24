using iself.Data.Models;
using System.Text.Json.Serialization;

namespace iself.Models.Request
{
    public class NewPostRequest
    {
        public string Title { get; set; } = string.Empty;
        public PostType? Type { get; set; }
        public string Data1 { get; set; } = string.Empty;
        public string Data2 { get; set; } = string.Empty;
        public string Source { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        [JsonIgnore]
        public string CreatedBy { get; set; } = string.Empty;
    }
}
