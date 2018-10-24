function ShowMessageValidation(Tag) {

    var TagLable = document.getElementById("Valid" + Tag.id);
    if (TagLable == null)
        return;
    TagLable.innerHTML = "";
    var display = Tag.getAttribute("data-display");
    Tag.setCustomValidity("");
    var ErrorMessage = "";
    if (Tag.validity.valid) {
        if (Tag.getAttribute("data-remote") != null) {
            MyAjax("Get", Tag.getAttribute("data-remote"), { Data: Tag.value }, function (Data) {
                if (Data) {
                    TagLable.innerHTML = "اطلاعات " + display + "  تکراری است ";
                    Tag.setCustomValidity("اطلاعات " + display + "  تکراری است ");
                }
            })
        }
        return;
    }
    if (Tag.validity.valueMissing) {
        ErrorMessage = " لطفا مقدار " + display + " وارد نمایید ";
    }
    if (Tag.validity.typeMismatch) {
        ErrorMessage = " لطفا فرمت " + display + " صحیح وارد نمایید ";
    }
    if (Tag.validity.rangeOverflow || Tag.validity.rangeUnderflow) {
        ErrorMessage = " مقدار " + display + " باید بین " + Tag.min + " و " + Tag.max + " باشد ";
    }
    if (Tag.validity.patternMismatch) {
        ErrorMessage = " لطفا الگوی " + display + " وارد نمایید ";
    }
    if (Tag.validity.tooLong) {
        ErrorMessage = " طول " + display + " باید حداکثر " + Tag.maxlength + " باشد  ";
    }
    TagLable.innerHTML = ErrorMessage;
}

function SetValidation(Content) {
    var ListInput = Content.querySelectorAll("input,textarea");
    for (var i = 0; i < ListInput.length; i++) {
        var Tag = ListInput[i];
        Tag.addEventListener("invalid", function (e) {
            e.preventDefault();
            ShowMessageValidation(this);
        });
        Tag.addEventListener("input", function () {

            ShowMessageValidation(this);
        });
        Tag.addEventListener("blur", function () {

            ShowMessageValidation(this);
        });
    }
}

function CheckValidation(Content) {
    var _valid = true;
    var ListInput = Content.querySelectorAll("input,textarea");
    for (var i = 0; i < ListInput.length; i++) {
        _valid = _valid && ListInput[i].validity.valid;
        ShowMessageValidation(ListInput[i]);
    }

    return _valid;
}