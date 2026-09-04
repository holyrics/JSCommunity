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
            id: 'fx_slot',
            name: jsc.i18n('FX Slot'),
            description: '',
            type: 'number',
            min: 1,
            max: 8,
            default_value: 1,
            component: 'combobox'
        }, {
            type: 'separator'
        }, {
            type: 'title',
            name: jsc.i18n("-1 to use the program's current BPM value")
        }, {
            id: 'bpm',
            name: 'BPM',
            description: '',
            type: 'number',
            min: -1,
            max: 480,
            default_value: -1
        }
   ];
}

function hGetBehringerMixer(obj) {
    var info = h.getReceiverInfo(obj.input.receiver_id);
    var receiverType = info ? String(info.type || '').toLowerCase() : '';
    return receiverType === 'wing' || obj.input.mixer_model === 'wing' ? jsc.wing : jsc.x32;
}
