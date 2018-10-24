using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class CarController : Controller
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
        public ActionResult ShowCar()
        {

            var _list = _context.tblCar.Where(p => p.IdParent == 0 && p.StateDelete == false).Select(p => new { p.Id, p.IdParent, p.Name, p.IdSort }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult DeleteCar(int? id)
        {
            var _car = _context.tblCar.Find(id);
            _car.StateDelete = true;
            _car.Date_Delete = DateTime.Now;
            _context.SaveChanges();
            return Json(_car, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterCar(tblCar _car)
        {
            var _maxsort = 0;
            var _idsort = _context.tblCar.Where(p => p.IdParent == 0).Select(p => p.IdSort).ToList();

            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }
            if (_car.Id == 0)
            {
                _car.IdUser_Insert = 1;
                _car.IdSort = _maxsort + 1;
                _car.IdParent = 0;
                _car.Date_Insert = DateTime.Now;
                _car.StateDelete = false;
                _context.tblCar.Add(_car);
            }
            else
            {
                var _idsortcod = _context.tblCar.Where(p => p.Id == _car.Id).Select(p => p.IdSort).ToList();
                _car.IdSort = _idsortcod[0];
                _car.IdParent = 0;
                _car.IdUser_Insert = 1;
                _car.Date_Update = DateTime.Now;
                _car.StateDelete = false;
                _context.Entry(_car).State = System.Data.Entity.EntityState.Modified;
            }
            _context.SaveChanges();
            return Json(_car, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult grouplistCar(tblCar _car)
        {
            var _listgroupCar = _context.tblCar.Where(p => _car.Id == p.IdParent && p.StateDelete == false).Select(p => new { p.Id, p.IdParent, p.Name, p.IdSort }).OrderBy(p => p.IdSort).ToList();
            if (_listgroupCar.Count == 0)
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(_listgroupCar, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult RegistergroupCar(tblCar _car)
        {
            var _maxsort = 0;
            var _idsort = _context.tblCar.Where(p => p.IdParent == _car.IdParent).Select(p => p.IdSort).ToList();

            for (int i = 1; i <= _idsort.Count; i++)
            {
                _maxsort = i;
            }
            if (_car.Id == 0)
            {
                _car.IdUser_Insert = 1;
                _car.IdSort = _maxsort + 1;
                _car.Date_Insert = DateTime.Now;
                _car.StateDelete = false;
                _context.tblCar.Add(_car);
            }
            else
            {
                var _sortid = _context.tblCar.Where(p=>p.Id==_car.Id).Select(p=>p.IdSort).ToList();
                _car.IdSort = _sortid[0];
                _car.IdUser_Insert = 1;
                _car.Date_Update = DateTime.Now;
                _car.StateDelete = false;
                _context.Entry(_car).State = System.Data.Entity.EntityState.Modified;
            }

            _context.SaveChanges();
            return Json(_car, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult sortupCars(int? id)
        {
            var _cars = _context.tblCar.Find(id);

            var _listsortcod = _context.tblCar.Where(p => p.Id == id && p.IdParent == 0&&p.StateDelete==false).Select(p => p.IdSort).ToList();

            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortcar = _context.tblCar.SingleOrDefault(p => p.IdSort == cod && p.IdParent == 0);
                _listsortcar.IdSort = cod + 1;
                _cars.IdSort = cod;
            }
            _context.SaveChanges();
            return Json(_cars, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult sortdownCars(int? id)
        {
            var _maxsort = 0;
            var _cars = _context.tblCar.Find(id);
            var _listsortcod = _context.tblCar.Where(p => p.Id == id && p.IdParent == 0&&p.StateDelete==false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblCar.Where(p => p.IdParent == 0&&p.StateDelete==false).Select(p => p.IdSort).ToList();
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
                var _listsortcar = _context.tblCar.SingleOrDefault(p => p.IdSort == cod && p.IdParent == 0);
                _listsortcar.IdSort = cod - 1;
                _cars.IdSort = cod;
            }
            _context.SaveChanges();
            return Json(_cars, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult showregistergroup(int? IdParent)
        {
            var _list = _context.tblCar.Where(p => p.IdParent == IdParent&&p.StateDelete == false).Select(p => new { p.Name, p.Id, p.IdParent, p.IdSort }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult sortupcarlist(int? id)
        {
            var _cars = _context.tblCar.Find(id);

            var _listsortcod = _context.tblCar.Where(p => p.IdParent == _cars.IdParent && p.Id == id&&p.StateDelete==false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            if (_sortcode - 1 <= 0)
            {
                return new HttpStatusCodeResult(550);
            }
            else
            {
                var cod = _sortcode - 1;
                var _listsortcar = _context.tblCar.SingleOrDefault(p => p.IdSort == cod && p.IdParent == _cars.IdParent);
                _listsortcar.IdSort = cod + 1;
                _cars.IdSort = cod;
            }
            _context.SaveChanges();
            var _cares = _context.tblCar.Find(id);
            var _list = _context.tblCar.Where(p => p.IdParent == _cars.IdParent && p.StateDelete == false).Select(p => new { p.Name, p.Id, p.IdParent, p.IdSort }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult sortdowncarlist(int? id)
        {
            var _maxsort = 0;
            var _cars = _context.tblCar.Find(id);
            var _listsortcod = _context.tblCar.Where(p => p.IdParent == _cars.IdParent && p.Id == id&&p.StateDelete==false).Select(p => p.IdSort).ToList();
            var _sortcode = Convert.ToInt32(_listsortcod[0]);
            var _idsort = _context.tblCar.Where(p => p.IdParent == _cars.IdParent&&p.StateDelete==false).Select(p => p.IdSort).ToList();
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
                var _listsortcar = _context.tblCar.SingleOrDefault(p => p.IdSort == cod && p.IdParent == _cars.IdParent);
                _listsortcar.IdSort = cod - 1;
                _cars.IdSort = cod;
            }
            _context.SaveChanges();
            var _list = _context.tblCar.Where(p => p.IdParent == _cars.IdParent && p.StateDelete == false).Select(p => new { p.Name, p.Id, p.IdParent, p.IdSort }).OrderBy(p => p.IdSort).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
    }
}
