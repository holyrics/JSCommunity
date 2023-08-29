// Gatilho: Ao iniciar - Música (qualquer item)
//seta a velocidade do ritmo / luzes caso esteja preenchido o BPM na música
if (obj.bpm > 29) { 
    h.hly('SetBpm', {bpm: obj.bpm});
    jsc.lumikit.setBPM(obj.input.receiver_id, obj.bpm);
}
