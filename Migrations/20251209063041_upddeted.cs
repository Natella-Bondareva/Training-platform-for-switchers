using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace switchers_platform.Migrations
{
    /// <inheritdoc />
    public partial class upddeted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TaskDescription",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "TaskFileUrl",
                table: "Lessons");

            migrationBuilder.AddColumn<string>(
                name: "MentorId",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MentorId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Courses");

            migrationBuilder.AddColumn<string>(
                name: "TaskDescription",
                table: "Lessons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TaskFileUrl",
                table: "Lessons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
