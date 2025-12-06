namespace switchers_platform.Models.DTOs
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? City { get; set; }
        public string? University { get; set; }
        public string? LinkedInUrl { get; set; }

        public int RoleId { get; set; } = 1;  // Default: User
        public string? AccessCode { get; set; }
    }
}
