window.onload = load;
var _SlideShow = new SlideShow(0,"","");

var _listSlideShow = [];
function load() {
    CreateModals();
    showSlideShow();
    SetValidation(document.forms[0]);
}
function CreateModals() {
    creatformSlideShow(SlideShowregister, [{ name: "Id", type: "hidden", title: "" },
    { name: "text", type: "text", title: "عنوان اسلاید شو" },
    { name: "imageUploadForm", type: "file", title: "عکس" }],
        [{ caption: "ثبت", Class: "primary", IsClose: true },
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "مدیریت بخش اسلاید شو");
    $(document).ready(function () {
        $("#imageUploadForm").change(function () {
            Img1.src = URL.createObjectURL(imageUploadForm.files[0]);
            $(Img1).fadeIn();

        });
        $("#btnregisterforSlideShow").click(function () {
            var fd = new FormData();
            fd.append("imageUploadForm", imageUploadForm.files[0]);

            if ($('#text').val() != '') {

                $.ajax({
                    url: "RegisterSlideShow" + "?" + $(SlideShowregisterform).serialize(),
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
                    showSlideShow();
                });
                $(Id).attr("value", 0);
                $(Img1).fadeOut();
            }
            else {

                $('#modal_notify').fadeIn();
                $('#modal_notify').fadeOut(4000);
                return;
            }

            $('.modal').modal('hide');
        });
        $("#btnexit").click(function () {
            _SlideShow.Id = 0;
            $(Id).attr("value", 0);
            $(Img1).fadeOut();
        });
    });
}
function showSlideShow() {
    MyAjax("Get", "ShowSlideShow", null, showgrid);
}
function showgrid(listSlideshow) {
    _listSlideShow = listSlideshow;

    DataTableSlideShow(listSlideshow, [{ Data: "Id", Title: "Id" },
        { Data: "Image", Title: "عکس" },
        { Data: "Text", Title: "عنوان اسلاید شو" }], divSlideShow,
        { RowNumber: true },
        [{ Text: "ویرایش", Icon: "icon-pencil", class: "btn btn-primary", event: editSlideShow },
            { Text: "حذف", Icon: "icon-trash", class: "btn btn-danger", event: deleteSLideShow },
            { Text: "بالا", Icon: "icon-up-circled", class: "btn btn-black btn-outline", event: sortupslideshow },
            { Text: "پایین", Icon: "icon-down-circled", class: "btn btn-black btn-outline", event: sortdownslideshow }]);
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });
    
}
function deleteSLideShow(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeletSlideShow", { "ID": id }, function (data) {
        showSlideShow();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editSlideShow(id) {
    btnRegisterSlideShow.click();
    var _find = false;
    for (var i in _listSlideShow) {
        if (_listSlideShow[i].Id == id) {
            _find = true;
            _SlideShow.Id = _listSlideShow[i].Id;
            _SlideShow.Text = _listSlideShow[i].Text;
            _SlideShow.Image = _listSlideShow[i].Image;
            break;
        }
    }
    if (_find) {
        Id.value = _SlideShow.Id;
        text.value = _SlideShow.Text;
        Img1.src = "../img/slideshow/" + _SlideShow.Image;
        $(Img1).fadeIn();
    }
}
function sortupslideshow(id) {
    MyAjax("Post", "SortupSlideShow", { "Id": id }, function (Data) {
        showSlideShow();
    });
}
function sortdownslideshow(id) {
    MyAjax("Post", "SortDownSlideShow", { "Id": id }, function (Data) {
        showSlideShow();
    });
}