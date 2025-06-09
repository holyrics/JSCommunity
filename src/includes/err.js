function safeNullOrEmpty(value, varName) {
    if (value === null || value === undefined) {
        throw "Field '" + varName + "' is null";
    }
    if (value == '') {
        throw "Field '" + varName + "' is empty";
    }
}

function requireRangeNumber(value, min, max, fieldName) {
    if (isNaN(value) || value < min || value > max)
        throw 'invalid ' + fieldName + ' value: ' + value;
}