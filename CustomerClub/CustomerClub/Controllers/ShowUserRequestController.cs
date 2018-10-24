using CustomerClub.Models;
using CustomerClub.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class ShowUserRequestController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();

        public ActionResult Index()
        {
            string Username = "";
            try
            {
                Username = Session["Username"].ToString();
                if (Username == "")
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception ee)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }
    }
}