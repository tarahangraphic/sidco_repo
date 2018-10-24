using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerClub.NotificationUtility
{
    public class mNotificationFilters
    {
        public int filter_type { get; set; }

        public int filter_user_type { get; set; }

        public bool filter_gender { get; set; }

        public long filter_buy_product { get; set; }

        public long filter_user_car { get; set; }

        public string filter_user_birthday { get; set; }

        public string notify_title_1 { get; set; }
        public string notify_text_1 { get; set; }
        public string notify_title_2 { get; set; }
        public string notify_text_2 { get; set; }
        public string notify_image_url { get; set; }
        public long IdProduct { get; set; }
    }
}