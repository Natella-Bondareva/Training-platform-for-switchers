using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using switchers_platform.Data;
using switchers_platform.Models.DTOs;
using switchers_platform.Models.Entities;
using switchers_platform.Services;

namespace switchers_platform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;


        public AccountsController(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // ---------------- Register ----------------
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("Email already exists.");

            var user = new User
            {
                Email = dto.Email,
                PasswordHash = PasswordHasher.Hash(dto.Password),
                RoleId = dto.RoleId,
                AccessCode = dto.AccessCode
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var profile = new UserProfile
            {
                UserId = user.Id,
                FullName = dto.FullName,
                BirthDate = dto.BirthDate,
                City = dto.City,
                University = dto.University,
                LinkedInUrl = dto.LinkedInUrl
            };

            _context.UserProfiles.Add(profile);
            await _context.SaveChangesAsync();

            return Ok("Registration successful.");
        }

        // ---------------- Login ----------------
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return Unauthorized("User not found.");

            if (user.PasswordHash != PasswordHasher.Hash(dto.Password))
                return Unauthorized("Incorrect password.");

            string token = _tokenService.GenerateToken(user.Id, user.Email, user.Role.Name);

            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.Email,
                    role = user.Role.Name
                }
            });
        }

        // ---------------- Get Profile ----------------
        [Authorize]
        [HttpGet("profile/{userId}")]
        public async Task<IActionResult> GetProfile(int userId)
        {
            var profile = await _context.UserProfiles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (profile == null)
                return NotFound();

            return Ok(profile);
        }

        // ---------------- Update Profile ----------------
        [Authorize] 
        [HttpPut("profile/{userId}")]
        public async Task<IActionResult> UpdateProfile(int userId, ProfileUpdateDto dto)
        {
            var profile = await _context.UserProfiles
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (profile == null)
                return NotFound();

            profile.FullName = dto.FullName;
            profile.BirthDate = dto.BirthDate;
            profile.City = dto.City;
            profile.University = dto.University;
            profile.LinkedInUrl = dto.LinkedInUrl;

            await _context.SaveChangesAsync();

            return Ok("Profile updated.");
        }
    }
}
