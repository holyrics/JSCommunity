var receiverID = obj.input.receiver_id;
var aux = obj.input.aux; 
var mute;
if (obj.input.muted == 'toggle') {
    mute = !jsc.x32.isAuxMute(receiverID, aux); 
} else {
    mute = obj.input.muted == 'enable';
}
jsc.x32.setAuxMute(receiverID, aux, mute); 