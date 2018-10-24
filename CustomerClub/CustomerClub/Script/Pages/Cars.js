window.onload = load;
var _Cars = new Cars(0, "",0);
var listCar = [];
var listgroupCar = [];
var titlename = [];
function load() {
    CreateModalsCar();
    CreateModalsListCar();
    ShowCar();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();
}
function CreateModalsCar() {

    creatformCars(Carregister, [{ name: "names", type: "text", title: "نام برند" }],
        [{ caption: "ثبت", event: RegisterCar, Class: "info"},
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت برندهای خودروساز");
    $(btnexit).click(function () {
        _Cars.Id = 0;
    });
}
function CreateModalsListCar() {
    creatformListCar(CarListregister, [{ name: "Name", type: "text", title: "نام خودرو" },
        { name: "IdParent", type: "text", title: "کد گروه" }],
        [{ caption: "ثبت", event: RegisterCarList, Class: "info"},
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت خودرو");
    $(btnRegisterlist).click(function () {
        $(IdParent).attr("disabled", "disabled");
    });
    $(btnexit).click(function () {
        _Cars.Id = 0;
    });
}
function ShowCar() {
    $(btnRegisterCar).fadeIn();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();

    MyAjax("Get", "ShowCar", null, showgrid);
}
function showgrid(listCars) {
    listCar = listCars;
    $(divcar).fadeIn();
    $(divcarlist).fadeOut();
    TitlePage.innerHTML = "اطلاعات";
    DataTableCar(listCars, [{ Data: "Id", Title: "Id" },
        { Data: "Name", Title: "عنوان" }], divcar, { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editCars },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteCars },
        { Text: "زیرگروه", Icon: "icon-list-add", class: "btn btn-info", event: grouplistCars },
        { Text: "بالا", Icon: "icon-up-circled", class: "btn btn-black btn-outline", event: sortupCars },
        { Text: "پایین", Icon: "icon-down-circled", class: "btn btn-black btn-outline", event: sortdownCars }]);
}
function deleteCars(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteCar", { "ID": id }, function (data) {
        ShowCar();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editCars(id) {
    btnRegisterCar.click();
    var _find = false;
    for (var i in listCar) {
        if (listCar[i].Id == id) {
            _find = true;
            _Cars.Id = listCar[i].Id;
            _Cars.Name = listCar[i].Name;
            break;
        }
    }
    if (_find) {
        names.value = _Cars.Name;
    }

}
function grouplistCars(id) {
    _Cars.IdParent = id;
    for (var i in listCar) {
        if (listCar[i].Id == _Cars.IdParent) {
            titlename.Name = listCar[i].Name;
        }
    }
    TitlePage.innerHTML = "نام برند خودروساز : " + titlename.Name;
    MyAjax("Get", "grouplistCar", { "ID": id }, showCarlist);
    $(btnRegisterCar).fadeOut();
    $(btnRegisterlist).fadeIn();
    $(btnReturn).fadeIn();
    $(divcar).fadeOut();
    $(divcarlist).fadeIn();
}
function showCarlist(listgroupCars) { 
    listgroupCar = listgroupCars;
    DataTableCar(listgroupCars, [{ Data: "Id", Title: "Id" },
            { Data: "Name", Title: "عنوان" }], divcarlist,
            { RowNumber: true },
            [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editlistCar },
            { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deletelistCars },
            {
                Text: "بالا", Icon: "icon-up-circled",
                class: "btn btn-black btn-outline",
                event: sortupcarlist
            },
            {
                Text: "پایین", Icon: "icon-down-circled",
                class: "btn btn-black btn-outline",
                event: sortdowncarlist
            }]);
        $("#btnRegisterlist").click(function () {
        IdParent.value = _Cars.IdParent;
    });
    $("#btnReturn").click(function () {
        ShowCar();
        TitlePage.innerHTML = "اطلاعات";
    });
}
function deletelistCars(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteCar", { "ID": id }, function (data) {
        showCarlistChang(data.Id);
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editlistCar(id) {
    btnRegisterlist.click();
    var _find = false;
    for (var i in listgroupCar) {
        if (listgroupCar[i].Id == id) {
            _find = true;
            _Cars.Id = listgroupCar[i].Id;
            _Cars.Name = listgroupCar[i].Name;
            _Cars.IdParent = listgroupCar[i].IdParent;
            break;
        }
    }
    if (_find) {
        Name.value = _Cars.Name;
        IdParent.value = _Cars.IdParent;
    }
}
function RegisterCar() {
    _Cars.Name = names.value;
    if ($('#names').val() != '') {
        MyAjax("Post", "RegisterCar", _Cars, function (data) {
            _Cars.Id = data.Id;
            ShowCar();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _Cars.Id = 0;
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}
function RegisterCarList() {
    _Cars.Name = Name.value;
    _Cars.IdParent = IdParent.value;
    if ($('#Name').val() != '' && $('#IdParent').val() != 0) {
        MyAjax("Post", "RegistergroupCar", _Cars, function (Data) {
            _Cars.Id = Data.Id;
            ShowRegisterGroup(Data.IdParent);
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _Cars.Id = 0;
        });
    }
    else {

        $('#modal_notify2').fadeIn();
        $('#modal_notify2').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}
function sortupCars(id) {
    MyAjax("Post", "sortupCars", { "Id": id }, function (Data) {
        ShowCar();
    });
}
function sortdownCars(id) {
    MyAjax("Post", "sortdownCars", { "Id": id }, function (Data) {
        ShowCar();
    });
}
function sortupcarlist(id) {
    MyAjax("Post", "sortupcarlist", { "Id": id }, showCarlist);
}
function sortdowncarlist(id) {
    MyAjax("Post", "sortdowncarlist", { "Id": id }, showCarlist);
}
function ShowRegisterGroup(IdParent) {
    MyAjax("Get", "showregistergroup", { "IdParent": IdParent }, showCarlist);

}