using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.ViewModel
{
    public class RotoNewsData
    {
        public string type { get; set; }

        public string id { get; set; }

        public NewsAttribute attributes { get; set; }

        public Relationship relationships { get; set; }

        public LinkDetail links { get; set; }
    }
}
