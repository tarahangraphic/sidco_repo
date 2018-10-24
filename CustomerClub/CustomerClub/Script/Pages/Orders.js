/// <reference path="../ajaxsscrip.min.js" />
/// <reference path="../DataTable/DataTableOrderDetail.js" />
/// <reference path="../modals/modalOrderDetail.js" />
/// <reference path="../model/OrderDetail.js" />
/// <reference path="../DataTable/DataTableOrder.js" />
$(load);

var _orderdetail = new OrderDetail(0, 0, 0, 0, 0);

var _listdataorderdetail = [];

var pname = "";

function load() {
    creatmadolOrderDetail();
    ShowOrder();
    $(btnreturn).click(function () {
        $(divOrderDetail).fadeOut();
        ShowOrder();
        $(btnreturn).fadeOut();
        $(NoInformation).fadeOut();
    });
}

function creatmadolOrderDetail() {
    creatformOrderDetail(RegisterOrderDetail, [
    { name: "ProductName", type: "text", title: "نام محصول" },
    { name: "Count", type: "text", title: "تعداد" },
    { name: "Price", type: "text", title: "قیمت" }],
        [{ caption: "ثبت", event: OrderDetailregister, Class: "info", IsClose: false },
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }],
        "ویرایش جزئیات سفارش");
}

function OrderDetailregister() {
    _orderdetail.Count = Count.value;
    _orderdetail.Price = Price.value;
    if ($('#Count').val() != '' && $('#Price').val() != '') {
        MyAjax("Post", "OrderDetailregister", _orderdetail, function (data) {
            _orderdetail.Id = data.Id;
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            ShowOrderDetail(data.IdOrder);
        });
    }

    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}

function ShowOrder() {
    MyAjax("Get", "ShowOrder", null, ShowGridOrder);
}

function ShowGridOrder(listdataorder) {
    $(divOrder).fadeIn();
    DataTableOrder(listdataorder,
        [{ Data: "Id", Title: "Id" },
        { Data: "Date_Insert", Title: "تاریخ ثبت سفارش" },
        { Data: "UserFullName", Title: "نام کاربر" },
        { Data: "Description", Title: "توضیحات" },
       { Data: "OrderState", Title: "وضعیت سفارش" },
       { Data: "DateStateEditing", Title: "تاریخ آخرین تغییرات" }],
        divOrder,
        { RowNumber: true },
        [{
            Text: "جزئیات",
            Icon: "icon-list",
            class: "btn btn-blue",
            event: ShowOrderDetail
        },
        {
            Text: "تایید",
            Icon: "icon-check",
            class: "btn btn-success",
            event: ConfirmOrder
        },
        {
            Text: "عدم تایید",
            Icon: "icon-cancel",
            class: "btn btn-danger",
            event: NotConfirmOrder
        }]);
}

function ConfirmOrder(id) {
    MyAjax("Post", "ConfirmOrder", { "Id": id }, function (listdata) {
        ShowGridOrder(listdata);
    });
}

function NotConfirmOrder(id) {
    MyAjax("Post", "NotConfirmOrder", { "Id": id }, function (listdata) {
        ShowGridOrder(listdata);
    });

}

function ShowOrderDetail(id) {
    MyAjax("Get", "ShowOrderDetail", { "Id": id }, ShowGridOrderDetail);
}

function ShowGridOrderDetail(listdataorderdetail) {
    _listdataorderdetail = listdataorderdetail;
    $(divOrder).fadeOut();
    $(divOrderDetail).fadeIn();
    $(btnreturn).fadeIn();
    DataTableOrderDetail(listdataorderdetail,
       [{ Data: "Id", Title: "Id" },
       { Data: "ProductName", Title: "نام محصول" },
       { Data: "Date_Insert", Title: "تاریخ ثبت" },
       { Data: "Date_Update", Title: "تاریخ آخرین تغییرات" },
      { Data: "Count", Title: "تعداد" },
      { Data: "Price", Title: "قیمت" },
      { Data: "Total", Title: "قیمت کل" }],
       divOrderDetail,
       { RowNumber: true },
       [{
           Text: "حذف",
           Icon: "icon-trash",
           class: "btn btn-danger",
           event: DeleteOrderDetail
       },
       {
           Text: "ویرایش",
           Icon: "icon-pencil",
           class: "btn btn-blue",
           event: EditOrderDetail
       }])
}

function DeleteOrderDetail(id) {
    MyAjax("Post", "DeleteOrderDetail", { "Id": id }, function (listdata) {
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
        ShowGridOrderDetail(listdata);


    })
}

function EditOrderDetail(id) {
    btnRegisterOrderDetail.click();
    var find = false;
    for (var i in _listdataorderdetail) {
        if (_listdataorderdetail[i].Id == id) {
            find = true;
            _orderdetail.Count = _listdataorderdetail[i].Count;
            _orderdetail.Id = _listdataorderdetail[i].Id;
            _orderdetail.IdOrder = _listdataorderdetail[i].IdOrder;
            _orderdetail.IdProduct = _listdataorderdetail[i].IdProduct;
            _orderdetail.Price = _listdataorderdetail[i].Price;
            pname = _listdataorderdetail[i].ProductName;
            break;
        }
    }
    if (find == true) {
        Count.value = _orderdetail.Count;
        Price.value = _orderdetail.Price;
        ProductName.value = pname;
    }
}
