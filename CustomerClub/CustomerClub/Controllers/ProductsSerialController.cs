using CustomerClub.Models;
using CustomerClub.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class ProductsSerialController : Controller
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

            List<string> listSerials = GenerateSerials(124, 3);
            return View();
        }

        [HttpGet]
        public ActionResult ShowPoductSerial()
        {
            var _listproductSerial = _context.tblProductsSerial.ToList().
                Where(p => p.StateDelete == false).
                Select(p => new
                {
                    p.Id,
                    DateProduce = clsPersianDate.MiladiToShamsi(p.DateProduce),
                    p.IdProduct,
                    p.Serial,
                    p.tblProduct.Name
                }).ToList();
            return Json(_listproductSerial, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult RegisterPoductSerial(tblProductsSerial _PoductSerial)
        {
            if (_PoductSerial.Id == 0)
            {
                _PoductSerial.StateDelete = false;
                _PoductSerial.Date_Insert = DateTime.Now;
                _PoductSerial.IdUser_Insert = 1;
                _context.tblProductsSerial.Add(_PoductSerial);
            }
            else
            {
                _PoductSerial.StateDelete = false;
                _PoductSerial.Date_Update = DateTime.Now;
                _PoductSerial.IdUser_Update = 1;
                _context.Entry(_PoductSerial).State = System.Data.Entity.EntityState.Modified;
            }
            return Json(_PoductSerial, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeletePoductSerial(int? id)
        {
            var _PoductSerial = _context.tblProductsSerial.Find(id);
            _PoductSerial.StateDelete = true;
            _PoductSerial.Date_Delete = DateTime.Now;
            _PoductSerial.IdUser_Delete = 1;
            return Json(_PoductSerial, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ShowProduct()
        {
            var _Productlist = _context.tblProduct.Where(p => p.StateDelete == false).Select(p => new { p.Id, Display = p.Name }).ToList();
            return Json(_Productlist, JsonRequestBehavior.AllowGet);
        }

        public List<string> GenerateSerials(long IdProduct , long Count)
        {
            List<string> listSerials = new List<string>();
            Random random = new Random();
            for (int i = 0; i < Count; i++)
            {
                string idproduct = IdProduct.ToString();
                Guid mySerialNumber = Guid.NewGuid();
                string date = TimeSpan.FromTicks(DateTime.Now.Ticks).ToString().Trim();
                date = Regex.Replace(date, "[^0-9]", "");
                string randomnumber = random.Next(999999999).ToString();
                string serial = idproduct + randomnumber + date;
                listSerials.Add(serial.Substring(0 , 20));
            }
            return listSerials;
        }
    }
}