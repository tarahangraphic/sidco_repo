using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CustomerClub.Models;
using CustomerClub.Utility;

namespace CustomerClub.Controllers
{
    public class OrderController : Controller
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
        public ActionResult ShowOrder()
        {
            var listorder = _context.tblOrder
                .Where(p => p.StateDelete == false).ToList()
                .Select(p => new
                {

                    DateStateEditing = p.DateStateEditing==null?"_":clsPersianDate.MiladiToShamsi(p.DateStateEditing),
                    Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                    p.Description,
                    p.Id,
                    p.IdOrderState,
                    OrderState = p.tblOrderState.Name,
                    p.IdUser,
                    UserFullName = p.tblUser.Fname + " " + p.tblUser.Lname
                }).ToList();
            return Json(listorder,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowOrderDetail(int? id)
        {
            var listorderdetail = _context.tblOrderDetail
                .Where(p => p.StateDelete == false && p.IdOrder==id).ToList()
                .Select(p => new
                {
                    p.Count,
                    Date_Insert =clsPersianDate.MiladiToShamsi(p.Date_Insert),
                    Date_Update = p.Date_Update==null? "_" : clsPersianDate.MiladiToShamsi(p.Date_Update),
                    p.Id,
                    p.IdOrder,
                    p.IdProduct,
                    p.Price,
                    Total=p.Price*p.Count,
                    OrderDescription = p.tblOrder.Description,
                    ProductName = p.tblProduct.Name
                }).ToList();
            return Json(listorderdetail, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ConfirmOrder(int? id)
        {
            var cofirmorder = _context.tblOrder.Find(id);
            cofirmorder.IdOrderState = 2;
            cofirmorder.DateStateEditing = DateTime.Now;
            _context.SaveChanges();
            return RedirectToAction("ShowOrder");


        }
        [HttpPost]
        public ActionResult NotConfirmOrder(int? id)
        {
            var notcofirmorder = _context.tblOrder.Find(id);
            notcofirmorder.IdOrderState = 3;
            notcofirmorder.DateStateEditing = DateTime.Now;

            _context.SaveChanges();
            return RedirectToAction("ShowOrder");
        }
        [HttpPost]
        public ActionResult DeleteOrderDetail(int? id)
        {
            var orderdetail = _context.tblOrderDetail.Find(id);
            orderdetail.StateDelete = true;
            orderdetail.Date_Delete = DateTime.Now;
            _context.SaveChanges();

            var listorderdetail = _context.tblOrderDetail
                .Where(p => p.StateDelete == false && p.IdOrder == orderdetail.Id).ToList()
                .Select(p => new
                {
                    p.Count,
                    Date_Insert = clsPersianDate.MiladiToShamsi(p.Date_Insert),
                    Date_Update = p.Date_Update == null ? "_" : clsPersianDate.MiladiToShamsi(p.Date_Update),
                    p.Id,
                    p.IdOrder,
                    p.IdProduct,
                    p.Price,
                    Total = p.Price * p.Count,
                    OrderDescription = p.tblOrder.Description,
                    ProductName = p.tblProduct.Name
                }).ToList();
            return Json(listorderdetail, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult OrderDetailregister(tblOrderDetail _orderdetail)
        {
            if (_orderdetail.Id==0)
            {
                _orderdetail.Date_Insert = DateTime.Now;
                _orderdetail.StateDelete = false;
                _context.tblOrderDetail.Add(_orderdetail);
                _context.SaveChanges();
            }
            else
            {
                var _dateinsert = _context.tblOrderDetail.Where(p => p.Id == _orderdetail.Id).Select(p => p.Date_Insert).ToList();
                _orderdetail.Date_Insert = _dateinsert[0];
                _orderdetail.Date_Update = DateTime.Now;
                _orderdetail.StateDelete = false;
                _context.Entry(_orderdetail).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return Json(_orderdetail,JsonRequestBehavior.AllowGet);
        }
    }
    
        
}