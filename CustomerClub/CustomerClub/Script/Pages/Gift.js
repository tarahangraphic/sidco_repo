/// <reference path="../modals/modalGift.js" />
/// <reference path="../model/Gift.js" />
/// <reference path="../ajaxsscrip.min.js" />
$(load);

var _gift = new Gift(0, 0, "", "", 0);

var _ListDataGift = [];

function load() {
    CreateModalsGift();
    showgifts();
    ShowProduct();
    ShowProductList();
}

function CreateModalsGift() {
    creatformGift(GiftRegister, [
        { name: "Title", type: "text", title: "عنوان هدیه" },
    { name: "Name", type: "text", title: "نام هدیه" },
    { name: "IdProduct", type: "select", title: "گروه اصلی محصول" },
    { name: "IdProductList", type: "select", title: "محصول" },
    { name: "MinPoint", type: "text", title: "امتیاز" }],
       [{ caption: "ثبت", event: RegisterGifts, Class: "info"},
           { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت هدیه جدید");

    $(document).ready(function () {
        $(".numericOnly").bind('keypress', function (e) {
            if (e.keyCode == '9' || e.keyCode == '16') {
                return;
            }
            var code;
            if (e.keyCode) code = e.keyCode;
            else if (e.which) code = e.which;
            if (e.which == 46)
                return false;
            if (code == 8 || code == 46)
                return true;
            if (code < 48 || code > 57)
                return false;
        });

        //Disable paste
        $(".numericOnly").bind("paste", function (e) {
            e.preventDefault();
        });

        $(".numericOnly").bind('mouseenter', function (e) {
            var val = $(this).val();
            if (val != '0') {
                val = val.replace(/[^0-9]+/g, "")
                $(this).val(val);
            }
        });
    });

    $(IdProduct).change(function () {
        var _id = IdProduct.value;
        ShowProductList(_id);
    });
    $(btnexit).click(function () {
        _gift.Id = 0;
    });
}

function RegisterGifts() {
    _gift.IdProduct = IdProductList.value;
    _gift.MinPoint = MinPoint.value;
    _gift.Name = Name.value;
    _gift.Title = Title.value;
    if ($('#IdProductList').val() != 0 && $('#MinPoint').val() != '' && $('#Name').val() != '' && $('#Title').val() != '') {
        MyAjax("Post", "RegisterGift", _gift, function (data) {
            _gift.Id = data.Id;
            showgifts();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _gift.Id = 0;
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}

function showgifts() {
    MyAjax("Get", "ShowGift", null, showgridGift);
}

function showgridGift(ListDataGift) {
//    ,
//{ Data: "Image", Title: "عنوان" }
    _ListDataGift = ListDataGift;
    DataTableGift(ListDataGift, [
        { Data: "Id", Title: "Id" },
    { Data: "Title", Title: "عنوان" },
    { Data: "Name", Title: "نام هدیه" },
    { Data: "ProductName", Title: "نام کالا" }], divGift, { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: EditGift },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: DeleteGift },
        { Text: "بالا", Icon: "icon-up", class: "btn btn-black btn-outline", event: SortUpGift },
        { Text: "پایین", Icon: "icon-down", class: "btn btn-black btn-outline", event: SortDownGift }]);
}

function EditGift(id) {
    btnGiftRegister.click();
    var _find = false;
    for (var i in _ListDataGift) {
        if (_ListDataGift[i].Id == id) {
            _find = true;
            _gift.Id = _ListDataGift[i].Id;
            _gift.IdProduct = _ListDataGift[i].IdProduct;
            _gift.MinPoint = _ListDataGift[i].MinPoint;
            _gift.Name = _ListDataGift[i].Name;
            _gift.Title = _ListDataGift[i].Title;
            break;
        }
    }
    if (_find == true) {
        IdProductList.value = _gift.IdProduct;
        MinPoint.value = _gift.MinPoint;
        Name.value = _gift.Name;
        Title.value = _gift.Title;
    }
}

function DeleteGift(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("Post","DeleteGift",{"Id": id}, function (listdata) {
        showgridGift(listdata);
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });

}

function SortUpGift(id) {
    MyAjax("post", "SortUpGift", { "Id": id }, showgridGift);
}

function SortDownGift(id) {
    MyAjax("Post", "SortDownGift", { "Id": id }, showgridGift);
}

function ShowProduct() {
    fillselectwithoutfunction("ShowProduct", IdProduct);
}

function ShowProductList(id) {
    
    MyAjax("Get", "ShowProductList", { "Id": id }, function (Listdata) {
        var str = "";
        for (var i in Listdata) {
            str += '<option value="' + Listdata[i].Id + '">' + Listdata[i].Display + '</option>';
        }
        IdProductList.innerHTML = str;
    });
}