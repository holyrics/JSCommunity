function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Receptor',
            type: 'receiver',
            receiver: 'reaper_osc'
        }, {
            id: 'play',
            name: jsc.i18n("Start Player"),
            type: 'boolean',
            default_value: true
        }, {
            id: 'enable_metronome',
            name: jsc.i18n("Activate metronome"),
            type: 'boolean',
            default_value: true
        }, {
            id: 'double_tempo_value',
            name: '<html>' + jsc.utils.html.addLineBreak(jsc.i18n('Double the tempo if the BPM is less than or equal to'), 'right'),
            type: 'number',
            min: 0,
            max: 120,
            default_value: 75
        }, {
            id: 'double_tempo_by_time_sig',
            name: '<html>' + jsc.utils.html.addLineBreak(jsc.i18n('Double the tempo if the time signature is 6/8, 9/8, or 12/8'), 'right'),
            type: 'boolean',
            default_value: true
        }
    ];
}