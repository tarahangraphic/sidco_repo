window.onload = load;
var _Services = new Services(0,"","","");

var listServices = [];
function load() {
    CreateModals();
    showServices();
    SetValidation(document.forms[0]);
}
function CreateModals() {
    creatformServices(Servicesregister, [{ name: "Id", type: "hidden", title: "" },
        { name: "text", type: "text", title: "عنوان خدمات" },
        { name: "Description", type: "text", title: "توضیحات" },
    { name: "imageUploadForm", type: "file", title: "عکس" }],
        [{ caption: "ثبت", Class: "primary", IsClose: false },
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "مدیریت خدمات ما");
    $(btnRegisterServices).click(function () {
        $(Img1).fadeOut();
    });
    $(document).ready(function () {
        $(Img1).fadeOut();
        $("#imageUploadForm").change(function () {
            Img1.src = URL.createObjectURL(imageUploadForm.files[0]);
            $(Img1).fadeIn();

        });
        $("#btnregisterforServices").click(function () {
            var fd = new FormData();
            fd.append("imageUploadForm", imageUploadForm.files[0]);





            if ($('#text').val() != '' && $('#Description').val() != '') {

                $.ajax({
                    url: "RegisterServices" + "?" + $(Servicesregisterform).serialize(),
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
                    showServices();
                });

            }
            else {

                $('#modal_notify').fadeIn();
                $('#modal_notify').fadeOut(4000);
                return;
            }

            $('.modal').modal('hide');




            $(Id).attr("value", 0);
        });
        $("#btnexit").click(function () {
            _Services.Id = 0;
            $(Id).attr("value", 0);
        });
    });
}
function showServices() {
    MyAjax("Get", "ShowService", null, showgrid);
}
function showgrid(listService) {
    listServices = listService;

    DataTableServices(listService, [{ Data: "Id", Title: "Id" },
    { Data: "Url", Title: "عکس" },
    { Data: "Text", Title: "عنوان خدمات" },
    { Data: "Description", Title: "توضیحات" }], divServices,
        { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-primary", event: editServices },
            { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteServices }]);
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });

}
function deleteServices(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteServices", { "ID": id }, function (data) {
        showServices();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editServices(id) {
    btnRegisterServices.click();
    var _find = false;
    for (var i in listServices) {
        if (listServices[i].Id == id) {
            _find = true;
            _Services.Id = listServices[i].Id;
            _Services.Text = listServices[i].Text;
            _Services.Description = listServices[i].Description;
            _Services.Url = listServices[i].Url;
            break;
        }
    }
    if (_find) {
        Id.value = _Services.Id;
        text.value = _Services.Text;
        Description.value = _Services.Description;
        Img1.src = "../img/services/" + _Services.Url;
        $(Img1).fadeIn();
    }
}
