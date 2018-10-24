function DataTableGift(ListData, colums, Content, option, buttons) {
    if (ListData == null || ListData.length == 0) {
        $(noinformation).fadeIn();
    }
    var _table = '<table class="table table-users table-hover dataTables-example table-responsive"><thead><tr>';
    for (var j in ListData) {
        if (ListData[j].GiftName == "" && ListData[j].GiftSendWayName == "" && ListData[j].GiftStateName == "" && ListData[j].Date_Insert == "" && ListData[j].MinPoint == "") {
            break;
        }
        else {
            if (option.RowNumber) {
                _table += '<th>ردیف</th>';
                break;
            }
            
        }
    }
    for (var i in colums) {
        if (colums[i].Data == "Id") {
            continue;
        }
        _table += '<th>' + colums[i].Title + '</th>';
        // continue;

    }

    if (buttons != null) {

        for (var i in buttons) {
            _table += '<th>' + buttons[i].Text + '</th>';
            //  continue;

        }
    }


    _table += '</tr></thead><tbody id="bodydata">';
    for (var i in ListData) {
        var trtd = '';
        var trid = '';
        var trimage = '';
        var r = parseInt(i) + 1;
        if (ListData[i].GiftName == "" && ListData[i].GiftSendWayName == "" && ListData[i].GiftStateName == "" && ListData[i].Date_Insert == "" && ListData[i].MinPoint == "") {
            $(noinformation).fadeIn();
        }
        else {
            if (option.RowNumber) {
                trtd += '<td>' + r + '</td>';
            }
        }
        for (var j in colums) {
            if (colums[j].Data == "Id") {
                trid = 'data-id="' + ListData[i][colums[j].Data] + '"';
                continue;
            }
            //if (colums[j].Data == "Image") {
            //    trtd += '<td><img class="avatar img-circle" style="width:40px;height:30px;cursor:pointer;" src="../img/customers/' + ListData[i][colums[j].Data] + '" /></td>';
            //    continue;
            //}
            if (colums[j].Data == 'GiftStateName') {
                trtd += '<td><span class="badge badge-bordered">' + ListData[i][colums[j].Data] + '</span></td>';
                continue;
            }
            trtd += '<td>' + ListData[i][colums[j].Data] + '</td>';
        }

        if (ListData[i].GiftName == "" && ListData[i].GiftSendWayName == "" && ListData[i].GiftStateName == "" && ListData[i].Date_Insert == "" && ListData[i].MinPoint == "") {
            continue;
        }
        else {
            for (var k in buttons) {
                trtd += '<td style="margin-right:20px;margin-bottom:20px;"><button data-number=' + k + ' type="button" class="' + buttons[k].class + '"><span class="' + buttons[k].Icon + '"></span>&nbsp;&nbsp;' + buttons[k].Text + '</button></td>';
                continue;
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
