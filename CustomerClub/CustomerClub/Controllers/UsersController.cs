using CustomerClub.Models;
using CustomerClub.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.IO;

namespace CustomerClub.Controllers
{
    public class UsersController : Controller
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
        public ActionResult ShowCity()
        {
            var _listcity = _context.tblCity.Where(p => p.IdParent == 0).Select(p => new { p.Id, Display = p.Name, p.IdParent }).OrderBy(p=>p.Id).ToList();
            return Json(_listcity, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowCities()
        {

            var _listuniquecity = _context.tblCity.Where(p => p.IdParent != 0).Select(p => new { p.Id, Display = p.Name, p.IdParent }).ToList();
            return Json(_listuniquecity, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult changecity(int? ID)
        {
            var _listcity = _context.tblCity.Where(p => p.Id == ID).Select(p => p.Id).ToList();
            var id = _listcity[0];
            var _listuniquecity = _context.tblCity.Where(p => p.IdParent == id).Select(p => new { p.Id, Display = p.Name, p.IdParent }).ToList();
            return Json(_listuniquecity, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowuserType()
        {
            var _listusertype = _context.tblUserType.Where(p => p.StateDelete == false).Select(p => new { p.Id, Display = p.Name }).ToList();
            return Json(_listusertype, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult ShowUsers()
        {
            //try
            //{
                var _listuser = _context.tblUser.Where(p => p.StateDelete == false).ToList()
                        .Select(p => new
                        {
                            p.Id,
                            p.Fname,
                            p.Lname,
                            CodeMelli = p.CodeMelli == null ?"_": p.CodeMelli,
                            IdCity = p.IdCity,
                            p.Mobile,
                            p.IdUserType,
                            Name = p.tblCity.Name ,
                            usertyprname = p.tblUserType.Name,
                            p.Address,
                            p.AccountCode,
                            p.AgentCode,
                            p.AgentRate,
                            p.Agent_BankAcouuntNumber,
                            p.Agent_History,
                            p.Agent_IdType,
                            p.Agent_JobType,
                            p.Agent_Lisence,
                            p.Agent_Malek,
                            p.Agent_Place_Area,
                            p.Agent_PosState,
                            p.CodePostal,
                            p.AgentLicenseImage,
                            DateBirthday= p.DateBirthday==null?"_":clsPersianDate.MiladiToShamsi(p.DateBirthday),
                            p.Fathername,
                            p.Home,
                            p.JobName,
                            p.LatLon,
                            p.Married,
                            p.Sex,
                            p.Tell
                        }).ToList();
                return Json(_listuser, JsonRequestBehavior.AllowGet);

            //}
            //catch (Exception ee)
            //{
            //    String err = ee.Message;
            //    return Json(err, JsonRequestBehavior.AllowGet);
            //}
        }
        public ActionResult showuserRequest()
        {
            var listuserrequest = _context.tblUser
                .Where(p => p.StateDelete == false && p.StateRegister == 2 && p.StateRegister!=null)
                .Select(p => new
                {
                    p.Id,
                    p.Mobile,
                    p.Fname,
                    p.Lname,
                    p.CodeMelli,
                    p.IdCity,
                    p.IdUserType,
                    p.tblCity.Name,

                    //Agent_IdType = AgentList.AgentTypes[(int)p.Agent_IdType],
                    Agent_IdType = p.Agent_IdType == null ? "" : (p.Agent_IdType == 1 ? "فروش" : (p.Agent_IdType == 2 ? "خدمات پس از فروش" : (p.Agent_IdType == 3 ? "فروش و خدمات پس از فروش" : (p.Agent_IdType == 4 ? "انحصاری فروش" : (p.Agent_IdType == 5 ? "انحصاری خدمات پس از فروش" : (p.Agent_IdType == 6 ? "انحصاری فروش و خدمات پس از فروش" : "")))))),
                    usertyprname = p.tblUserType.Name
                }).ToList();
            return Json(listuserrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult confermrequestMechanic(int? id)
        {
            var userrequest = _context.tblUser.Find(id);
            userrequest.StateRegister = 3;
            userrequest.IdUserType = 2;
            _context.SaveChanges();
            var listuserrequest = _context.tblUser
                 .Where(p => p.StateDelete == false && p.StateRegister == 2)
                 .Select(p => new
                 {
                     p.Id,
                     p.Mobile,
                     p.Fname,
                     p.Lname,
                     p.CodeMelli,
                     p.IdCity,
                     p.IdUserType,
                     p.tblCity.Name,
                     usertyprname = p.tblUserType.Name
                 }).ToList();
            return Json(listuserrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult confermrequestSell(int? id)
        {
            var userrequest = _context.tblUser.Find(id);
            userrequest.StateRegister = 3;
            userrequest.IdUserType = 3;
            _context.SaveChanges();
            var listuserrequest = _context.tblUser
                 .Where(p => p.StateDelete == false && p.StateRegister == 2)
                 .Select(p => new
                 {
                     p.Id,
                     p.Mobile,
                     p.Fname,
                     p.Lname,
                     p.CodeMelli,
                     p.IdCity,
                     p.IdUserType,
                     p.tblCity.Name,
                     usertyprname = p.tblUserType.Name
                 }).ToList();
            return Json(listuserrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult confermrequestSellAndServicesAfter(int? id)
        {
            var userrequest = _context.tblUser.Find(id);
            userrequest.StateRegister = 3;
            userrequest.IdUserType = 4;
            _context.SaveChanges();
            var listuserrequest = _context.tblUser
                .Where(p => p.StateDelete == false && p.StateRegister == 2)
                .Select(p => new
                {
                    p.Id,
                    p.Mobile,
                    p.Fname,
                    p.Lname,
                    p.CodeMelli,
                    p.IdCity,
                    p.IdUserType,
                    p.tblCity.Name,
                    usertyprname = p.tblUserType.Name
                }).ToList();
            return Json(listuserrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult notconfirm(int? id)
        {
            var userrequest = _context.tblUser.Find(id);
            userrequest.StateRegister = 1;
            userrequest.IdUserType = 1;
            _context.SaveChanges();
            var listuserrequest = _context.tblUser
                            .Where(p => p.StateDelete == false && p.StateRegister == 2)
                            .Select(p => new
                            {
                                p.Id,
                                p.Mobile,
                                p.Fname,
                                p.Lname,
                                p.CodeMelli,
                                p.IdCity,
                                p.IdUserType,
                                p.tblCity.Name,
                                usertyprname = p.tblUserType.Name
                            }).ToList();
            return Json(listuserrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult deleteUser(int? id)
        {
            var userrequest = _context.tblUser.Find(id);
            userrequest.StateDelete = true;
            userrequest.Date_Delete = DateTime.Now;
            userrequest.IdUser_Delete = 1;
            var agentlicencimage = Path.Combine(Server.MapPath("~/img/agentlicense/"), userrequest.Fname + ".jpeg");
            if (System.IO.File.Exists(agentlicencimage))
            {
                System.IO.File.Delete(agentlicencimage);
            }
            _context.SaveChanges();
            return Json(userrequest, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterUser(tblUser _user)
        {

            if (_user.Id == 0)
            {
                _user.Date_Insert = DateTime.Now;
                _user.IdUser_Insert = 1;
                _user.StateDelete = false;
                _user.IdUserType = 1;
                _user.StateRegister = 1;
                _context.tblUser.Add(_user);
                _context.SaveChanges();

            }
            else
            {
                _user.DateBirthday = null;
                var _IdUserType = _context.tblUser.Where(p => p.Id == _user.Id).Select(p => p.IdUserType).ToList();
                var _statregister = _context.tblUser.Where(p => p.Id == _user.Id).Select(p => p.StateRegister).ToList();
                var _userdatebith = _context.tblUser.Where(p => p.Id == _user.Id).Select(p => p.DateBirthday).ToList();
                _user.DateBirthday = _userdatebith[0];
                _user.IdUserType = _IdUserType[0];
                _user.StateRegister = _statregister[0];
                _user.Date_Update = DateTime.Now;
                _user.IdUser_Update = 1;
                _user.StateDelete = false;
                var _userpicname = _context.tblUser.Where(p => p.Id == _user.Id).Select(p => p.AgentLicenseImage).ToList();
                _user.AgentLicenseImage = _userpicname[0].ToString();
                _context.Entry(_user).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();

            }
            return Json(_user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult saveuserpic(tblUser _user, HttpPostedFileBase ImgFile)
        {
            var _userpic = _context.tblUser.Find(_user.Id);
            for (int i = 0; i < Request.Files.Count; i++)
            {
                if (_user.Id != 0)
                {
                    var _slideshowuspic = _context.tblUser.Where(p => p.Id == _user.Id).Select(p => p.AgentLicenseImage).ToList();
                    var oldfilename = Path.GetFileName(_slideshowuspic[0].ToString());
                    var _path = Path.Combine(Server.MapPath("~/img/agentlicense"), oldfilename);
                    if (System.IO.File.Exists(_path))
                    {
                        System.IO.File.Delete(_path);
                    }
                }

                ImgFile = Request.Files[i];
                if (!ImgFile.ContentType.Contains("image"))
                {
                    return new HttpStatusCodeResult(560);
                }
                var randomnumber = new Random();

                var filename = randomnumber.Next(999, 999999999).ToString() + ImgFile.FileName;
                var path = Path.Combine(Server.MapPath("~/img/agentlicense"), filename);
                _userpic.AgentLicenseImage = filename;
                ImgFile.SaveAs(path);
                _context.SaveChanges();
            }
            return Json(_userpic, JsonRequestBehavior.AllowGet);
        }
    }
}