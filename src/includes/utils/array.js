// 
function join(array, separator, toString) {
    var s = '';
    for (var i = 0; i < array.length; i++) {
        if (i > 0) s += separator;
        if (toString !== undefined && typeof toString === 'function') {
            s += toString(array[i]);
        } else {
            s += array[i];
        }
    }
    return s;
}

// 
function joinFormat(array, separator, format) {
    var toString = function(a) {
        return h.format.f(format, a);
    };
    return jsc.utils.array.join(array, separator, toString);
}
