function hGetItemStatusData(obj) {
    if (jsc.wing.isAuxMute(obj.input.receiver_id, obj.input.aux)) {
        return jsc.utils.ui.item_status.createMute(true);
    }
    return null;
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('WING Receiver'),
            description: '',
            type: 'receiver',
            receiver: 'wing'
        }, {
            id: 'aux',
            name: jsc.i18n('Auxiliary Channel'),
            description: '',
            type: 'number',
            min: 1,
            max: 8,
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
