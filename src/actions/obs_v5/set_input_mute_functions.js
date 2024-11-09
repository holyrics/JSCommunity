function hGetItemStatusData(obj) {
  if (getInputMute(obj.input.receiver_id, obj.input.input_name)) {
    return jsc.utils.ui.item_status.createMute(true);
  }
  return null; 
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: '',
            type: 'receiver',
            receiver: 'obs_v5'
        }, {
            id: 'input_name',
            name: jsc.i18n('Input name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getAudioInputList(obj.input.receiver_id);
            }
        }, {
            id: 'muted',
            name: jsc.i18n('Mute'),
            description: '',
            type: 'string',
            allowed_values: [
                {value: 'enable' , label: jsc.i18n('Enable')},
                {value: 'disable' , label: jsc.i18n('Disable')},
                {value: 'toggle' , label: jsc.i18n('Toggle')}
            ]
        }
    ];
}