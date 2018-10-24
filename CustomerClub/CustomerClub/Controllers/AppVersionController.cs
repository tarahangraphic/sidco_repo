using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class AppVersionController : Controller
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

            var listappversion = _context.tblAppVersion.Select(p => new { p.Id, p.ReleaseDate, p.VersionName, p.VersionCode, p.Url }).ToList();

            return View();
        }
        [HttpGet]
        public ActionResult ShowAppVersion()
        {
            var listappversion = _context.tblAppVersion.Select(p=>new { p.Id,p.ReleaseDate,p.VersionName,p.VersionCode,p.Url}).ToList();

            return Json(listappversion,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterAppVersion(tblAppVersion _appversio, HttpPostedFileBase _file)
        {
            var filename ="";
            if (Request.Files.Count != 0)
            {
                //var randomnumber = new Random();
                //_file = Request.Files[i];
                _file = Request.Files[0];
                if (!_file.ContentType.Contains("application"))
                {
                    return new HttpStatusCodeResult(560);
                }
            }
            if (_appversio.Id==0)
            {
                _appversio.Url ="/App/"+filename+".zip";
                _appversio.ReleaseDate = DateTime.Now;
                _context.tblAppVersion.Add(_appversio);
            }
            else
            {
                _appversio.Url = "/App/" + filename + ".zip";
                _appversio.ReleaseDate = DateTime.Now;
                _context.Entry(_appversio).State = System.Data.Entity.EntityState.Modified;
            }
            if (_file != null)
            {
                filename =_file.FileName;
                var _filename = filename.Split(Convert.ToChar("."));
                var _path2= Path.Combine(Server.MapPath("~/App/"), _filename[0] + ".apk");
                var _path1 = Path.Combine(Server.MapPath("~/App/"), _filename[0] + ".zip");
                _appversio.Url = "/App/"+ _filename[0]+".zip";
                _file.SaveAs(_path1);
                _file.SaveAs(_path2);

            }
            _context.SaveChanges();
            return RedirectToAction("../AppVersion/Index");
        }
    }
}