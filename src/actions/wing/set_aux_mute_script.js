var receiverID = obj.input.receiver_id;
var aux = obj.input.aux;
var mute;
if (obj.input.muted == 'toggle') {
    mute = !jsc.wing.isAuxMute(receiverID, aux);
} else {
    mute = obj.input.muted == 'enable';
}
jsc.wing.setAuxMute(receiverID, aux, mute);
