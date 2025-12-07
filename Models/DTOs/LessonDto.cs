namespace switchers_platform.Models.DTOs
{

        public class LessonDto
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string VideoUrl { get; set; }
            public string Description { get; set; }
            public string TestUrl { get; set; }
        }

        public class LessonCreateDto
        {
            public int CourseId { get; set; }
            public string Title { get; set; }
            public string VideoUrl { get; set; }
            public string Description { get; set; }
            public string TestUrl { get; set; }
        }

        public class LessonUpdateDto
        {
            public string Title { get; set; }
            public string VideoUrl { get; set; }
            public string Description { get; set; }
            public string TestUrl { get; set; }
            public string TaskDescription { get; set; }
            public string TaskFileUrl { get; set; }
        }

}
