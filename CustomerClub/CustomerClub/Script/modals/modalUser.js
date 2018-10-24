var error_state_Users = false;
function creatmodalUsers(Content) {
    var str1 = ' <div id="' + Content.id + 'Modal" class="modal fade" role="dialog"> <div class="modal-dialog"> <div class="modal-content"><form id="' + Content.id + 'form" class="form-horizontal">';
    str1 += '<div id="' + Content.id + 'header" class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button></div>';
    str1 += '   <div id="' + Content.id + 'body" class="modal-body col-lg-12"></div>';
    str1 += '   <div id="' + Content.id + 'footer" class="modal-footer"></div></form></div></div></div>';

    Content.innerHTML = str1;

    return {
        Header: document.getElementById(Content.id + 'header'),
        Body: document.getElementById(Content.id + 'body'),
        Footer: document.getElementById(Content.id + 'footer'),

    };
}
function creatformUser(content, listtag, listbuttons, title) {
    var modal = creatmodalUsers(content);
    modal.Header.innerHTML += '<h4>' + title + '<h4>';
    for (var i = 0; i < listtag.length; i++) {
        modal.Body.innerHTML += creattagUsers(listtag[i].type, listtag[i].title, listtag[i].name, listtag[i].event);
    }
    for (var j = 0; j < listbuttons.length; j++) {
        var strclose = '';
        if (listbuttons[j].IsClose) {
            strclose = 'data-dismiss="modal"';
        }
        var id = '';
        if (j == 0) {
            id = 'btnregisterforUser';
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
function creattagUsers(type, title, name, event) {
    var tag = '<input type="' + type + '" class="form-control" data-display="' + title + '" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " >';
    if (type == 'select') {
        tag = ' <select class="form-control" name= "' + name + '" id= "' + name + '"  placeholder= "' + title + ' را وارد کنید " ></select>';
    }
    if (name == 'Sex') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="male">مرد</option><option id="female">زن</option></select>';
    }
    if (name == 'Married') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="Single">مجرد</option><option id="Married">متاهل</option></select>';
    }
    if (name =='Home') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option>خانه دار</option><option>اجاره نشین</option></select>';
    }
    if (name =='DateBirthday') {
        tag = '<input class="form-control" type="' + type + '" id="' + name + '" name="' + name + '" placeholder="' + title + ' را وارد کنید" data-mask="9999/99/99"/>';
    }  
    //ddsdsdsdds//dssd
    //ddsdsdsdds//dssd
    //ddsdsdsdds//dssd
    

    if (name =='Agent_IdType') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="sell">فروش</option><option id="serviceaftersell">خدمات پس از فروش</option><option id="sellandserviceaftersell">فروش و خدمات پس از فروش</option><option id="uniquesell">انحصاری فروش</option><option id="uniqueserviceaftersell">انحصاری خدمات پس از فروش</option><option id="uniquesellandserviceaftersell">انحصاری فروش و خدمات پس از فروش</option></select>';

    }
    if (name =='Agent_Lisence') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="havelicence">دارد</option><option id="donthavelicence">ندارد</option></select>';

    }
    if (name =='Agent_Malek') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="malek">مالک</option><option id="stijary">استیجاری</option></select>';

    }
    if (name =='Agent_PosState') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="havepose">دارد</option><option id="donthavepose">ندارد</option></select>';

    }
    if (name == 'Agent_JobType') {
        tag = '<select class="form-control" name= "' + name + '" id= "' + name + '"><option id="omdeh">عمده</option><option id="khordeh">خرده</option></select>';

    }
    
    //ddsdsdsdds//dssd
    //ddsdsdsdds//dssd
    //ddsdsdsdds//dssd

    if (type == 'file') {
        tag = '<input type="file" id="' + name + '" name="' + name + '" /><img id="Img1" src="" class="PicMember" /><label class="alert alert-info">سایز عکس باید n*m باشد و حجم عکس باید z باشد</label>';

    }
    if (name == 'LatLonheight') {
        tag = '<input class="form-control" type="' + type + '" id="' + name + '" name="' + name + '" placeholder="' + title + ' را وارد کنید"/>';
    }
    if (name == 'LatLonwidth') {
        tag = '<input class="form-control" type="' + type + '" id="' + name + '" name="' + name + '" placeholder="' + title + ' را وارد کنید"/>';
    }
    var str1 = "";
    if (error_state_Users == false) {
        str1 += "<div style='display:none;'  id='modal_notify' class='alert alert-danger'></button><strong>خطای ورود اطلاعات!</strong> لطفا تمام اطلاعات را وارد نمایید! </div>";
        error_state_Users = true;
    }
    str1 += ' <div class="form-group col-lg-6"><label class="control-label col-xs-6" for="' + name + '">' + title + '</label><div class="col-xs-6">';
    str1 += tag + '</div><div class="col-xs-4"><label id="Valid' + name + '"></label></div></div>';

    return str1;
    
}