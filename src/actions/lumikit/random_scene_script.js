// funciona como gatilho: Ao exibir - Slide (música) - (qualquer item)

// assista https://www.youtube.com/watch?v=Jana_IszBfo para entender o funcionamento

// coloque {{<slide_type=*>}} no início de um verso para customizar.
// Asterisco * no nome da parte aciona a luz ritmo
// Esclamação ! no nome da parte aciona cenas ritmicas no início da música até o slide 3
// se a parte da música contiver "Instrumental" ou "Refrão" também será luz ritmo automaticamente

var receiverID = obj.input.receiver_id;
var cenaMovimento =  [9,13,14,15,16];  // índice das cenas do lumikit que são ritmadas
var cenaEstatica = [1,2,3,4,5,6,7];    // índice das cenas do lumikit que são estáticas
var movimentoAtivo = h.getGlobal('movimentoAtivo');

if ((obj.bpm > 0 && obj.slide_show_index < 1) ||  
    desvendaLuz('/') ||
    (desvendaLuz('!') && obj.slide_show_index < 4) ||
    ((desvendaLuz('*') || desvendaLuz('Instrumental') || desvendaLuz('Refrão')) && obj.slide_show_index < obj.slide_show_total)
) { 
    var codigo = sorteiaLuz(cenaMovimento);
} else {  
    var codigo = sorteiaLuz(cenaEstatica);
}

if (movimentoAtivo && cenaMovimento.indexOf(codigo)>=0) {
    h.log('LogLuzes','Parte seguida com luz movimento, troca ignorada. ' + codigo);
    return;
}

h.log('LogLuzes','luz: ' + codigo);
h.setGlobal('movimentoAtivo',(cenaMovimento.indexOf(codigo)>-1));
jsc.lumikit.setActiveScene(receiverID, 1, codigo);
