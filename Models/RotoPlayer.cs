using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models
{
    [Table("ROTO_PLAYER")]
    public class RotoPlayer
    {
        [Key]
        public string PlayerKey { get; set; }

        public string Name { get; set; }

        public string JsonString { get; set; }
    }
}
