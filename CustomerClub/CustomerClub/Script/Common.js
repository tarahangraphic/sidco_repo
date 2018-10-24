

var SelectedTr = null;
function Grid(ListData, Content, colums,buttons, option) {
    if (ListData == null || ListData.length == 0) {
        return "";
    }
    //var colums = Object.keys(ListData[0]);
    var _table ='<table style="width:80%;margin:0 auto"class="table table-hover text-center table-responsive table-bordered"><thead><tr>';
    if (option.RowNumber) {
        _table += '<td>ردیف</td>';
    }
    for (var i in colums) {
        if (colums[i].Data.toUpperCase() == "ID")
            continue;

        _table += '<td>' + colums[i].Title + '</td>';
    }
    if (buttons != null) {
        for (var i in buttons) {
            _table+='<td>'+buttons[i].Text+'</td>';
        }
    }
    _table += '</tr></thead><tbody id="bodydata">';
    for (var i in ListData) {
        var trtd = '';
        var trid = '';
        var r = parseInt(i)+1;
        if (option.RowNumber) {
            trtd+='<td>'+r+'</td>';
        }
        for (var j in colums) {
            if (colums[j].Data.toUpperCase() == "ID") {
                trid = 'data-id="' + ListData[i][colums[j].Data] + '"';
                continue;
            }
            trtd += '<td>' + ListData[i][colums[j].Data] + '</td>';
        }
        for (var j in buttons) {
            trtd += '<td><button data-number=' + j + ' type="button" class="' + buttons[j].class + '"><span class="glyphicon glyphicon-' + buttons[j].Icon + '"></span>&nbsp;&nbsp;' + buttons[j].Text + '</button></td>'
        }
        _table += '<tr ' + trid + '>' + trtd + '</tr>';
    }
    _table += '</tbody></table>';
    Content.innerHTML = _table;

    if (option.IsSelected) {
        var listtr = document.querySelectorAll("#" + Content.id + " table tbody tr");

        for (var i = 0; i < listtr.length; i++) {
            listtr[i].addEventListener("click", function (e) {

                if (SelectedTr != null) {
                    SelectedTr.className = "";
                }

                SelectedTr = this;
                this.className = "bg-info";

                var id = this.parentNode.parentNode.getAttribute("data-id");
                if (option.SelectEvent != null)
                    option.SelectEvent();
            });
        }
    }
    if (buttons != null) {
        var listbuttons = document.querySelectorAll("#" + Content.id + " table tbody tr td button");
        for (var i = 0; i < listbuttons.length; i++) {
            listbuttons[i].addEventListener("click", function () {
                var id = this.parentNode.parentNode.getAttribute("data-id");
                buttons[this.getAttribute('data-number')].event(id);
            });
        }
    }
}