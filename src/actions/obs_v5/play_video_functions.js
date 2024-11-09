function hGetItemStatusData(obj) {
    return {
             active: false,
        description: obj.input.file_name.name,
               icon: 'video:' + obj.input.file_name.name
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
            id: 'file_name',
            name: jsc.i18n('File name'),
            description: '',
            type: 'video'
        }, {
            id: 'path',
            name: jsc.i18n('Base directory'),
            description: '',
            type: 'string',
            default_value: "C:/Holyrics/Holyrics/files/media/video/"
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