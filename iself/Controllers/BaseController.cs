using Microsoft.AspNetCore.Mvc;

namespace iself.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        public string CurrentUser
        {
            get
            {
                var email = User.Claims.FirstOrDefault(a => a.Type.Contains("email"))?.Value;
                return email ?? string.Empty;
            }
        }
    }
}
