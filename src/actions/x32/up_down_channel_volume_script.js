function scriptAction(obj) {

var p1 = obj.input.receiver_id;
var p2 = obj.input.channel;
var changeVolume = obj.input.volume * (obj.input.type == "1" ? 1 : -1) / 100;
var currentVolume = jsc.x32.getChannelVolume(p1,p2);
var targetVolume =  currentVolume + changeVolume;

jsc.x32.setSmoothChannelVolume(p1, p2, targetVolume, 0.001 * obj.input.speed);

if (obj.input.unmute) {
    jsc.x32.setChannelMute(p1, p2, false);
   }

}