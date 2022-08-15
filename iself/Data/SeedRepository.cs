using iself.Models.Request;
using iself.Services.Interfaces;

namespace iself.Data
{
    public class SeedRepository
    {
        public static async Task StartSeeding(IServiceProvider host, IConfiguration configuration)
        {
            try
            {

                using var scope = host.CreateScope();
                var services = scope.ServiceProvider;
                var userService = services.GetService<IUserService>();

                NewUserRequest newUserRequest = new();
                configuration.GetSection("AdminUserConfig").Bind(newUserRequest);

                if (await userService.GetUserByEmail(newUserRequest.Email) == null)
                {
                    newUserRequest.Role = Utils.UserRoles.SuperAdmin;

                    await userService.AddUserAsync(newUserRequest);
                    Console.WriteLine("SuperAdmin user created");
                }
                else
                {
                    Console.WriteLine("SuperAdmin user exist");

                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("SuperAdmin user create failed " + ex.Message);

            }
        }
    }
}
