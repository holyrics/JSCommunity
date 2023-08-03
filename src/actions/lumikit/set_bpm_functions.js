function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Lumikit',
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        }, {
            id: 'bpm',
            name: 'BPM',
            description: '',
            type: 'number',
            min: 30,
            max: 200
        }
    ];
}