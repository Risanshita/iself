﻿using iself.Utils;
using System.Text.Json.Serialization;

namespace iself.Models.Request
{
    public class NewUserRequest
    {
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? CreatedBy { get; set; }
        [JsonIgnore]
        public UserRoles Role { get; set; } = UserRoles.User;
    }
}
