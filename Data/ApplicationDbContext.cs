using Microsoft.EntityFrameworkCore;
using switchers_platform.Models.Entities;

namespace switchers_platform.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Role> Roles { get; set; }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Lesson> Lessons { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1-to-1 User → Profile
            modelBuilder.Entity<User>()
                .HasOne(u => u.Profile)
                .WithOne(p => p.User)
                .HasForeignKey<UserProfile>(p => p.UserId);

            // Seed Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "User" },
                new Role { Id = 2, Name = "Mentor" },
                new Role { Id = 3, Name = "Admin" }
            );

            modelBuilder.Entity<Course>()
                .HasOne(c => c.Details)
                .WithOne(d => d.Course)
                .HasForeignKey<CourseDetails>(d => d.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
