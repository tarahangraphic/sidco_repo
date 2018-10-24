using CustomerClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CustomerClub.Controllers
{
    public class SuggestionController : Controller
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
        public ActionResult ShowSuggestion()
        {
            var _list = _context.tblSuggestion.Where(p => p.StateDelete == false).
                Select(p => new { p.Id,
                    p.IdState,
                    UserName = p.tblUser.Fname+" "+p.tblUser.Lname,
                    p.tblSuggestionState.Name,
                    p.IdUser,
                    p.QuestionText,
                    p.Title,
                    p.AnswerText,
                    p.Unit
                }).OrderBy(p=>p.IdState)
                    .ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void ChangeState(int? id)
        {
            var _list = _context.tblSuggestion.Find(id);
            if (_list.IdState==1)
            {
            _list.IdState = 2;
            }
            _context.SaveChanges();
        }
        [HttpGet]
        public ActionResult showuser()
        {
            var _list = _context.tblUser.Where(p => p.StateDelete == false).Select(
                p => new
                {
                    p.Id,
                    Display = p.Fname+" "+p.Lname
                }).ToList();
            return Json(_list, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult RegisterSuggestion(tblSuggestion _suggestion)
        {
            if (_suggestion.Id==0)
            {
                _suggestion.Date_Insert = DateTime.Now;
                _suggestion.IdState = 1;
                _suggestion.DateQuestionText = DateTime.Now;
                _suggestion.IdUser_Insert = 1;
                _suggestion.StateDelete = false;
                _context.tblSuggestion.Add(_suggestion);
                _context.SaveChanges();
            }
            else
            {
                var _idusersug = _context.tblSuggestion.Where(p => p.Id == _suggestion.Id).Select(p => p.IdUser).ToList();
                var _datequestion= _context.tblSuggestion.Where(p => p.Id == _suggestion.Id).Select(p =>p.DateQuestionText).ToList();
                _suggestion.IdUser = _idusersug[0];
                _suggestion.DateQuestionText = _datequestion[0];
                _suggestion.DateAnswerText = DateTime.Now;
                _suggestion.Date_Update = DateTime.Now;
                _suggestion.IdState = 3;
                _suggestion.IdUser_Update = 1;
                _suggestion.StateDelete = false;
                _context.Entry(_suggestion).State = System.Data.Entity.EntityState.Modified;
                _context.SaveChanges();
            }
            return Json(_suggestion, JsonRequestBehavior.AllowGet);
        }
        
    }
}