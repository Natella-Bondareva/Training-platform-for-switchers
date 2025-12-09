using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using switchers_platform.Data;
using switchers_platform.Models.DTOs;

namespace switchers_platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ---------------- Get all mentors ----------------
        [HttpGet("mentors")]
        public async Task<IActionResult> GetMentors()
        {
            var mentors = await _context.Users
                .Include(u => u.Profile)    // якщо FullName зберігається в профілі
                .Include(u => u.Role)
                .Where(u => u.Role.Name == "Mentor")
                .Select(static u => new MentorDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    FullName = u.Profile.FullName
                })
                .ToListAsync();

            return Ok(mentors);
        }
    }
}
