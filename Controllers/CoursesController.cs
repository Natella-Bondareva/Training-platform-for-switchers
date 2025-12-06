using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using switchers_platform.Data;
using switchers_platform.Models.DTOs;

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

        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _context.Courses
                .Include(c => c.Lessons)
                .ToListAsync();

            var courseDtos = courses.Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Lessons = c.Lessons.Select(l => new LessonDto
                {
                    Id = l.Id,
                    Title = l.Title
                }).ToList()
            });

            return Ok(courseDtos);
        }

    }
}
