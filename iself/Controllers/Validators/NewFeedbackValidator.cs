using FluentValidation;
using iself.Models.Request;

namespace iself.Controllers.Validators
{
    public class NewFeedbackValidator : AbstractValidator<NewFeedbackRequest>
    {
        public NewFeedbackValidator()
        {
            RuleFor(a => a.Rating)
                .NotNull()
                .GreaterThan(0)
                .WithMessage("Invalid rating value");
        }
    }
}
