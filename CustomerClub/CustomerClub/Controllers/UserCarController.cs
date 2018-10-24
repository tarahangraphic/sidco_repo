using CustomerClub.Models;
using CustomerClub.Script.model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CustomerClub.Controllers
{
    public class UserCarController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();
        [HttpGet]
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

            var _usercarlist = _context.tblUserCar
               .Where(p => p.StateDelete == false&&p.tblUser.Id==id)
               .Select(p => new
               {
                   p.Id,
                   p.IdCar,
                   p.IdUser,
                   p.Kilometer,
                   p.Pelak,
                   p.ProduceYear,
                   p.tblCar.Name,
                   Username = p.tblUser.Fname + " " + p.tblUser.Lname
               }).ToList();
            var _carlist = _context.tblCar.Where(p => p.StateDelete == false&&p.IdParent!=0).Select(p => new
            { Id = p.Id, Display = p.Name }).ToList();
            
            var _userlist = _context.tblUser.Where(p => p.StateDelete == false&&p.Id==id).
                Select(p => new
            { p.Id, Display = p.Fname+" "+p.Lname }).ToList();

            JavaScriptSerializer js = new JavaScriptSerializer();

            ViewBag._list = js.Serialize(_usercarlist);
            ViewBag.carlist = js.Serialize(_carlist);
            ViewBag._userlist = js.Serialize(_userlist);
            return View();
        }
        [HttpPost]
        public ActionResult RegisterUserCar(tblUserCar _usercar)
        {
            if (_usercar.Id==0)
            {
                _usercar.StateDelete = false;
                _usercar.Date_Insert = DateTime.Now;
                _usercar.IdUser_Insert = 1;
                _context.tblUserCar.Add(_usercar);
                _context.SaveChanges();
            }
            else
            {
                _usercar.StateDelete = false;
                _usercar.Date_Update = DateTime.Now;
                _usercar.IdUser_Update = 1;
                _context.Entry(_usercar).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return RedirectToAction("Index/" + _usercar.IdUser);
        }
        [HttpPost]
        public ActionResult DeleteUserCar(tblUserCar _usercar)
        {
            var _usercarlist = _context.tblUserCar.Find(_usercar.Id);
            _usercarlist.StateDelete = true;
            _usercarlist.Date_Delete = DateTime.Now;
            _usercarlist.IdUser_Delete = 1;
            _context.SaveChanges();
            var _id = _usercar.IdUser;
            return RedirectToAction("Index/"+_id);
        }
        [HttpGet]
        public void ChangeCar(tblUserCar _usercar)
        {
           
            
        }
    }
}