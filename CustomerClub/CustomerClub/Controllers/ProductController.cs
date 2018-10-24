using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class ProductController : Controller
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
        public ActionResult ShowProduct()
        {
            var _list = _context.tblProduct.Where(p => p.StateDelete == false &&
            p.IdParent == 0 &&
            p.StateGroupProduct == false).
                 Select(p => new
                 {
                     p.Id,
                     p.Code,
                     p.IdSortProduct,
                     p.Model,
                     p.Name
                 }).OrderBy(p => p.IdSortProduct).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult showlistproduct(int? id)
        {
            var _list = _context.tblProduct.Where(p => p.StateDelete == false &&
            p.IdParent == id && p.StateGroupProduct == true).
                Select(p => new
                {
                    p.Code,
                    p.Id,
                    p.IdParent,
                    p.Model,
                    p.IdSortGroup,
                    p.Name
                }).OrderBy(p => p.IdSortGroup).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteProduct(int? id)
        {
            var _list = _context.tblProduct.Find(id);
            _list.StateDelete = true;
            _list.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterProduct(tblProduct _product)
        {
            var _maxsort = 0;
            var _idsort = _context.tblProduct.Where(p => p.IdParent == 0).Select(p => p.IdSortProduct).ToList();

            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }
            if (_product.Id == 0)
            {
                _product.IdSortProduct = _maxsort + 1;
                _product.Date_Insert = DateTime.Now;
                _product.IdParent = 0;
                _product.StateDelete = false;
                _product.StateGroupProduct = false;
                _product.StateExist = true;
                _context.tblProduct.Add(_product);
                _context.SaveChanges();
            }
            else
            {
                _product.Date_Insert = null;
                _product.StateGroupProduct = false;
                var _idsortproduct = _context.tblProduct.Where(p => p.Id == _product.Id).Select(p => p.IdSortProduct).ToList();
                var _dateinsert = _context.tblProduct.Where(p => p.Id == _product.Id).Select(p => p.Date_Insert).ToList();
                _product.Date_Insert = _dateinsert[0];
                _product.IdSortProduct = _idsortproduct[0];
                _product.Date_Update = DateTime.Now;
                _product.StateExist = true;
                _product.IdParent = 0;
                _product.StateDelete = false;
                _context.Entry(_product).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return Json(_product, JsonRequestBehavior.AllowGet);

        }
       
        public ActionResult RegisterGroupProductProperty(int? id)
        {
            List<tblProductProperty> listproperty = new List<tblProductProperty>();
            for (int i = 1; i <= 12; i++)
            {
                tblProductProperty _productproperty = new tblProductProperty();
                _productproperty.IdProduct = id;
                _productproperty.IdProperty = i;
                _productproperty.IdSort = i;
                _productproperty.Value = "";
                _productproperty.Date_Insert = DateTime.Now;
                _productproperty.StateDelete = false;
                listproperty.Add(_productproperty);

            }
            _context.tblProductProperty.AddRange(listproperty);
            _context.SaveChanges();
            var _productgroup= _context.tblProduct.Find(id);
            return RedirectToAction("showlistproduct/"+ _productgroup.IdParent);
        }
        [HttpPost]
        public ActionResult RegisterListProduct(tblProduct _product)
        {
            var _maxsort = 0;
            var _idsort = _context.tblProduct.Where(p => p.IdParent == _product.IdParent).Select(p => p.IdSortGroup).ToList();

            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }
            if (_product.Id == 0)
            {
                _product.StateExist = true;
                _product.StateGroupProduct = true;
                _product.IdSortGroup = _maxsort + 1;
                _product.Date_Insert = DateTime.Now;
                _product.StateDelete = false;
                _context.tblProduct.Add(_product);
                _context.SaveChanges();
                return RedirectToAction("RegisterGroupProductProperty/" + _product.Id);
            }
            else
            {
                _product.Date_Insert = null;
                var _idsortproduct = _context.tblProduct.Where(p => p.Id == _product.Id).Select(p => p.IdSortGroup).ToList();

                var _dateinsert = _context.tblProduct.Where(p => p.Id == _product.Id).Select(p => p.Date_Insert).ToList();
                _product.Date_Insert = _dateinsert[0];
                _product.IdSortGroup = _idsortproduct[0];

                _product.StateExist = true;
                _product.StateGroupProduct = true;
                _product.Date_Update = DateTime.Now;
                _product.StateDelete = false;
                _context.Entry(_product).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return Json(_product, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        public ActionResult SortUpProduct(int? id)
        {
            var _product = _context.tblProduct.Find(id);

            var _listsortcod = _context.tblProduct.Where(p => p.Id == id && p.StateGroupProduct == false && p.IdParent == 0 && p.StateDelete == false).Select(p => p.IdSortProduct).ToList();

            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortproduct = _context.tblProduct.SingleOrDefault(p => p.IdSortProduct == cod && p.IdParent == 0);
                _listsortproduct.IdSortProduct = cod + 1;
                _product.IdSortProduct = cod;
            }
            _context.SaveChanges();
            return RedirectToAction("Index");
        }
        [HttpPost]
        public ActionResult SortDownProduct(int? id)
        {
            var _maxsort = 0;
            var _product = _context.tblProduct.Find(id);
            var _listsortcod = _context.tblProduct.Where(p => p.Id == id && p.StateGroupProduct == false && p.IdParent == 0 && p.StateDelete == false).Select(p => p.IdSortProduct).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblProduct.Where(p => p.IdParent == 0 && p.StateDelete == false).Select(p => p.IdSortProduct).ToList();
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
                var _listsortproduct = _context.tblProduct.SingleOrDefault(p => p.IdSortProduct == cod && p.IdParent == 0);
                _listsortproduct.IdSortProduct = cod - 1;
                _product.IdSortProduct = cod;
            }
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult SortUpProductGroup(int? id)
        {
            var _product = _context.tblProduct.Find(id);

            var _listsortcod = _context.tblProduct.Where(p => p.IdParent == _product.IdParent && p.Id == id && p.StateDelete == false && p.StateGroupProduct == true).Select(p => p.IdSortGroup).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortproduct = _context.tblProduct.SingleOrDefault(p => p.IdSortGroup == cod && p.IdParent == _product.IdParent);
                _listsortproduct.IdSortGroup = cod + 1;
                _product.IdSortGroup = cod;
            }
            _context.SaveChanges();
            var _Products = _context.tblProduct.Find(id);
            var _list = _context.tblProduct.Where(p => p.IdParent == _Products.IdParent && p.StateDelete == false).Select(p => new { p.Name, p.Id, p.IdParent, p.Code, p.Model, p.IdSortGroup }).OrderBy(p => p.IdSortGroup).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult SortDownProductGroup(int? id)
        {
            var _maxsort = 0;
            var _poduct = _context.tblProduct.Find(id);
            var _listsortcod = _context.tblProduct.Where(p => p.IdParent == _poduct.IdParent && p.Id == id && p.StateDelete == false).Select(p => p.IdSortGroup).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblProduct.Where(p => p.IdParent == _poduct.IdParent && p.StateDelete == false).Select(p => p.IdSortGroup).ToList();
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
                var _listsortcar = _context.tblProduct.SingleOrDefault(p => p.IdSortGroup == cod && p.IdParent == _poduct.IdParent);
                _listsortcar.IdSortGroup = cod - 1;
                _poduct.IdSortGroup = cod;
            }
            _context.SaveChanges();
            var _list = _context.tblProduct.Where(p => p.IdParent == _poduct.IdParent && p.StateDelete == false).Select(p => new { p.Name, p.Id, p.IdParent, p.IdSortGroup, p.Model, p.Code }).OrderBy(p => p.IdSortGroup).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        

    }
}