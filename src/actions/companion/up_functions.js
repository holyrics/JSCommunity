function hGetItemInputParams() {
    var arr = [];
    arr.push(jsc.utils.ui.createReceiverInput('companion'));
    arr = arr.concat(jsc.utils.ui.companion.createPageRowColumnInputs());
    return arr;
}