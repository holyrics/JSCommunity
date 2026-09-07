var p1 = obj.input.receiver_id;
var p2 = obj.input.group;
var mute;
if (obj.input.muted == 'toggle') {
  mute = !jsc.wing.isGroupMute(p1, p2);
} else {
  mute = obj.input.muted == 'enable';
}
jsc.wing.setGroupMute(p1, p2, mute);
