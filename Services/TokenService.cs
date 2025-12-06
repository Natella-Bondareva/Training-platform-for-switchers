using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace switchers_platform.Services
{
    public class TokenService
    {
        private readonly string _secretKey;

        public TokenService(IConfiguration config)
        {
            _secretKey = config["Jwt:Key"]!;
        }

        public string GenerateToken(int userId, string email, string role)
        {
            var claims = new[]
            {
                new Claim("id", userId.ToString()),
                new Claim("email", email),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
