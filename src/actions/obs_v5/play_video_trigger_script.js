var p1 = obj.input.receiver_id;
var p2 = obj.input.scene_name;
var p3 = obj.input.scene_item_name;

var jumpToScene = obj.input.jump_scene_name;
if (jumpToScene == '#previous_scene#') {
    jumpToScene = jsc.obs_v5.getActiveScene(p1);
}

var mediaName = obj.file_fullname;
var localFile = obj.file_path;
if (obj.input.path) {
    var basePath = obj.input.path.replace(/\\/g, '/');
    if (!basePath.endsWith('/'))
        basePath += '/';
    
    localFile = basePath + mediaName;
}

jsc.obs_v5.setInputSettings(p1, p3, {
    close_when_inactive: true,
                looping: false,
             local_file: localFile
});

jsc.obs_v5.setActiveScene(p1, p2);

if (jumpToScene) {
    jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
        jsc.obs_v5.setActiveScene(p1, jumpToScene);
    });
}