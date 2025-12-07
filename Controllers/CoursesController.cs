using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using switchers_platform.Data;
using switchers_platform.Models.DTOs;
using switchers_platform.Models.Entities;

namespace switchers_platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ---------------- List of courses ----------------
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseBasicDto>>> GetCourses()
        {
            var courses = await _context.Courses
                .Select(c => new CourseBasicDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    ParticipantsCount = c.ParticipantsCount
                })
                .ToListAsync();

            return Ok(courses);
        }

        // ---------------- Get full course info ----------------
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetCourse(int id)
        {
            var course = await _context.Courses
                .Include(c => c.Details)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound();

            var dto = new CourseDto
            {
                Id = course.Id,
                Title = course.Title,
                ParticipantsCount = course.ParticipantsCount,
                Details = new CourseDetailsDto
                {
                    SkillsRequired = course.Details?.SkillsRequired,
                    ProgramIncludes = course.Details?.ProgramIncludes,
                    Description = course.Details?.Description,
                    TotalHours = course.Details?.TotalHours ?? 0,
                    Language = course.Details?.Language
                }
            };

            return Ok(dto);
        }

        // ---------------- Create course ----------------

        [HttpPost]
        public async Task<IActionResult> CreateCourse(CourseCreateDto dto)
        {
            var course = new Course
            {
                Title = dto.Title,
                ParticipantsCount = dto.ParticipantsCount,
                Details = new CourseDetails
                {
                    SkillsRequired = dto.SkillsRequired,
                    ProgramIncludes = dto.ProgramIncludes,
                    Description = dto.Description,
                    TotalHours = dto.TotalHours,
                    Language = dto.Language
                }
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Course created", course.Id });
        }

        // ---------------- Update course ----------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, CourseUpdateDto dto)
        {
            var course = await _context.Courses
                .Include(c => c.Details)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (course == null)
                return NotFound();

            course.Title = dto.Title;
            course.ParticipantsCount = dto.ParticipantsCount;

            course.Details.SkillsRequired = dto.SkillsRequired;
            course.Details.ProgramIncludes = dto.ProgramIncludes;
            course.Details.Description = dto.Description;
            course.Details.TotalHours = dto.TotalHours;
            course.Details.Language = dto.Language;

            await _context.SaveChangesAsync();

            return Ok("Course updated");
        }
    }
}
