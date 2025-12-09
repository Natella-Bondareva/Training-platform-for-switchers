namespace switchers_platform.Models.Entities
{
    public class Course
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string? ShortDescription { get; set; }
        public string? ImageUrl { get; set; }
        public int ParticipantsCount { get; set; }


        public int MentorId { get; set; }     // Id користувача
        public string Status { get; set; } = "Draft";   // Draft, Published, Archiv

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation property — зв’язок 1:N
        public List<Lesson> Lessons { get; set; } = new();

        public CourseDetails Details { get; set; }
    }
}
