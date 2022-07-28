using FluentValidation;
using iself.Models.Request;

namespace iself.Controllers.Validators
{
    public class NewPostValidator : AbstractValidator<NewPostRequest>
    {
        public NewPostValidator()
        {
            RuleFor(a => a.Type)
                .NotNull()
                .WithMessage("Please select type");

            RuleFor(a => a)
                 .Must((request) =>
                 {
                     if(request.Type == Data.Models.PostType.Notification)
                     {
                         return !string.IsNullOrWhiteSpace(request.Data1);
                     }
                     return true;
                 }).WithMessage("Notification cannot be empty");

            RuleFor(a => a)
              .Must((request) =>
              {
                  if (request.Type == Data.Models.PostType.InfoByte)
                  {
                      return !string.IsNullOrWhiteSpace(request.Data1);
                  }
                  return true;
              }).WithMessage("InfoByte cannot be empty");

            RuleFor(a => a)
              .Must((request) =>
              {
                  if (request.Type == Data.Models.PostType.CodeTip)
                  {
                      return !string.IsNullOrWhiteSpace(request.Language) && !string.IsNullOrWhiteSpace(request.Data1) && !string.IsNullOrWhiteSpace(request.Title);
                  }
                  return true;
              }).WithMessage("Language, Code and title cannot be empty");

            RuleFor(a => a)
              .Must((request) =>
              {
                  if (request.Type == Data.Models.PostType.Refactor)
                  {
                      return !string.IsNullOrWhiteSpace(request.Language) && !string.IsNullOrWhiteSpace(request.Data1) && !string.IsNullOrWhiteSpace(request.Data2) && !string.IsNullOrWhiteSpace(request.Title);
                  }
                  return true;
              }).WithMessage("Language, Code, Refactored Code and title cannot be empty");

            RuleFor(a => a)
              .Must((request) =>
              {
                  if (request.Type == Data.Models.PostType.Paraphase)
                  {
                      return !string.IsNullOrWhiteSpace(request.Data1) && !string.IsNullOrWhiteSpace(request.Data2);
                  }
                  return true;
              }).WithMessage("Paraphase1 and Paraphase2 line cannot be empty");
        }
    }
}
