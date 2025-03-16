function hGetItemInputParams() {
    return [
        {
            id: 'script',
            name: jsc.i18n('Script'),
            description: '',
            type: 'string',
            allowed_values: function() {
                var arr = [{ value: '', label: '...' }];
                h.hly('GetScripts').data.forEach(function(s) {
                    arr.push({
                        value: s.id,
                        label: s.name
                    });
                });
                return arr;
            },
            default_value: ''
        }
    ];
}
