window.onload = load;
var _Property = new Property(0, "", 0 , 0 , false);
var _listProperty = [];
var _listgroupProperty = [];
var titlename = [];
function load() {
    CreateModalsProperty();
    CreateModalsListProperty();
    ShowUserType();
    ShowProperty();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();
}
function CreateModalsProperty() {

    creatformProperty(Propertyregister, [{ name: "names", type: "text", title: "نام ویژگی" }, { name: "idUserTypePer", type: "select", title: "کاربران مجاز" }],
        [{ caption: "ثبت", event: RegisterProperty, Class: "info"},
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت ویژگی های محصولات");
    $(btnexit).click(function () {
        _Property.Id = 0;
    });
}
function CreateModalsListProperty() {
    creatformProperty(PropertyListregister, [{ name: "sname", type: "text", title: "نام ویژگی" },
        { name: "IdParent", type: "text", title: "کد گروه اصلی" }, { name: "idUserTypePerList", type: "select", title: "کاربران مجاز" }],
        [{ caption: "ثبت", event: RegisterPropertyList, Class: "info"},
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت زیر ویژگی محصولات");
    $(btnRegisterlist).click(function () {
       $(IdParent).attr("disabled", "disabled");
    });
    $(btnexit).click(function () {
        _Property.Id = 0;
    });
}
function ShowProperty() {
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

function deleteProperty(id) {
    if (!confirm("آیا عملیات حذف انجام شود؟"))
        return;
    MyAjax("post", "DeleteProperty", { "ID": id }, function (data) {
        ShowProperty();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}

function editProperty(id) {
    btnRegisterProperty.click();
    var _find = false;
    for (var i in _listProperty) {
        if (_listProperty[i].Id == id) {
            _find = true;
            _Property.Id = _listProperty[i].Id;
            _Property.Name = _listProperty[i].Name;
            _Property.IdUserTypePermision = _listProperty[i].IdUserTypePermision;
            break;
        }
    }
    if (_find) {
        names.value = _Property.Name;
        idUserTypePer.value = _Property.IdUserTypePermision;
    }
}

function grouplistProperty(id) {
    _Property.IdParent = id;
    for (var i in _listProperty) {
        if (_listProperty[i].Id == _Property.IdParent) {
            titlename.Name = _listProperty[i].Name;
        }
    }
    TitlePage.innerHTML = "  زیرگروه  " + titlename.Name;
    MyAjax("Get", "grouplistProperty", { "ID": id }, showPropertylist);
}
function showPropertylist(listgroupProperty) {
    $(btnRegisterProperty).fadeOut();
    $(btnRegisterlist).fadeIn();
    $(btnReturn).fadeIn();
    $(divProperty).fadeOut();
    $(divPropertylist).fadeIn();
    _listgroupProperty = listgroupProperty;
    DataTableProperty(listgroupProperty, [{ Data: "Id", Title: "Id" },
        { Data: "Name", Title: "عنوان" }, { Data: "tName", Title: "نوع کاربر مجاز" }], divPropertylist, { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editlistProperty },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deletelistProperty }]);

    $("#btnRegisterlist").click(function () {
        IdParent.value = _Property.IdParent;
    });
    $("#btnReturn").click(function () {
        ShowProperty();
        TitlePage.innerHTML = "اطلاعات";
    });
}
function deletelistProperty(id) {
    if (!confirm("آیا عملیات حذف انجام شود؟"))
        return;
    MyAjax("post", "DeleteProperty", { "ID": id }, function (data) {
        showPropertylistChang(data.Id);
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editlistProperty(id) {
    btnRegisterlist.click();
    var _find = false;
    for (var i in _listgroupProperty) {
        if (_listgroupProperty[i].Id == id) {
            _find = true;
            _Property.Id = _listgroupProperty[i].Id;
            _Property.Name = _listgroupProperty[i].Name;
            _Property.IdUserTypePermision = _listgroupProperty[i].IdUserTypePermision;
            break;
        }
    }
    if (_find) {
        sname.value = _Property.Name;
        IdParent.value = _Property.IdParent;
        idUserTypePerList.value = _Property.IdUserTypePermision;
    }
}
function RegisterProperty() {
    _Property.Name = names.value;
    _Property.IdUserTypePermision = idUserTypePer.value;
    if ($('#names').val() != '' && $('#idUserTypePer').val() != 0) {
        MyAjax("Post", "RegisterProperty", _Property, function (data) {
            _Property.Id = data.Id;
            ShowProperty();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _Property.Id = 0;
        });

    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}
function RegisterPropertyList() {
    _Property.Name = sname.value;
    _Property.IdParent = IdParent.value;
    _Property.IdUserTypePermision = idUserTypePerList.value;
    if ($('#sname').val() != '' && $('#IdParent').val() != 0 && $('#idUserTypePerList').val() != 0) {
        MyAjax("Post", "RegistergroupCar", _Property, function (Data) {
            _Property.Id = Data.Id;
            ShowRegisterGroup(Data.IdParent);
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _Property.Id = 0;
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}
function showPropertylistChang(id) {
    MyAjax("Get", "showgrouplist", { "Id": id }, showPropertylist);
}
function ShowRegisterGroup(IdParent) {
    MyAjax("Get", "showregistergroup", { "IdParent": IdParent }, showPropertylist);

}

function ShowUserType()
{
    fillselectwithoutfunction2("ShowUserType", idUserTypePer);
    fillselectwithoutfunction2("ShowUserType", idUserTypePerList);
}