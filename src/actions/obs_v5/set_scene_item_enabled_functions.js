function hGetItemStatusData(obj) {
    var enabled = jsc.obs_v5.getSceneItemEnabled(
            obj.input.receiver_id,
            obj.input.scene_name,
            obj.input.scene_item_name
            );
    return {
        active: enabled
    };
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
            id: 'scene_name',
            name: jsc.i18n('Scene name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        }, {
            id: 'scene_item_name',
            name: jsc.i18n('Item name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'state_action',
            name: jsc.i18n('Action'),
            description: '',
            type: 'string',
            allowed_values: [
                {value: 'toggle', label: jsc.i18n('Toggle')},
                {value: 'enable', label: jsc.i18n('Enable')},
                {value: 'disable', label: jsc.i18n('Disable')}
            ]
        }
    ];
}