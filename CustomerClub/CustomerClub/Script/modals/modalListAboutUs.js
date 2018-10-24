﻿
var error_state_aboutus_list = false;

function creatmodalListAboutUs(Content) {
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
function creatformListAboutUs(content, listtag, listbuttons, title) {
    var modal = creatmodalListAboutUs(content);
    modal.Header.innerHTML += '<h4>' + title + '<h4>';
    for (var i = 0; i < listtag.length; i++) {
        modal.Body.innerHTML += creattagListAboutUs(listtag[i].type, listtag[i].title, listtag[i].name, listtag[i].event);
    }
    for (var j = 0; j < listbuttons.length; j++) {
        var strclose = '';
        if (listbuttons[j].IsClose) {
            strclose = 'data-dismiss="modal"';
        }
        var id = '';
        if (j == 0) {
            id = 'btnregisterfor2';
        }
        if (j==1) {
            id = 'btnclose';
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
function creattagListAboutUs(type, title, name, event) {
    var tag = '<input type="' + type + '" class="form-control" data-display="' + title + '" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " >';
    if (type == 'select') {

        tag = ' <select class="form-control" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " ></select>';
    }
    if (type == 'file') {

        tag = '<input type="file" id="' + name + '" name="' + name + '" /><img id="Img1" src="" class="PicMember" /><label class="alert alert-info">سایز عکس باید n*m باشد و حجم عکس باید z باشد</label>';

    }
    
    if (name == 'idParent') {

        tag = '<input  type="' + type + '" class="form-control" name= "' + name + '" id= "' + name + '">';
    }
    var str1 = "";
    if (error_state_aboutus_list == false) {
        str1 += "<div style='display:none;'  id='modal_notify2' class='alert alert-danger'></button><strong>خطای ورود اطلاعات!</strong> لطفا تمام اطلاعات را وارد نمایید! </div>";
        error_state_aboutus_list = true;
    }
    str1 += ' <div class="form-group"><label class="control-label col-sm-2" for="' + name + '">' + title + '</label><div class="col-sm-6">';
    str1 += tag + '</div> <div class="col-sm-4"><label id="Valid' + name + '"></label></div></div>';

    


    return str1;
}