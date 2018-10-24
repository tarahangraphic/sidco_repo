using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomerClub.Controllers
{
    public class CarProductController : Controller
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

            var _productidparent = _context.tblProduct.Where(p=>p.Id==id&&p.IdParent!=0).ToList();
            if (_productidparent.Count()>0)
            {
                var _listCarproduct = _context.tblCarProduct.
               Where(p => p.StateDelete == false && p.IdProduct == id).
               Select(p => new
               {
                   p.Id,
                   p.IdCar,
                   p.IdProduct,
                   p.tblCar.Name,
                   ProductName = p.tblProduct.Name
               }).ToList();

                var _listcar = _context.tblCar.Where(p => p.StateDelete == false && p.IdParent == 0).Select(p => new { p.Id, Display = p.Name }).ToList();

                var _allproduct = _context.tblProduct.Where(p => p.StateDelete == false && p.Id == id).Select(p => new { ProductName=p.Name, Name = "هیچ اطلاعاتی موجود نیست", IdProduct = p.Id }).ToList();

                JavaScriptSerializer js = new JavaScriptSerializer();
                if (_listCarproduct.Count == 0)
                {
                    ViewBag.listCarproduct = js.Serialize(_allproduct);

                }
                else
                {
                    ViewBag.listCarproduct = js.Serialize(_listCarproduct);

                }

                ViewBag.listcar = js.Serialize(_listcar);

                return View();
            }
            else
            {
                return RedirectToAction("/Index", "Product");
            }
        }  
        [HttpPost]
        public ActionResult FillCars(int? id)
        {
            var _carlist = _context.tblCar.Where(p => p.StateDelete == false && p.IdParent == id)
                .Select(p => new { p.Id, Display = p.Name }).ToList();
            return Json(_carlist);
        }
        [HttpPost]
        public ActionResult RegisterCarProduct(tblCarProduct _carproduct)
        {
            _carproduct.Date_Insert = DateTime.Now;
            _carproduct.StateDelete = false;
            _context.tblCarProduct.Add(_carproduct);
            _context.SaveChanges();
            return RedirectToAction("Index/"+ _carproduct.IdProduct);
        }
        [HttpPost]
        public ActionResult DeleteCarProduct(int? id)
        {
            var _listcarproduct=_context.tblCarProduct.Find(id);
            _listcarproduct.StateDelete = true;
            _listcarproduct.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            return RedirectToAction("Index/" + _listcarproduct.IdProduct);
        }
    }
}