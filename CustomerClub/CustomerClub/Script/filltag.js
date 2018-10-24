function fillselect(action, content, CallBackFunction) {
    MyAjax("Get", action, null, function (ListData) {
        var str = "";
        for (var i in ListData) {
            str += '<option value="' + ListData[i].ID + '">' + ListData[i].Display + '</option>';
        }
        content.innerHTML = str;
        CallBackFunction();
    });
}
function fillp(action,content) {
    MyAjax("Get", action, null, function (listdata) {
        content.innerHTML = listdata;
    });
}