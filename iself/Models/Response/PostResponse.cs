using iself.Data.Models;

namespace iself.Models.Response
{
    public class PostResponse
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public PostType Type { get; set; }
        public string? Data1 { get; set; }
        public string? Data2 { get; set; }
        public string? Source { get; set; }
        public string? Author { get; set; }
        public string? Language { get; set; }
        public string? OwnerName { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
