//
function createReceiverInput(receiverType) {
    return {
        id: 'receiver_id',
        name: jsc.i18n('Receiver'),
        description: '',
        type: 'receiver',
        receiver: receiverType
    };
}