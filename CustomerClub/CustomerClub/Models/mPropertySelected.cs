using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System
{
    public class mPropertySelected
    {
        public long IdProduct { get; set; }
        public ListProp[] ListProps { get; set; }

    }

    public class ListProp
    {
        public long Id { get; set; }
        public String Value { get; set; }
    }
}