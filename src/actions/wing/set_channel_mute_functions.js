function hGetItemStatusData(obj) {
  if (jsc.wing.isChannelMute(obj.input.receiver_id, obj.input.channel)) {
    return jsc.utils.ui.item_status.createMute(true);
  }
  return null;
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('WING Receiver'),
            type: 'receiver',
            receiver: 'wing'
        }, {
            id: 'channel',
            name: jsc.i18n('Channel'),
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox : true
        }, {
            id: 'muted',
            name: jsc.i18n('Mute'),
            type: 'string',
            allowed_values: [
                {value: 'enable',  label: jsc.i18n('Enable')},
                {value: 'disable', label: jsc.i18n('Disable')},
                {value: 'toggle',  label: jsc.i18n('Toggle')}
            ]
        }
   ];
}
