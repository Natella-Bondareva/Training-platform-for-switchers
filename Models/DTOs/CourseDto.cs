namespace switchers_platform.Models.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<LessonDto> Lessons { get; set; }
    }
}
