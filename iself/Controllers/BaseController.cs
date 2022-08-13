using iself.Utils;
using Microsoft.AspNetCore.Mvc;

namespace iself.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        public string CurrentUser
        {
            get
            {
                var id = User.Claims.FirstOrDefault(a => a.Type == "user_id")?.Value;
                return id ?? string.Empty;
            }
        }

        public string CurrentEmail
        {
            get
            {
                var id = User.Claims.FirstOrDefault(a => a.Type == "user_email")?.Value;
                return id ?? string.Empty;
            }
        }

        public UserRoles UserRole
        {
            get
            {
                var role = User.Claims.FirstOrDefault(a => a.Type == "user_role")?.Value;
                return string.IsNullOrWhiteSpace(role) ? UserRoles.User : Enum.Parse<UserRoles>(role);
            }
        }
    }
}
