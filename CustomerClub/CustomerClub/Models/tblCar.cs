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
    
    public partial class tblCar
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tblCar()
        {
            this.tblCarProduct = new HashSet<tblCarProduct>();
            this.tblUserCar = new HashSet<tblUserCar>();
        }
    
        public long Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public Nullable<long> IdParent { get; set; }
        public Nullable<long> IdSort { get; set; }
        public Nullable<System.DateTime> Date_Insert { get; set; }
        public Nullable<long> IdUser_Insert { get; set; }
        public Nullable<System.DateTime> Date_Update { get; set; }
        public Nullable<long> IdUser_Update { get; set; }
        public Nullable<System.DateTime> Date_Delete { get; set; }
        public Nullable<long> IdUser_Delete { get; set; }
        public Nullable<bool> StateDelete { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblCarProduct> tblCarProduct { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblUserCar> tblUserCar { get; set; }
    }
}
