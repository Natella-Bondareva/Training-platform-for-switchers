namespace switchers_platform.Models.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ParticipantsCount { get; set; }
        public string MentorId { get; set; }
        public string Status { get; set; }

        public CourseDetailsDto Details { get; set; }

        public List<LessonDto> Lessons { get; set; }
    }

    public class CourseBasicDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ParticipantsCount { get; set; }
        public int MentorId { get; set; }
        public string Status { get; set; }
    }

    public class CourseDetailsDto
    {
        public string SkillsRequired { get; set; }
        public string ProgramIncludes { get; set; }
        public string Description { get; set; }
        public int TotalHours { get; set; }
        public string Language { get; set; }
    }

    public class CourseCreateDto
    {
        public string Title { get; set; }
        public int ParticipantsCount { get; set; }

        public int MentorId { get; set; }
    

        public string SkillsRequired { get; set; }
        public string ProgramIncludes { get; set; }
        public string Description { get; set; }
        public int TotalHours { get; set; }
        public string Language { get; set; }
    }

    public class CourseUpdateDto
    {
        public string Title { get; set; }
        public int ParticipantsCount { get; set; }

        public string SkillsRequired { get; set; }
        public string ProgramIncludes { get; set; }
        public string Description { get; set; }
        public int TotalHours { get; set; }
        public string Language { get; set; }
    }
}
