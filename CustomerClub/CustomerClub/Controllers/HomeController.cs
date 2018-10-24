using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class HomeController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();

        public ActionResult Index()
        {
            string Username = "";
            try
            {
                Username = Session["Username"].ToString();
                tblAdmin admin = _context.tblAdmin.First(p => p.Username == Username);
                ViewBag.Username = admin.Name;
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

        [HttpPost]
        public ActionResult Stats()
        {
            mResultStats _result = new mResultStats();
            _result.StatsCount = _StatsCount();
            _result.StatsUser = _StatsUser();
            _result.StatsOrder = _StatsOrder();
            _result.StatsClub = _StatsClub();
            _result.StatsProductVerify = _StatsProductVerify();
            _result.StatsSuggestion = _StatsSuggestion();
            _result.StatsNotify = _StatsNotify();

            return Json(_result, JsonRequestBehavior.AllowGet);
        }

        public int[] _StatsUser()
        {
            int[] _result = new int[7];
            var list = from u in _context.tblUser
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            foreach (var item in list)
            {
                if (item.Sex == false)
                {
                    _result[1] = _result[1] + 1;
                }
                else
                {
                    _result[2] = _result[2] + 1;
                }

                if (item.IdUserType == 1)
                {
                    _result[3] = _result[3] + 1;
                }
                else if (item.IdUserType == 2)
                {
                    _result[4] = _result[4] + 1;
                }
                else
                {
                    _result[5] = _result[5] + 1;
                }

                if (item.StateRegister == 2)
                {
                    _result[6] = _result[6] + 1;
                }
            }
            return _result;
        }

        public int[] _StatsCount()
        {
            int[] _result = new int[7];
            var _c0 = _context.tblOrder.Where(p => p.IdOrderState == 1 && p.StateDelete == false).Count();
            var _c1 = _context.tblUserRegisterProduct.Where(p => p.StateBreakDown == true && p.StateDelete == false).Count();
            var _c2 = _context.tblSuggestion.Where(p => p.StateDelete == false && p.IdState == 1 || p.IdState == 2).Count();
            var _c3 = _context.tblUser.Where(p => p.StateDelete == false && p.StateRegister == 2).Count();
            var _c4 = _context.tblSmsLog.Select(p => p.Mobile).Distinct().Count();
            var _c5 = _context.tblUserGift.Where(p => p.StateDelete == false && p.IdUserGiftState == 1).Count();
            var _c6 = _context.tblUserRegisterProduct.Where(p => p.StateDelete == false).Count();
            _result[0] = _c0;
            _result[1] = _c1;
            _result[2] = _c2;
            _result[3] = _c3;
            _result[4] = _c4;
            _result[5] = _c5;
            _result[6] = _c6;
            return _result;
        }

        public int[] _StatsOrder()
        {
            int[] _result = new int[4];
            var list = from u in _context.tblOrder
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            foreach (var item in list)
            {
                if (item.IdOrderState == 1)
                {
                    _result[1] = _result[1] + 1;
                }
                else if (item.IdOrderState == 2)
                {
                    _result[2] = _result[2] + 1;
                }
                else if (item.IdOrderState == 3)
                {
                    _result[3] = _result[3] + 1;
                }
            }
            return _result;
        }

        public int[] _StatsClub()
        {
            int[] _result = new int[5];
            var list = from u in _context.tblUserGift
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            foreach (var item in list)
            {
                if (item.IdUserGiftState == 1)
                {
                    _result[1] = _result[1] + 1;
                }
                else if (item.IdUserGiftState == 2)
                {
                    _result[2] = _result[2] + 1;
                }
                else if (item.IdUserGiftState == 3)
                {
                    _result[3] = _result[3] + 1;
                }
                else if (item.IdUserGiftState == 4)
                {
                    _result[4] = _result[4] + 1;
                }
            }
            return _result;
        }

        public int[] _StatsProductVerify()
        {
            int[] _result = new int[4];
            var list = from u in _context.tblSerialInputLog
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            foreach (var item in list)
            {
                if (item.State == 1)
                {
                    _result[1] = _result[1] + 1;
                }
                else if (item.State == 0)
                {
                    _result[2] = _result[2] + 1;
                }
            }

            var list_breakdown = _context.tblUserRegisterProduct.Where(p => p.StateDelete == false && p.StateBreakDown == true).Select(p => p.Id);
            _result[3] = list_breakdown.Count();
            return _result;
        }

        public int[] _StatsSuggestion()
        {
            int[] _result = new int[4];
            var list = from u in _context.tblSuggestion
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            foreach (var item in list)
            {
                if (item.IdState == 1)
                {
                    _result[1] = _result[1] + 1;
                }
                else if (item.IdState == 2)
                {
                    _result[2] = _result[2] + 1;
                }
                else if (item.IdState == 3)
                {
                    _result[3] = _result[3] + 1;
                }
            }
            return _result;
        }

        public int[] _StatsNotify()
        {
            int[] _result = new int[3];
            var list = from u in _context.tblNotification
                       where u.StateDelete == false
                       select u;
            _result[0] = list.Count();
            try
            {
                foreach (var item in list)
                {
                    if (item.Recievers.Contains("public"))
                    {
                        _result[1] = _result[1] + 1;
                    }
                    if (item.Recievers.Contains("id"))
                    {
                        _result[2] = _result[2] + 1;
                    }
                }
            }
            catch (Exception)
            {
            }
            return _result;
        }
    }

    public class mResultStats
    {
        public int[] StatsCount;
        public int[] StatsUser;
        public int[] StatsOrder;
        public int[] StatsClub;
        public int[] StatsProductVerify;
        public int[] StatsSuggestion;
        public int[] StatsNotify;
    }
}