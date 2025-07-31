using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class User
    {
        [BindNever]
        [JsonIgnore] // Hide UserId from Swagger/Postman request body
        public int UserId { get; set; } // Identity column
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Username { get; set; }
        public required string MobileNumber { get; set; }
        public required string UserRole { get; set; } // Guide or Traveller
    }
}
