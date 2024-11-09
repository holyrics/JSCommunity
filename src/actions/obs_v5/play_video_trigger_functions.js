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
            suggested_values: function (obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        }, {
            id: 'scene_item_name',
            name: jsc.i18n('Item name'),
            description: '',
            type: 'string',
            suggested_values: function (obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'path',
            name: jsc.utils.format('{} ({})', [jsc.i18n('Base directory'), jsc.i18n('Optional')]),
            description: jsc.i18n('Location of the folder with videos on the computer where OBS Studio is open'),
            type: 'string',
            hint: 'C:/folder/example'
        }, {
            id: 'jump_scene_name',
            name: jsc.i18n('Post-Completion Jump'),
            description: '',
            type: 'string',
            default_value: "#previous_scene#",
            suggested_values: function (obj) {
                var arr = ["#previous_scene#"];
                try {
                    arr = arr.concat(jsc.obs_v5.getSceneList(obj.input.receiver_id));
                } catch (e) {
                    //ignore
                }                
                return arr;
            }
        }
    ];
}