// Gatilho: Ao iniciar - Música (qualquer item) - JavaScript
//seta a velocidade do ritmo / luzes caso esteja preenchido o BPM na música
var receiverID = 'Lumikit';
if (obj.bpm > 29 ) { 
    h.hly('SetBpm', {bpm: obj.bpm});
    jsc.lumikit.setBPM(receiverID,obj.bpm);
    }
