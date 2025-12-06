namespace switchers_platform.Models.Entities
{
    public class UserProfile
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string FullName { get; set; } = string.Empty;
        public DateTime? BirthDate { get; set; }
        public string? City { get; set; }
        public string? University { get; set; }
        public string? LinkedInUrl { get; set; }
    }
}
