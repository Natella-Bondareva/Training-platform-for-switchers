namespace switchers_platform.Models.DTOs
{
    public class ProfileUpdateDto
    {
        public string FullName { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? City { get; set; }
        public string? University { get; set; }
        public string? LinkedInUrl { get; set; }
    }
}
