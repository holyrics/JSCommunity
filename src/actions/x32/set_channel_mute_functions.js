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
            receiver: 'OSC'
        }, {
            id: 'channel',
            name: jsc.i18n('Número do canal'),
            description: '',
            type: 'number',
            min: 1,
            max: 50,
            default_value: 1
        }
        , {
            id: 'muted',
            name: jsc.i18n('Mute'),
            description: '',
            type: 'Boolean'
        }
   ];
}