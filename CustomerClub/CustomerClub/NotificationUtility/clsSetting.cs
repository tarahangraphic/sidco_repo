using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerClub.NotificationUtility
{
    public class clsSetting
    {
        public static string PUSHER_URL = "https://b49a1d8a-a56e-4404-90a0-6b03e4b86c28.pushnotifications.pusher.com/publish_api/v1/instances/b49a1d8a-a56e-4404-90a0-6b03e4b86c28/publishes";
        public static string PUSHER_SECRET_KEY = "41B59EF9E2BF110FF3C01D5F1FC21B4";
        public static string PUSHER_HEADER_KEY1 = "Content-Type"; 
        public static string PUSHER_HEADER_VALUE1 = "application/json";
        public static string PUSHER_HEADER_KEY2 = "Authorization";
    }
}