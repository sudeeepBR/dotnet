using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Place
    {
        [BindNever]
        public int PlaceId { get; set; } // PlaceId is now included in all GET, PUT, and DELETE responses

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        public string BestTimeToVisit { get; set; } = null!;

        [Required]
        public string PlaceImage { get; set; } = null!;

        [Required]
        public string Location { get; set; } = null!;
    }
}