function hGetItemStatusData(obj) {
  if (jsc.x32.isGroupMute(obj.input.receiver_id, obj.input.group)) {
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
            id: 'group',
            name: jsc.i18n('Grupo de canais'),
            description: '',
            type: 'number',
            min: 1,
            max: 16,
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