using FluentValidation;
using iself.Data.Repositories.Interfaces;
using iself.Models.Request;

namespace iself.Controllers.Validators
{
    public class NewUserValidator : AbstractValidator<NewUserRequest>
    {
        public NewUserValidator(IUserRepository userRepository)
        {
            RuleFor(a => a.FullName)
                .NotNull()
                .WithMessage("Please enter fullname");
            RuleFor(a => a.Email)
                .NotNull()
                .WithMessage("Please enter email");
            RuleFor(a => a)
                .MustAsync(async (request, cancellation) =>
                {
                    var res = await userRepository.GetUserByEmail(request.Email);
                    return res == null;
                })
                .WithMessage("Email already in use");
            RuleFor(a => a.Password)
                .NotNull()
                .WithMessage("Please enter password");
        }
    }
}
