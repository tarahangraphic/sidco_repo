function fillselectwithoutfunction(action, content) {
    MyAjax("Get", action, null, function (ListData) {
        var str = "";
        for (var i in ListData) {
            str += '<option value="' + ListData[i].Id + '">' + ListData[i].Display + '</option>';
        }
        content.innerHTML = str;
    });
}

function fillselectwithoutfunction2(action, content) {
    MyAjax("Get", action, null, function (ListData) {
        var str = "";
        for (var i in ListData) {
            str += '<option value="' + ListData[i].Id + '">' + ListData[i].Name + '</option>';
        }
        content.innerHTML = str;
    });
}