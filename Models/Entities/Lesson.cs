namespace switchers_platform.Models.Entities
{
    public class Lesson
    {
        public int Id { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public string Title { get; set; }            // Заголовок уроку
        public string VideoUrl { get; set; }         // Посилання на відео (YouTube)
        public string Description { get; set; }      // Опис уроку

        public string TestUrl { get; set; }          // Посилання на фінальний тест (Google Forms)
    }
}
