function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('OSC Receiver'),
            description: '',
            type: 'receiver',
            receiver: 'OSC'
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
