﻿using System.Text.Json.Serialization;

namespace iself.Models.Request
{
    public class NewUserRequest
    {
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Eamil { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? CreatedBy { get; set; } 
    }
}