namespace iself.Data.Models
{
    public class User
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Eamil { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
