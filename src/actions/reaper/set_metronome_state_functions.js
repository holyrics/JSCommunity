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
                {value: 'enable', label: jsc.i18n('Enable')},
                {value: 'disable', label: jsc.i18n('Disable')}
            ],
            default_value: 'enable'
        }
    ];
}