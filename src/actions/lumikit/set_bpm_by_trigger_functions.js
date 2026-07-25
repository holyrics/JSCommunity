function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Receptor',
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        }
    ];
}

function extractBPMFromObj(o) {
    if (!h.isMinimumVersion('2.25.0')) {
        return o.bpm;
    }
    if (!o || !o.metadata || !o.metadata.trigger) {
        return null;
    }
    
    var trigger = o.metadata.trigger;
    if (trigger.when == 'displaying' && trigger.item == 'any_song') {
        return parseFloat(o.bpm);
    }
    if (trigger.when == 'change' && trigger.item == 'bpm') {
        return parseFloat(o.new_value);
    }
    return null;
}