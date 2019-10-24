using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCoreSqlDb.Models.ViewModel
{
    public class Relationship
    {
        public ReferenceDetail player { get; set; }

        public ReferenceDetail league { get; set; }

        public ReferenceDetail position { get; set; }

        public ReferenceDetail team { get; set; }
    }
}
