function desvendaLuz(marcador) {
  var slide_type = obj.slide_type + obj.slide_description;  
  return slide_type.indexOf(marcador) > -1;
}

function sorteiaLuz(tipo) {
  //sorteia uma cena de luz e grava para não repetir no próximo sorteio
  return tipo[h.random(0,tipo.length-1,'luzAleatoria')];
}

function hGetItemInputParams() {
    return [
        {
            id: 'receiver_id',
            name: jsc.i18n('Receptor'),
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'cena_Movimento',
            name: jsc.i18n('Cenas de Movimento'),
            description: jsc.i18n('Índice das cenas em movimento, ex: {}', ['9,13,14,15,16']),
            type: 'string',
            default_value: '9,13,14,15,16'
        },
        {
            id: 'cena_Estatica',
            name: jsc.i18n('Cenas Estáticas'),
            description: jsc.i18n('Índice das cenas estáticas, ex: {}', ['1,2,3,4,5,6,7']),
            type: 'string',
            default_value: '1,2,3,4,5,6,7'
         },
          {
            id: 'movimentoSemBpm',
            name: jsc.i18n('Movimento exige BPM?'),
            description: jsc.i18n('Define se executará cenas em movimento mesmo que a música não possua BPM preenchido'),
            type: 'boolean',
            default_value: true
         }
    ];
}