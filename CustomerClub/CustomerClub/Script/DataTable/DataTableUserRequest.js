function DataTableUsersRequest(ListData, colums, Content, buttons, option, dotbutton) {
    if (ListData == null || ListData.length == 0) {
        $(DivUserReq).fadeOut();
        $(noinformation).fadeIn();
    }
    var _table = '<table class="table table-users table-hover dataTables-example"><thead><tr>';

    if (option.RowNumber) {
        _table += '<th>رديف</th>';
    }
    for (var i in colums) {
        if (colums[i].Data == "Id") {
            continue;
        }
        _table += '<th>' + colums[i].Title + '</th>';
    }
    if (buttons != null) {

        for (var i in buttons) {
            _table += '<th>' + buttons[i].Text + '</th>';
        }
    }
    _table += '</tr></thead><tbody id="bodydata">';
    for (var i in ListData) {
        var trtd = '';
        var trid = '';
        var trdotbutton = '<div class="dropdown"><a class="more-link" data-toggle="dropdown" href="#/"><i class="icon-dot-3 ellipsis-icon"></i></a><ul class="dropdown-menu dropdown-menu-right">';
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
        }
        for (var j in buttons) {

            trtd += '<td><button data-number=' + j + ' type="button" class="' + buttons[j].class + '"><span class="icon-' + buttons[j].Icon + '"></span>&nbsp;&nbsp;' + buttons[j].Text + '</button></td>';
        }
        if (dotbutton != null) {
            for (var k in dotbutton) {
                trdotbutton += '<li><button id=' + k + ' type="button" class="' + dotbutton[k].class + '"><span class="icon-' + dotbutton[k].Icon + '"></span>&nbsp;&nbsp;' + dotbutton[k].Text + '</button></li>';
            }
            trtd += '<td>' + trdotbutton + '</ul></div></td>';
        }
        _table += '<tr ' + trid + '>' + trtd + '</tr>';
    }
    _table += '</tbody></table>';
    Content.innerHTML = _table;
    if (dotbutton != null) {
        var listdotbuttons = document.querySelectorAll("#" + Content.id + " table tbody tr td div ul li button");
        for (var i = 0; i < listdotbuttons.length; i++) {
            listdotbuttons[i].addEventListener("click", function () {
                var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
                dotbutton[this.getAttribute('id')].event(id);
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
