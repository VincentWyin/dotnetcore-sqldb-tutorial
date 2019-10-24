using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace DotNetCoreSqlDb.Migrations
{
    public partial class UpdateEntityKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "ROTO_NEWS");
            migrationBuilder.DropTable(name: "ROTO_PLAYER");

            migrationBuilder.CreateTable(
                name: "ROTO_NEWS",
                columns: table => new
                {
                    NewsKey = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(nullable: true),
                    DateTime = table.Column<DateTime>(nullable: false),
                    Player = table.Column<string>(nullable: true),
                    JsonString = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROTO_NEWS", x => x.NewsKey);
                });

            migrationBuilder.CreateTable(
                name: "ROTO_PLAYER",
                columns: table => new
                {
                    PlayerKey = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    JsonString = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ROTO_PLAYER", x => x.PlayerKey);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
