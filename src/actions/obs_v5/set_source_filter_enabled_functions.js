function hGetItemStatusData(obj) {
    var enabled = jsc.obs_v5.getSourceFilterEnabled(
            obj.input.receiver_id,
            obj.input.source_name,
            obj.input.source_filter_name
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
            id: 'source_name',
            name: jsc.i18n('Source or scene name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                var scenes = jsc.obs_v5.getSceneList(obj.input.receiver_id);
                var sources = jsc.obs_v5.getSourceList(obj.input.receiver_id);
                return scenes.concat(sources);
            }
        }, {
            id: 'source_filter_name',
            name: jsc.i18n('Filter name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSourceFilterList(obj.input.receiver_id, obj.input.source_name);
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