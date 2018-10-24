using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

namespace CustomerClub.Models
{
    public static class ExtensionFunction
    {
        public static String ToPersian(this DateTime dt)
        {
            PersianCalendar p = new PersianCalendar();
            int day = p.GetDayOfMonth(dt);
            int month = p.GetMonth(dt);
            int year = p.GetYear(dt);
            return year+"/"+month+"/"+day;
        }
        public static string ConvertToPersianToShow(this DateTime dt)
        {
            PersianCalendar persian_date = new PersianCalendar();

            string year = Convert.ToString(persian_date.GetYear(dt));
            string month = Convert.ToString(persian_date.GetMonth(dt));
            string day = Convert.ToString(persian_date.GetDayOfMonth(dt));

            if (month.Length == 1)
            {
                month = "0" + Convert.ToString(persian_date.GetMonth(dt));
            }
            if (day.Length == 1)
            {
                day = "0" + Convert.ToString(persian_date.GetDayOfMonth(dt));
            }
           return Convert.ToString(persian_date.GetMonth(dt)) + "/" + year + "/" + month + "/" + day + "(" + dt.Hour + ":" + dt.Minute + ")";
        }
    }
}