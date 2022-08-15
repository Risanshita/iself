using iself.Utils;

namespace iself.Models.Response
{
    public class UserResponse
    {
        public string Id { get; set; }
        public UserRoles Role { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
