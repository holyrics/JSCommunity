function hGetItemStatusData(obj) {
    var muted = jsc.x32.isChannelMute(obj.input.receiver_id, obj.input.channel);
    var description = (jsc.x32.getChannelVolume(obj.input.receiver_id, obj.input.channel) * 100).toFixed(0) + "%";
    return {
          active: muted,     
          description: description
    };
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('OSC Receiver'),
            description: '',
            type: 'receiver',
            receiver: 'OSC'
        }, {
            id: 'channel',
            name: jsc.i18n('Channel Number'),
            description: '',
            type: 'number',
            min: 1,
            max: 32,
            default_value: 1,
            show_as_combobox : true
        }, {
            id: 'type',
            name: jsc.i18n('Type'),
            description: '',
            type: 'string',
            allowed_values: [
                {value: 'inc' , label: jsc.i18n('Increase')},
                {value: 'dec' , label: jsc.i18n('Decrease')}
            ],
            default_value: 'inc'
       }, {
            id: 'volume',
            name: jsc.i18n('Level')+' (1-10)',
            description: '',
            type: 'number',
            min: 1,
            max: 10,
            default_value: 5,
            show_as_combobox : true
       }, {
            id: 'smoothness',
            name: jsc.i18n('Smoothness')+' (1-10)',
            description: '',
            type: 'number',
            min: 1,
            max: 10,
            default_value: 5,
            show_as_combobox : true
       }, {
            id: 'unmute',
            name: jsc.i18n('Unmute'),
            description: '',
            type: 'boolean',
            default_value : true
        }
   ]; 
}