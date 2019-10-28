using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.API
{
    public class RotoNewsAPIModel
    {
        public string NewsKey { get; set; }

        public string Title { get; set; }

        public string Detail { get; set; }

        public DateTime DateTime { get; set; }

        public string Player { get; set; }

        public bool Injury { get; set; }

        public bool Transaction { get; set; }
    }
}
