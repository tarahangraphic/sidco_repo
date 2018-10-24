using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomerClub.Controllers
{
    public class ProductPropertyController : Controller
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

            var _product = _context.tblProduct
                .Where(p => p.StateDelete == false && p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.IdParent,
                    ProductName = p.Name
                }).ToList();
            if (_product.Count>0 && _product.FirstOrDefault().IdParent!=0)
            {
                var _listproductproperty = _context.tblProductProperty
              .Where(p => p.StateDelete == false && p.IdProduct == id)
              .Select(p => new { p.IdProperty, p.Value }).ToList();


                var _listgroupproperty = _context.tblProperty
                    .Where(p => p.StateDelete == false && p.IdParent == 0)
                    .Select(p => new mProperty
                    {
                        Id = p.Id,
                        DeletePermission = p.DeletePermision,
                        IdParent = p.IdParent,
                        Value = "",
                        Name = p.Name,
                        Checked = false
                    }).ToList();

                List<mProperty> _listitemproperty = new List<mProperty>();
                foreach (var item in _listgroupproperty)
                {
                    _listitemproperty.Add(item);
                    var q2 = _context.tblProperty.Where(p => p.StateDelete == false && p.IdParent == item.Id)
                        .Select(p => new mProperty
                        {
                            Id = p.Id,
                            DeletePermission = p.DeletePermision,
                            IdParent = p.IdParent,
                            Name = p.Name,
                            Value = "",
                            Checked = false
                        })
                        .ToList();
                    if (_listproductproperty.Count > 0)
                    {
                        foreach (var item2 in q2)
                        {

                            foreach (var ppitem in _listproductproperty)
                            {
                                if (ppitem.IdProperty == item2.Id)
                                {
                                    item2.Checked = true;
                                    item2.Value = ppitem.Value;
                                    break;
                                }
                            }

                            _listitemproperty.Add(item2);
                        }
                    }
                    else
                    {
                        _listitemproperty.AddRange(q2);
                    }

                }

                JavaScriptSerializer js = new JavaScriptSerializer();

                ViewBag.ItemProperty = js.Serialize(_listitemproperty);
                ViewBag.product = js.Serialize(_product);

                return View();
            }
            else
            {
                return RedirectToAction("/Index", "Product");
            }
          
        }

        [HttpPost]
        public ActionResult RegisterProps(mPropertySelected id)
        {
            var deleteprops = _context.tblProductProperty.Where(p => p.IdProduct == id.IdProduct);
            _context.tblProductProperty.RemoveRange(deleteprops);
            _context.SaveChanges();

            List<tblProductProperty> _listprops = new List<tblProductProperty>();
            tblProductProperty _p = null;

            for (int i = 0; i < id.ListProps.Count(); i++)
            {
                _p = new tblProductProperty();
                _p.IdProduct = id.IdProduct;
                _p.IdProperty = id.ListProps[i].Id;
                _p.StateDelete = false;
                _p.Date_Insert = DateTime.Now;
                _p.Date_Update = DateTime.Now;
                _p.Value = id.ListProps[i].Value;
                _listprops.Add(_p);
            }
            _context.tblProductProperty.AddRange(_listprops);
            _context.SaveChanges();
            return Json(id, JsonRequestBehavior.AllowGet);
        }
    }
}