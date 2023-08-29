function desvendaLuz(marcador) {
  var slide_type = obj.slide_type + obj.slide_description;  
  return (slide_type.indexOf(marcador) > -1) && (obj.bpm > 0);
}

function checaTag(obj,marcador) {
  return obj.tag.indexOf(marcador) > -1;
}

function sorteiaLuz(tipo) {
  //sorteia uma cena de luz e grava para não repetir no próximo sorteio
  return tipo[jslib.random(0,tipo.length-1,'luzAleatoria')];
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: 'Lumikit',
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        }
    ];
}