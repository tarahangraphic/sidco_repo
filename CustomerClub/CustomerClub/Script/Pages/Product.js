/// <reference path="../DataTablePhoto/DataTableProduct.js" />
/// <reference path="../ajaxsscrip.min.js" />

$(load);
var _product = new product(0, "", "", 0,"");
var _listproduct = [];
var _listproductGroup = [];
var titlename = [];

function load() {
    CreateModalsProduct();
    CreateModalsProductList();
   
    ShowProduct();
    $(btnRegisterlist).click(function () {
        IdParent.value = _product.IdParent;
    });
}

function CreateModalsProduct() {

    creatformProduct(Productregister, [
        { name: "Name", type: "text", title: "نام دسته بندی" },
        { name: "Code", type: "text", title: "کد دسته بندی"}],
        [{ caption: "ثبت", Class: "info", event:RegisterProduct},
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت گروه محصول جدید");
}

function CreateModalsProductList() {
    creatformProductList(ProductListregister, [
        { name: "Names", type: "text", title: "نام کالا" },
        { name: "Codes", type: "text", title: "کد کالا" },
        { name: "IdParent", type: "text", title: "کد گروه" },
        { name: "Models", type: "text", title: "نام مدل" }],
        [{ caption: "ثبت", Class: "info", event:RegisteGroupProduct},
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], " ثبت محصول جدید ");
}

function RegisterProduct() {
    _product.Code = Code.value;
    _product.Name = Name.value;
    if ($('#Code').val() != '' && $('#Name').val() != '') {
        MyAjax("post", "RegisterProduct", _product, function (data) {
            _product.Id = data.Id;
            ShowProduct();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _product.Id = 0;
        })
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}

function RegisteGroupProduct() {
    _product.IdParent = IdParent.value;
    _product.Code = Codes.value;
    _product.Model = Models.value;
    _product.Name = Names.value;
    if ($('#IdParent').val() != 0 && $('#Codes').val() != '' && $('#Models').val() != '' && $('#Names').val() != '') {
        MyAjax("post", "RegisterListProduct", _product, function (data) {
            _product.Id = data.Id;
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            ListGoroupProduct(IdParent.value);
            _product.Id = 0;

        });
    }
    else {

        $('#modal_notify2').fadeIn();
        $('#modal_notify2').fadeOut(4000);
        return;
    }
    $('.modal').modal('hide');
}

function ShowProduct() {
    $(btnRegisterProduct).fadeIn();
    $(btnRegisterlist).fadeOut();
    $(btnReturn).fadeOut();
    TitlePage.innerHTML = "لیست گروه های محصولات  "
    MyAjax("Get", "ShowProduct", null, showgrid);
}

function showgrid(listProduct) {
    _listproduct = listProduct;
    $(divProduct).fadeIn();
    $(divProductlist).fadeOut();
    _listproduct = listProduct;
    DataTableProduct(listProduct,[{ Data: "Id", Title: "Id" },
        { Data: "Name", Title: "نام دسته بندی" },
        { Data: "Code", Title: "کد دسته بندی" }], divProduct,
        [{ Text: "ویرایش", Icon: "pencil", class: "btn btn-blue", event: EditProduct },
            { Text: "حذف", Icon: "trash", class: "btn btn-danger", event: DeleteProduct },
            { Text: "محصولات", Icon: "list", class: "btn btn-info", event:ListGoroupProduct},
            { Text: "بالا", Icon: "up", class: "btn btn-black btn-outline", event: SortUpProduct },
            { Text: "پایین", Icon: "down", class: "btn btn-black btn-outline", event: SortDownProduct }],
        { RowNumber: true },null);
}



function EditProduct(id) {
    btnRegisterProduct.click();
    var _find = false;
    for (var i in _listproduct) {
        if (_listproduct[i].Id == id) {
            _find = true;
            _product.Code = _listproduct[i].Code;
            _product.Name = _listproduct[i].Name;
            _product.Id = _listproduct[i].Id;
            _product.Model = _listproduct[i].Model;
            break;
        }
    }
    if (_find == true) {
        Code.value = _product.Code;
        Name.value=_product.Name;
        Model.value=_product.Model;
    }
}

function DeleteProduct(id) {
    if (!confirm("آیا از انجام عملیات مطمئن هستید؟"))
        return;
    MyAjax("Post", "DeleteProduct", { "Id": id }, function () {
        ShowProduct();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);

    });

}

function ListGoroupProduct(id) {
    _product.IdParent = id;
    for (var i in _listproduct) {
        if (_listproduct[i].Id == _product.IdParent) {
            titlename.Name = _listproduct[i].Name;
        }
        TitlePage.innerHTML = "نام گروه محصول : "+titlename.Name;
    }
    MyAjax("Get", "showlistproduct", { "Id": id }, ShowGridGoupProduct);
}

function ShowGridGoupProduct(listproductGroup) {
    $(divProduct).fadeOut();
    $(divProductlist).fadeIn();

    $(btnRegisterProduct).fadeOut();
    $(btnRegisterlist).fadeIn();
    $(btnReturn).fadeIn();

    _listproductGroup = listproductGroup;
    DataTableProduct(listproductGroup, [{ Data: "Id", Title: "Id" },
    { Data: "Name", Title: "نام کالا" },
    { Data: "Model", Title: "مدل" },
    { Data: "Code", Title: "کد کالا" }], divProductlist,
        [{ Text: "ویرایش", Icon: "pencil", class: "btn btn-blue", event: EditGroupProduct },
        { Text: "حذف", Icon: "trash", class: "btn btn-danger", event: DeleteProductGroup },
        { Text: "بالا", Icon: "up", class: "btn btn-black btn-outline", event: SortUpProductGroup },
        { Text: "پایین", Icon: "down", class: "btn btn-black btn-outline", event: SortDownProductGroup }],
        { RowNumber: true },
        [{ Text: "عکس محصول", Icon: "camera", class: "btn btn-primary btn-dot", event: null },
            { Text: "ویژگی محصول", Icon: "archive", class: "btn btn-primary btn-dot", event: ProductPrperty },
            { Text: "پیشنهاد در صفحه اصلی", Icon: "bell", class: "btn btn-primary btn-dot", event: RegisterProductSugesstion },
            { Text: "خودرو های مرتبط", Icon: "car", class: "btn btn-primary btn-dot", event: ShowCarProduct },
            { Text: "محصولات مرتبط", Icon: "link", class: "btn btn-primary btn-dot", event: ShowRelativProduct }]);
    $(btnReturn).click(function () {
        ShowProduct();
    });
}

function EditGroupProduct(id) {
    btnRegisterlist.click();
    var _find = false;
    for (var i in _listproduct) {
        if (_listproductGroup[i].Id == id) {
            _find = true;
            _product.Code = _listproductGroup[i].Code;
            _product.Name = _listproductGroup[i].Name;
            _product.Id = _listproductGroup[i].Id;
            _product.Model = _listproductGroup[i].Model;
            _product.IdParent = _listproductGroup[i].IdParent;
            break;
        }
    }
    if (_find == true) {
        Codes.value = _product.Code;
        Names.value = _product.Name;
        Models.value = _product.Model;
        IdParent.value = _product.IdParent;
    }
}

function DeleteProductGroup(id) {
if (!confirm("آیا از انجام عملیات مطمئن هستید؟"))
        return;
MyAjax("Post", "DeleteProduct", { "Id": id }, function () {
    ListGoroupProduct();
    $(deleteinformation).fadeIn();
    $(deleteinformation).fadeOut(3000);
    });
}

function SortUpProductGroup(id) {
    MyAjax("Post", "SortUpProductGroup", { "Id": id },ShowGridGoupProduct);
}

function SortDownProductGroup(id) {
    MyAjax("Post", "SortDownProductGroup", { "Id": id }, ShowGridGoupProduct);
}


function SortUpProduct(id) {
    MyAjax("Post", "SortUpProduct", { "Id": id }, function () {
        ShowProduct();
    });
}

function SortDownProduct(id) {
    MyAjax("Post", "SortDownProduct", { "Id": id }, function () {
        ShowProduct();
    });
}


function ProductPrperty(id) {
    location.href = "../ProductProperty/Index/" + id;
}

function RegisterProductSugesstion(id) {
    MyAjax("Post", "/ProductSuggestion/RegisterProductSuggestion", { "Id": id },location.href = "../ProductSuggestion/Index");
}

function ShowCarProduct(id) {
    location.href = "../CarProduct/Index/" + id;
}

function ShowRelativProduct(id) {
    location.href = "../RelativProduct/Index/" + id;
}