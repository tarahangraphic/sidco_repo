
window.onload = load;
var _aboutus = new AboutUs(0, "", "", 0, "");
var listItemAboutUs = [];
var listgroupitemaboutus = [];
var titlename = [];
function load() {
    CreateModalsAboutUs();
    CreateModalsListAboutUs();
    ShowAboutUs();
    $("#savenot").click(function () {
        saveaboutus();
    });
    showtextaboutus();
    $(btnReturn).fadeOut();
    $(btnRegisterlist).fadeOut();
}
function CreateModalsAboutUs() {

    creatformAboutUs(AboutUsregister, [{ name: "Id", type: "hidden", title: "" },
    { name: "names", type: "text", title: "عنوان" }],
        [{ caption: "ثبت", Class: "info", IsClose: false },
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "مدیریت بخش ارتباط با ما");
    $("#btnregisterfor").click(function () {
        _aboutus.Name = names.value;


        if ($('#names').val() != '') {

            MyAjax("Post", "RegisterAboutUs", _aboutus, function (data) {
                _aboutus.Id = Id.value;
                ShowAboutUs();
                $(Successful).fadeIn();
                $(Successful).fadeOut(3000);
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
        _aboutus.Id = 0;
        $(Id).attr("value", 0);
    });
}
function CreateModalsListAboutUs() {
    creatformListAboutUs(AboutUsregisterlist, [{ name: "ID", type: "hidden", title: "" },
    { name: "Name", type: "text", title: "عنوان" },
    { name: "text", type: "text", title: "اطلاعات" },
    { name: "idParent", type: "text", title: "کد گروه" },
    { name: "imageUploadForm", type: "file", title: "عکس" }],
        [{ caption: "ثبت", Class: "info", IsClose: false },
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ارتباط با ما");
    $(btnRegisterlist).click(function () {
        $(idParent).attr("disabled", "disabled");
        idParent.value = _aboutus.IdParent;
    });
    $(document).ready(function () {

        $("#imageUploadForm").change(function () {
            Img1.src = URL.createObjectURL(imageUploadForm.files[0]);
            $(Img1).fadeIn();

        });
        $("#btnregisterfor2").click(function () {
            $(idParent).removeAttr("disabled");
            var fd = new FormData();
            fd.append("imageUploadForm", imageUploadForm.files[0]);



            if ($('#Name').val() != '' && $('#text').val() != '') {


                $.ajax({
                    url: "RegistergroupAboutUs" + "?" + $(AboutUsregisterlistform).serialize(),
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
                    grouplistaboutus(idParent.value);
                    $(idParent).attr("disabled", "disabled");
                });

            }
            else {

                $('#modal_notify2').fadeIn();
                $('#modal_notify2').fadeOut(4000);
                return;
            }

            $('.modal').modal('hide');



            $(ID).attr("value", 0);
            $(Img1).fadeOut();
        });
        $("#btnclose").click(function () {
            _aboutus.Id = 0;
            $(ID).attr("value", 0);
            $(Img1).fadeOut();

        });
    });
}
function ShowAboutUs() {
    $("#btnRegisterAboutUs").fadeIn();
    $("#btnRegisterlist").fadeOut();
    $("#btnReturn").fadeOut();
    MyAjax("Get", "ShowAboutUs", null, showgrid);
}
function showgrid(listAbout) {
    listItemAboutUs = listAbout;
    $(divaboutus).fadeIn();
    $(divlistaboutus).fadeOut();
    TitlePage.innerHTML = "جزئیات درباره ما : ";
    TitlePage1.innerHTML = "متن درباره ما : ";
    DataTableAboutUs(listAbout, [{ Data: "Id", Title: "Id" },
    { Data: "Name", Title: "عنوان" }], divaboutus, { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editaboutus },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteaboutus },
        { Text: "زیرگروه", Icon: "icon-list-add", class: "btn btn-info", event: grouplistaboutus }]);

}
function deleteaboutus(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteAboutUs", { "ID": id }, function (data) {
        ShowAboutUs();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editaboutus(id) {

    btnRegisterAboutUs.click();
    var _find = false;
    for (var i in listItemAboutUs) {
        if (listItemAboutUs[i].Id == id) {
            _find = true;
            _aboutus.Id = listItemAboutUs[i].Id;
            _aboutus.Name = listItemAboutUs[i].Name;
            break;
        }
    }
    if (_find) {
        Id.value = _aboutus.Id;
        names.value = _aboutus.Name;
    }

}
function grouplistaboutus(id) {
    _aboutus.IdParent = id;
    for (var i in listItemAboutUs) {
        if (listItemAboutUs[i].Id == _aboutus.IdParent) {
            titlename.Name = listItemAboutUs[i].Name;
        }
    }
    TitlePage.innerHTML = "  زیرگروه  " + titlename.Name;
    MyAjax("Get", "grouplist", { "ID": id }, showgriddetail);
}
function showgriddetail(listgroupAbout) {
    $("#btnRegisterAboutUs").fadeOut();
    $(btnRegisterlist).fadeIn();
    $(btnReturn).fadeIn();
    $(divaboutus).fadeOut();
    $(divlistaboutus).fadeIn();
    listgroupitemaboutus = listgroupAbout;
    DataTableforGroupAboutUs(listgroupAbout, [{ Data: "Id", Title: "Id" },
    { Data: "Image", Title: "عکس" },
    { Data: "Name", Title: "عنوان" },
    { Data: "Text", Title: "اطلاعات" }], divlistaboutus,
        { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-blue", event: editlistAboutUs },
        { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deletelistaboutus }]);
    $("#btnReturn").click(function () {
        ShowAboutUs();
        TitlePage.innerHTML = "اطلاعات";

    });
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });
}
function editlistAboutUs(id) {
    btnRegisterlist.click();
    var _find = false;
    for (var i in listgroupitemaboutus) {
        if (listgroupitemaboutus[i].Id == id) {
            _find = true;
            _aboutus.Id = listgroupitemaboutus[i].Id;
            _aboutus.Name = listgroupitemaboutus[i].Name;
            _aboutus.Text = listgroupitemaboutus[i].Text;
            _aboutus.IdParent = listgroupitemaboutus[i].IdParent;
            _aboutus.Image = listgroupitemaboutus[i].Image;
            break;
        }
    }
    if (_find) {
        ID.value = _aboutus.Id;
        Name.value = _aboutus.Name;
        text.value = _aboutus.Text;
        idParent.value = _aboutus.IdParent;
        Img1.src = "../img/aboutus/" + _aboutus.Image;
        $(Img1).fadeIn();
    }
}
function showtextaboutus() {
    fillp("ReadFile", divnote);
}
function saveaboutus() {
    var str = divnote.innerHTML;

    MyAjax("post", "savefile", { "str": str }, function () {
        alert("ذخیره شد");
    });

}
function deletelistaboutus(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    idParent.value = _aboutus.IdParent;
    MyAjax("post", "DeleteAboutUs", { "ID": id }, function (data) {
        grouplistaboutus(idParent.value);
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}