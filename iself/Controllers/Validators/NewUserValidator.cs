using FluentValidation;
using iself.Models.Request;

namespace iself.Controllers.Validators
{
    public class NewUserValidator : AbstractValidator<NewUserRequest>
    {
        public NewUserValidator()
        {
            RuleFor(a => a.FullName)
                .NotNull()
                .WithMessage("Please enter fullname");
            RuleFor(a => a.Email)
                .NotNull()
                .WithMessage("Please enter email");
            RuleFor(a => a.Password)
                .NotNull()
                .WithMessage("Please enter password");
        }
    }
}
