var p1 = obj.input.receiver_id;
var p2 = obj.input.scene_name;
var p3 = obj.input.scene_item_name;
var enabled = jsc.obs_v5.getSceneItemEnabled(p1, p2, p3);
jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, !enabled);
