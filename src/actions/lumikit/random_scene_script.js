// funciona como gatilho: Ao exibir - Slide (música) - (qualquer item)

// assista https://www.youtube.com/watch?v=Jana_IszBfo para entender o funcionamento

// coloque {{<slide_type=*>}} no início de um verso para customizar.
// Asterisco * no nome da parte aciona a luz ritmo
// Esclamação ! no nome da parte aciona cenas ritmicas no início da música até o slide 3
// se a parte da música contiver "Instrumental" ou "Refrão" também será luz ritmo automaticamente

var receiverID = obj.input.receiver_id;
var cenaMovimento = obj.input.cena_Movimento.replaceAll(' ','').split(',');  // índice das cenas do lumikit que são ritmadas
var cenaEstatica = obj.input.cena_Estatica.replaceAll(' ','').split(',');    // índice das cenas do lumikit que são estáticas
var movimentoAtivo = h.getGlobal('movimentoAtivo',false);
var bpm = obj.bpm > 0 || !obj.input.movimentoSemBpm;

if ((bpm && obj.slide_show_index < 1) ||  
    desvendaLuz('/') ||
    (desvendaLuz('!') && obj.slide_show_index < 4) ||
    ((desvendaLuz('*') || jsc.utils.isInstrumental(obj) || jsc.utils.isChorus(obj)) && bpm && obj.slide_show_index < obj.slide_show_total)
) { 
    if (movimentoAtivo) {
        return;
    }
    var codigo = sorteiaLuz(cenaMovimento);
} else {  
    var codigo = sorteiaLuz(cenaEstatica);
}

h.setGlobal('movimentoAtivo',(cenaMovimento.indexOf(codigo)>-1));
jsc.lumikit.setActiveScene(receiverID, 1, codigo);