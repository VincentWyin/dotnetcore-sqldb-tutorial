﻿// <auto-generated />
using System;
using DotNetCoreSqlDb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DotNetCoreSqlDb.Migrations
{
    [DbContext(typeof(MyDatabaseContext))]
    [Migration("20191024103633_AddRotoData")]
    partial class AddRotoData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("DotNetCoreSqlDb.Models.RotoNews", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateTime");

                    b.Property<string>("Detail");

                    b.Property<string>("JsonString");

                    b.Property<string>("NewsKey");

                    b.Property<string>("Player");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.ToTable("ROTO_NEWS");
                });

            modelBuilder.Entity("DotNetCoreSqlDb.Models.RotoPlayer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("JsonString");

                    b.Property<string>("Name");

                    b.Property<string>("PlayerKey");

                    b.HasKey("Id");

                    b.ToTable("ROTO_PLAYER");
                });

            modelBuilder.Entity("DotNetCoreSqlDb.Models.Todo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Description");

                    b.HasKey("ID");

                    b.ToTable("Todo");
                });
#pragma warning restore 612, 618
        }
    }
}