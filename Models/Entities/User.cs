using System.Security.Cryptography;
using System.Text;

namespace switchers_platform.Models.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        // Role
        public int RoleId { get; set; }
        public Role Role { get; set; }

        // Access code for Mentor/Admin
        public string? AccessCode { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Profile
        public UserProfile Profile { get; set; }
    }

    public static class PasswordHasher
    {
        public static string Hash(string password)
        {
            using var sha = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha.ComputeHash(bytes);
            return Convert.ToHexString(hash);
        }
    }
}
