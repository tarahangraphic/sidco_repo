using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System
{
    public class mProperty
    {
        public long Id { get; set; }
        public String Name { get; set; }
        public String Value { get; set; }

        public long? IdParent { get; set; }
        public bool? DeletePermission { get; set; }
        public bool? Checked { get; set; }

    }
}