window.onload = load;
var _Customer= new Customer(0,"","");
var listCustomer = [];
function load() {
    CreateModals();
    showCustomer();
    SetValidation(document.forms[0]);
}
function CreateModals() {
    creatformCustomer(Customerregister, [{name:"Id",title:""},{ name: "text", type: "text", title: "نام و نام خانوادگی" },
        { name: "imageUploadForm", type: "file", title: "عکس" }],
        [{ caption: "ثبت", Class: "primary"},
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ثبت مشتری جدید");
    $(btnRegisterCustomer).click(function () {
        $(Img1).fadeOut();
    });
    $(document).ready(function () {
      
        $("#imageUploadForm").change(function () {
            Img1.src = URL.createObjectURL(imageUploadForm.files[0]);
            $(Img1).fadeIn();

        });
        $("#btnregisterforCustomer").click(function () {
            var fd = new FormData();
            fd.append("imageUploadForm", imageUploadForm.files[0]);
            if ($('#text').val() != '') {
                $.ajax({
                    url: "registercustomer" + "?" + $(Customerregisterform).serialize(),
                    type: "POST",
                    data: fd,
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false
                }).done(function (data) {
                    if (data.Error) {
                        alert(data.Error);
                    }
                    else
                        $(Successful).fadeIn();
                    $(Successful).fadeOut(3000);
                    showCustomer();
                });
                $(Id).attr("value", 0);
            }
            else {

                $('#modal_notify').fadeIn();
                $('#modal_notify').fadeOut(4000);
                return;
            }
            $('.modal').modal('hide');
        });
        $("#btnexit").click(function () {
            _Customer.Id = 0;
            $(Id).attr("value", 0);
            $(Img1).fadeOut();
        });
    });
}
function showCustomer() {
    MyAjax("Get", "ShowCustomer", null, showgrid);
}
function showgrid(listCust) {
    listCustomer = listCust;

    DataTableCustomer(listCust, [{ Data: "Id", Title: "Id" },
        { Data: "Url", Title: "عکس" },
        { Data: "Text", Title: "نام و نام خانوادگی" }], divCustomer,
        { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-primary", event: editCustomer },
            { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteCustomer }]);
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });

}
function deleteCustomer(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "deleteCustomer", { "ID": id }, function (data) {
        showCustomer();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editCustomer(id) {
    btnRegisterCustomer.click();
    var _find = false;
    for (var i in listCustomer) {
        if (listCustomer[i].Id == id) {
            _find = true;
            _Customer.Id = listCustomer[i].Id;
            //alert(_Customer.Id);
            _Customer.Text = listCustomer[i].Text;
            _Customer.Url = listCustomer[i].Url;
            break;
        }
    }
    if (_find) {
        Id.value = _Customer.Id;
        text.value=_Customer.Text;
        Img1.src = "../img/customers/" + _Customer.Url;
        $(Img1).fadeIn();
    }
}
