using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class CustomerController : Controller
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
        [HttpGet]
        public ActionResult ShowCustomer()
        {
            var _listCustomer = _context.tblCustomer.Where(p=>p.StateDelete==false).Select(p => new { p.Id, p.Text, p.Url }).ToList();
            return Json(_listCustomer, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult deleteCustomer(int? id)
        {
            var _customer = _context.tblCustomer.Find(id);
            _customer.Date_Delete = DateTime.Now;
            _customer.StateDelete = true;
            _customer.IdUser_Delete = 1;
            var _path = Path.Combine(Server.MapPath("~/img/customers"), _customer.Url);
            if (System.IO.File.Exists(_path))
            {
                System.IO.File.Delete(_path);
            }
            _context.SaveChanges();
            return Json(_customer, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult registercustomer(tblCustomer _customer, HttpPostedFileBase ImgFile)
        {
            
            if (_customer.Id == 0)
            {
                _customer.IdUser_Insert = 1;
                _customer.Date_Insert = DateTime.Now;
                _customer.StateDelete = false;
                _context.tblCustomer.Add(_customer);
            }
            else
            {
                var customerpic = _context.tblCustomer.Where(p => p.Id == _customer.Id).Select(p => p.Url).ToList();
                _customer.Url = customerpic[0].ToString();
                _customer.IdUser_Update = 1;
                _customer.Date_Update = DateTime.Now;
                _customer.StateDelete = false;
                _context.Entry(_customer).State = System.Data.Entity.EntityState.Modified;
            }

            for (int i = 0; i < Request.Files.Count; i++)
            {
                var randomnumber = new Random();
                ImgFile = Request.Files[i];
                if (!ImgFile.ContentType.Contains("image"))
                {
                    return new HttpStatusCodeResult(560);
                }
                

                if (_customer.Id!=0)
                {
                    var _customeruspic = _context.tblCustomer.Where(p => p.Id == _customer.Id).Select(p => p.Url).ToList();
                    var oldfilename = Path.GetFileName(_customeruspic[0].ToString());
                    var _path = Path.Combine(Server.MapPath("~/img/customers"), oldfilename);
                    if (System.IO.File.Exists(_path))
                    {
                        System.IO.File.Delete(_path);
                    }
                }
                var filename = randomnumber.Next(999, 999999999).ToString() + ImgFile.FileName;
                var path = Path.Combine(Server.MapPath("~/img/customers"), filename);
                _customer.Url = filename;
                ImgFile.SaveAs(path);
            }
            _context.SaveChanges();
            return Json(_customer, JsonRequestBehavior.AllowGet);
        
    }
    }
}