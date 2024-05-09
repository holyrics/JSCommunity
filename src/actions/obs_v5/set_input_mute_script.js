var p1 = obj.input.receiver_id;
var p2 = obj.input.scene_name;
var p3 = obj.input.scene_item_name;


if (obj.input.muted == 'toggle') {
  mute = !jsc.obs_v5.getInputMute(p1, p3);
} else {
  mute = obj.input.muted == 'enable';
}

jsc.obs_v5.setInputMute(p1, p3, mute);

