function hGetItemStatusData(obj) {
    return jsc.utils.ui.soundcraft.createItemStatusVolume(obj);
}

function hGetItemInputParams() {
    var allowed_types = [
        {value: 'input',  label: 'Input'},
        {value: 'line',   label: 'Line'},
        {value: 'aux',    label: 'Aux'},
        {value: 'fx',     label: 'FX'},
        {value: 'sub',    label: 'Sub'},
        {value: 'player', label: 'Player'},
        {value: 'vca',    label: 'VCA'}
    ];
    var inputs = jsc.utils.ui.soundcraft.createInput(allowed_types);
    inputs = inputs.concat(jsc.utils.ui.soundcraft.createInputVolume());
    return inputs;
}