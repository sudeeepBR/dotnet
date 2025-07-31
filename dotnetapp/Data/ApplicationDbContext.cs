using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }


        public DbSet<Place> Places { get; set; }
        public new DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Place>()
                .Property(p => p.PlaceId)
                .ValueGeneratedOnAdd(); // Configure PlaceId as an identity column

            modelBuilder.Entity<User>()
                .Property(u => u.UserId)
                .ValueGeneratedOnAdd(); // Configure UserId as an identity column
        }

        // Utility method for development/testing: Reset PlaceId identity seed
        public async Task ResetPlacesIdentityAsync()
        {
            await Database.ExecuteSqlRawAsync("DBCC CHECKIDENT ('Places', RESEED, 0);");
        }
    }
}
