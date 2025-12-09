using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using switchers_platform.Data;
using switchers_platform.Models.DTOs;
using switchers_platform.Models.Entities;

namespace switchers_platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LessonsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ---------------- List of lessons for a course ----------------
        [HttpGet("course/{courseId}")]
        public async Task<ActionResult<IEnumerable<LessonDto>>> GetLessonsByCourse(int courseId)
        {
            var lessons = await _context.Lessons
                .Where(l => l.CourseId == courseId)
                .Select(l => new LessonDto
                {
                    Id = l.Id,
                    Title = l.Title,
                    VideoUrl = l.VideoUrl,
                    Description = l.Description,
                    TestUrl = l.TestUrl,
                })
                .ToListAsync();

            return Ok(lessons);
        }

        // ---------------- Get single lesson ----------------
        [HttpGet("{id}")]
        public async Task<ActionResult<LessonDto>> GetLesson(int id)
        {
            var lesson = await _context.Lessons
                .FirstOrDefaultAsync(l => l.Id == id);

            if (lesson == null)
                return NotFound();

            return Ok(new LessonDto
            {
                Id = lesson.Id,
                Title = lesson.Title,
                VideoUrl = lesson.VideoUrl,
                Description = lesson.Description,
                TestUrl = lesson.TestUrl,
            });
        }

        // ---------------- Create lesson ----------------
        [HttpPost]
        public async Task<IActionResult> CreateLesson(LessonCreateDto dto)
        {
            var lesson = new Lesson
            {
                CourseId = dto.CourseId,
                Title = dto.Title,
                VideoUrl = dto.VideoUrl,
                Description = dto.Description,
                TestUrl = dto.TestUrl,
            };

            _context.Lessons.Add(lesson);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Lesson created", lesson.Id });
        }

        // ---------------- Update lesson ----------------
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id, LessonUpdateDto dto)
        {
            var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.Id == id);

            if (lesson == null)
                return NotFound();

            lesson.Title = dto.Title;
            lesson.VideoUrl = dto.VideoUrl;
            lesson.Description = dto.Description;
            lesson.TestUrl = dto.TestUrl;

            await _context.SaveChangesAsync();

            return Ok("Lesson updated");
        }
    }
}
