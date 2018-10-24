using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class ServicesController : Controller
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
        public ActionResult ShowService()
        {
            var _listservices = _context.tblService.Where(p => p.StateDelete == false).Select(p => new { p.Id, p.Text, p.Description, p.Url }).ToList();
            return Json(_listservices,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteServices(int? id)
        {
            var _services = _context.tblService.Find(id);
            _services.Date_Delete = DateTime.Now;
            _services.StateDelete = true;
            _services.IdUser_Delete = 1;
            var _path = Path.Combine(Server.MapPath("~/img/services"), _services.Url);
            if (System.IO.File.Exists(_path))
            {
                System.IO.File.Delete(_path);
            }
            _context.SaveChanges();
            return Json(_services, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterServices(tblService _services, HttpPostedFileBase ImgFile)
        {
            if (_services.Id == 0)
            {
                var teadad = _context.tblService.Select(p => p.Id).Count();

                if (teadad > 9)
                {
                    return new HttpStatusCodeResult(534);
                }
                _services.IdUser_Insert = 1;
                _services.Date_Insert = DateTime.Now;
                _services.StateDelete = false;
                _context.tblService.Add(_services);
            }
            else
            {
                var servicespic = _context.tblService.Where(p => p.Id == _services.Id).Select(p => p.Url).ToList();
                _services.Url = servicespic[0].ToString();
                _services.IdUser_Update = 1;
                _services.Date_Update = DateTime.Now;
                _services.StateDelete = false;
                _context.Entry(_services).State = System.Data.Entity.EntityState.Modified;
            }

            for (int i = 0; i < Request.Files.Count; i++)
            {
                if (_services.Id != 0)
                {
                    var _servicespic = _context.tblService.Where(p => p.Id == _services.Id).Select(p => p.Url).ToList();
                    var oldfilename = Path.GetFileName(_servicespic[0].ToString());
                    var _path = Path.Combine(Server.MapPath("~/img/services"), oldfilename + "");
                    if (System.IO.File.Exists(_path))
                    {
                        System.IO.File.Delete(_path);
                    }
                }

                ImgFile = Request.Files[i];
                if (!ImgFile.ContentType.Contains("image"))
                {
                    return new HttpStatusCodeResult(560);
                }
                var randomnumber = new Random();

                var filename = randomnumber.Next(999, 999999999).ToString() + ImgFile.FileName;
                var path = Path.Combine(Server.MapPath("~/img/services"), filename);
                _services.Url = filename;
                ImgFile.SaveAs(path);
            }
            _context.SaveChanges();
            return Json(_services, JsonRequestBehavior.AllowGet);
        }
    }
}