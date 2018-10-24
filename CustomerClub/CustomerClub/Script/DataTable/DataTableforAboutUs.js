﻿function DataTableAboutUs(ListData, colums, Content, option, buttons) {
    if (ListData == null || ListData.length == 0) {
        return "";
    }
    var _table = ' <table class="table table-striped table-border table-hover"><thead><tr></tr><tr>';


    if (option.RowNumber) {
        _table += '<th>ردیف</th>';
    }
    for (var i in colums) {
        if (colums[i].Data == "Id") {
            continue;
        }
        if (colums[i].Data == "Image") {
            continue;
        }
        _table += '<th>' + colums[i].Title + '</th>';
    }
    if (buttons != null) {
        _table += '<th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>';

        for (var i in buttons) {
            _table += '<th>' + buttons[i].Text + '</th>';
        }
    }
    _table += '</tr></thead><tbody id="bodydata">';
    for (var i in ListData) {
        var trtd = '';
        var trid = '';
        var trimage = '';
        var r = parseInt(i) + 1;
        if (option.RowNumber) {
            trtd += '<td>' + r + '</td>';
        }
        for (var j in colums) {
            if (colums[j].Data == "Id") {
                trid = 'data-id="' + ListData[i][colums[j].Data] + '"';
                continue;
            }
            trtd += '<td>' + ListData[i][colums[j].Data] + '</td>';
            trtd += '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';
        }
        for (var j in buttons) {
            trtd += '<td style="margin-right:20px;margin-bottom:20px;"><button data-number=' + j + ' type="button" class="' + buttons[j].class + '"><span class="' + buttons[j].Icon + '"></span>&nbsp;&nbsp;' + buttons[j].Text + '</button></td>';
        }
        _table += '<tr ' + trid + '>' + trtd + '</tr>';
    }
    _table += '</tbody></table>';
    Content.innerHTML = _table;
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
