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
            name: 'Receptor',
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'cena_Movimento',
            name: 'Cenas de Movimento',
            description: 'Índice das cenas em movimento, ex: 9,13,14,15,16',
            type: 'string',
            default_value: '9,13,14,15,16'
        },
        {
            id: 'cena_Estatica',
            name: 'Cenas Estáticas',
            description: 'Índice das cenas estáticas, ex: 1,2,3,4,5,6,7',
            type: 'string',
            default_value: '1,2,3,4,5,6,7'
         },
          {
            id: 'movimentoSemBpm',
            name: 'Movimento exige BPM?',
            description: 'Define se executará cenas em movimento mesmo que a música não possua BPM preenchido',
            type: 'boolean',
            default_value: true
         }
    ];
}