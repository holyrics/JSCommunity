function hGetItemInputParams() {
    var arr = [];
    arr.push(jsc.utils.ui.createReceiverInput('companion'));
    arr.push({
        id: 'delay',
        name: jsc.i18n('Delay (in milliseconds)'),
        description: '',
        type: 'number',
        min: 0,
        max: 60000,
        step: 100,
        default_value: 200
    });
    arr = arr.concat(jsc.utils.ui.companion.createPageRowColumnInputs());
    return arr;
}