using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerClub.NotificationUtility
{
    public class clsNotification
    {
        public string title { get; set; }
        public string body { get; set; }
        public string color { get; set; }
        public string sound { get; set; }
        public string tag { get; set; }
        public string android_channel_id { get; set; }
    }
}