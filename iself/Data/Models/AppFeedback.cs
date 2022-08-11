namespace iself.Data.Models
{
    public class AppFeedback
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FeedbackMessage { get; set; } = string.Empty;
        public int Rating { get; set; } = 1;
        public string? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
