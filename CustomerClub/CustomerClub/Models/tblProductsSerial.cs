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
    
    public partial class tblProductsSerial
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblProductsSerial()
        {
            this.tblUserRegisterProduct = new HashSet<tblUserRegisterProduct>();
        }
    
        public long Id { get; set; }
        public Nullable<long> IdProduct { get; set; }
        public string Serial { get; set; }
        public Nullable<System.DateTime> DateProduce { get; set; }
        public Nullable<System.DateTime> Date_Insert { get; set; }
        public Nullable<long> IdUser_Insert { get; set; }
        public Nullable<System.DateTime> Date_Update { get; set; }
        public Nullable<long> IdUser_Update { get; set; }
        public Nullable<System.DateTime> Date_Delete { get; set; }
        public Nullable<long> IdUser_Delete { get; set; }
        public Nullable<bool> StateDelete { get; set; }
    
        public virtual tblProduct tblProduct { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblUserRegisterProduct> tblUserRegisterProduct { get; set; }
    }
}
