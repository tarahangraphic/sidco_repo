function DataTableProductProperty(ListData, colums, Content, option) {
    if (ListData == null || ListData.length == 0) {
        return "";
    }
    var _table = '<table class="table table-hover"><thead><tr>';
    if (option.RowNumber) {
        _table += '<th class="col-xs-1">ردیف</th>';
    }
    for (var k in ListData) {
        if (ListData[k].IdParent == 0) {
            _table += '<th class="col-xs-1">نام گروه اصلی</th>';
            break;
        }
    }
    for (var i in colums) {
        if (colums[i].Data == "Id") {
            continue;
        }
        if (colums[i].Data == "DeletePermission") {
            continue;
        }
        if (colums[i].Data == "IdParent") {
            continue;
        }
        
        _table += '<th>' + colums[i].Title + '</th>';
    }

    _table += '</tr></thead><tbody id="bodydata">';
    for (var i in ListData) {
        var trtd = '';
        var trid = '';
        var r = parseInt(i) + 1;

        if (option.RowNumber) {
            trtd += '<td class="col-xs-1">' + r + '</td>';
        }
        for (var j in colums) {
            if (colums[j].Data == "Id") {
                trid = 'data-id="' + ListData[i][colums[j].Data] + '"';
                continue;
            }

            if (colums[j].Data == 'DeletePermission') {

                continue;
            }
            if (colums[j].Data == 'IdParent') {
                continue;
            }
            if (ListData[i].IdParent == 0) {
                if (colums[j].Data == 'Checked')
                    continue;
                trtd += '<td style="background-color:#d2d2d2" colspan=4>' + ListData[i][colums[j].Data] + '</td>';
                continue;
            }


            if (colums[j].Data == 'Checked') {
               
                    if (ListData[i].Checked) {
                        if (!ListData[i].DeletePermission) {
                            trtd += '<td><td class="col-xs-1"><input id="' + ListData[i].Id + '"  disabled name="selectedprop[]" value="' + ListData[i].Id + '" checked type="checkbox"></td></td>';
                        }
                        else {
                            trtd += '<td><td class="col-xs-1"><input id="' + ListData[i].Id + '" checked name="selectedprop[]" value="' + ListData[i].Id + '" type="checkbox"></td></td>';
                        }
                    }
                    else {
                        if (!ListData[i].DeletePermission) {
                            trtd += '<td><td class="col-xs-1"><input id="' + ListData[i].Id + '" disabled name="selectedprop[]" value="' + ListData[i].Id + '" type="checkbox"></td></td>';
                        }
                        else
                            trtd += '<td><td class="col-xs-1"><input id="' + ListData[i].Id + '" name="selectedprop[]" value="' + ListData[i].Id + '" type="checkbox"></td></td>';

                    } 
                        continue;
            }
            if (colums[j].Data == "Value") {
                if (ListData[i].Checked) {
                    trtd += '<td><input id="txt' + ListData[i].Id + '" type="text" value="' + ListData[i].Value + '" name="txt' + ListData[i].Id + '"/></td><td><label id="lblAllstar" style="display:none;color:red">* پر کردن این اطلاعات الزامی میباشد *</label></td>';

                }
                else {

                trtd += '<td><input id="txt' + ListData[i].Id + '" type="text" value="' + ListData[i].Value + '" name="txt' + ListData[i].Id + '"/></td>';
                }
                continue;
            }

            trtd += '<td>' + ListData[i][colums[j].Data] + '</td>';

        }
        _table += '<tr ' + trid + '>' + trtd + '</tr>';
    }
    _table += '</tbody></table>';
    Content.innerHTML = _table;


}
