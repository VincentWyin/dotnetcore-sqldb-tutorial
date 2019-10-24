using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.ViewModel
{
    public class NewsAttribute
    {
        public int id { get; set; }

        public string uuid { get; set; }

        public string created { get; set; }

        public string changed { get; set; }

        public string headline { get; set; }

        public NewsDetail analysis { get; set; }

        public string source { get; set; }

        public string source_url { get; set; }

        public string recap { get; set; }

        public string injury { get; set; }

        public string transaction { get; set; }

        public string rumor { get; set; }

        public string developmental { get; set; }

        public string sport_headline { get; set; }

        public string overall_headline { get; set; }

        public string metatag { get; set; }
    }
}
