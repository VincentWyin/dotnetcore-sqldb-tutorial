using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DotNetCoreSqlDb.Models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext (DbContextOptions<MyDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<Todo> Todo { get; set; }

        public DbSet<RotoNews> RotoNewsList { get; set; }

        public DbSet<RotoPlayer> RotoPlayerList { get; set; }
    }
}
