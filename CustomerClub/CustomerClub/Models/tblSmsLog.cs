//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CustomerClub.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblSmsLog
    {
        public long Id { get; set; }
        public string Code { get; set; }
        public string Mobile { get; set; }
        public Nullable<System.DateTime> C_Date { get; set; }
        public string State { get; set; }
        public string Text { get; set; }
    }
}