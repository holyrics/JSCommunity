function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Receptor',
            description: '',
            type: 'receiver',
            receiver: 'reaper_osc'
        }, {
            id: 'state',
            name: jsc.i18n("Action"),
            description: '',
            type: 'string',
            allowed_values: [
                {value: 'play' , label: jsc.i18n('Play')},
                {value: 'pause' , label: jsc.i18n('Pause')},
                {value: 'stop' , label: jsc.i18n('Stop')}
            ],
            default_value: 'play'
        }
    ];
}