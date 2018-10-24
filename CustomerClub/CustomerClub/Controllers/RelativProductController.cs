using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomerClub.Controllers
{
    public class RelativProductController : Controller
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

            var _productidparent = _context.tblProduct.Where(p => p.Id == id && p.IdParent != 0).ToList();
            if (_productidparent.Count() > 0)
            {
                var _lisrelativeproduct = _context.tblRelativeProduct.Where(p => p.StateDelete == false && p.IdProduct_Master == id)
                .Select(p => new
                {
                    p.Id,
                    p.IdProduct_Master,
                    p.IdProduct_Slave,
                    SalveProductName = p.tblProduct.Name,
                    MasterProductName = p.tblProduct1.Name
                }).ToList();

                var _allproduct = _context.tblProduct.Where(p => p.StateDelete == false && p.Id == id).Select(p => new { IdProduct_Master = p.Id, MasterProductName = p.Name,SalveProductName = "هیچ اطلاعاتی موجود نیست" }).ToList();

                var _productlist = _context.tblProduct.Where(p => p.StateDelete == false && p.IdParent == 0)
                    .Select(p => new { p.Id, Display = p.Name }).ToList();

                JavaScriptSerializer js = new JavaScriptSerializer();
                if (_lisrelativeproduct.Count == 0)
                {

                    ViewBag.lisrelativeproduct = js.Serialize(_allproduct);
                }
                else
                {
                    ViewBag.lisrelativeproduct = js.Serialize(_lisrelativeproduct);
                }

                ViewBag.productlist = js.Serialize(_productlist);

                return View();
            }
            else
            {
                return RedirectToAction("/Index", "Product");
            }
        }
        [HttpPost]
        public ActionResult FillProductGroup(int? id)
        {
            var _listgroupproduct = _context.tblProduct.Where(p => p.StateDelete == false && p.IdParent == id)
                .Select(p => new { p.Id, Display = p.Name }).ToList();
            return Json(_listgroupproduct);
        }
        [HttpPost]
        public ActionResult RegisterRelativeProduct(tblRelativeProduct _rproduct)
        {
            _rproduct.Date_Insert = DateTime.Now;
            _rproduct.StateDelete = false;
            _context.tblRelativeProduct.Add(_rproduct);
            _context.SaveChanges();
            return RedirectToAction("Index/"+ _rproduct.IdProduct_Master);
        }
        [HttpPost]
        public ActionResult DeleteRelativProduct(int? id)
        {
            var _listrproduct = _context.tblRelativeProduct.Find(id);
            _listrproduct.StateDelete = true;
            _listrproduct.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            return RedirectToAction("Index/"+ _listrproduct.IdProduct_Master);
        }
    }
}