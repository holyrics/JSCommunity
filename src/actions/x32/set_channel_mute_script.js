var p1 = obj.input.receiver_id; 
var p2 = obj.input.channel;
var mixer = hGetBehringerMixer(obj);
var mute;
if (obj.input.muted == 'toggle') {
  mute = !mixer.isChannelMute(p1, p2);
} else {
  mute = obj.input.muted == 'enable';
}
mixer.setChannelMute(p1, p2, mute);
