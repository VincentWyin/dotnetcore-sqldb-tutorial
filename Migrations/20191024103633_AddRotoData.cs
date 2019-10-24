using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DotNetCoreSqlDb.Migrations
{
    public partial class AddRotoData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ROTO_NEWS",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NewsKey = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false),
                    Player = table.Column<string>(nullable: true),
                    JsonString = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROTO_NEWS", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ROTO_PLAYER",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PlayerKey = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    JsonString = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROTO_PLAYER", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ROTO_NEWS");

            migrationBuilder.DropTable(
                name: "ROTO_PLAYER");
        }
    }
}
