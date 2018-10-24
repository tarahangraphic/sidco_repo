/// <reference path="../DataTable/DataTableProductSuggestion.js" />

window.onload = load;

function load() {
    ShowProductSuggestion();
}


function ShowProductSuggestion() {

    MyAjax("Get","ShowProductSuggestion", null, showgrid);
}

function showgrid(listProductSuggestion) {
    DataTableSuggestion(listProductSuggestion,
        [{ Data: "Id", Title: "Id" },
    { Data: "Name", Title: "نام محصول" }], divProductSuggestion,
    { RowNumber: true },
        [{
            Text: "حذف",
            Icon: "icon-trash",
            class: "btn btn-danger",
            event: deleteProductSuggestion
        },
        {
            Text: "بالا",
            Icon: "icon-up-circled",
            class: "btn btn-black btn-outline",
            event: sortupProductSuggestion
        },
        {
            Text: "پایین",
            Icon: "icon-down-circled",
            class: "btn btn-black btn-outline",
            event: sortdownProductSuggestion
        }]);
}

function deleteProductSuggestion(id) {
    if (!confirm("آیا عملیات انجام شود؟"))
        return;
    MyAjax("post", "DeleteProductSuggestion", { "Id": id }, function () {
        ShowProductSuggestion();
        $(deleteinformation).fadeIn();
        $(deleteinformation).fadeOut(3000);
    });
}


function sortupProductSuggestion(id) {
    MyAjax("Post", "sortUpProductSuggestion", { "Id": id },showgrid);
}

function sortdownProductSuggestion(id) {
    MyAjax("Post", "sortDownProductSuggestion", { "Id": id },showgrid);
}
