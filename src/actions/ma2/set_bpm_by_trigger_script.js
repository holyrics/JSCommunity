var bpm = extractBPMFromObj(obj);
if (bpm && bpm >= 30 && bpm <= 300) {
    jsc.ma2.setBPM(obj.input.receiver_id, bpm);
}
