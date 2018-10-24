﻿var error_state_Car = false;

function creatmodalCar(Content) {
    var str1 = ' <div id="' + Content.id + 'Modal" class="modal fade" role="dialog"> <div class="modal-dialog"> <div class="modal-content"><form id="' + Content.id + 'form" class="form-horizontal">';
    str1 += '<div id="' + Content.id + 'header" class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button></div>';
    str1 += '    <div id="' + Content.id + 'body" class="modal-body"></div>';
    str1 += '   <div id="' + Content.id + 'footer" class="modal-footer"></div></form> </div> </div></div>';

    Content.innerHTML = str1;

    return {
        Header: document.getElementById(Content.id + 'header'),
        Body: document.getElementById(Content.id + 'body'),
        Footer: document.getElementById(Content.id + 'footer'),

    };
}
function creatformCars(content, listtag, listbuttons, title) {
    var modal = creatmodalCar(content);
    modal.Header.innerHTML += '<h4>' + title + '<h4>';
    for (var i = 0; i < listtag.length; i++) {
        modal.Body.innerHTML += creattagCar(listtag[i].type, listtag[i].title, listtag[i].name, listtag[i].event);
    }
    for (var j = 0; j < listbuttons.length; j++) {
        var strclose = '';
        if (listbuttons[j].IsClose) {
            strclose = 'data-dismiss="modal"';
        }
        var id = '';
        if (j == 0) {
            id = 'btnregisterfor';
        }
        if (j == 1) {
            id = 'btnexit';
        }
        modal.Footer.innerHTML += '<button id="' + id + '" data-number="' + j + '" type="button" class="btn btn-' + listbuttons[j].Class + '" ' + strclose + '>' + listbuttons[j].caption + '</button>';
    }
    var btns = modal.Footer.getElementsByTagName("button");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {

            if (listbuttons[this.getAttribute('data-number')].event != null)
                listbuttons[this.getAttribute('data-number')].event();
        })
    }
}
function creattagCar(type, title, name, event) {
    var tag = '<input type="' + type + '" class="form-control" data-display="' + title + '" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " >';
    if (type == 'select') {
        tag = ' <select class="form-control" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " ></select>';
    }
    if (name.toUpperCase() == 'ID') {

        tag = '<input type="hidden" value="0" class="form-control" name= "Id" id= "Id">';

    }
    var str1 = "";
    if (error_state_Car == false) {
        str1 += "<div style='display:none;'  id='modal_notify' class='alert alert-danger'></button><strong>خطای ورود اطلاعات!</strong> لطفا تمام اطلاعات را وارد نمایید! </div>";
        error_state_Car = true;
    }
    str1 += ' <div class="form-group"><label class="control-label col-sm-2" for="' + name + '">' + title + '</label><div class="col-sm-6">';
    str1 += tag + '</div> <div class="col-sm-4"><label id="Valid' + name + '"></label></div></div>';

    return str1;
}