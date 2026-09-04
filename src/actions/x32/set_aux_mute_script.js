var receiverID = obj.input.receiver_id;
var aux = obj.input.aux; 
var mixer = hGetBehringerMixer(obj);
var mute;
if (obj.input.muted == 'toggle') {
    mute = !mixer.isAuxMute(receiverID, aux);
} else {
    mute = obj.input.muted == 'enable';
}
mixer.setAuxMute(receiverID, aux, mute);
