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
    
    public partial class tblSerialInputLog
    {
        public long Id { get; set; }
        public Nullable<long> IdUser { get; set; }
        public string Serial { get; set; }
        public Nullable<long> IdProductsSerial { get; set; }
        public Nullable<int> State { get; set; }
        public Nullable<System.DateTime> Date_Insert { get; set; }
        public Nullable<long> IdUser_Insert { get; set; }
        public Nullable<System.DateTime> Date_Update { get; set; }
        public Nullable<long> IdUser_Update { get; set; }
        public Nullable<System.DateTime> Date_Delete { get; set; }
        public Nullable<long> IdUser_Delete { get; set; }
        public Nullable<bool> StateDelete { get; set; }
    }
}
