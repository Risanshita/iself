using System.Text.Json.Serialization;

namespace iself.Models.Request
{
    public class NewFeedbackRequest
    {
        public string FeedbackMessage { get; set; } = string.Empty;
        public int Rating { get; set; } = 1;
        [JsonIgnore]
        public string? CreatedBy { get; set; }
    }
}
