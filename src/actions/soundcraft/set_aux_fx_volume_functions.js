function hGetItemStatusData(obj) {
    return jsc.utils.ui.soundcraft.createItemStatusVolume(obj);
}

function hGetItemInputParams() {
    var allowed_types = [
        {value: 'aux',    label: 'Aux'},
        {value: 'fx',     label: 'FX'}
    ];
    var allowed_subtypes = function(o) {
        if (o.input.type == 'aux') {
            return [
                {value: 'input',  label: 'Input'},
                {value: 'line',   label: 'Line'},
                {value: 'fx',     label: 'FX'},
                {value: 'player', label: 'Player'}
            ];
        }
        if (o.input.type == 'fx') {
            return [
                {value: 'input',  label: 'Input'},
                {value: 'line',   label: 'Line'},
                {value: 'sub',    label: 'Sub'},
                {value: 'player', label: 'Player'}
            ];
        }
        return [{value: 'input',  label: 'Input'}];
    };
    var inputs = jsc.utils.ui.soundcraft.createInput(allowed_types, allowed_subtypes);
    inputs = inputs.concat(jsc.utils.ui.soundcraft.createInputVolume());
    return inputs;
}