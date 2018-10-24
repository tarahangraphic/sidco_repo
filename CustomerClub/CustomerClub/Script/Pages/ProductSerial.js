window.onload = load;
var _ProductSerial = new ProductSerial(0, 0, "", "");
var _listProductSerial = [];
function load() {
    CreateModals();
    showProductSerial();
    ShowProduct();
}
function CreateModals() {
    creatformProductSerial(ProductSerialRegister, [
        { name: "Id", type: "hidden", title: "" },
        { name: "IdProduct", type: "select", title: "IdProduct" },
        { name: "Serial", type: "text", title: "Serial" }],
        [{ caption: "ثبت", event: RegisterProductSerial, Class: "primary"},
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }],
        "ثبت مشتری");
    $("#btnexit").click(function () {
        _ProductSerial.Id = 0;
        $(Id).attr("value", 0);
    });
}
function showProductSerial() {
    MyAjax("Get", "ShowPoductSerial", null, showgrid);
}
function showgrid(listProductSerial) {
    _listProductSerial = listProductSerial;

    DataTableProductSerial(listProductSerial, [
        { Data: "Id", Title: "Id" },
        { Data: "Name", Title: "Name" },
        { Data: "Serial", Title: "Serial" }], divProductSerial,
        { RowNumber: true },
        [{ Text: "ویرایش", Icon: "edit", class: "btn btn-primary", event: editProductSerial },
        { Text: "حذف", Icon: "remove", class: "btn btn-danger", event: deleteProductSerial }]);
}
function deleteProductSerial(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeletePoductSerial", { "ID": id }, function (data) {
        showProductSerial();
        alert("حذف انجام شد");
    });
}
function editProductSerial(id) {
    btnRegisterProductSerial.click();
    var _find = false;
    for (var i in listCustomer) {
        if (listCustomer[i].Id == id) {
            _find = true;
            _ProductSerial.Id = listCustomer[i].Id;
            _ProductSerial.IdProduct = listCustomer[i].IdProduct;
            _ProductSerial.Serial = listCustomer[i].Serial;
            _ProductSerial.DateProduce = listCustomer[i].DateProduce;

            break;
        }
    }
    if (_find) {
        Id.value = _ProductSerial.Id;
        IdProduct.value = _ProductSerial.IdProduct;
        Serial.value = _ProductSerial.Serial;
        DateProduce.value = _ProductSerial.DateProduce;

    }
}
function RegisterProductSerial() {
    _ProductSerial.IdProduct = IdProduct.value;
    _ProductSerial.Serial = Serial.value;
    _ProductSerial.DateProduce = DateProduce.value;
    if ($('#IdProduct').val() != 0 && $('#Serial').val() != '' && $('#DateProduce').val() != '') {
        MyAjax("post", "RegisterPoductSerial", _ProductSerial, function (data) {
            _ProductSerial.Id = data;
            showProductSerial();
            alert("success");
            _ProductSerial.Id = 0;
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}
function ShowProduct() {
    fillselectwithoutfunction("ShowProduct", IdProduct);
}