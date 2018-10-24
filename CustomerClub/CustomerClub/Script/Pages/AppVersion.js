$(load);
var listAllData = [];
var _appversion = new AppVersion(0, 0, "", "", "");
function load() {
    ShowAppVersion();
}
function ShowAppVersion() {
    MyAjax("Get","ShowAppVersion",null,ShowTagValue);
}
function ShowTagValue(Listdata) {
    listAllData = Listdata;
    for (var i in listAllData) {
        _appversion.Id = listAllData[i].Id;
        _appversion.VersionCode = listAllData[i].VersionCode;
        _appversion.VersionName = listAllData[i].VersionName;
        _appversion.Url = Listdata[i].Url;
        break;
    }
    if (_appversion.Url != "") {
        var str = '<label class="text-success icon-check" id="VersionExist">' + _appversion.Url + '</label>';
        $("#divshowlabel").append(str);
    }
    else {
        var str = '<label class="text-danger icon-cancel" id="VersionExist">   برنامه ای موجود نیست   </label>';
        $("#divshowlabel").append(str);
    }
    Id.value = _appversion.Id;
    versioncode.value = _appversion.VersionCode;
    versionname.value = _appversion.VersionName;
}