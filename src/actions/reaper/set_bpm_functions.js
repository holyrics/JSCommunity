function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Receptor',
            description: '',
            type: 'receiver',
            receiver: ''
        }, {
            id: 'bpm',
            name: 'BPM',
            description: '',
            type: 'number',
            decimal: true,
            min: 30,
            max: 960
        }, {
            id: 'play',
            name: jsc.i18n("Start player"),
            type: 'boolean',
            default_value: true
        }, {
            id: 'enable_metronome',
            name: jsc.i18n("Activate metronome"),
            type: 'boolean',
            default_value: true
        }
    ];
}