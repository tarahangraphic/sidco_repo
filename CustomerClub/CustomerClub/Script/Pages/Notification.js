window.onload = load;
var _Notification = new Notification(0, "", "", "", 0, "");
var _listNotification = [];

function load() {
    CreateModalsNotification();
    CreateModalsListNotification();
    ShowUserType();
    ShowNotification();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();
}

function CreateModalsNotification() {

    creatformNotification(Propertyregister, [{ name: "_title", type: "text", title: "عنوان" }, { name: "_text", type: "text", title: "متن" }, { name: "_product", type: "select", title: "گروه محصول" }, { name: "_product_sub", type: "select", title: "محصول" }],
        [{ caption: "ثبت", event: RegisterProperty, Class: "info", IsClose: true },
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت ویژگی های محصولات");
    $(btnexit).click(function () {
        _Property.Id = 0;
    });
}

function CreateModalsListNotification() {
    creatformNotification(PropertyListregister, [{ name: "sname", type: "text", title: "نام ویژگی" },
        { name: "IdParent", type: "text", title: "کد گروه اصلی" }, { name: "idUserTypePerList", type: "select", title: "کاربران مجاز" }],
        [{ caption: "ثبت", event: RegisterPropertyList, Class: "info", IsClose: true },
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت زیر ویژگی محصولات");
    $(btnRegisterlist).click(function () {
       $(IdParent).attr("disabled", "disabled");
    });
    $(btnexit).click(function () {
        _Property.Id = 0;
    });
}

function ShowNotification() {
    $(btnRegisterProperty).fadeIn();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();

    MyAjax("Get", "ShowProperty", null, showgrid);
}

function showgrid(listProperty) {
    _listProperty = listProperty;
    $(divProperty).fadeIn();
    $(divPropertylist).fadeOut();
    TitlePage.innerHTML = "اطلاعات";
    DataTableProperty(listProperty, [{ Data: "Id", Title: "Id" },
        { Data: "Name", Title: "عنوان" }, { Data: "tName", Title: "نوع کاربر مجاز" }], divProperty, { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editProperty },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteProperty},
        { Text: "زیرگروه", Icon: "icon-list-add", class: "btn btn-info", event: grouplistProperty }]);
}

function ShowUserType()
{
    fillselectwithoutfunction2("ShowUserType", idUserTypePer);
}