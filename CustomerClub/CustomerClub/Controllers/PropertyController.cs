using CustomerClub.Models;
using CustomerClub.Script.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class PropertyController : Controller
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
        public ActionResult ShowUserType()
        {
            var _listUserType = _context.tblUserType.Where(p => p.StateDelete == false).Select(p => new mItemSelect { Id = p.Id, Name = p.Name }).ToList();

            mItemSelect allTypes = new mItemSelect
            {
                Id = 0,
                Name = "همه کاربران"
            };

            _listUserType.Insert(0, allTypes);
            _listUserType.OrderBy(p => p.Id);
            return Json(_listUserType, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ShowProperty()
        {
            var _list = (from p in _context.tblProperty
                        where p.IdParent == 0 && p.StateDelete == false
                        select new
                        {
                            p.Id,
                            p.Name,
                            p.IdUserTypePermision,
                            tName = p.IdUserTypePermision == 0 ? "همه کاربران" : _context.tblUserType.Where(t=>t.Id == p.IdUserTypePermision).Select(t=>t.Name).FirstOrDefault().ToString()
                        }).ToList();
           
            return Json(_list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult DeleteProperty(int? id)
        {
            var _pro = _context.tblProperty.Find(id);
            if (_pro.DeletePermision == true)
            {
                _pro.StateDelete = true;
                _pro.Date_Delete = DateTime.Now;
                _context.SaveChanges();
                return Json(_pro, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult RegisterProperty(tblProperty _pro)
        {
            if (_pro.Id == 0)
            {
                _pro.IdUser_Insert = 1;
                _pro.IdParent = 0;
                _pro.Date_Insert = DateTime.Now;
                _pro.DeletePermision = true;
                _pro.StateDelete = false;
                _context.tblProperty.Add(_pro);
                _context.SaveChanges();
            }
            else
            {
                tblProperty _edit_pro = _context.tblProperty.FirstOrDefault(p=>p.Id == _pro.Id);
                
                _edit_pro.Date_Update = DateTime.Now;
                _edit_pro.Name = _pro.Name;
                _edit_pro.IdUserTypePermision = _pro.IdUserTypePermision;
                _context.SaveChanges();
            }

            return Json(_pro, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult grouplistProperty(tblProperty _pro)
        {
            var _list = (from p in _context.tblProperty
                         where p.IdParent == _pro.Id && p.StateDelete == false
                         select new
                         {
                             p.Id,
                             p.Name,
                             p.IdUserTypePermision,
                             tName = p.IdUserTypePermision == 0 ? "همه کاربران" : _context.tblUserType.Where(t => t.Id == p.IdUserTypePermision).Select(t => t.Name).FirstOrDefault().ToString()
                         }).ToList();


            if (_list.Count == 0)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(_list, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult RegistergroupCar(tblProperty _pro)
        {
          
            if (_pro.Id == 0)
            {   
                _pro.IdUser_Insert = 1;
                _pro.Date_Insert = DateTime.Now;
                _pro.StateDelete = false;
                _context.tblProperty.Add(_pro);
                _context.SaveChanges();
            }
            else
            {
                tblProperty _edit_pro = _context.tblProperty.FirstOrDefault(p => p.Id == _pro.Id);
                _edit_pro.Date_Update = DateTime.Now;
                _edit_pro.Name = _pro.Name;
                _edit_pro.IdUserTypePermision = _pro.IdUserTypePermision;
                _context.SaveChanges();
            }
            return Json(_pro, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult showgrouplist(int? id)
        {
            var _pro = _context.tblProperty.Find(id);
           
            var _list = (from p in _context.tblProperty
                         where p.IdParent == _pro.IdParent && p.StateDelete == false
                         select new
                         {
                             p.Id,
                             p.Name,
                             p.IdUserTypePermision,
                             tName = p.IdUserTypePermision == 0 ? "همه کاربران" : _context.tblUserType.Where(t => t.Id == p.IdUserTypePermision).Select(t => t.Name).FirstOrDefault().ToString()
                         }).ToList();

            return Json(_list, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult showregistergroup(int? IdParent)
        {
            var _list = (from p in _context.tblProperty
                         where p.IdParent == IdParent && p.StateDelete == false
                         select new
                         {
                             p.Id,
                             p.Name,
                             p.IdUserTypePermision,
                             tName = p.IdUserTypePermision == 0 ? "همه کاربران" : _context.tblUserType.Where(t => t.Id == p.IdUserTypePermision).Select(t => t.Name).FirstOrDefault().ToString()
                         }).ToList();


            return Json(_list, JsonRequestBehavior.AllowGet);
        }
    }
}