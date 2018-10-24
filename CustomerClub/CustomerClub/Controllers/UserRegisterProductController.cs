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
    public class UserRegisterProductController : Controller
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

            int? Total =0;
            var _listUserRegisterProduct = _context.tblUserRegisterProduct.ToList().
               Where(p => p.StateDelete == false && p.IdUser == id).
               Select(p => new
               {
                   p.Id,
                   DateRegister = clsPersianDate.MiladiToShamsi(p.DateRegister),
                   p.IdProductSerial,
                   p.tblProductsSerial.Serial,
                   p.IdUser,
                   UserName = p.tblUser.Fname + " " + p.tblUser.Lname,
                   p.Point,
                   p.StateBreakDown,
                   StateBreakDowns = p.StateBreakDown==true?"خراب":"سالم",
                   ProductName = p.tblProductsSerial.tblProduct.Name
               }).ToList();

            var _listpoint = _context.tblUserRegisterProduct.ToList().
               Where(p => p.StateDelete == false && p.IdUser == id).
               Select(p => p.Point).Sum();
            var _userGift = _context.tblUserGift.Where(p => p.IdUser == id).
                Where(p=>p.IdUserGiftState==4 || p.IdUserGiftState==2).
            Select(p => p.MinPoint).Sum();
            if (_userGift!=null)
            {
                Total=_listpoint - _userGift;
            }
            else
            {
                Total = _listpoint;
            }
         JavaScriptSerializer js = new JavaScriptSerializer();
            ViewBag.TotalPoint = js.Serialize(Total);
            ViewBag.listUserRegisterProduct = js.Serialize(_listUserRegisterProduct);
            return View();
        }
        [HttpPost]
        public ActionResult RegisterUserRegisterProduct(tblUserRegisterProduct _UserRegisterProduct)
        {
            if (_UserRegisterProduct.Id == 0)
            {
                _UserRegisterProduct.StateDelete = false;
                _UserRegisterProduct.Date_Insert = DateTime.Now;
                _UserRegisterProduct.IdUser_Insert = 1;
                _context.tblUserRegisterProduct.Add(_UserRegisterProduct);
            }
            else
            {
                _UserRegisterProduct.StateDelete = false;
                _UserRegisterProduct.Date_Update = DateTime.Now;
                _UserRegisterProduct.IdUser_Update = 1;
                _context.Entry(_UserRegisterProduct).State = System.Data.Entity.EntityState.Modified;
            }
            return Json(_UserRegisterProduct, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteUserRegisterProduct(int? id)
        {
            var _UserRegisterProduct = _context.tblUserRegisterProduct.Find(id);
            _UserRegisterProduct.StateDelete = true;
            _UserRegisterProduct.Date_Delete = DateTime.Now;
            _UserRegisterProduct.IdUser_Delete = 1;
            return Json(_UserRegisterProduct, JsonRequestBehavior.AllowGet);
        }
    }
}