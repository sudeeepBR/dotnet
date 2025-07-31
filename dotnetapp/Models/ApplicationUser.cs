using Microsoft.AspNetCore.Identity;
namespace dotnetapp.Models
{
    public class ApplicationUser : IdentityUser
    {
        public required string Name { get; set; }
    }
}
