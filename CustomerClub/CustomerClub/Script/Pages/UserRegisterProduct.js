window.onload = load;
var _UserRegisterProduct = new UserRegisterProduct(0, 0, 0, "", "", "");
var _ListUserRegisterProduct = [];
function load() {
    CreateModals();
    showUserRegisterProduct();
    ShowUser();
    showProductSerial();
}
function CreateModals() {
    creatformUserRegisterProduct(UserRegisterproductRegister,
        [{ name: "Id", type: "hidden", title: "" },
            {
                name: "IdProductSerial",
                type: "select",
                title: "IdProductSerial"
            },
            {
                name: "IdUser",
                type: "select",
                title: "عکس"
            },
            {
                name: "DateRegister",
                type: "text",
                title: "DateRegister"
            },
            {
                name: "Point",
                type: "text",
                title: "Point"
            },
            {
                name: "StateBreakDown",
                type: "select",
                title: "StateBreakDown"
            }],
        [{
            caption: "ثبت",
            event: RegisterUserRegisterProduct,
            Class: "primary",
            IsClose: true
        },
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }],
        "ثبت مشتری");
        $("#btnexit").click(function () {
            _UserRegisterProduct.Id = 0;
            $(Id).attr("value", 0);
        });
}
function showUserRegisterProduct() {
    MyAjax("Get", "ShowUserRegisterProduct", null, showgrid);
}
function showgrid(ListUserRegisterProduct) {
    _ListUserRegisterProduct = ListUserRegisterProduct;

    DataTableCustomer(ListUserRegisterProduct, [
        { Data: "Id", Title: "Id" },
        { Data: "Name", Title: "Name" },
        { Data: "Serial", Title: "Serial" },
        { Data: "Point", Title: "Point" },
        { Data: "StateBreakDown", Title: "StateBreakDown" },
        { Data: "DateRegister", Title: "DateRegister" }],
        divUserRegisterproduct,
        { RowNumber: true },
        [{
            Text: "ویرایش",
            Icon: "edit",
            class: "btn btn-primary",
            event: editUserRegisterProduct
        },
            {
                Text: "حذف",
                Icon: "remove",
                class: "btn btn-danger",
                event: deleteUserRegisterProduct
            }]);
}
function deleteUserRegisterProduct(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteUserRegisterProduct", { "ID": id }, function (data) {
        showUserRegisterProduct();
        alert("حذف انجام شد");
    });
}
function editUserRegisterProduct(id) {
    btnRegisterUserRegisterproduct.click();
    var _find = false;
    for (var i in _ListUserRegisterProduct) {
        if (listCustomer[i].Id == id) {
            _find = true;
            _UserRegisterProduct.Id = _ListUserRegisterProduct[i].Id;
            _UserRegisterProduct.IdProductSerial = _ListUserRegisterProduct[i].IdProductSerial;
            _UserRegisterProduct.IdUser = _ListUserRegisterProduct[i].IdUser;
            _UserRegisterProduct.DateRegister = _ListUserRegisterProduct[i].DateRegister;
            _UserRegisterProduct.Point = _ListUserRegisterProduct[i].Point;
            _UserRegisterProduct.StateBreakDown = _ListUserRegisterProduct[i].StateBreakDown;

            break;
        }
    }
    if (_find) {
        Id.value = _UserRegisterProduct.Id;
        IdProductSerial.value = _UserRegisterProduct.IdProductSerial;
        IdUser.value = _UserRegisterProduct.IdUser;
        DateRegister.value = _UserRegisterProduct.DateRegister;
        Point.value = _UserRegisterProduct.Point;
        StateBreakDown.value = _UserRegisterProduct.StateBreakDown;
    }
}
function RegisterUserRegisterProduct() {
    _UserRegisterProduct.DateRegister = DateRegister.value;
    _UserRegisterProduct.IdProductSerial = IdProductSerial.value;
    _UserRegisterProduct.IdUser = IdUser.value;
    _UserRegisterProduct.Point = Point.value;
    _UserRegisterProduct.StateBreakDown = StateBreakDown.value;
    MyAjax("post", "RegisterUserRegisterProduct", _UserRegisterProduct, function (data) {
        _UserRegisterProduct.Id = data.Id;
        alert("success");
    showUserRegisterProduct();
    _UserRegisterProduct.Id = 0;
    });
    
}
function ShowUser() {
    fillselectwithoutfunction("ShowUser",IdUser);
}
function showProductSerial() {
    fillselectwithoutfunction("showProductSerial", IdProductSerial );

}
