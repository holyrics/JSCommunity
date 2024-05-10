var p1 = obj.input.receiver_id;
var p2 = obj.input.scene_item_name;


if (obj.input.muted == 'toggle') {
    var mute = !jsc.obs_v5.getInputMute(p1, p2);
} else {
    var mute = obj.input.muted == 'enable';
}

jsc.obs_v5.setInputMute(p1, p2, mute);

