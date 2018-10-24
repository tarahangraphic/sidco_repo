function DataTableOrder(ListData, colums, Content, option, buttons) {
    if (ListData == null || ListData.length == 0) {
        $(NoInformation).fadeIn();
        $(divOrder).fadeOut();
        $(divOrderDetail).fadeOut();
    }
    var _table = '<table class="table table-striped table-border table-hover dataTables-example"><thead><tr>';
    if (option.RowNumber) {
        _table += '<th>ردیف</th>';
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
        var r = parseInt(i) + 1;
        if (option.RowNumber) {
            trtd += '<td>' + r + '</td>';
        }
        for (var j in colums) {
            if (colums[j].Data == "Id") {
                trid = 'data-id="' + ListData[i][colums[j].Data] + '"';
                continue;
            }
            if (colums[j].Data == "OrderState") {
                if (ListData[i].IdOrderState==1) {
                    trtd += '<td><span class="badge badge-bordered">' + ListData[i][colums[j].Data] + '</span></td>';

                }
                if (ListData[i].IdOrderState == 2) {
                    trtd += '<td><span class="badge badge-bordered" style="background-color:lightgreen;">' + ListData[i][colums[j].Data] + '</span></td>';

                }
                if (ListData[i].IdOrderState == 3) {
                    trtd += '<td><span class="badge badge-bordered" style="background-color:red;">' + ListData[i][colums[j].Data] + '</span></td>';

                }
                continue;
            }
            
            trtd += '<td>' + ListData[i][colums[j].Data] + '</td>';
        }
        for (var j in buttons) {
            if (j==0) {
                trtd += '<td><button data-number=' + j + ' type="button" class="' + buttons[j].class + '"><span class="' + buttons[j].Icon + '"></span>' + buttons[j].Text + '</button></td>'

            }
            else {
                trtd += '<td><button data-number=' + j + ' type="button" class="' + buttons[j].class + '"><span class="' + buttons[j].Icon + '"></span></button></td>'

            }
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
