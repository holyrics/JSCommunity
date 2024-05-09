function hGetItemStatusData(obj) {

var muded = jsc.obs_v5.getInputMute(obj.input.receiver_id, obj.input.scene_item_name)
 return { active: muded
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