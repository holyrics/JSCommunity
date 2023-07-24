err = {
    safeNullOrEmpty: function (value, varName) {
        if (value === null || value === undefined) {
            throw "Field '" + varName + "' is null";
        }
        if (value == '') {
            throw "Field '" + varName + "' is empty";
        }
    }
};
