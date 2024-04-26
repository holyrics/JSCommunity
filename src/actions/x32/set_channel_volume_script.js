var range = h.getGlobal("jsc.x32.smooth_volume_range", 8);
range = jsc.utils.range(range, 1, 30);
var speed = (range * (Math.exp(obj.input.smoothness / 10) - 1)) / (Math.E - 1);
jsc.x32.setSmoothChannelVolume(
        obj.input.receiver_id,
        obj.input.channel,
	obj.input.volume / 100,
	0.001 * speed
);
if (obj.input.unmute) {
    jsc.x32.setChannelMute(
            obj.input.receiver_id,
            obj.input.channel,
            false
    );
}