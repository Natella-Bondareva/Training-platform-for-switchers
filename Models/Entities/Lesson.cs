namespace switchers_platform.Models.Entities
{
    public class Lesson
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string? Content { get; set; } // можна розширяти пізніше

        public int CourseId { get; set; }
        public Course Course { get; set; } = null!;
    }
}
