var p1 = obj.input.receiver_id;
var p2 = obj.input.channel;
var mixer = hGetBehringerMixer(obj);
var changeVolume = obj.input.volume * (obj.input.type == "inc" ? 1 : -1) / 100;
var currentVolume = mixer.getChannelVolume(p1,p2);
var targetVolume =  currentVolume + changeVolume;

var range = h.getGlobal("jsc.x32.smooth_volume_range", 8);
range = jsc.utils.range(range, 1, 30);
var speed = (range * (Math.exp(obj.input.smoothness / 10) - 1)) / (Math.E - 1);

mixer.setSmoothChannelVolume(p1, p2, targetVolume, 0.001 * speed);

if (obj.input.unmute) {
    mixer.setChannelMute(p1, p2, false);
}
