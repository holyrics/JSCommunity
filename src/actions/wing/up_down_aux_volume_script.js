var p1 = obj.input.receiver_id;
var p2 = obj.input.aux;
var changeVolume = obj.input.volume * (obj.input.type == "inc" ? 1 : -1) / 100;
var currentVolume = jsc.wing.getAuxVolume(p1, p2);
var targetVolume = currentVolume + changeVolume;

var range = h.getGlobal("jsc.wing.smooth_volume_range", 8);
range = jsc.utils.range(range, 1, 30);
var speed = (range * (Math.exp(obj.input.smoothness / 10) - 1)) / (Math.E - 1);

jsc.wing.setSmoothAuxVolume(p1, p2, targetVolume, 0.001 * speed);

if (obj.input.unmute) {
    jsc.wing.setAuxMute(p1, p2, false);
}
