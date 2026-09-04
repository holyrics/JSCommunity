function hGetItemStatusData(obj) {
    var mixer = hGetBehringerMixer(obj);
    var muted = mixer.isAuxMute(obj.input.receiver_id, obj.input.aux);
    return {
          active: muted,
          description: (mixer.getAuxVolume(obj.input.receiver_id, obj.input.aux) * 100).toFixed(0) + "%"
    };
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('OSC Receiver'),
            description: '',
            type: 'receiver',
            receiver: 'OSC,wing'
        }, {
            id: 'mixer_model',
            name: jsc.i18n('Behringer Mixer'),
            type: 'string',
            allowed_values: [
                {value: 'x32', label: 'X32 / M32'},
                {value: 'wing', label: 'WING'}
            ],
            default_value: 'x32'
        }, {
            id: 'aux',
            name: jsc.i18n('Auxiliary Channel'),
            description: '',
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox: true
        }, {
            id: 'volume',
            name: '% ' + jsc.i18n('Volume') + ' (0-100)',
            description: '',
            type: 'number',
            min: 0,
            max: 100,
            default_value: 0,
            show_as_combobox: !h.isMinVersion("2.23.0"),
            component : 'slider',
            unit: '%'		

       }, {
            id: 'smoothness',
            name: jsc.i18n('Smoothness') + ' (1-10)',
            description: '',
            type: 'number',
            min: 1,
            max: 10,
            default_value: 1,
            show_as_combobox: !h.isMinVersion("2.23.0"),
            component : 'slider'
       }, {
            id: 'unmute',
            name: jsc.i18n('Unmute'),
            description: '',
            type: 'Boolean',
            default_value: true
        }
   ]; 
}

function hGetBehringerMixer(obj) {
    var info = h.getReceiverInfo(obj.input.receiver_id);
    var receiverType = info ? String(info.type || '').toLowerCase() : '';
    return receiverType === 'wing' || obj.input.mixer_model === 'wing' ? jsc.wing : jsc.x32;
}
