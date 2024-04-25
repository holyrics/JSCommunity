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
            name: jsc.i18n('OSC Receiver'),
            description: '',
            type: 'receiver',
            receiver: 'OSC'
        }, {
            id: 'channel',
            name: jsc.i18n('Channel'),
            description: '',
            type: 'number',
            min: 1,
            max: 32,
            default_value: 1,
            show_as_combobox : true
        }
        , {
            id: 'muted',
            name: jsc.i18n('Mute'),
            description: '',
            type: 'string',
            allowed_values: [{value: 'enable' , label: jsc.i18n('Enable')},
                             {value: 'disable' , label: jsc.i18n('Disable')},
                             {value: 'toggle' , label: jsc.i18n('Toggle')}]
        }

   ];
}