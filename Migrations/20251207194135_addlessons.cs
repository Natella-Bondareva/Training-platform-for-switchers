using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace switchers_platform.Migrations
{
    /// <inheritdoc />
    public partial class addlessons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Content",
                table: "Lessons");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Lessons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.AddColumn<string>(
                name: "TestUrl",
                table: "Lessons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Lessons",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "TaskDescription",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "TaskFileUrl",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "TestUrl",
                table: "Lessons");

            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Lessons");

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "Lessons",
                type: "TEXT",
                nullable: true);
        }
    }
}
