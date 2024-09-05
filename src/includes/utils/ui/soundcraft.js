//
function createInput(allowed_types, allowed_subtypes) {
    var arr = [
        {
            id: 'receiver_id',
            name: 'Soundcraft',
            type: 'receiver',
            receiver: 'soundcraft'
        }, {
            id: 'type',
            name: jsc.i18n('Type'),
            type: 'string',
            allowed_values: allowed_types,
            default_value: allowed_types[0].value
        }, {
            id: 'number',
            name: jsc.i18n('Number'),
            type: 'number',
            min: 1,
            max: 48,
            default_value: 1,
            show_as_combobox: true
        }
   ];
   if (allowed_subtypes) {
        arr.push({
            id: 'subtype',
            name: jsc.i18n('Subtype'),
            type: 'string',
            allowed_values: allowed_subtypes,
            default_value: 'line'
        });
        arr.push({
            id: 'subtype_number',
            name: jsc.i18n('Subtype number'),
            type: 'number',
            min: 1,
            max: 48,
            default_value: 1,
            show_as_combobox: true
        });
   }
   return arr;
}

//
function createInputMute() {
    return [
        {
            id: 'muted',
            name: jsc.i18n('Mute'),
            type: 'string',
            allowed_values: [
                {value: 'enable',  label: jsc.i18n('Enable')},
                {value: 'disable', label: jsc.i18n('Disable')},
                {value: 'toggle',  label: jsc.i18n('Toggle')}
            ]
        }
    ];
}

//
function createInputVolume() {
    return [
        {
            id: 'volume',
            name: '% ' + jsc.i18n('Volume ') + '(0-100)',
            type: 'number',
            min: 0,
            max: 100,
            default_value: 0,
            component : 'slider',
            unit: '%'		
        }, {
            id: 'smoothness',
            name: jsc.i18n('Smoothness') + ' (1-10)',
            type: 'number',
            min: 1,
            max: 10,
            default_value: 1,
            component : 'slider'
        }, {
            id: 'unmute',
            name: jsc.i18n('Unmute'),
            type: 'boolean',
            default_value: true
        }  
    ];
}

//
function createItemStatusMute(obj) {
    var muted = jsc.soundcraft.connFromInput(obj.input).isMute();
    return jsc.utils.ui.item_status.createMute(muted);
}

//
function createItemStatusVolume(obj) {
    var muted = jsc.soundcraft.connFromInput(obj.input).isMute();
    var volume = jsc.soundcraft.connFromInput(obj.input).getVolume();
    return {
          active: muted == true,     
          description: (volume * 100).toFixed(0) + "%"         
    };
}
