/// <reference path="../DataTable/DataTable.js" />
/// <reference path="../ajaxsscrip.min.js" />
$(load);

function load(){
    ShowUserReq();
}

function ShowUserReq() {
    MyAjax("Get", "/Users/showuserRequest", null, ShowGridUserReq);
}

function ShowGridUserReq(ListUserReq) {
    DataTableUsersRequest(ListUserReq, [{ Data: "Id", Title: "Id" },
   { Data: "Fname", Title: "نام" },
   { Data: "Lname", Title: "نام خانوادگی" },
   { Data: "CodeMelli", Title: "کدملی" },
   { Data: "Name", Title: "شهر" },
   { Data: "Mobile", Title: "موبایل" },
   { Data: "usertyprname", Title: "نوع کاربر" }], DivUserReq, null,
       { RowNumber: true },
   [{
       Text: "مکانیک",
       Icon: "check",
       class: "btn btn-success btn-dot",
       event: confermrequestMechanic
   },
   {
       Text: "نمایندگی فروش",
       Icon: "check",
       class: "btn btn-success btn-dot",
       event: confermrequestSell
   },
   {
       Text: "نمایندگی خدمات پس از فروش",
       Icon: "check",
       class: "btn btn-success btn-dot",
       event: confermrequestSellAndServicesAfter
   },
   {
       Text: "عدم تایید",
       Icon: "cancel",
       class: "btn btn-danger btn-dot",
       event: notconfirm
   }]);
}

function confermrequestMechanic(id) {
    MyAjax("post", "/Users/confermrequestMechanic", { "Id": id }, function (data) {
        ShowGridUserReq(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
}

function confermrequestSell(id) {
    MyAjax("post", "/Users/confermrequestSell", { "Id": id }, function (data) {
        ShowGridUserReq(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
    
}

function confermrequestSellAndServicesAfter(id) {
    MyAjax("post", "/Users/confermrequestSellAndServicesAfter", { "Id": id }, function (data) {
        ShowGridUserReq(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });

}

function notconfirm(id) {
    MyAjax("post", "/Users/notconfirm", { "Id": id }, function (data) {
        ShowGridUserReq(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
}