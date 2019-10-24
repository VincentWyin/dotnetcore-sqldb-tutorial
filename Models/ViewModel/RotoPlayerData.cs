using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.ViewModel
{
    public class RotoPlayerData
    {
        public string type { get; set; }

        public string id { get; set; }

        public PlayerAttribute attributes { get; set; }
    }
}
