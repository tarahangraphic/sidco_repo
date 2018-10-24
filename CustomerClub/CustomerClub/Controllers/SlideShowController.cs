using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class SlideShowController : Controller
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
        public ActionResult ShowSlideShow()
        {
            var _listslideshow = _context.tblSlideShow.Where(p => p.StateDelete == false).Select(p => new { p.Id, p.IdSort, p.Text, p.Image }).OrderBy(p => p.IdSort).ToList();
            return Json(_listslideshow,JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeletSlideShow(int? id)
        {
            var _slideshow = _context.tblSlideShow.Find(id);
            _slideshow.StateDelete = true;
            _slideshow.IdUser_Delete = 1;
            _slideshow.Date_Delete = DateTime.Now;
            var _path = Path.Combine(Server.MapPath("~/img/slideshow"),_slideshow.Image);
            if (System.IO.File.Exists(_path))
            {
                System.IO.File.Delete(_path);
            }
            _context.SaveChanges();
            return Json(_slideshow, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterSlideShow(tblSlideShow _slideshow, HttpPostedFileBase ImgFile)
        {
           
                var _maxsort = 0;
                var _idsort = _context.tblSlideShow.Select(p => p.IdSort).ToList();
                for (int i = 1; i <= _idsort.Count; i++)
                {
                    _maxsort = i;
                }
                if (_slideshow.Id == 0)
                {
                var teadad = _context.tblSlideShow.Select(p => p.Id).Count();

                if (teadad > 9)
                {
                    return new HttpStatusCodeResult(534);
                }
                _slideshow.IdSort = _maxsort + 1;
                    _slideshow.IdUser_Insert = 1;
                    _slideshow.Date_Insert = DateTime.Now;
                    _slideshow.StateDelete = false;
                    _context.tblSlideShow.Add(_slideshow);
                }
                else
                {
                    var _idsortcod = _context.tblSlideShow.Where(p => p.Id == _slideshow.Id).Select(p => p.IdSort).ToList();
                    _slideshow.IdSort = _idsortcod[0];
                    var slideshowpic = _context.tblSlideShow.Where(p => p.Id == _slideshow.Id).Select(p => p.Image).ToList();
                    _slideshow.Image = slideshowpic[0].ToString();
                    _slideshow.IdUser_Update = 1;
                    _slideshow.Date_Update = DateTime.Now;
                    _slideshow.StateDelete = false;
                    _context.Entry(_slideshow).State = System.Data.Entity.EntityState.Modified;
                }

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    if (_slideshow.Id != 0)
                    {
                        var _slideshowuspic = _context.tblSlideShow.Where(p => p.Id == _slideshow.Id).Select(p => p.Image).ToList();
                        var oldfilename = Path.GetFileName(_slideshowuspic[0].ToString());
                        var _path = Path.Combine(Server.MapPath("~/img/slideshow"), oldfilename);
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
                    var path = Path.Combine(Server.MapPath("~/img/slideshow"), filename);
                    _slideshow.Image = filename;
                    ImgFile.SaveAs(path);
                }
                _context.SaveChanges();
                return Json(_slideshow, JsonRequestBehavior.AllowGet);
            


        }

        [HttpPost]
        public ActionResult SortupSlideShow(int? id)
        {
            var _slideshow = _context.tblSlideShow.Find(id);

            var _listsortcod = _context.tblSlideShow.Where(p => p.Id == id&&p.StateDelete==false).Select(p => p.IdSort).ToList();

            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortslideshow = _context.tblSlideShow.SingleOrDefault(p => p.IdSort == cod);
                _listsortslideshow.IdSort = cod + 1;
                _slideshow.IdSort = cod;
            }
            _context.SaveChanges();
            return Json(_slideshow, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SortDownSlideShow(int? id)
        {
            var _maxsort = 0;
            var _slideshow = _context.tblSlideShow.Find(id);
            var _listsortcod = _context.tblSlideShow.Where(p => p.Id == id&&p.StateDelete==false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblSlideShow.Where(p=>p.StateDelete==false).Select(p => p.IdSort).ToList();
            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }

            if (_sortcode + 1 > _maxsort)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode + 1;
                var _listsortslideshow = _context.tblSlideShow.SingleOrDefault(p => p.IdSort == cod);
                _listsortslideshow.IdSort = cod - 1;
                _slideshow.IdSort = cod;
            }
            _context.SaveChanges();
            return Json(_slideshow, JsonRequestBehavior.AllowGet);
        }
    }
}