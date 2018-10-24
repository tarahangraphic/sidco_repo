using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class ProductSuggestionController : Controller
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
        public ActionResult ShowProductSuggestion()
        {
            var _listProductSuggestion = _context.tblProductSuggestion.
                Where(p => p.StateDelete == false).
                Select(p => new
                {
                    p.Id,
                    p.IdProduct,
                    p.IdSort,
                    p.tblProduct.Name
                }).OrderBy(p => p.IdSort).ToList();
            return Json(_listProductSuggestion, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterProductSuggestion(int? id)
        {
            var _productExist = _context.tblProductSuggestion.Where(p => p.IdProduct == id);
            if (_productExist.Count()==0)
            {
                tblProductSuggestion _ProductSuggestion = new tblProductSuggestion();
                var _maxsort = 0;
                var _idsort = _context.tblProductSuggestion.Where(p => p.StateDelete == false).Select(p => p.IdSort).ToList();

                for (int i = 1; i <= _idsort.Count; i++)
                {
                    _maxsort = i;
                }
                _ProductSuggestion.IdSort = _maxsort + 1;
                _ProductSuggestion.StateDelete = false;
                _ProductSuggestion.Date_Insert = DateTime.Now;
                _ProductSuggestion.IdUser_Insert = 1;
                _ProductSuggestion.IdProduct = id;
                _context.tblProductSuggestion.Add(_ProductSuggestion);
                _context.SaveChanges();
                return Json(_ProductSuggestion);
            }
            else
            {
                return RedirectToAction("/Index", "Product");
            }
        }
        [HttpPost]
        public ActionResult DeleteProductSuggestion(int? id)
        {
            var _ProductSuggestion = _context.tblProductSuggestion.Find(id);
            _ProductSuggestion.StateDelete = true;
            _ProductSuggestion.Date_Delete = DateTime.Now;
            _ProductSuggestion.IdUser_Delete = 1;
            _context.SaveChanges();
            return RedirectToAction("ShowProductSuggestion");
        }
        [HttpPost]
        public ActionResult sortUpProductSuggestion(int? id)
        {
            var _ProductSuggestion = _context.tblProductSuggestion.Find(id);

            var _listsortcod = _context.tblProductSuggestion.Where(p => p.Id == id && p.StateDelete == false).Select(p => p.IdSort).ToList();

            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortcar = _context.tblProductSuggestion.SingleOrDefault(p => p.IdSort == cod);
                _listsortcar.IdSort = cod + 1;
                _ProductSuggestion.IdSort = cod;
            }
            _context.SaveChanges();
            var _listProductSuggestion = _context.tblProductSuggestion.
              Where(p => p.StateDelete == false).
              Select(p => new
              {
                  p.Id,
                  p.IdProduct,
                  p.IdSort,
                  p.tblProduct.Name
              }).OrderBy(p => p.IdSort).ToList();
            return Json(_listProductSuggestion, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult sortDownProductSuggestion(int? id)
        {
            var _maxsort = 0;
            var _ProductSuggestion = _context.tblProductSuggestion.Find(id);
            var _listsortcod = _context.tblProductSuggestion.Where(p => p.Id == id && p.StateDelete == false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblProductSuggestion.Where(p => p.StateDelete == false).Select(p => p.IdSort).ToList();
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
                var _listsortcar = _context.tblProductSuggestion.SingleOrDefault(p => p.IdSort == cod);
                _listsortcar.IdSort = cod - 1;
                _ProductSuggestion.IdSort = cod;
            }
            _context.SaveChanges();
            var _listProductSuggestion = _context.tblProductSuggestion.
              Where(p => p.StateDelete == false).
              Select(p => new
              {
                  p.Id,
                  p.IdProduct,
                  p.IdSort,
                  p.tblProduct.Name
              }).OrderBy(p => p.IdSort).ToList();
            return Json(_listProductSuggestion, JsonRequestBehavior.AllowGet);

        }
    }
}