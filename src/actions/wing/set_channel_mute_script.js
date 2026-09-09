var p1 = obj.input.receiver_id;
var p2 = obj.input.channel;
var mute;
if (obj.input.muted == 'toggle') {
  mute = !jsc.wing.isChannelMute(p1, p2);
} else {
  mute = obj.input.muted == 'enable';
}
jsc.wing.setChannelMute(p1, p2, mute);
