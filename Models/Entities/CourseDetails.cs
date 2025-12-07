namespace switchers_platform.Models.Entities
{
    public class CourseDetails
    {
        public int Id { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }

        public string SkillsRequired { get; set; }   // "Python, Data Structures, Git"
        public string ProgramIncludes { get; set; }  // текстовий блок (checkbox style)
        public string Description { get; set; }      // фінальний опис

        public int TotalHours { get; set; }          // загальна тривалість
        public string Language { get; set; }         // "English", "Ukrainian" etc
    }
}
