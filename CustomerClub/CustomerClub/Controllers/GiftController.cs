using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class GiftController : Controller
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
        public ActionResult ShowGift()
        {
            var _list = _context.tblGift.Where(p =>
              p.StateDelete == false).Select(p => new
              {
                  p.Id,
                  p.IdProduct,
                  p.IdSort,
                  p.MinPoint,
                  p.Name,
                  p.Title,
                  ProductName = p.tblProduct.Name,
                  p.Image
              }).OrderBy(p=>p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteGift(int? id)
        {
            var _list = _context.tblGift.Find(id);
            _list.StateDelete = true;
            _list.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            var _listgift = _context.tblGift.Where(p =>
             p.StateDelete == false).Select(p => new
             {
                 p.Id,
                 p.IdProduct,
                 p.IdSort,
                 p.MinPoint,
                 p.Name,
                 p.Title,
                 ProductName = p.tblProduct.Name,
                 p.Image
             }).OrderBy(p => p.IdSort).ToList();
            return Json(_listgift, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowProduct()
        {
            var _list = _context.tblProduct.Where(p => p.StateDelete == false && p.IdParent == 0).
                Select(p => new { p.Id, Display = p.Name }).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterGift(tblGift _gift)
        {
            var _maxsort = 0;
            var _idsort = _context.tblGift.Select(p => p.IdSort).ToList();

            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }
            if (_gift.Id==0)
            {
                _gift.IdSort = _maxsort + 1;
                _gift.Date_Insert = DateTime.Now;
                _gift.StateDelete = false;
                _context.tblGift.Add(_gift);
                _context.SaveChanges();
            }
            else
            {
                _gift.Date_Insert = null;
                var _image = _context.tblGift.Where(p => p.Id == _gift.Id).Select(p => p.Image).ToList();
                var _dateinsert = _context.tblGift.Where(p => p.Id == _gift.Id).Select(p => p.Date_Insert).ToList();
                var _idsortupdate = _context.tblGift.Where(p => p.Id == _gift.Id).Select(p => p.IdSort).ToList();
                _gift.Image = _image[0];
                _gift.Date_Insert = _dateinsert[0];
                _gift.Date_Update = DateTime.Now;
                _gift.StateDelete = false;
                _gift.IdSort = _idsortupdate[0];
                _context.Entry(_gift).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return Json(_gift, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SortUpGift(int? id)
        {
            var _gift = _context.tblGift.Find(id);

            var _listsortcod = _context.tblGift.Where(p => p.Id == id && p.StateDelete == false).Select(p => p.IdSort).ToList();

            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortgift = _context.tblGift.SingleOrDefault(p => p.IdSort == cod);
                _listsortgift.IdSort = cod + 1;
                _gift.IdSort = cod;
            }
            _context.SaveChanges();
            var _list = _context.tblGift.Where(p =>
             p.StateDelete == false).Select(p => new
             {
                 p.Id,
                 p.IdProduct,
                 p.IdSort,
                 p.MinPoint,
                 p.Name,
                 p.Title,
                 ProductName = p.tblProduct.Name,
                 p.Image
             }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult SortDownGift(int? id)
        {
            var _maxsort = 0;
            var _gift = _context.tblGift.Find(id);
            var _listsortcod = _context.tblGift.Where(p => p.Id == id && p.StateDelete == false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblGift.Where(p => p.StateDelete == false).Select(p => p.IdSort).ToList();
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
                var _listsortgift = _context.tblGift.SingleOrDefault(p => p.IdSort == cod);
                _listsortgift.IdSort = cod - 1;
                _gift.IdSort = cod;
            }
            _context.SaveChanges();
            var _list = _context.tblGift.Where(p =>
             p.StateDelete == false).Select(p => new
             {
                 p.Id,
                 p.IdProduct,
                 p.IdSort,
                 p.MinPoint,
                 p.Name,
                 p.Title,
                 ProductName = p.tblProduct.Name,
                 p.Image
             }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowProductList(int? id)
        {
            var _list = _context.tblProduct.Where(p => p.StateDelete == false && p.IdParent ==id).
               Select(p => new { p.Id, Display = p.Name }).ToList();
            if (_list.Count==0)
            {
                _list = _context.tblProduct.Where(p => p.StateDelete == false && p.IdParent !=0).
               Select(p => new { p.Id, Display = p.Name }).ToList();
            }
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
    }
}