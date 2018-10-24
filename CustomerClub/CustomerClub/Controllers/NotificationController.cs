using CustomerClub.Models;
using CustomerClub.NotificationUtility;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using CustomerClub.Utility;
using System;

namespace CustomerClub.Controllers
{
    public class NotificationController : Controller
    {
        BAVAR_JHB_DBEntities _context = new BAVAR_JHB_DBEntities();

        public ActionResult Index(string id)
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

            ViewBag.msg = id;
            return View();
        }

        [HttpPost]
        public ActionResult ListProduct_Group()
        {
            var listProductGroup = _context.tblProduct.Where(p => p.IdParent == 0 && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name + " | " + p.Model }).OrderBy(p => p.Value).ToList();
            return Json(listProductGroup);
        }

        [HttpPost]
        public ActionResult ListProduct(long id)
        {
            var listProduct = _context.tblProduct.Where(p => p.IdParent == id && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name }).OrderBy(p => p.Value).ToList();
            return Json(listProduct);
        }

        [HttpPost]
        public ActionResult ListUserCar_Group()
        {
            var listCarGroup = _context.tblCar.Where(p => p.IdParent == 0 && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name }).OrderBy(p => p.Value).ToList();
            return Json(listCarGroup);
        }

        [HttpPost]
        public ActionResult ListUserCar(long id)
        {
            var listCar = _context.tblCar.Where(p => p.IdParent == id && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name }).OrderBy(p => p.Value).ToList();
            return Json(listCar);
        }

        [HttpPost]
        public ActionResult ListProduct_Group2()
        {
            var listProductGroup = _context.tblProduct.Where(p => p.IdParent == 0 && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name + " | " + p.Model }).OrderBy(p => p.Value).ToList();
            return Json(listProductGroup);
        }

        [HttpPost]
        public ActionResult ListProduct2(long id)
        {
            var listProduct = _context.tblProduct.Where(p => p.IdParent == id && p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name }).OrderBy(p => p.Value).ToList();
            return Json(listProduct);
        }

        [HttpPost]
        public ActionResult ListUserType()
        {
            var listUserType = _context.tblUserType.Where(p => p.StateDelete == false).Select(p => new { Value = p.Id, Text = p.Name }).ToList();
            return Json(listUserType);
        }

        [HttpPost]
        public async Task<ActionResult> Send(mNotificationFilters id)
        {
            clsPusher pusher_data = new clsPusher();

            switch (id.filter_type)
            {
                case 0://همه
                    pusher_data.interests = new string[1];
                    pusher_data.interests[0] = "public_user";
                    //pusher_data.interests[1] = "userid13";        
                    break;
                case 1://نوع کاربران
                    var list_by_type = _context.tblUser.Where(u => u.IdUserType == id.filter_user_type && u.StateDelete == false).Select(u => u.Id).ToList();
                    if (list_by_type.Count > 0)
                    {
                        pusher_data.interests = new string[list_by_type.Count];
                        //pusher_data.interests[0] = "public_user";
                        for (int i = 0; i < list_by_type.Count; i++)
                        {
                            pusher_data.interests[i] = "userid" + list_by_type[i].ToString();
                        }
                    }
                    break;
                case 2://جنسیت کاربران
                    var list_by_gender = _context.tblUser.Where(u => u.Sex == id.filter_gender && u.StateDelete == false).Select(u => u.Id).ToList();
                    if (list_by_gender.Count > 0)
                    {
                        pusher_data.interests = new string[list_by_gender.Count];
                        //pusher_data.interests[0] = "public_user";
                        for (int i = 0; i < list_by_gender.Count; i++)
                        {
                            pusher_data.interests[i] = "userid" + list_by_gender[i].ToString();
                        }
                    }
                    break;
                case 3://محصولات خریداری شده
                    
                    var list_by_buy_product = (from rp in _context.tblUserRegisterProduct
                                               join ps in _context.tblProductsSerial
                                               on rp.IdProductSerial equals ps.Id
                                               where rp.StateDelete == false && ps.StateDelete == false
                                               && ps.IdProduct == id.filter_buy_product
                                               select new { Id = rp.IdUser }).ToList();
                    if (list_by_buy_product.Count > 0)
                    {
                        pusher_data.interests = new string[list_by_buy_product.Count];
                        //pusher_data.interests[0] = "public_user";
                        for (int i = 0; i < list_by_buy_product.Count; i++)
                        {
                            pusher_data.interests[i] = "userid" + list_by_buy_product[i].ToString();
                        }
                    }
                    break;
                case 4://نوع خودرو
                    var list_by_user_car = (from uc in _context.tblUserCar
                                            where uc.StateDelete == false && uc.IdCar == id.filter_user_car
                                            select new { Id = uc.IdUser }).ToList();
                    if (list_by_user_car.Count > 0)
                    {
                        pusher_data.interests = new string[list_by_user_car.Count];
                        //pusher_data.interests[0] = "public_user";
                        for (int i = 0; i < list_by_user_car.Count; i++)
                        {
                            pusher_data.interests[i] = "userid" + list_by_user_car[i].ToString();
                        }
                    }
                    break;
                case 5://تاریخ تولد
                    DateTime? user_birthday = clsPersianDate.ShamsiToMiladi(id.filter_user_birthday);

                    var list_by_user_birthday = (from u in _context.tblUser
                                                 where u.StateDelete == false && u.DateBirthday.Value.Date.Equals(user_birthday.Value.Date)
                                                 select new { u.Id }).ToList();
                    if (list_by_user_birthday.Count > 0)
                    {
                        pusher_data.interests = new string[list_by_user_birthday.Count];
                        //pusher_data.interests[0] = "public_user";
                        for (int i = 0; i < list_by_user_birthday.Count; i++)
                        {
                            pusher_data.interests[i] = "userid" + list_by_user_birthday[i].ToString();
                        }
                    }
                    break;
            }

            //string message = "{'Id' = 1,'Title' = '" + id.notify_title_2 + "','Text' = '" + id.notify_text_2 + "','Image' = 'img/notify/" + id.notify_image_url + "','IdProduct' = " + id.IdProduct + "}";

            clsMessage message = new clsMessage();
            message.Id = 1;
            message.IdProduct = id.IdProduct;
            message.Title = id.notify_title_2;
            message.Text = id.notify_text_2;
            message.Image = id.notify_image_url;

            pusher_data.fcm = new clsFcm()
            {
                notification = new clsNotification()
                {
                    android_channel_id = "1",
                    body = id.notify_text_1,
                    color = "#ffff00",
                    sound = "default",
                    tag = "1",
                    title = id.notify_title_1
                },
                data = new clsData()
                {
                    click_action = "notification_click",
                    message = message
                }
            };

            string state = "";

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.TryAddWithoutValidation(clsSetting.PUSHER_HEADER_KEY1, clsSetting.PUSHER_HEADER_VALUE1);
                client.DefaultRequestHeaders.TryAddWithoutValidation(clsSetting.PUSHER_HEADER_KEY2, "Bearer " + clsSetting.PUSHER_SECRET_KEY);
                var stringContent = new StringContent(JsonConvert.SerializeObject(pusher_data), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(clsSetting.PUSHER_URL, stringContent);
                string content = await response.Content.ReadAsStringAsync();
                if (response.IsSuccessStatusCode)
                {
                    clsResult model = JsonConvert.DeserializeObject<clsResult>(content);
                    state = "1";

                    tblNotification notify = new tblNotification();
                    notify.IdProduct = pusher_data.fcm.data.message.IdProduct;
                    notify.Image = pusher_data.fcm.data.message.Image;
                    notify.Text = pusher_data.fcm.data.message.Text;
                    notify.Title = pusher_data.fcm.data.message.Title;
                    notify.StateDelete = false;
                    notify.Date_Insert = DateTime.Now;
                    notify.Recievers = pusher_data.interests.ToString();
                    _context.tblNotification.Add(notify);
                    _context.SaveChanges();

                }
                else
                {
                    clsResult model = new clsResult { publishId = "ERROR" };
                    state = "-1";
                }
            }
            return RedirectToAction("Index/" + state);
        }

        public FilePathResult Image()
        {
            string filename = Request.Url.AbsolutePath.Replace("/home/image", "");
            string contentType = "";
            var filePath = new FileInfo(Server.MapPath("~/img/notify") + filename);

            var index = filename.LastIndexOf(".") + 1;
            var extension = filename.Substring(index).ToUpperInvariant();

            // Fix for IE not handling jpg image types
            contentType = string.Compare(extension, "JPG") == 0 ? "image/jpeg" : string.Format("image/{0}", extension);

            return File(filePath.FullName, contentType);
        }

        [HttpPost]
        public ContentResult UploadFiles()
        {
            var r = new List<mUploadFilesResult>();

            foreach (string file in Request.Files)
            {
                HttpPostedFileBase hpf = Request.Files[file] as HttpPostedFileBase;

                Stream stream = hpf.InputStream;
                System.Drawing.Image image = System.Drawing.Image.FromStream(stream);
                int height = image.Height;
                int width = image.Width;

                if (hpf.ContentLength == 0)
                    continue;

                if (width != 760 && height != 500)
                {
                    return Content("{\"name\":\"" + "Image size must be 760 * 500 pixels." + "\",\"type\":\"" + "" + "\",\"size\":\"" + "" + "\"}", "application/json");
                }

                string savedFileName = Path.Combine(Server.MapPath("~/img/notify"), Path.GetFileName(hpf.FileName));
                hpf.SaveAs(savedFileName);

                r.Add(new mUploadFilesResult()
                {
                    Name = hpf.FileName,
                    Length = hpf.ContentLength,
                    Type = hpf.ContentType
                });
            }
            return Content("{\"name\":\"" + r[0].Name + "\",\"type\":\"" + r[0].Type + "\",\"size\":\"" + string.Format("{0} bytes", r[0].Length) + "\"}", "application/json");
        }
    }
}