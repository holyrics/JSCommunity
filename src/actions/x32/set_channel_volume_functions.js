function hGetItemStatusData(obj) {
    var muted = jsc.x32.isChannelMute(obj.input.receiver_id, obj.input.channel);
    return {
          active: muted,     
          description : (jsc.x32.getChannelVolume(obj.input.receiver_id, obj.input.channel) * 100).toFixed(0) + "%"         
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
            name: jsc.i18n('Channel number'),
            description: '',
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox : true
        }, {
            id: 'volume',
            name: '% '+jsc.i18n('Volume ')+ '(0-100)',
            description: '',
            type: 'number',
            min: 0,
            max: 100,
            default_value: 0,
            show_as_combobox : true
       }, {
            id: 'smoothness',
            name: jsc.i18n('Smoothness')+ ' (1-10)',
            description: '',
            type: 'number',
            min: 1,
            max: 10,
            default_value: 1,
            show_as_combobox : true
       }, {
            id: 'unmute',
            name: jsc.i18n('Unmute'),
            description: '',
            type: 'Boolean',
            default_value : true
        }
   ]; 
}