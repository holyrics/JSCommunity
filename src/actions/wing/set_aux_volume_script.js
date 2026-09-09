var range = h.getGlobal("jsc.wing.smooth_volume_range", 8);
range = jsc.utils.range(range, 1, 30);
var speed = (range * (Math.exp(obj.input.smoothness / 10) - 1)) / (Math.E - 1);
jsc.wing.setSmoothAuxVolume(
        obj.input.receiver_id,
        obj.input.aux,
        obj.input.volume / 100,
        0.001 * speed
);
if (obj.input.unmute) {
    jsc.wing.setAuxMute(
            obj.input.receiver_id,
            obj.input.aux,
            false
    );
}
