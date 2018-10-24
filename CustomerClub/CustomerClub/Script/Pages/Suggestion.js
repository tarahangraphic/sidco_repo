$(load);
var _sugesstion = new Suggestion(0, 0, "", "", "", "", 0);
var _listSuggestion = [];
var _susername = [];
function load() {
    CreateModals();
    showSuggestion();
}
function CreateModals() {
    creatformSuggestion(SuggestionRegister, [{ name: "Id", type: "hidden", title: "" },
    { name: "QuestionText", title: "متن سوال" },
    { name: "Unit", type: "text", title: "واحد" },
    { name: "IdUser", type: "text", title: "مشتری" },
    { name: "Title", type: "text", title: "عنوان" },
    { name: "AnswerText", title: "متن پاسخ" }],
        [{ caption: "ثبت", event: RegisterSuggestion, Class: "primary"},
        { caption: "بازگشت", event: null, Class: "info", IsClose: true }],
        "ثبت مشتری");
    $("#btnexit").click(function () {
        _sugesstion.Id = 0;
            $(Id).attr("value", 0);
        });
}
function RegisterSuggestion() {
    _sugesstion.AnswerText = AnswerText.value;
    _sugesstion.IdUser = IdUser.value;
    _sugesstion.QuestionText = QuestionText.value;
    _sugesstion.Title = Title.value;
    _sugesstion.Unit = Unit.value;
    if ($('#AnswerText').val() != '' && $('#IdUser').val() != 0 && $('#QuestionText').val() != '' && $('#Title').val() != '' && $('#Unit').val() != '') {
        MyAjax("post", "RegisterSuggestion", _sugesstion, function (data) {
            _sugesstion.Id = data.Id;
            showSuggestion();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            _sugesstion.Id = 0;
            $(Id).attr("value", 0);
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }

    $('.modal').modal('hide');
}
function showSuggestion() {
    MyAjax("Get", "ShowSuggestion", null, showgrid);
}
function showgrid(listSuggestion) {
    _listSuggestion = listSuggestion;
    DataTableSuggestion(listSuggestion, [{ Data: "Id", Title: "Id" },
        { Data: "Title", Title: "عنوان" },
        { Data: "QuestionText", Title: "متن سوال" },
        { Data: "Unit", Title: "واحد" },
        { Data: "UserName", Title: "کاربر" },
        { Data: "Name", Title: "وضعیت" }], divSuggestion,
        { RowNumber: true },
        [{ Text: "پاسخ و نمایش", Icon: "edit", class: "btn btn-primary", event: editSuggestion }]);
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });

}

function editSuggestion(id) {
    MyAjax("post", "ChangeState", { "Id": id }, null);
    btnRegisterSuggestion.click();
    var _find = false;
    for (var i in _listSuggestion) {
        if (_listSuggestion[i].Id == id) {
            _find = true;
            _sugesstion.Id = _listSuggestion[i].Id;
            _sugesstion.AnswerText = _listSuggestion[i].AnswerText;
            _sugesstion.IdState = _listSuggestion[i].IdState;
            _susername.UserName = _listSuggestion[i].UserName;
            _sugesstion.QuestionText = _listSuggestion[i].QuestionText;
            _sugesstion.Title = _listSuggestion[i].Title;
            _sugesstion.Unit = _listSuggestion[i].Unit;
            break;
        }
    }
    if (_find) {
        Id.value = _sugesstion.Id;
        if (_sugesstion.AnswerText == null) {
            AnswerText.value = "";
        }
        else {
        AnswerText.value = _sugesstion.AnswerText;
        }
        IdUser.value = _susername.UserName;
        QuestionText.value = _sugesstion.QuestionText;
        Title.value = _sugesstion.Title;
        Unit.value = _sugesstion.Unit;
    }
}
