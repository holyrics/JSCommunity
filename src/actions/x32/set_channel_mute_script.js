var p1 = obj.input.receiver_id;
var p2 = obj.input.channel;
var mute;
if (obj.input.muted == 'toggle') {
  mute = !jsc.x32.isChannelMute(p1, p2);
} else {
  mute = obj.input.muted == 'enable';
}
jsc.x32.setChannelMute(p1, p2, mute);