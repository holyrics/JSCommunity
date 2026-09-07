function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('Receptor grandMA2'),
            description: '',
            type: 'receiver',
            receiver: 'grandma2'
        }, {
            id: 'movement_executors',
            name: jsc.i18n('Executors de movimento'),
            description: jsc.i18n('Códigos separados por vírgula. Exemplo: {}', ['1.101,1.102,1.103']),
            type: 'string',
            default_value: '1.101,1.102,1.103'
        }, {
            id: 'static_executors',
            name: jsc.i18n('Executors estáticos'),
            description: jsc.i18n('Códigos separados por vírgula. Exemplo: {}', ['1.111,1.112,1.113']),
            type: 'string',
            default_value: '1.111,1.112,1.113'
        }, {
            id: 'movement_without_bpm',
            name: jsc.i18n('Permitir movimento sem BPM?'),
            description: jsc.i18n('Permite usar Executors de movimento mesmo quando a música não possui BPM preenchido'),
            type: 'boolean',
            default_value: true
        }
    ];
}

function ma2SlideContains(marker) {
    var slideType = String(obj.slide_type || '') + String(obj.slide_description || '');
    return slideType.indexOf(marker) > -1;
}

function ma2NormalizeExecutor(text) {
    text = String(text || '').trim();
    if (!text) return '';

    text = text.replace(/^\s*(on|off|toggle)\s+executor\s+/i, '');
    text = text.replace(/^\s*executor\s+/i, '');
    text = text.replace(/\s+/g, '');

    if (/^\d+$/.test(text)) {
        text = '1.' + text;
    }
    if (!/^\d+\.\d+$/.test(text)) {
        return '';
    }
    return text;
}

function ma2ParseExecutors(value) {
    var raw = String(value || '').split(/[,;\r\n]+/);
    var result = [];
    for (var i = 0; i < raw.length; i++) {
        var executor = ma2NormalizeExecutor(raw[i]);
        if (executor && result.indexOf(executor) < 0) {
            result.push(executor);
        }
    }
    return result;
}

function ma2RandomExecutor(executors, previous, randomKey) {
    if (!executors.length) return '';
    if (executors.length == 1) return executors[0];

    var candidates = [];
    for (var i = 0; i < executors.length; i++) {
        if (executors[i] != previous) {
            candidates.push(executors[i]);
        }
    }
    return candidates[h.random(0, candidates.length - 1, randomKey)];
}
