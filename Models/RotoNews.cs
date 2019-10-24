using DotNetCoreSqlDb.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models
{
    [Table("ROTO_NEWS")]
    public class RotoNews
    {
        [Key]
        public int Id { get; set; }

        public string NewsKey { get; set; }

        public string Title { get; set; }

        public string Detail { get; set; }

        public DateTime DateTime { get; set; }

        public string Player { get; set; }

        public string JsonString { get; set; }

        [NotMapped]
        public NewsAttribute NewsAttribute { get; set; }
    }
}
