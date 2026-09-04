var receiverID = obj.input.receiver_id;
var mixer = hGetBehringerMixer(obj);
var fx_slot = obj.input.fx_slot;
var bpm;
if (obj.input.bpm < 0) {
    bpm = h.hly("GetBpm").data;
    bpm = bpm || 0;
} else {
    bpm = parseInt(obj.input.bpm);
}
mixer.setBPM(receiverID, fx_slot, bpm);
