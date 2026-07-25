// Gatilho: Ao iniciar - Música (qualquer item) OU Ao alterar BPM
var bpm = extractBPMFromObj(obj);
if (bpm && bpm >= 30 && bpm <= 400) { 
  jsc.lumikit.setBPM(obj.input.receiver_id, bpm);
}
