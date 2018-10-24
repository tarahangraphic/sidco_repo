var _usercarid =0;
window.onload = load;
var _user = new User(0, 0, "", "", 0, 0, 0, "", true, false, "", false, 0, 0, "", 0, 0, "", "", 0, "", "", "", "", 0, false, 0, false, false, 1, "");

var _listusercar = [];
var listUsers = [];
var _listrequestuser = [];
function load() {
    CreateModals();
    CreateModalsShowdetail();
    
    ShowCity();
    ShowCities();
    ShowCityuserdetail();
    showUser();
   
    $(btnRegisterUser).fadeOut();
    $(btnUserShowDetail).fadeOut();
    $(divuserrequest).fadeOut();
    $(btnreturn).fadeOut();
    $(btnuserRequest).click(function () {
        showRequest();
    });
}
function CreateModalsShowdetail() {
    creatformUserDetail(UserShowDetail, [{ name: "Firstname", type: "text", title: "نام" }
        , { name: "Lastname", type: "text", title: "نام خانوادگی" }
        , { name: "natinalcode", type: "text", title: "کدملی" }
        , { name: "IdCityAgent", type: "select", title: "شهر" }
        , { name: "MobileAgent", type: "text", title: "موبایل" }
        , { name: "AddressAgent", type: "text", title: " آدرس مغازه" }
        , { name: "AccountCodeAgent", type: "text", title: "کدحساب" }
        , { name: "AgentCodeAgent", type: "text", title: "کدکاربر" }
        , { name: "AgentRateAgent", type: "text", title: "رتبه کاربر" }
        , { name: "Agent_BankAcouuntNumberAgent", type: "text", title: "شماره حساب کاربر" }
        , { name: "Agent_HistoryAgent", type: "text", title: "سابقه فعالیت(سال)" }
        , { name: "Agent_IdTypeAgent", type: "select", title: "نوع درخواست" }
        , { name: "Agent_JobTypeAgent", type: "select", title: "نوع فعالیت" }
        , { name: "Agent_LisenceAgent", type: "select", title: "جواز کسب" }
        , { name: "Agent_MalekAgent", type: "select", title: "وضعیت تملک مغازه" }
        , { name: "Agent_Place_AreaAgent", type: "text", title: "متراژ مغازه" }
        , { name: "Agent_PosStateAgent", type: "select", title: "وضعیت پوز بانکی" }
        , { name: "CodePostalAgent", type: "text", title: "کدپستی" }
        , { name: "DateBirthdayAgent", type: "text", title: "تاریخ تولد" }
        , { name: "FathernameAgent", type: "text", title: "نام پدر" }
        , { name: "HomeAgent", type: "select", title: "وضعیت سکونت" }
        , { name: "JobNameAgent", type: "text", title: "نام شغل" }
        , { name: "LatLonAgent", type: "text", title: "مقیاس جغرافیایی" }
        , { name: "MarriedAgent", type: "select", title: "تاهل" }
        , { name: "SexAgent", type: "select", title: "جنسیت" }
        , { name: "TellAgent", type: "text", title: "تلفن" }],
        [{ caption: "بازگشت", event: null, Class: "info", IsClose: true }], "یوزر");
}
function CreateModals() {
    creatformUser(UserRegister, [
        { name: "fname", type: "text", title: "نام" }
        , { name: "lname", type: "text", title: "نام خانوادگی" }
        , { name: "codemeli", type: "text", title: "کدملی" },
        { name: "Idcities", type: "select", title: "استان" }
        , { name: "IdCity", type: "select", title: "شهر" }
        , { name: "Mobile", type: "text", title: "موبایل" }
        , { name: "Address", type: "text", title: "آدرس مغازه" }
        , { name: "AccountCode", type: "text", title: "کدحساب" }
        , { name: "AgentCode", type: "text", title: "کدکاربر" }
        , { name: "AgentRate", type: "text", title: "رتبه کابر" }
        , { name: "Agent_BankAcouuntNumber", type: "text", title: "شماره حساب کاربر" }
        , { name: "Agent_History", type: "text", title: "سابقه فعالیت(سال)" }
        , { name: "Agent_IdType", type: "select", title: "نوع درخواست" }
        , { name: "Agent_JobType", type: "select", title: "نوع فعالیت" }
        , { name: "Agent_Lisence", type: "select", title: "جواز کسب" }
        , { name: "Agent_Malek", type: "select", title: "وضعیت تملک مغازه" }
        , { name: "Agent_Place_Area", type: "text", title: "متراژ مغازه" }
        , { name: "Agent_PosState", type: "select", title: "وضعیت پوز بانکی" }
        , { name: "CodePostal", type: "text", title: "کدپستی" }
        , { name: "DateBirthday", type: "text", title: "تاریخ تولد" }
        , { name: "Fathername", type: "text", title: "نام پدر" }
        , { name: "Home", type: "select", title: "وضعیت سکونت" }
        , { name: "JobName", type: "text", title: "نام شغل" }
        , { name: "LatLonheight", type: "text", title: "طول جغرافیایی" }
        , { name: "LatLonwidth", type: "text", title: "عرض جغرافیایی" }
        , { name: "Married", type: "select", title: "تاهل" }
        , { name: "Sex", type: "select", title: "جنسیت" }
        , { name: "Tell", type: "text", title: "تلفن" },
        { name: "imageUploadForm", type: "file", title: "عکس مجوز کاربر" },
    { name: "Id", type: "hidden", title: "" }],
        [{ caption: "ثبت", event: RegisterUser, Class: "primary", IsClose: true },
            { caption: "بازگشت", event: null, Class: "info", IsClose: true }], "ویرایش یوزر");
    $("#imageUploadForm").change(function () {
        Img1.src = URL.createObjectURL(imageUploadForm.files[0]);
        $(Img1).fadeIn();

    });
    $(Married).change(function () {
        if (Married.value == 'متاهل') {
            _user.Married = true;
        }
        if (Married.value == 'مجرد') {
            _user.Married = false;
            }
    });
    $(Sex).change(function () {
        if (Sex.value == 'مرد') {
            _user.Sex = true;
        }
        if (Sex.value == 'زن') {
            _user.Sex = false;
        }
    });
    $(Home).change(function () {
        if (Home.value == 'خانه دار') {
            _user.Home = true;
        }
        if (Home.value == 'اجاره نشین') {
            _user.Home = false;
        }
    });
    $(Agent_Lisence).change(function () {
        if (Agent_Lisence.value == 'دارد') {
            _user.Agent_Lisence = true;
        }
        if (Agent_Lisence.value == 'ندارد') {
            _user.Agent_Lisence = false;
        }
    });
    $(Agent_Malek).change(function () {
        if (Agent_Malek.value == 'مالک') {
            _user.Agent_Malek = true;
        }
        if (Agent_Malek.value == 'استیجاری') {
            _user.Agent_Malek = false;
        }
    });
    $(Agent_PosState).change(function () {
        if (Agent_PosState.value == 'دارد') {
            _user.Agent_PosState = true;
        }
        if (Agent_PosState.value == 'ندارد') {
            _user.Agent_PosState = false;
        }
    });
    $(Agent_JobType).change(function () {
        if (Agent_JobType.value == 'عمده') {
            _user.Agent_JobType = true;
        }
        if (Agent_JobType.value == 'خرده') {
            _user.Agent_JobType = false;
        }
    });
    $(Agent_IdType).change(function () {
        if (Agent_IdType.value == 'فروش') {
            _user.Agent_IdType = 1;
        }
        if (Agent_IdType.value == 'خدمات پس از فروش') {
            _user.Agent_IdType = 2;
        }
        if (Agent_IdType.value == 'فروش و خدمات پس از فروش') {
            _user.Agent_IdType = 3;
        }
        if (Agent_IdType.value == 'انحصاری فروش') {
            _user.Agent_IdType = 4;
        }
        if (Agent_IdType.value == 'انحصاری خدمات پس از فروش') {
            _user.Agent_IdType = 5;
        }
        if (Agent_IdType.value == 'انحصاری فروش و خدمات پس از فروش') {
            _user.Agent_IdType = 6;
        }
    });
    $(Idcities).change(function (data) {
        data = Idcities.value;
        changecity(data);
    });
}
function showUser() {  
    MyAjax("Get", "ShowUsers", null, showgrid);  
}
function showgrid(listuser) {
    $(divuserrequest).fadeOut();
    $(btnreturn).fadeOut();
    $(divUser).fadeIn();
    $(btnuserRequest).fadeIn();
    listUsers = listuser;
   
    DataTableUsers(listuser, [{ Data: "Id", Title: "Id" },
        { Data: "Fname", Title: "نام" },
        { Data: "Lname", Title: "نام خانوادگی" },
        { Data: "CodeMelli", Title: "کدملی" },
        { Data: "Name", Title: "شهر" },
        { Data: "Mobile", Title: "موبایل" },
        { Data: "usertyprname", Title: "نوع کاربر" }], divUser,
        [{ Text: "ویرایش", Icon: "pencil", class: "btn btn-blue", event: editUser },
            { Text: "حذف", Icon: "trash", class: "btn btn-danger", event: deleteUser},
            { Text: "نمایش جزئیات", Icon: "list-add", class: "btn btn-primary", event: showuserdetail }],
        { RowNumber: true },
        [{ Text: "خودرو من", Icon: "list", class: "btn btn-primary btn-dot", event: showuserCars },
        { Text: "هدایای من", Icon: "box", class: "btn btn-primary btn-dot", event: ShowUserGift },
        { Text: "محصولات من", Icon: "basket", class: "btn btn-primary btn-dot", event: ShowUserRegisterProduct }]);
    $(document).ready(function () {
        $('.dataTables-example').DataTable({
            dom: 'lTfgitp',
            buttons: [
                'colvis'
            ]
        });
    });
}
function showuserCars(id) {
    location.href = "../UserCar/Index/"+id;
}
function ShowUserGift(id) {
    location.href = "../UserGift/Index/" + id;
}
function ShowUserRegisterProduct(id) {
    location.href = "../UserRegisterProduct/Index/" + id;
}
function showuserdetail(id) {
    btnUserShowDetail.click();
    var _find = false;
    for (var i in listUsers) {
        if (listUsers[i].Id == id) {
            _find = true;
            _user.Id = listUsers[i].Id;
            _user.Fname = listUsers[i].Fname;
            _user.Lname = listUsers[i].Lname;
            _user.CodeMelli = listUsers[i].CodeMelli;
            _user.IdCity = listUsers[i].IdCity;
            _user.Mobile = listUsers[i].Mobile;
            _user.Address = listUsers[i].Address;
            _user.AccountCode = listUsers[i].AccountCode;
            _user.AgentCode = listUsers[i].AgentCode;
            _user.AgentRate = listUsers[i].AgentRate;
            _user.Agent_BankAcouuntNumber = listUsers[i].Agent_BankAcouuntNumber;
            _user.Agent_History = listUsers[i].Agent_History;
            _user.Agent_IdType = listUsers[i].Agent_IdType;
            _user.Agent_JobType = listUsers[i].Agent_JobType;
            _user.Agent_Lisence = listUsers[i].Agent_Lisence;
            _user.Agent_Malek = listUsers[i].Agent_Malek;
            _user.Agent_Place_Area = listUsers[i].Agent_Place_Area;
            _user.Agent_PosState = listUsers[i].Agent_PosState;
            _user.CodePostal = listUsers[i].CodePostal;
            _user.DateBirthday = listUsers[i].DateBirthday;
            _user.Fathername = listUsers[i].Fathername;
            _user.Home = listUsers[i].Home;
            _user.JobName = listUsers[i].JobName;
            _user.LatLon = listUsers[i].LatLon;
            _user.Married = listUsers[i].Married;
            _user.Sex = listUsers[i].Sex;
            _user.Tell = listUsers[i].Tell;
            break;
        }
    }
    if (_find) {
        if (_user.Agent_Lisence == true) {
            $(Agent_LisenceAgent).children().first().html('دارد');
            $(Agent_LisenceAgent).children().next().html('ندارد');
        }
        if (_user.Agent_Lisence == false) {
            $(Agent_LisenceAgent).children().first().html('ندارد');
            $(Agent_LisenceAgent).children().next().html('دارد');
            
        }
        //fasele
        if (_user.Agent_PosState == true) {
            $(Agent_PosStateAgent).children().first().html('دارد');
            $(Agent_PosStateAgent).children().next().html('ندارد');
        }
        if (_user.Agent_PosState == false) {
            $(Agent_PosStateAgent).children().first().html('ندارد');
            $(Agent_PosStateAgent).children().next().html('دارد');
            
        }
        //fasele

        if (_user.Agent_JobType == true) {
            $(Agent_JobTypeAgent).children().first().html('عمده');
            $(Agent_JobTypeAgent).children().next().html('خرده');
        }
        if (_user.Agent_JobType == false) {
            $(Agent_JobTypeAgent).children().first().html('خرده');
            $(Agent_JobTypeAgent).children().next().html('عمده');
        }
        //fasele
        if (_user.Agent_Malek == true) {
            $(Agent_MalekAgent).children().first().html('مالک');
            $(Agent_MalekAgent).children().next().html('استیجاری');
        }
        if (_user.Agent_Malek == false) {
            $(Agent_MalekAgent).children().first().html('استیجاری');
            $(Agent_MalekAgent).children().next().html('مالک');
        }
        //fasele
        if (_user.Agent_IdType == 1) {
            $(Agent_IdTypeAgent).children().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
        }
        if (_user.Agent_IdType == 2) {
            $(Agent_IdTypeAgent).children().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
      
        }
        if (_user.Agent_IdType == 3) {
            $(Agent_IdTypeAgent).children().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
          
        }
        if (_user.Agent_IdType == 4) {
            $(Agent_IdTypeAgent).children().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
       
        }
        if (_user.Agent_IdType == 5) {
            $(Agent_IdTypeAgent).children().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            
        }
        if (_user.Agent_IdType == 6) {
            $(Agent_IdTypeAgent).children().first().html('انحصاری فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().first().html('فروش');
            $(Agent_IdTypeAgent).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().first().first().html('انحصاری فروش');
            $(Agent_IdTypeAgent).children().next().next().next().next().next().first().html('انحصاری خدمات پس از فروش');

        }
        //fasele
        Firstname.value = _user.Fname;
        Lastname.value = _user.Lname;
        natinalcode.value = _user.CodeMelli;
        IdCityAgent.value = _user.IdCity;
        MobileAgent.value = _user.Mobile;
        AddressAgent.value = _user.Address;
        AccountCodeAgent.value = _user.AccountCode;
        AgentCodeAgent.value = _user.AgentCode;
        AgentRateAgent.value = _user.AgentRate;
        Agent_BankAcouuntNumberAgent.value = _user.Agent_BankAcouuntNumber;
        Agent_HistoryAgent.value = _user.Agent_History;
        Agent_Place_AreaAgent.value = _user.Agent_Place_Area;
        CodePostalAgent.value = _user.CodePostal;
        DateBirthdayAgent.value = _user.DateBirthday;
        FathernameAgent.value = _user.Fathername;
        JobNameAgent.value = _user.JobName;
        var _latlon = _user.LatLon;
        if (_latlon == null) {
            $(LatLonAgent).html(' ');
        }
        if (_latlon != null) {
            LatLonAgent.value = _user.LatLon;
        }
        if (_user.Home == true) {
            $(HomeAgent).children().html('خانه دار');

        }
        if (_user.Home == false) {
            $(HomeAgent).children().html('اجاره نشین');
        }
        if (_user.Married == true) {

            $(MarriedAgent).children().html('متاهل');
        }
        if (_user.Married == false) {
            $(MarriedAgent).children().first().html('مجرد');

            $(MarriedAgent).children().next().html(' ');
        }
        if (_user.Sex == true) {

            $(SexAgent).children().html('مرد');
            $(SexAgent).children().next().html(' ');
            }
            if (_user.Sex == false) {

                $(SexAgent).children().html('زن');
                $(SexAgent).children().next().html(' ');

        }
            TellAgent.value = _user.Tell;
    }
}
function deleteUser(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "deleteUser", { "ID": id }, function (data) {
        showCustomer();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}
function editUser(id) {
    btnRegisterUser.click();
    var _find = false;
    for (var i in listUsers) {
        if (listUsers[i].Id == id) {
            _find = true;
            _user.Id = listUsers[i].Id;
            _user.Fname = listUsers[i].Fname;
            _user.Lname = listUsers[i].Lname;
            _user.CodeMelli = listUsers[i].CodeMelli;
            _user.IdCity = listUsers[i].IdCity;
            _user.Mobile = listUsers[i].Mobile;
            _user.Address = listUsers[i].Address;
            _user.AccountCode = listUsers[i].AccountCode;
            _user.AgentCode = listUsers[i].AgentCode;
            _user.AgentRate = listUsers[i].AgentRate;
            _user.Agent_BankAcouuntNumber = listUsers[i].Agent_BankAcouuntNumber;
            _user.Agent_History = listUsers[i].Agent_History;
            _user.Agent_IdType = listUsers[i].Agent_IdType;
            _user.Agent_JobType = listUsers[i].Agent_JobType;
            _user.Agent_Lisence = listUsers[i].Agent_Lisence;
            _user.Agent_Malek = listUsers[i].Agent_Malek;
            _user.Agent_Place_Area = listUsers[i].Agent_Place_Area;
            _user.Agent_PosState = listUsers[i].Agent_PosState;
            _user.CodePostal = listUsers[i].CodePostal;
            _user.DateBirthday = listUsers[i].DateBirthday;
            _user.Fathername = listUsers[i].Fathername;
            _user.Home = listUsers[i].Home;
            _user.JobName = listUsers[i].JobName;
            _user.LatLon = listUsers[i].LatLon;
            _user.Married = listUsers[i].Married;
            _user.Sex = listUsers[i].Sex;
            _user.Tell = listUsers[i].Tell;
            _user.AgentLicenseImage = listUsers[i].AgentLicenseImage;
            break;
        }
    }
    if (_find) {
        if (_user.Agent_Lisence == true) {
            $(Agent_Lisence).children().first().html('دارد');
            $(Agent_Lisence).children().next().html('ندارد');
            _user.Agent_Lisence = true;
        }
        if (_user.Agent_Lisence == false) {
            $(Agent_Lisence).children().first().html('ندارد');
            $(Agent_Lisence).children().next().html('دارد');
            _user.Agent_Lisence = false;
        }
        //fasele
        if (_user.Agent_PosState == true) {
            $(Agent_PosState).children().first().html('دارد');
            $(Agent_PosState).children().next().html('ندارد');
            _user.Agent_PosState = true;
        }
        if (_user.Agent_PosState == false) {
            $(Agent_PosState).children().first().html('ندارد');
            $(Agent_PosState).children().next().html('دارد');
            _user.Agent_PosState = false;
        }
        //fasele

        if (_user.Agent_JobType == true) {
            $(Agent_JobType).children().first().html('عمده');
            $(Agent_JobType).children().next().html('خرده');
            _user.Agent_JobType = true;
        }
        if (_user.Agent_JobType == false) {
            $(Agent_JobType).children().first().html('خرده');
            $(Agent_JobType).children().next().html('عمده');
            _user.Agent_JobType = false;
        }
        //fasele
        if (_user.Agent_Malek == true) {
            $(Agent_Malek).children().first().html('مالک');
            $(Agent_Malek).children().next().html('استیجاری');
            _user.Agent_Malek = true;
        }
        if (_user.Agent_Malek == false) {
            $(Agent_Malek).children().first().html('استیجاری');
            $(Agent_Malek).children().next().html('مالک');
            _user.Agent_Malek = false;
        }
        //fasele
        if (_user.Agent_IdType == 1) {
            $(Agent_IdType).children().first().html('فروش');
            $(Agent_IdType).children().next().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            _user.Agent_IdType = 1;
        }
        if (_user.Agent_IdType == 2) {
            $(Agent_IdType).children().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().first().html('فروش');
            $(Agent_IdType).children().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            _user.Agent_IdType = 2;
        }
        if (_user.Agent_IdType == 3) {
            $(Agent_IdType).children().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().first().html('فروش');
            $(Agent_IdType).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            _user.Agent_IdType = 3;
        }
        if (_user.Agent_IdType == 4) {
            $(Agent_IdType).children().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().first().html('فروش');
            $(Agent_IdType).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            _user.Agent_IdType = 4;
        }
        if (_user.Agent_IdType == 5) {
            $(Agent_IdType).children().first().html('انحصاری خدمات پس از فروش');
            $(Agent_IdType).children().next().first().html('فروش');
            $(Agent_IdType).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().next().next().next().next().first().html('انحصاری فروش و خدمات پس از فروش');
            _user.Agent_IdType = 5;
        }
        if (_user.Agent_IdType == 6) {
            $(Agent_IdType).children().first().html('انحصاری فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().first().html('فروش');
            $(Agent_IdType).children().next().next().first().html('خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().first().html('فروش و خدمات پس از فروش');
            $(Agent_IdType).children().next().next().next().next().first().first().html('انحصاری فروش');
            $(Agent_IdType).children().next().next().next().next().next().first().html('انحصاری خدمات پس از فروش');
            _user.Agent_IdType = 6;
        }
        //fasele
        Id.value = _user.Id;
        fname.value = _user.Fname;
        lname.value = _user.Lname;
        codemeli.value = _user.CodeMelli;
        IdCity.value = _user.IdCity;
        Mobile.value = _user.Mobile;
        Address.value = _user.Address;
        AccountCode.value = _user.AccountCode;
        AgentCode.value = _user.AgentCode;
        AgentRate.value = _user.AgentRate;
        Agent_BankAcouuntNumber.value = _user.Agent_BankAcouuntNumber;
        Agent_History.value = _user.Agent_History;
        Agent_Place_Area.value = _user.Agent_Place_Area;
        CodePostal.value = _user.CodePostal;
        DateBirthday.value = _user.DateBirthday;
        Fathername.value = _user.Fathername;
        JobName.value = _user.JobName;
        var _latlon = _user.LatLon;
        if (_latlon == null) {
            $(LatLonheight).html(' ');
            $(LatLonwidth).html(' ');
        }
        if (_latlon != null) {
            var res1 = _latlon.split("-");
            LatLonheight.value = res1[0];
            LatLonwidth.value = res1[1];

        }
        if (_user.Home == true) {
            $(Home).children().first().html('خانه دار');
            $(Home).children().next().html('اجاره نشین');
            _user.Home = true;
        }
        if (_user.Home == false) {
            $(Home).children().first().html('اجاره نشین');
            $(Home).children().next().html('خانه دار');
            _user.Home = false;
        }
        if (_user.Married == true) {
            $(Married).children().first().html('متاهل');
            $(Married).children().next().html('مجرد');
            _user.Married = true;
        }
        if (_user.Married == false) {
            $(Married).children().first().html('مجرد');
            $(Married).children().next().html('متاهل');
            _user.Married = false;
        }

        if (_user.Sex == true) {

            $(Sex).children().first().html('مرد');
            $(Sex).children().next().html('زن');
            _user.Sex = true;

        }
        if (_user.Sex == false) {

            $(Sex).children().first().html('زن');
            $(Sex).children().next().html('مرد');
            _user.Sex = false;

        }
        Tell.value = _user.Tell;
        Img1.src = "../img/agentlicense/" + _user.AgentLicenseImage;
        $(Img1).fadeIn();
    }
}
function ShowCity() {
    fillselectwithoutfunction("ShowCity", Idcities);
}
function ShowCities() {
    fillselectwithoutfunction("ShowCities", IdCity);
}
function RegisterUser() {
    _user.Fname = fname.value;
    _user.Lname = lname.value;
    _user.CodeMelli = codemeli.value;
    _user.IdCity = IdCity.value;
    _user.Mobile = Mobile.value;
    _user.Address = Address.value;
    _user.AccountCode = AccountCode.value;
    _user.AgentCode = AgentCode.value;
    _user.AgentRate = AgentRate.value;
    _user.Agent_BankAcouuntNumber = Agent_BankAcouuntNumber.value;
    _user.Agent_History = Agent_History.value;
    _user.Agent_Place_Area = Agent_Place_Area.value;
    _user.Agent_PosState = Agent_PosState.value;
    _user.CodePostal = CodePostal.value;
    _user.Fathername = Fathername.value;
    _user.JobName = JobName.value;
    _user.LatLon = LatLonheight.value + "-" + LatLonwidth.value;
    _user.DateBirthday = DateBirthday.value;
    var fd = new FormData();
    fd.append("imageUploadForm", imageUploadForm.files[0]);

    if ($('#fname').val() != '' && $('#lname').val() != 0 && $('#codemeli').val() != '' && $('#IdCity').val() != '' && $('#Mobile').val() != '' && $('#Address').val() != '' && $('#AccountCode').val() != '' && $('#AgentCode').val() != '' && $('#AgentRate').val() != '' && $('#Agent_BankAcouuntNumber').val() != '' && $('#Agent_History').val() != '' && $('#Agent_Place_Area').val() != '' && $('#Agent_PosState').val() != '' && $('#CodePostal').val() != '' && $('#Fathername').val() != '' && $('#JobName').val() != '' && $('#LatLonheight').val() != '' && $('#LatLonwidth').val() != '' && $('#DateBirthday').val() != '') {
        MyAjax("post", "RegisterUser", _user, function (data) {
            _user.Id = data.Id;
            $.ajax({
                url: "saveuserpic" + "?" + $(UserRegisterform).serialize(),
                type: "POST",
                data: fd,
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false
            });
            showUser();
            $(Successful).fadeIn();
            $(Successful).fadeOut(3000);
            showUser();
        });
    }
    else {

        $('#modal_notify').fadeIn();
        $('#modal_notify').fadeOut(4000);
        return;
    }

    $('.modal').modal('hide');
    //showUser();
}
function showRequest() {
    MyAjax("Get", "showuserRequest", null, showuserrequest);
}
function showuserrequest(listrequeseuser) {
    $(divuserrequest).fadeIn();
    $(btnreturn).fadeIn();
    $(divUser).fadeOut();
    $(btnuserRequest).fadeOut();
    _listrequestuser = listrequeseuser;
    DataTableUsersRequestInPageUser(listrequeseuser, [{ Data: "Id", Title: "Id" },
    { Data: "Fname", Title: "نام" },
    { Data: "Lname", Title: "نام خانوادگی" },
    { Data: "CodeMelli", Title: "کدملی" },
    { Data: "Name", Title: "شهر" },
    { Data: "Mobile", Title: "موبایل" },
    { Data: "usertyprname", Title: "نوع کاربر" },
    { Data:"Agent_IdType",Title:"نوع درخواست"}], divuserrequest, null,
        { RowNumber: true },
    [{
        Text: "مکانیک",
        Icon: "check",
        class: "btn btn-success btn-dot",
        event: confermrequestMechanic
    },
    {
        Text: "نمایندگی فروش",
        Icon: "check",
        class: "btn btn-success btn-dot",
        event: confermrequestSell
    },
    {
        Text: "نمایندگی خدمات پس از فروش",
        Icon: "check",
        class: "btn btn-success btn-dot",
        event: confermrequestSellAndServicesAfter
    },
    {
        Text: "عدم تایید",
        Icon: "cancel",
        class: "btn btn-danger btn-dot",
        event: notconfirm
    }]);
    $(btnreturn).click(function () {
        showUser();
        $(noinformation).fadeOut();
    });
}
function confermrequestSell(id) {
    MyAjax("post", "confermrequestSell", { "Id": id }, function (data) {
        showuserrequest(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
    $(Successful).fadeIn();
    $(Successful).fadeOut(3000);
}
function ShowCityuserdetail() {
    fillselectwithoutfunction("ShowCity", IdCityAgent);
}
function changecity(ID) {
    MyAjax("Get", "changecity", {"Id":ID}, function (ListData) {
        var str = "";
        for (var i in ListData) {
            str += '<option value="' + ListData[i].Id + '">' + ListData[i].Display + '</option>';
        }
        IdCity.innerHTML = str;
    });
}
function confermrequestSellAndServicesAfter(id) {
    MyAjax("post", "confermrequestSellAndServicesAfter", { "Id": id }, function (data) {
        showuserrequest(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
}
function notconfirm(id) {
    MyAjax("post", "notconfirm", { "Id": id }, function (data) {
        showuserrequest(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
}
function confermrequestMechanic(id) {
    MyAjax("post", "confermrequestMechanic", { "Id": id }, function (data) {
        showuserrequest(data);
        $(Successful).fadeIn();
        $(Successful).fadeOut(3000);
    });
}