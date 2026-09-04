function hGetItemStatusData(obj) {
    if (hGetBehringerMixer(obj).isAuxMute(obj.input.receiver_id, obj.input.aux)) {
        return jsc.utils.ui.item_status.createMute(true);
    }
    return null;
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
            max: 12,
            default_value: 1,
            show_as_combobox: true
        }, {
            id: 'muted',
            name: jsc.i18n('Mute'),
            description: '',
            type: 'string',
            allowed_values: [
                { value: 'enable',  label: jsc.i18n('Enable') },
                { value: 'disable', label: jsc.i18n('Disable') },
                { value: 'toggle',  label: jsc.i18n('Toggle') }
            ]
        }
   ];
}

function hGetBehringerMixer(obj) {
    var info = h.getReceiverInfo(obj.input.receiver_id);
    var receiverType = info ? String(info.type || '').toLowerCase() : '';
    return receiverType === 'wing' || obj.input.mixer_model === 'wing' ? jsc.wing : jsc.x32;
}
