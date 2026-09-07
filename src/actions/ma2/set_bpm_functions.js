function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('Receptor grandMA2'),
            description: '',
            type: 'receiver',
            receiver: 'grandma2'
        }, {
            id: 'bpm',
            name: 'BPM',
            description: jsc.i18n('Valor enviado ao SpeedMaster 1'),
            type: 'number',
            min: 30,
            max: 300,
            default_value: 120
        }
    ];
}
