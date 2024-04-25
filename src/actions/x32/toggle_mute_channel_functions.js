function hGetItemStatusData(obj) {
  if (jsc.x32.isChannelMute(obj.input.receiver_id, obj.input.channel)) {
    return {
          active: true,     
      foreground: 'E6E6E6', 
      background: 'FF0000', 
       iconColor: 'E6E6E6'  
    };
  }
  return null; 
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Receptor OSC',
            description: '',
            type: 'receiver',
            receiver: 'osc'
        }, {
            id: 'channel',
            name: jsc.i18n('Número do canal'),
            description: '',
            type: 'number'
        }
   ];
}
