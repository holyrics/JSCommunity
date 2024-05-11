var p1 = obj.input.receiver_id;
var p2 = obj.input.input_name;

if (obj.input.muted == 'toggle') {
  jsc.obs_v5.toggleInputMute(p1, p2);
} else {
  jsc.obs_v5.setInputMute(p1, p2, obj.input.muted == 'enable');
}


