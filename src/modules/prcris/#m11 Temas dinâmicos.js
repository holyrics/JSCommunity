// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m11';
var mUID = mID + ''; 

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  logState(module.settings.log, mUID, 'startup '+ mID);
}


function info() {
    return {
        id: mID,
        name: 'Temas dinâmicos',
        description: '<html>'+
                     '• Este módulo automatiza a troca de tema e plano de fundo, permitindo ter sempre um fundo diferente'+
                     ' a cada exibição de uma música. <br>'+
                     '• Permite especificar um fundo fixo no campo extra <b>tema_fixo</b> em uma música. <br>'+
                     '• Também funciona para Apresentação Automática <br> '+
                     '  uso: Crie tags com o nome de cada tema usado nas configurações e adicione os vídeos que deseja usar junto com o tema para que o módulo possa funcionar adequadamente.<br>'+
                     infoVDDMM,
         allowed_requests: [
                     allowedPrcrisModuleRequests
         ]
    };
}







// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
function triggers(module) {
  var arr = [];

  arr.push({
    id: mID + "_temaFixo_title",
    when: "displaying",
    item: "any_title_subitem",
    action: function(obj) {

      var temaFixo = null;
      
      if (obj.title == 'Dízimos' || obj.title == 'Ceia') {
        temaFixo = obj.title;
        h.hly('SetCurrentBackground', { name: temaFixo });
      }

      h.setGlobal('temaFixo', temaFixo);
      h.log(mID, 'temaFixo setado para {}', temaFixo);
    }
  });
  
    arr.push({
        id: "BPM_variable_" + mUID,
        when: "displaying",
        item: "any_song_slide",
        action: function(obj) {
            try {
                if (obj.slideBPM != null) {
                    var slides = obj.slideBPM.split('|');
                    for (var j = 0; j < slides.length; j++) {
                        var bpmInfo = slides[j].split(',');
                        var slide = bpmInfo[0];
                        if (slide == obj.slide_show_index) {
                             var bpm = bpmInfo[1];
                             var time = bpmInfo[2] || 0;
                             h.log(mUID, 'BPM variável encontrado: {} ', slides[j]);    
                             if (bpm == '!') { bpm = obj.bpm * 2; }
                             else if (bpm < 4) { bpm = obj.bpm / bpm; }
                             setTimeoutBPM(module, parseInt(bpm).toFixed(0), slide, time);
                        }  
                    }
                }
            } catch (e) { h.log("", 'Erro {}', [e]); }
        }
    });  
  
  arr.push({
    id: mID + "_salta_titulo_musica",
    when: "displaying",
    item: "any_song_slide",
    action: function(obj) {
      if (obj.slide_show_index == -1 && module.settings.skiptitle) {
        var timeout = h.getGlobal(mID + '_salta_titulo_musica',1000);
              h.setTimeout(function (obj) {
                 h.hly('ActionGoToIndex', {index: 1});
              }, timeout);
      } 
    }
  });

  return arr;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d

function settings() {
    
    return [
        {
            name: 'Sobre ' + mID,
            description: infoVDDMM,
            type: 'label'
        }, {
            id: 'skiptitle',
            label: 'Saltar Título Músicas (1s)',
            type: 'boolean'
        }, {
            id: 'title',
            label: 'Tema Título e artista',
            type: 'theme'
           
        }, {
            id: 'slow',
            label: 'Tema Lentas',
            type: 'theme'
        }, {
            id: 'fast',
            label: 'Tema Rápidas',
            type: 'theme'
           
        }, {
            id: 'thite',
            label: 'Tema Dízimos',
            type: 'theme'
           
        }, {
            id: 'supper',
            label: 'Tema Ceia',
            type: 'theme'
           
        }, {
            id: 'pre_service',
            label: 'Pré Culto',
            type: 'theme'
        }, {
            type: 'separator'
        }, {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log, mUID, 'onchange '+ mID); //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];

}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22637573746f6d5468656d65227d

function customTheme(module) {
    function getTheme(obj) {
       var tema;
       

            if ( preCulto() ) {                          tema = module.settings.pre_service.name;}
       else if ( h.getGlobal("temaFixo") == 'Dízimos' ) { tema = module.settings.thite.name;}          
       else if ( h.getGlobal("temaFixo") == 'Ceia' ) {   tema = module.settings.supper.name;}
       else if (obj.slide_show_index === -1 ) {          tema = module.settings.title.name;}
       else if ( obj.tema_fixo ) {                       tema = obj.tema_fixo;}
       else if ( obj.bpm > 110 ) {                       tema = module.settings.fast.name;}
       else {                                            tema = module.settings.slow.name;}
       
       if (obj.slide_show_index === 1) {
           h.log(mID, 'Fundo selecionado: {}', tema);
       }
       
       if (!tagExists(tema) && !obj.tema_fixo) {
           h.log('', 'Você precisa criar uma tag para o tema: {} poder funcionar no modo aleatório.', tema);
       }
       
       return { intersection :  true,
                cache_key : tema,
                tags : [tema],
                base_theme : tema
       };
    }
               
    return {
        song: getTheme,
        automatic_presentation: getTheme
    };
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function preCulto() {
  var r = h.hly('GetCurrentSchedule');
  var s = r.data[0];

  var serviceTime = new Date(s.datetime);
  var preServiceStart = new Date(serviceTime.getTime() - 60 * 60 * 1000); // Subtrai 1 hora

  var currentTime = new Date();

  // Verifica se a hora atual está entre preServiceStart e serviceTime
  if (currentTime >= preServiceStart && currentTime < serviceTime) {
    return true;
  }

  return false;
}

function compararHora(str) {
    str = str.split(':');
    var agora = new Date();
    var varData = new Date();
    ['setHours', 'setMinutes', 'setSeconds'].forEach(function(fn, i) {
        return varData[fn](str[i]);
    });
    if (agora == varData) return 0;
    else return agora > varData ? 1 : -1;
}

function tagExists(tag) {
    var r = h.hly('GetBackgrounds');
    var tags = [];

    // Percorre os dados para extrair e acumular as tags
    for (var i = 0; i < r.data.length; i++) {
        var bg = r.data[i];
        for (var j = 0; j < bg.tags.length; j++) {
            var currentTag = bg.tags[j];
            if (tags.indexOf(currentTag) === -1) { // Verifica se a tag já foi adicionada
                tags.push(currentTag);
            }
        }
    }
    // Verifica se a tag existe no array de tags acumuladas
    return tags.indexOf(tag) !== -1;
}

function getThemeData(themeName) {
    var t = h.hly('GetBackgrounds', {
        type: 'theme'
    });

    var themeData = null;

    // Percorre o array `data` para encontrar o tema pelo nome
    for (var i = 0; i < t.data.length; i++) {
        if (t.data[i].name === themeName) {
            themeData = t.data[i];
            break; // Sai do loop quando o tema é encontrado
        }
    }

    return themeData;
}


function setBpm(BPM, module) {
    if (BPM > 29) { 
        h.log(mUID, 'BPM alterado para: ' + BPM);
        h.hly('SetBpm', { bpm: BPM });
    }
}

function setTimeoutBPM(module, bpm, slide, time) {
    time = time == 0 ? 500 : time;
    var timeoutDuration = time < 10 ? time * 1000 : time;
    h.log(mUID, 'Velocidade será alterada pelo Slide {} para {} depois de {} segundos', [slide, bpm, timeoutDuration / 1000]); 
    h.setTimeout(function() {
        h.log(mUID, '************ Executando timeout');
        h.log(mUID, 'Velocidade Alterada pelo Slide {} para {} depois de {} segundos', slide, bpm, timeoutDuration / 1000); 
        setBpm(bpm, module);
    }, timeoutDuration, mUID + '_alterBPM'); // Tempo em milissegundos
}