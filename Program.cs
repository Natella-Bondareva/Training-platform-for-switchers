using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using switchers_platform.Data;
using switchers_platform.Models.Entities;
using switchers_platform.Services;
using System.Text;

namespace switchers_platform
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // ApplicationDbContext (!!! головне !!!)
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Controllers + JSON fix
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler =
                        System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });

            // CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
            });

            builder.Services.AddSingleton<TokenService>();
            builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
                        ),
                        ValidateLifetime = true
                    };
                });

            builder.Services.AddAuthorization();


            var app = builder.Build();

            app.UseCors("AllowAll");

            // Static files (для фронту)
            app.UseStaticFiles();

            app.MapControllers();

            app.UseAuthentication();
            app.UseAuthorization();

            app.Run();

        }
    }
}
