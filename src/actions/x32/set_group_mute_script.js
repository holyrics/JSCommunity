var p1 = obj.input.receiver_id; 
var p2 = obj.input.group;
var mixer = hGetBehringerMixer(obj);
var mute;
if (obj.input.muted == 'toggle') {
  mute = !mixer.isGroupMute(p1, p2);
} else {
  mute = obj.input.muted == 'enable';
}
mixer.setGroupMute(p1, p2, mute);
