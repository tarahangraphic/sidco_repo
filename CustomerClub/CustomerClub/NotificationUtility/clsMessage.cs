using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerClub.NotificationUtility
{
    public class clsMessage
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public string Image { get; set; }
        public long IdProduct { get; set; }
    }
}