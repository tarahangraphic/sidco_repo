using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class LoginController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult LoginAdmin(string Username, string Password, string Remember)
        {
            tblAdmin admin = null;
            try
            {
                admin = _context.tblAdmin.First(p => p.Username == Username);
                if (admin != null)
                {
                    if (admin.Password == Password)
                    {
                        Session["Username"] = Username;
                        return RedirectToAction("Index", "Home");
                    }
                    else
                    {
                        return RedirectToAction("Index", "Login");
                    }
                }
                else
                {
                    return RedirectToAction("Index", "Login");
                }
            }
            catch (Exception ee)
            {
                return RedirectToAction("Index", "Login");
            }
        }

        public ActionResult LogoutAdmin()
        {
            try
            {
                Session.RemoveAll();
                Session.Clear();
                return RedirectToAction("Index", "Login"); ;
            }
            catch(Exception)
            {
                return RedirectToAction("Index", "Login"); ;
            }
        }
    }
}