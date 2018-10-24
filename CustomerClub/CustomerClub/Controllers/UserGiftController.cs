using CustomerClub.Models;
using CustomerClub.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomerClub.Controllers
{
    public class UserGiftController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();

        public ActionResult Index(int? id)
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

            var listusergift = _context.tblUserGift.Where(p => p.StateDelete == false
            &&p.IdUser==id).ToList().Select(p =>
                  new
                  {
                      p.Id,
                      p.IdAgent_User,
                      p.IdGift,
                      p.IdGiftSendWay,
                      p.IdUser,
                      p.IdUserGiftState,
                      p.MinPoint,
                      Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                      p.tblGift.Image,
                      UserName= p.tblUser.Fname+" "+p.tblUser.Lname,
                      GiftStateName=p.tblUserGiftState.Name,
                      GiftName = p.tblGift.Title,
                      GiftSendWayName = p.tblGiftSendWay.Name
                  }).ToList();

            var nulllistusergift= _context.tblUser.Where(p => p.StateDelete == false &&
               p.Id == id).Select(p => new
               {
                   IdUser = p.Id,
                   GiftName="",
                   GiftSendWayName="",
                   GiftStateName="",
                   Date_Insert="",
                   MinPoint="",
                   UserName = p.Fname + " " + p.Lname
               }).ToList();

            var listuser = _context.tblUser.Where(p => p.StateDelete == false &&
              p.Id == id).Select(p => new
              {
                  p.Id,
                  p.Fname,
                  p.Lname,
                  FullName = p.Fname + " " + p.Lname
              }).ToList();
            var listgift = _context.tblGift.Where(p => p.StateDelete == false).
                Select(p => new
                {
                    p.Id,
                    Display = p.Title
                }).ToList();
            var _listgiftsendway = _context.tblGiftSendWay.Where(p => p.StateDelete == false).
                Select(p => new { p.Id, Display = p.Name }).ToList();

            JavaScriptSerializer js = new JavaScriptSerializer();
            if (listusergift.Count==0)
            {
                ViewBag.listusergift = js.Serialize(nulllistusergift); 
            }
            else
            {

            ViewBag.listusergift = js.Serialize(listusergift);
            }
            ViewBag._listgiftsendway = js.Serialize(_listgiftsendway);
            ViewBag.listuser = js.Serialize(listuser);
            ViewBag.listgift = js.Serialize(listgift);

            return View();
        }
       
        [HttpPost]
        public ActionResult ConfirmUserGift(int? id)
        {
            var usergift = _context.tblUserGift.Find(id);
            usergift.IdUserGiftState = 2;
            _context.SaveChanges();

            var listusergift = _context.tblUserGift.Where(p => p.StateDelete == false
            && p.IdUser == usergift.IdUser).ToList().Select(p =>
                     new
                     {
                         p.Id,
                         p.IdAgent_User,
                         p.IdGift,
                         p.IdGiftSendWay,
                         p.IdUser,
                         p.IdUserGiftState,
                         p.MinPoint,
                         Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                         p.tblGift.Image,
                         UserName = p.tblUser.Fname + " " + p.tblUser.Lname,
                         GiftStateName = p.tblUserGiftState.Name,
                         GiftName = p.tblGift.Title,
                         GiftSendWayName = p.tblGiftSendWay.Name
                     }).ToList();

            return Json(listusergift, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SendUserGift(int? id)
        {
            var usergift = _context.tblUserGift.Find(id);
            usergift.IdUserGiftState = 4;
            _context.SaveChanges();
            var listusergift = _context.tblUserGift.Where(p => p.StateDelete == false
            && p.IdUser == usergift.IdUser).ToList().Select(p =>
                     new
                     {
                         p.Id,
                         p.IdAgent_User,
                         p.IdGift,
                         p.IdGiftSendWay,
                         p.IdUser,
                         p.IdUserGiftState,
                         p.MinPoint,
                         Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                         p.tblGift.Image,
                         UserName = p.tblUser.Fname + " " + p.tblUser.Lname,
                         GiftStateName = p.tblUserGiftState.Name,
                         GiftName = p.tblGift.Title,
                         GiftSendWayName = p.tblGiftSendWay.Name
                     }).ToList();

            return Json(listusergift, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult NotConfirmUserGift(int? id)
        {
            var usergift = _context.tblUserGift.Find(id);
            usergift.IdUserGiftState = 3;
            _context.SaveChanges();
            var listusergift = _context.tblUserGift.Where(p => p.StateDelete == false
            && p.IdUser == usergift.IdUser).ToList().Select(p =>
                     new
                     {
                         p.Id,
                         p.IdAgent_User,
                         p.IdGift,
                         p.IdGiftSendWay,
                         p.IdUser,
                         p.IdUserGiftState,
                         p.MinPoint,
                         Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                         p.tblGift.Image,
                         UserName = p.tblUser.Fname + " " + p.tblUser.Lname,
                         GiftStateName = p.tblUserGiftState.Name,
                         GiftName = p.tblGift.Title,
                         GiftSendWayName = p.tblGiftSendWay.Name
                     }).ToList();

            return Json(listusergift, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult USerGiftSendAway(tblUserGift _usergift)
        {
            var idgiftsendway = _context.tblUserGift.Find(_usergift.Id);
            idgiftsendway.IdGiftSendWay = _usergift.IdGiftSendWay;
            _context.SaveChanges();
            var listusergift = _context.tblUserGift.Where(p => p.StateDelete == false
            && p.IdUser == idgiftsendway.IdUser).ToList().Select(p =>
                     new
                     {
                         p.Id,
                         p.IdAgent_User,
                         p.IdGift,
                         p.IdGiftSendWay,
                         p.IdUser,
                         p.IdUserGiftState,
                         p.MinPoint,
                         Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                         p.tblGift.Image,
                         UserName = p.tblUser.Fname + " " + p.tblUser.Lname,
                         GiftStateName = p.tblUserGiftState.Name,
                         GiftName = p.tblGift.Title,
                         GiftSendWayName = p.tblGiftSendWay.Name
                     }).ToList();

            return Json(listusergift,JsonRequestBehavior.AllowGet);
        }
    }
}