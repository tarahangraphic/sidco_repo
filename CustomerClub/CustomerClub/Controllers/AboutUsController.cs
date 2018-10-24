using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class AboutUsController : Controller
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
        public ActionResult ReadFile()
        {
            var _path =Server.MapPath("~/Files/aboutus.txt");
            if (!System.IO.File.Exists(_path))
            {
              return new HttpStatusCodeResult(404);
            }
            var fileContents = System.IO.File.ReadAllText(_path);
            return Json(fileContents, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]

        public ActionResult savefile(string str)
        {
            str = "<p>" + str
         .Replace(Environment.NewLine + Environment.NewLine, "</p><p>")
         .Replace(Environment.NewLine, "<br />")
         .Replace("</p><p>", "</p>" + Environment.NewLine + "<p>") + "</p>";
            string path = Server.MapPath("~/Files/aboutus.txt");
            using (StreamWriter sw = System.IO.File.CreateText(path))
            {
                sw.WriteLine(str);
            }
            return Json(path,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowAboutUs()
        {
            var _list = _context.tblAboutUs.Where(p => p.IdParent == 0&&p.StateDelete==false).Select(p=>new {p.Id,p.IdParent,p.Name,p.Image}).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteAboutUs(int? id)
        {
            var _aboutus = _context.tblAboutUs.Find(id);
            var _aboutpic = _context.tblAboutUs.Where(p => p.Id == id).Select(p => p.Image).ToList();
            if (_aboutpic[0] != null)
            {
                var oldfilename = Path.GetFileName(_aboutpic[0].ToString());
                var _path = Path.Combine(Server.MapPath("~/img/aboutus"), oldfilename);

                if (System.IO.File.Exists(_path))
                {
                    System.IO.File.Delete(_path);
                }
            }
            _aboutus.StateDelete = true;
            _aboutus.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            return Json(_aboutus, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterAboutUs(tblAboutUs _aboutus)
        {
            if (_aboutus.Id==0)
            {
                _aboutus.IdParent = 0;
                _aboutus.Date_Insert = DateTime.Now;
                _aboutus.StateDelete = false;
                _context.tblAboutUs.Add(_aboutus);
            }
            else
            {
                _aboutus.IdParent = 0;
                _aboutus.Date_Update = DateTime.Now;
                _aboutus.StateDelete = false;
                _context.Entry(_aboutus).State = System.Data.Entity.EntityState.Modified;
            }
            _context.SaveChanges();
            return Json(_aboutus,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult grouplist(tblAboutUs _aboutus)
        {
            var _listgroup = _context.tblAboutUs.Where(p=> _aboutus.Id == p.IdParent && p.StateDelete==false).Select(p=> new {p.Id,p.IdParent,p.Name,p.Text,p.Image}).ToList();
            if (_listgroup.Count==0)
            {
                return null;
            }
            else
            {

            return Json(_listgroup,JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult RegistergroupAboutUs(tblAboutUs _aboutus,HttpPostedFileBase ImgFile)
        {
            if (_aboutus.Id == 0)
            {
                _aboutus.Date_Insert = DateTime.Now;
                _aboutus.StateDelete = false;
                _context.tblAboutUs.Add(_aboutus);
            }
            else
            {
                _aboutus.Date_Update = DateTime.Now;
                _aboutus.StateDelete = false;
                var _aboutuspic = _context.tblAboutUs.Where(p => p.Id == _aboutus.Id).Select(p => p.Image).ToList();
                _aboutus.Image = _aboutuspic[0].ToString();
                _context.Entry(_aboutus).State = System.Data.Entity.EntityState.Modified;
            }

                for (int i = 0; i < Request.Files.Count; i++)
                {
                var randomnumber = new Random();
                    ImgFile = Request.Files[i];
                if (!ImgFile.ContentType.Contains("image"))
                {
                    return new HttpStatusCodeResult(560);
                }
                if (_aboutus.Id != 0)
                {
                    var _aboutpic = _context.tblAboutUs.Where(p => p.Id == _aboutus.Id).Select(p => p.Image).ToList();
                    var oldfilename = Path.GetFileName(_aboutpic[0].ToString());
                    var _path = Path.Combine(Server.MapPath("~/img/aboutus"), oldfilename);
                    if (System.IO.File.Exists(_path))
                    {
                        System.IO.File.Delete(_path);
                    }
                }
                var filename = randomnumber.Next(999 , 999999999).ToString() +ImgFile.FileName;
                    var path = Path.Combine(Server.MapPath("~/img/aboutus"), filename);
                    ImgFile.SaveAs(path);
                _aboutus.Image = filename;
                }
             _context.SaveChanges();
            return Json(_aboutus, JsonRequestBehavior.AllowGet);
            }
    }
}