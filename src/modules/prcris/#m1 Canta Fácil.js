// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m1';
var mUID = '@prcris#m1';

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID, 'startup '+ mID);
 
}

function info() {
    return {
        id: mID,
        name: 'Canta Fácil',
        description: '<html>'+
                     '• Permite associar um cantor escalado a cada música da aba Mídia<br>'+
                     '• Exibe o cantor escalado da música na tela de retorno no slide 1<br>'+
                     '• Monta uma base de dados de cantores por música para axiliar na montagem de escalas<br>'+
                     '• Ajusta o volume dos microfones dos cantores, baseado na voz principal da música na escala. (behinger e soundcraft)<BR>'+
                     '• Gera uma lista das músicas e cantores escalados para você enviar para o grupo<br><br>'+
                     infoVDDMM
       };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e227d

// esta aba é responsável pelo menu clicando o botão direito em cima de uma música para trazer os dados registrados de volume e cantor atual.

function contextActions(module) {
    return [
        {
            name: spanIcon("\ueaca")+ 
                  "Listar Cantor/Volume Vozes (" + mUID + ')',
            types: ['song'],
            action: function(module) {
                var musicID = String(module.item.id);
                var slideNumber = 1;
                var leadSinger = getSinger(musicID);
                var volumeInputs = loadInputsVolume();
                var mensagem = ["Cantor da música = " + leadSinger, "Volume verso 1:"];
                if (volumeInputs[musicID] &&
                    volumeInputs[musicID][leadSinger] &&
                    volumeInputs[musicID][leadSinger].slides[slideNumber]) {
                    var volumes = volumeInputs[musicID][leadSinger].slides[slideNumber];
                    h.log(mUID, 'contextActionsCantorDaMusica mensagem {} ', [mensagem]);
                    for (var cantor in volumes) {
                        if (volumes.hasOwnProperty(cantor)) {
                            mensagem.push(cantor + " - " + volumes[cantor].volume);
                        }
                    }
                }
              else
                  mensagem.push('Volume não encontrado para o verso 1');
              showMessage(module.item.title, mensagem);
          }  
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2253657474696e6773227d

// esta aba é responsável pelo ícone da engrenagem, onde se configuram os parâmetros de funcionamento do módulo

function settings(module) {
    var arr = [
        {
            name: 'Sobre ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
         {
            type: 'title',
            label: 'Configurações mixer digital:',
        },
        {
            id: 'digital_mixer',
            name: jsc.i18n('Receptor'),
            description: '<html><hr>Associe ao receptor da Behinger/Soundcraft caso você possua um, para que funcionem as rotinas de alteração de volume/mute',
            type: 'receiver',
            receiver: 'osc,soundcraft'
        },
        {
            id: 'vocalname',
            name: jsc.i18n('<html>Nome <b>função</b> integrantes cantores'),
            description: '<html><hr>Nome comum que foi dado no cadastro de funções aos cantores cadastrados (todos os cantores precisam ter esta palavra na função ex: (Vocal 1, Backing-Vocal 1, Vocal 2, Vocal 3)',
            type: 'string',
            default_value: 'Vocal'
        },
        {
            id: 'type_of_rec_play',
            name: jsc.i18n('Capturar/Aplicar volume'),
            description: '<html><hr>Caso seja escolhido Primeiro Slide, irá salvar a configuração no slide 1 quando chegar ao slide 5, dando tempo para eventuais ajustes.',
            type: 'string',
            default_value: 'first',
            allowed_values: [
                {value: 'first', label: jsc.i18n('Primeiro Slide')},
                {value: 'all', label: jsc.i18n('Todos os Slides')}
                ]
        },
        {
            id: 'unmuteChanels',
            label: 'Desmutar canais dos integrantes escalados',
            description: '<html><hr>Libera o mute dos canais associados aos cantores escalados ao iniciar uma música.',
            type: 'boolean'
        },

         {
            type: 'separator'
        },
         {
            type: 'title',
            label: 'Músicas por Cantor Escalado',
        },
        {
            id: 'singer_in_registered_services_database',
            label: 'Utilizar dados dos cultos já registrados',
            description: '<html><hr>Cada vez que é associado um cantor a uma música, o módulo sabe quem está apto a cantar esta música e inclui na lista como sugestão, mesmo que ele não esteja escalado',
            type: 'boolean'
        },
        {
            id: 'singer_in_groups',
            label: '<html>Identificar <b>cantor</b> no grupo das músicas',
            description: '<html><hr>Como funciona: Crie grupos de músicas com o nome dos cantores. Ex "C Fulano" e associe este grupo às músicas que o "Fulano" está apto a cantar. Desta maneira, come esta opção ativada, quando você for associar cantores para a música aparecerá somente o nome dos cantores escalados associados nos grupos a esta música',
            type: 'boolean'
        },
        {
            id: 'start_singer_in_category',
            label: 'Letra ID inicial dos cantores no grupo',
            type: 'string',
            description: '<html><hr>Funciona junto com o parâmetro anterior, o módulo procura os cantores iniciando com este caractere, no exemplo "C Fulano" representa o vocalista "Fulano" da sua equipe.',
            default_value: 'C'
        },
          {
            type: 'separator'
        },
         {
            type: 'title',
            label: 'Nome do cantor na tela de retorno',
            description: '<html><hr>Configuração de qual tela é para ser utilizada para informar no primeiro slide da música quem é o cantor principal da mesma.',
        },
        {
            id: 'test_screen',
            label: 'Testar nome das telas',
            type: 'boolean'
        },
        {
            id: 'line_break',
            label: 'Quebra de linha',
            type: 'boolean'
        },
        {
            id: 'screen_id',
            label: 'Tela a exibir',
            type: 'string',
            suggested_values: function(obj) {
                var r = h.hly('GetDisplaySettings');
                var displayNames = [];
                for (var i = 0; i < r.data.length; i++) {
                    displayNames.push(r.data[i].id);
                }
                return displayNames;
            }
        },
          {
            type: 'separator'
        },
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(module.settings.log, mUID, 'onchange '+ mID);; //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];
    return arr;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226c79726963735265706f7274227d

//esta aba é responsável pelo relatório das músicas que serão cantadas, bem como a lista de integrantes escalados.
//

function actionServiceLyricsList(module) {
    return {
        id: 'lstSongs', 
        label: 'Lista Músicas Evento',
        hint: 'Lista Músicas',
        icon : 'system:insert_page_break',
        action: function(evt) {

            var params = [];
            params.push(
                {
                    type: 'title',
                    label: 'Relatório de Músicas do Evento'
                },
                {
                    type: 'separator'
                }
            );
        
            params.push(
                {
                    key: 'singer',
                    type: 'boolean',
                    label: 'Incluir cantor principal',
                    description: '',
                    default_value: true
                }
            );
 
            params.push(
                {
                    key: 'scheduled',
                    type: 'boolean',
                    label: 'Incluir escala',
                    description: '',
                    default_value: true
                }
            );


            var input = h.input(params);

            if (input == null) {
                h.notification("Cancelado pelo usuário");
                return;
            }

            var playlist = h.hly('GetMediaPlaylist');
            var titlesWithSongs = [];
            var currentTitle = null;
            var currentLog = [];
            var hasSongUnderTitle = false;

            for (var i = 0; i < playlist.data.length; i++) {
                
                if (playlist.data[i].type === "title") {
                    if (currentTitle !== null && hasSongUnderTitle) {
                        titlesWithSongs.push(currentTitle);
                        titlesWithSongs = titlesWithSongs.concat(currentLog);
                    }
                    currentTitle = '-- *' + playlist.data[i].name + '*';
                    currentLog = [];
                    hasSongUnderTitle = false;
                }
                
                if (playlist.data[i].type === "song") {
                    if (currentTitle !== null) {
                        hasSongUnderTitle = true;
                    }
                    var lyrics = h.hly('GetLyrics', {id: playlist.data[i].song_id});
                    var log = lyrics.data.title;
                                       
                    if (input.singer) {
                        log = log + ' | _voz:_ ' + getSinger(lyrics.data.id);
                    }
                    currentLog.push(log);
                }
            }

            // Add the last title if it has songs
            if (currentTitle !== null && hasSongUnderTitle) {
                titlesWithSongs.push(currentTitle);
                titlesWithSongs = titlesWithSongs.concat(currentLog);
            }
            var schedule = h.hly('GetCurrentSchedule').data[0];
            h.log(addIcon('=== *'+schedule.name+' - '+formatDateTime(schedule.datetime)+'*'));
            // Log the titles with songs
            for (var j = 0; j < titlesWithSongs.length; j++) {
                h.log(addIcon(titlesWithSongs[j]));
            }
           if (input.scheduled) {
              try {
              listScheduledMembers(schedule);
              } catch (e) { h.log("",'Erro {}',[e]) };
           }  
        }
    }
}


function listScheduledMembers(schedule) {
    h.log('');
    h.log(addIcon('-- *Escala:*'));
    if (schedule && schedule.roles && schedule.roles.length > 0) {
        schedule.roles.forEach(function(role) {
            if (role.member && role.member.name && role.name) {
                var roleName = role.name.replace(/\d+/g, '');
                h.log(addIcon('*' + roleName +':* ' + role.member.name));
            }
        });
    }
}


function formatDateTime(dateTimeStr) {
    var dateTime = new Date(dateTimeStr);

    var day = dateTime.getDate();
    var month = dateTime.getMonth() + 1; // Meses são indexados de 0 a 11
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();

    // Adiciona zero à esquerda se o valor for menor que 10
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return day + '/' + month + ' ' + hours + ':' + minutes;
}


function addIcon(text) {
    // Mapeamento de ícones para palavras-chave específicas
    var iconMap = {
        "Culto" : "\uD83D\uDDD3\uFE0F", // calendário
        "_voz" : "\uD83C\uDFBC", // notas musicais
        "Escala": "\uD83D\uDE4B\u200D\u2642\uFE0F\uD83D\uDE4B\u200D\u2640\uFE0F", // 2 pessoas mao levantada
        "Baixo": "\uD83C\uDFB8", // Emoji de guitarra baixo
        "Violão": "\uD83C\uDFBB", // Emoji de microfone e guitarra
        "Vocal": "\uD83C\uDFA4", // Emoji de microfone
        "Holyrics": "\uD83D\uDCFD", // Emoji de projetor de filme
        "Som": "\uD83D\uDD08", // Emoji de controle deslizante
        "Bateria": "\uD83E\uDD41", // Emoji de bateria
        "Teclado": "\uD83C\uDFB9", // Emoji de piano
        "Guitar": "\uD83C\uDFB8", // Emoji de guitarra
        "Sax": "\uD83C\uDFBA", // Emoji de saxofone
        "Flauta": "\uD83C\uDFB6", // Emoji de notas musicais
        "Percussão": "\uD83E\uDD41" // Emoji de bateria
    };
    
    // Procura por palavras-chave no texto e adiciona o ícone correspondente
    for (var keyword in iconMap) {
        if (text.indexOf(keyword) !== -1) {
            return iconMap[keyword] + " " + text;
        }
    }
    
    // Se nenhuma palavra-chave for encontrada, retorna o texto original
    return text;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226576656e7453696e67657273227d
// este código trata apenas da configuração do cantor por música

function textTransform(module) {
    return {
        song: function(obj) {
            var add_text = {};
            
            //h.log(module.settings);
            if (module.settings.test_screen) {
                add_text.add_end = '<styled><color: #ffff00>' + obj.screen_id + '</color>'; 
            }

            if (obj.screen_id == module.settings.screen_id
                && obj.slide_number == 1) { 
                add_text.add_start = "<styled><color: #ffff00> Voz: "+getSinger(obj)+"</color> "+(module.settings.line_break ? " \n" : "");
                add_text.line_break = false;
            }

            return Object.keys(add_text).length > 0 ? add_text : null;
        }
    };
}


function actionVocalsOfService(module) {	
    return {
        id: 'singers',
        label: '',
        hint : 'Cantores de cada música',
        icon : 'system:mic',
        action: function (evt) {
          h.log(mUID,'actionVocalsOfService(module) called');
          var schedule = h.hly('GetCurrentSchedule').data[0];
          var playlist_id = schedule.datetime;
          var scheduled = listScheduledSingers(schedule, module);
          if (schedule.type == 'temporary') {
            h.log("Indisponível para lista temporária");
            return;
          }
          var inputs = [];
          var medias = schedule.media_playlist;
          inputs.push ({
              type : 'title',
              label : 'Associe cada música a um cantor escalado'
          },
          {
              type: 'separator'
          }
          );
          for (var i = 0; i < medias.length; i++) {
            var item = medias[i];
            if (item.type == 'song') {
               h.log(mUID,'playlist_id {}, item {}, scheduled {}, module {}',[playlist_id, item, scheduled, module.settings]);
               inputs.push(createInput(playlist_id, item, scheduled, module));
            }
          }
          if (inputs.length == 0) {
            h.notification('lista vazia');
            return;
          }
          var result = h.input(inputs);
          if (result === null) {
            return;
          }
          if (inputs.length == 1) {
                    changeSingerOfSongByEvent(
              playlist_id, inputs[0].id, result
            );
            return;
          }
          for (var i = 0; i < inputs.length; i++) {
            var id = inputs[i].id;
            h.log(mUID,'playlist_id {} , id {},  result[id] {}',[playlist_id, id, result[id]]);
            changeSingerOfSongByEvent(playlist_id, id, result[id]);
          }
        }
    };
}


function getSinger(obj) {
    var schedule = h.hly('GetCurrentSchedule').data[0];
    var playlist_id = schedule.datetime;

    if (typeof obj == 'string') {
        var id = obj
       }
    else
       {
        var id = obj.source_id;
        }
   return getSingerOfSongByEvent(playlist_id, id);
}


function getPlaylistConfig() {
  var json = h.restore(mID + '_my_playlist_settings') || {} ;
  try {
  var settings = json;
    } catch (e) {}
  settings = settings || {};
  h.log(mUID,"getPlaylistConfig() - {} bytes - {} ",[JSON.stringify(settings).length, settings]);  
  return settings;
}

function getSingerOfSongByEvent(playlist_id, song_id) {
    var settings = getPlaylistConfig();
    
    if (!settings) {
        h.log("Erro: Configurações da playlist não foram obtidas.");
        return '';
    }
    
    var id = playlist_id + "_" + song_id + '_cantor';
    
    if (settings.hasOwnProperty(id)) {
        return settings[id];
    } else {
        return '';
    }
}


function changeSingerOfSongByEvent(playlist_id, song_id, name) {
  var settings = getPlaylistConfig();
  var id = playlist_id + "_" + song_id + '_cantor';
  settings[id] = name;
  h.store(mID + '_my_playlist_settings', settings);
}

function getCurrentEventSinger(song_id) {
  var playlist_id = h.getPlaylistInfo().datetime;
  return getSingerOfSongByEvent(playlist_id, song_id);
}


function createInput(playlist_id, item, scheduledSingers, module) {
  var id = item.reference_id;
  var suggested_values = listSingersScheduledBySong(id, scheduledSingers,module);
  return {
    id: id,
    type: 'string',
    label: item.name,
    default_value: getSingerOfSongByEvent(playlist_id, id),
    suggested_values: suggested_values
  };
}

function listScheduledSingers(schedule, module) { // Obter nomes dos cantores escalados
  var scheduledSingers = [];
  if (schedule && schedule.roles && schedule.roles.length > 0) {
       schedule.roles.forEach(function(role) {
         if (role.member && role.member.name && role.name && role.name.contains(module.settings.vocalname)) {
             scheduledSingers.push(role.member.name);
            }
        });
    }
  return scheduledSingers;
}

function listSingersScheduledBySong(id, scheduledSingers, module) {
var resultSingers = scheduledSingers;

// verifica quem canta esta música baseado no grupo de músicas e lista apenas os escalados
if (module.settings.singer_in_groups) { 
   resultSingers = getSingersByGroups(id, scheduledSingers, module);
  }

if (module.settings.singer_in_registered_services_database) { 
   try {
   var resultSingers = listSingerInServicesDatabase(id, resultSingers);
   } catch (e) { h.log("",'Erro {}',[e]) };
 }

return resultSingers;
}

function listSingerInServicesDatabase(musicId, resultSingers) {
    var singers = [];
    var distinctSingers = [];

    var data = getPlaylistConfig();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var parts = key.split('_');
            var id = parts[1];
            if (id === musicId) {
                var singer = data[key];
                h.log(mUID, 'Data: {} Cantor: {}', [parts[0], singer]);
                if (singers.indexOf(singer) === -1) { // Verifica se o cantor já existe no array
                    singers.push(singer);
                }
            }
        }
    }

    distinctSingers.push( {type : 'title', value: 'title', label:"<html><b> • Escalados:</b><hr style=\"border: 1px solid black;\">"});//
    if (resultSingers) {
        for (var i = 0; i < resultSingers.length; i++) {
            distinctSingers.push(resultSingers[i]);
        }
    }

    if (singers.length > 0) {
        distinctSingers.push({type : 'title', value: 'title', label:"<html><b> • Já cantaram: </b><hr style=\"border: 1px solid black;\">"});
        for (var j = 0; j < singers.length; j++) {
            distinctSingers.push(singers[j]);
        }
    }

    return distinctSingers;
}

function getSingersByGroups(id, scheduledSingers, module) {
  var lyric = h.hly('GetLyrics', {id: id});
  var groups = lyric.data.groups;
  var singersBySong = [];
  for (var j = 0; j < groups.length; j++) {
    if (groups[j].name.indexOf(module.settings.start_singer_in_category) === 0) {
      singersBySong.push(groups[j].name.substring(module.settings.start_singer_in_category.length()+1));
    }
  }

  var singers = [];
  for (var i = 0; i < singersBySong.length; i++) {
    for (var j = 0; j < scheduledSingers.length; j++) {
      if (singersBySong[i] === scheduledSingers[j]) {
        singers.push(singersBySong[i]);
        break;
      }
    }
  }
return singers;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226368616e6e656c73566f63616c5365747570227d

// este código trata apenas da configuração dos canais da mesa de som para cada cantor e volumes default

function actionChannelVocalSetup(module) {
    return {
        id: 'channels',
        label: 'Configuração de Canais',
        icon : 'system:filter_list',
        action: function(evt) {
            var inputs = [];
            var r = h.hly('GetMembers');
            var channels = loadChannels();
            inputs.push({
                type: 'title',
                label: 'Preencha os canais abaixo'
            },
            {
                type: 'separator'
            });
            for (var i = 0; i < r.data.length; i++) {
                var role = r.data[i].roles[0];
                h.log(mUID,'função {} nome {} ', [role.name,r.data[i].name]);
                if (role && role.name && role.name.contains(module.settings.vocalname)) {
                    inputs.push({
                        id: r.data[i].name,
                        name: r.data[i].name,
                        description: '',
                        type: 'number',
                        min: 0,
                        max: 32,
                        default_value: channels[r.data[i].name] || 0,  // Use 0 as default if the name is not found
                        show_as_combobox: true
                    });
                }
            }
            var q = h.input(inputs);
            if (q !== null) {
                saveChannels(q);
            }
        }
    };
}


function actionDefaultVolumeSetup(module) {
    return {
        id: 'defaultVolume',
        label: 'Configuração de Volume Default',
        icon : 'system:list_alt',
        action: function(evt) {
            var inputs = [];
            var r = h.hly('GetMembers');
            var channels = loadDefaultVolume();
            inputs.push({
                type: 'title',
                label: 'Preencha os volumes Default'
            },
            {
                type: 'separator'
            },{
               type: 'title',
               label: 'Como Principal'
            }
            );
            for (var i = 0; i < r.data.length; i++) {
                var role = r.data[i].roles[0];
                if (role && role.name && role.name.contains(module.settings.vocalname)) {
                    inputs.push({
                        id: 'singer_'+r.data[i].name,
                        name: r.data[i].name,
                        description: '',
                        type: 'number',
                        min: 0,
                        max: 100,
                        default_value: channels['singer_'+r.data[i].name] || 0,  // Use 0 as default if the name is not found
                        component : 'slider',
                        unit: '%'
                    });
                }
            }
           inputs.push({
            type: 'separator'
            },{
               type: 'title',
               label: 'Como Backing-Vocal'
            }
            );
            for (var i = 0; i < r.data.length; i++) {
                var role = r.data[i].roles[0];
                if (role && role.name && role.name.contains(module.settings.vocalname)) {
                    inputs.push({
                        id: 'backing_'+r.data[i].name,
                        name: r.data[i].name,
                        description: '',
                        type: 'number',
                        min: 0,
                        max: 100,
                        default_value: channels['backing_'+r.data[i].name] || 0,  // Use 0 as default if the name is not found
                        component : 'slider',
                        unit: '%'
                    });
                }
            }

            var q = h.input(inputs);
            if (q !== null) {
                saveDefaultVolume(q);
            }
        }
    };
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73536574227d

// esta aba inicializa todos os botões do módulo (actions) e contém o código de algumas. 
// Cada chamada da action logo abaixo está apontando a aba que ela se encontra

function actions(module) {
    
    return [
        { //menu de configurações extras
        id: 'menu',
        label: '',
        icon : 'system:menu',
        action: [
           // actionConvertVolume(module),   // nesta aba
           actionServiceLyricsList(module),  // na aba LyricsReport
           actionChannelVocalSetup(module),  // na aba channelsVocalSetup
           actionDefaultVolumeSetup(module), // na aba channelsVocalSetup
           ]
        },
        actionVocalsOfService(module),       // na aba eventSingers
        actionRec(module),	                  // nesta aba
        actionPlay(module)                   // nesta aba
        ]
}



function actionConvertVolume(module) { //função para converter base salva de múltiplos slides para primeiro slide, reduzindo o arquivo
return   { 
            id: 'Convert',
            label: 'Converte base para primeiro slide',
            icon : 'system:published_with_changes',
            action: function(evt) {
               var inputsVolume = loadInputsVolume();
               var convertedInputsVolume = removeUnwantedSlides(inputsVolume);
               h.log(mUID,'Conversão: de {} para {} ',[summarySavedSongs(inputsVolume),summarySavedSongs(convertedInputsVolume)]);
               h.log(mUID,'Conversão: de {}b para {}b ',[JSON.stringify(inputsVolume).length,JSON.stringify(convertedInputsVolume).length]);
               h.setGlobal(mUID + '_inputs_volume', convertedInputsVolume);
               h.setGlobal(mUID + '_inputs_volume_changed',true);
               storeInputsVolume();
            }
         }
}

function	actionRec(module) {
return   { 
            id: 'Rec',
            label: '',
            hint: 'Rec',
            icon : 'system:fiber_manual_record',
            action: function(evt) {
                var rec_volume_data = !h.getGlobal(mUID + '_rec_volume_data');
                h.setGlobal(mUID + '_rec_volume_data', rec_volume_data);
                if (rec_volume_data) {
                    module.updatePanel(); 
                    h.setGlobal(mUID + '_last_slide_number', null);
                }
                else
                  storeInputsVolume();
            },
            status: function(evt) {
                if (h.getGlobal(mUID + '_rec_volume_data')) {
                    return {
                        active: true,           // default = false
                        foreground: 'E6E6E6',   // default = null
                        background: '790903',   // default = null
                        iconColor:  'E6E6E6'     // default = null
                    };
                } else {
                    return null; // default values
                }
            }
        }
}
function	actionPlay(module) {
return   { 
            id: 'Play',
            label: '',
            hint : 'Play',
            icon : 'system:play_arrow',
            action: function(evt) {
                var set_volume_data = !h.getGlobal(mUID + '_set_volume_data');
                h.setGlobal(mUID + '_set_volume_data', set_volume_data);
                if (set_volume_data) {
                   // h.setGlobal('rec_volume_data', false); // Desativa o Rec se o Play for ativado
                    module.updatePanel();
                    h.setGlobal(mUID + '_last_slide_number', null);
                }
            },
            status: function(evt) {
                if (h.getGlobal(mUID + '_set_volume_data')) {
                    return {
                        active: true,           // default = false
                        foreground: 'E6E6E6',   // default = null
                        background: '790903',   // default = null
                        iconColor: 'E6E6E6'     // default = null
                    };
                } else {
                    return null; // default values
                }
            }
        }
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
// todas as triggers do módulo estão aqui

function triggers(module) {
    var arr = []; 
    h.setGlobal(mUID + '_set_volume_data', true);  // ativa o play na inicialização do módulo
    arr.push({
        id : mUID + '_clear_last_slide_number',
        when: "closing",
        item: "any_song",
        action: function (obj) {
            h.setGlobal(mUID + '_last_slide_number', null);
            storeInputsVolume(); 
        }
    });

    arr.push({
        id : mUID + '_change_volume_vocal_by_slide',
        when: "displaying",
        item: "any_song_slide",
        action: function(obj) {
    
            h.setGlobal('@prcris#type_of_rec_play',module.settings.type_of_rec_play);
            if (((h.getGlobal(mUID + '_rec_volume_data') || !haveData(obj)) && module.settings.type_of_rec_play == 'all') ||  // salva os volumes em qualquer slide
                ((h.getGlobal(mUID + '_rec_volume_data') || !haveData(obj)) && module.settings.type_of_rec_play == 'first' && obj.slide_show_index == 5)) {  // salva os volumes somente no slide 5 para o slide 1
                captureVolume(obj, module);
            }
            if ((h.getGlobal(mUID + '_set_volume_data') && module.settings.type_of_rec_play == 'all') || // aplica os volumes em qualquer slide
                (h.getGlobal(mUID + '_set_volume_data') && module.settings.type_of_rec_play == 'first' && obj.slide_show_index == 1)) {  // aplica os volumes somente no slide 1
                   applyInputsVolume(obj,module); 
            }
        }
    });
    
    arr.push({
        id : mUID + '_clear_last_slide_number',
        when: "displaying",
        item: "any_song",
        action: function (obj) {
            h.setGlobal(mUID + '_last_slide_number', null);
            storeInputsVolume(); 
            //moduleCfg(module.settings);
        }
    });


    return arr;
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// aqui estão as funções responsáveis por salvar, ler, capturar e aplicar volumes
//

function applyDefaultInputsVolume(leadSinger, module) {
    // Carregar os volumes padrão e os canais
    var schedule = h.hly('GetCurrentSchedule').data[0];
    var defaultVolumes = loadDefaultVolume();
    var channels = loadChannels();

    // Extrair o primeiro nome do lead singer
    var leadSingerName = leadSinger.split(' ')[0];
    var scheduledSingers = listScheduledSingers(schedule, module);
   
    // Seta o volume do lead singer
    var leadSingerVolume = defaultVolumes['singer_' + leadSingerName];
    if (leadSingerVolume !== undefined && leadSingerVolume !== 0) {
        if (channels.hasOwnProperty(leadSingerName)) {
            h.log(mUID,'applyDefaultInputsVolume() Leader {} {} {}',[leadSingerName, channels[leadSingerName], leadSingerVolume / 100 ]);
            setVolume(channels[leadSingerName], leadSingerVolume / 100, module);
        }
    }

    // Seta os volumes dos backing vocals, ignorando o lead singer
    for (var name in channels) {
        if (name !== leadSingerName && scheduledSinger(name, module)) {
            var backingVolume = defaultVolumes['backing_' + name];
            if (backingVolume !== undefined && backingVolume !== 0 && scheduledSingers.indexOf(name) !== -1) {
                h.log(mUID,'applyDefaultInputsVolume() backing {} {} {}',[name, channels[name], backingVolume / 100 ]);
                setVolume(channels[name], backingVolume / 100, module);
            }
       }
    }
}

function haveData(obj) {
    var musicID = String(obj.id);
    var slideNumber = obj.slide_show_index;
    var leadSinger = loadSinger(musicID);
    var inputsVolume = loadInputsVolume();
    
    if (!inputsVolume[musicID] || 
        !inputsVolume[musicID][leadSinger] || 
        !inputsVolume[musicID][leadSinger].slides[slideNumber]) {
        return false; 
    }
    return true;
}

function applyInputsVolume(obj,module) {
    var musicID = String(obj.id);

    if (musicID == 'id') {
        h.log("sem id");
        return;
    }
    
    var slideNumber = obj.slide_show_index;
    var leadSinger = loadSinger(musicID);
    var inputsVolume = loadInputsVolume();


    if (slideNumber == 1) {
          unMuteScheduledSingers(module);
       }

    if (!inputsVolume[musicID] || 
        !inputsVolume[musicID][leadSinger] || 
        !inputsVolume[musicID][leadSinger].slides[slideNumber]) {
       
        if (slideNumber <= 1) {
            h.log(mUID,'applyInputsVolume() -> calling  applyDefaultInputsVolume(leadSinger)');
            applyDefaultInputsVolume(leadSinger, module);
           }
        else {
          h.log(mUID,'applyInputsVolume() - Volumes not applyed for song id_{}|leadSinger_{}|s_{} (volume not recorded) ',[musicID, leadSinger, slideNumber]);
          }
          
        return;
    }

    var savedVolumes = inputsVolume[musicID][leadSinger].slides[slideNumber];
    var channels = loadChannels();

    // Loop para aplicar os volumes dos canais dos vocais
    for (var name in channels) {
        if (scheduledSinger(name, module)) {
            var channelNumber = channels[name];
            var volume = savedVolumes[name] ? savedVolumes[name].volume : getDefaultBackingVolume(name);
            h.log(mUID,'volume: {} name: {}',[volume,name]);
            if (volume !== null && volume !== 0) {
                setVolume(channelNumber, volume, module);
            }
        }
    }
    
    h.log(mUID,'setInputsVolume() - mixer set: id_{}|s_{}|l_{}: {}',[musicID, leadSinger, slideNumber, inputsVolume[musicID][leadSinger].slides[slideNumber]]);

}


function getLastSlideNumber(obj) {
    var lastSlide = h.getGlobal(mUID + '_last_slide_number');
    var slideIndex = obj.slide_show_index;    // Atualiza o número do slide atual para a música
    h.setGlobal(mUID + '_last_slide_number', slideIndex);     // Salvando 
    if (lastSlide !== undefined) {     // Verifica se há um slide anterior armazenado para a música
        return lastSlide;
    }
}

function storeInputsVolume() {;
 if (h.getGlobal(mUID + '_inputs_volume_changed')) {
    var tmp = loadInputsVolume();
    h.store(mID + '_inputs_volume_vocal_by_slide', tmp);
    h.log(mUID, 'Base atualizada {}.', [summarySavedSongs(tmp)]);
    h.setGlobal(mUID + '_inputs_volume_changed', null);
   }
}

// Função para contar a quantidade de musicIDs distintos
function countDistinctMusicIDs(inputs) {
    var distinctMusicIDs = [];
    for (var musicID in inputs) {
        if (inputs.hasOwnProperty(musicID) && distinctMusicIDs.indexOf(musicID) === -1) {
            distinctMusicIDs.push(musicID);
        }
    }
    return distinctMusicIDs.length;
}

// Função para contar a quantidade total de slides
function countSlides(inputs) {
    var slideCount = 0;
    for (var musicID in inputs) {
        if (inputs.hasOwnProperty(musicID)) {
            var musicData = inputs[musicID];
            for (var person in musicData) {
                if (musicData.hasOwnProperty(person) && musicData[person].slides) {
                    slideCount += Object.keys(musicData[person].slides).length;
                }
            }
        }
    }
    return slideCount;
}

function summarySavedSongs(inputsVolume) {;
try {
var distinctMusicIDCount = countDistinctMusicIDs(inputsVolume);
var totalSlideCount = countSlides(inputsVolume);
return distinctMusicIDCount + ' músicas ' + totalSlideCount + ' slides '
} catch(e) 
  { h.log(mUID, 'Erro {}', [e]);}
}

function loadInputsVolume() {
  var tmp = h.getGlobal(mUID + '_inputs_volume');
  var origem = 'carregado da memória';
      if (!tmp) {
         tmp = h.restore(mID + '_inputs_volume_vocal_by_slide') ;
         origem = 'carregado do arquivo';
         }
      if (!tmp) {
         tmp = {};
         origem = 'zerado';
         }
  var tmp2 = JSON.stringify(tmp);
  h.log(mUID,"loadInputsVolume() - {} - {} bytes ",[origem, tmp2.length()]);  
//  h.log(mUID,"loadInputsVolume() {} ",[tmp]);  
  return tmp;
}

function captureVolume(obj,module) {

    var musicID = String(obj.id);
    if (musicID == 'id') { 
        h.log("sem id");
        return;
    }
    
    if (module.settings.type_of_rec_play == 'first') {
        var slideNumber = 1;
    }
    else {
        var slideNumber = getLastSlideNumber(obj);
    }
    
    if (!slideNumber) {
        return;
    }
    
    var leadSinger = loadSinger(musicID);
    h.log(mUID, 'captureVolume() - leadSinger: {}', [leadSinger]);
    
    var inputsVolume = loadInputsVolume();

    var channels = loadChannels();

    if (!inputsVolume[musicID]) {
        inputsVolume[musicID] = {};
        h.log(mUID, 'captureVolume() - inputsVolume[{}] initialized', [musicID]);
    }

    try {
        if (!inputsVolume[musicID].hasOwnProperty(leadSinger)) {
            inputsVolume[musicID][leadSinger] = { slides: {} };
            h.log(mUID, 'captureVolume() - inputsVolume[{}][{}] initialized', [musicID, leadSinger]);
        }
    } catch (e) {
        h.log(mUID, 'Error initializing inputsVolume[{}][{}]: {}', [musicID, leadSinger, e]);
    }

    try {
        if (!inputsVolume[musicID][leadSinger].slides[slideNumber]) {
            inputsVolume[musicID][leadSinger].slides[slideNumber] = {};
            h.log(mUID, 'captureVolume() - inputsVolume[{}][{}].slides[{}] initialized', [musicID, leadSinger, slideNumber]);
        }
    } catch (e) {
        h.log(mUID, 'Error initializing inputsVolume[{}][{}].slides[{}]: {}', [musicID, leadSinger, slideNumber, e]);
    }

    for (var name in channels) {
        try {
           if (scheduledSinger(name, module)) {
              var channelNumber = channels[name];
              var volume = getVolume(channelNumber, module);
              inputsVolume[musicID][leadSinger].slides[slideNumber][name] = { volume: volume };
           }
        } catch (e) {
           h.log(mUID, 'Error accessing channel {} {}: {}', [name, channelNumber, e]);
        }
    }

    try {
        h.setGlobal(mUID + '_inputs_volume', inputsVolume);
        h.setGlobal(mUID + '_inputs_volume_changed',true);
        h.log(mUID, 'captureVolume() - inputsVolume updated: id_{}|s_{}|l_{}={}', [musicID, leadSinger, slideNumber, inputsVolume[musicID][leadSinger].slides[slideNumber]]);
    } catch (e) {
        h.log(mUID, 'Error updating inputs_volume: {}', [e]);
    }
}

function getDefaultBackingVolume(name) {
   var defaultVolumes = loadDefaultVolume();
   return defaultVolumes['backing_' + name] / 100 || null;
}

function scheduledSinger(name,module) {
    var schedule = h.hly('GetCurrentSchedule').data[0];
    var scheduledSingers = listScheduledSingers(schedule, module);
    return (scheduledSingers.indexOf(name) !== -1);
}

function unMuteScheduledSingers(module) {
   var channels = loadChannels();
    for (var name in channels) {
        if (channels.hasOwnProperty(name)) {
            var channelNumber = channels[name];
            if (scheduledSinger(name,module)) { // Check if the name is in the list of scheduled singers
                unMute(channelNumber, module);           // Unmute only the channels of the scheduled singers
            }
        }
    }
}

function loadSinger(id) {
  var schedule = h.hly('GetCurrentSchedule').data[0];
  var playlist_id = schedule.datetime;
  return getSingerOfSongByEvent(playlist_id, id);
}

function loadDefaultVolume() {
   return  h.restore(mID + '_default_singer_volume') || [];
}

function saveDefaultVolume(volumeData) {
   h.store(mID + '_default_singer_volume', volumeData);
}

function loadChannels() {
   return  h.restore(mID + '_input_channels')  || [];
}

function saveChannels(channelsData) {
   h.store(mID + '_input_channels', channelsData);
}

function getVolume(channel, module) {
  var id = module.settings.digital_mixer;
  var type = h.getReceiverInfo(id).type;    
  try {
    if (type == 'osc') {
        return jsc.x32.getChannelVolume(id, channel);
    }
    if (type == 'soundcraft') {
        return jsc.soundcraft.conn(id).input(channel).getVolume();
    }
  } catch (e) { h.log(mUID,'Erro {}',[e]) };
}

function setVolume(channel, volume, module) {
  var id = module.settings.digital_mixer;
  var type = h.getReceiverInfo(id).type;
  try {
    if (type == 'osc') {
        jsc.x32.setChannelVolume(id, channel, volume);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).setVolume(volume);
    }
  } catch (e) { h.log(mUID,'Erro {}',[e]) };
}

function unMute(channel, module) {
  var id = module.settings.digital_mixer;
  var type = h.getReceiverInfo(id).type;
  try { 
    if (type == 'osc') {
        jsc.x32.setChannelMute(id, channel, false);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).unmute();
    }
  } catch (e) { h.log(mUID,'Erro {}',[e]) };
}


function removeUnwantedSlides(data) {
    var newData = {};
    
    for (var musicId in data) {
        if (data.hasOwnProperty(musicId)) {
            newData[musicId] = {};
            for (var singer in data[musicId]) {
                if (data[musicId].hasOwnProperty(singer)) {
                    var slides = data[musicId][singer]["slides"];
                    newData[musicId][singer] = { "slides": {} };
                    if (slides.hasOwnProperty("1")) {
                        newData[musicId][singer]["slides"]["1"] = slides["1"];
                    }
                }
            }
        }
    }
    
    return newData;
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22756e7265636f72646564536f6e67735265706f7274227d
function unrecordedSongsReport(module) {
    return {
        id: 'unrecordedSongsReport',
        label: '',
        hint: 'Sem Volumes Salvos',
        action: function (evt) {
            var schedule = h.hly('GetCurrentSchedule').data[0];
            var playlist_id = schedule.datetime;
            var instrCtdwn = restoreInstrumentalData();
            var medias = schedule.media_playlist;
            var list = [];
            for (var i = 0; i < medias.length; i++) {
                var item = medias[i];
                if (item.type === 'song') {
                    var id = String(item.song_id);
                    instrCtdwn[id] = repairInstrumentalData(instrCtdwn[id]);
                    if (!isValidCountdownData(instrCtdwn[id])) {
                        list.push(item.name + ' - ' + JSON.stringify(instrCtdwn[id]));
                    }
                }
            }
            if (list.length > 0) {
                h.log("", "Músicas sem countdown:");
                for (var i = 0; i < list.length; i++) {
                    h.log("", list[i]);
                }
                return;
            }
            h.log("", "Todas as músicas da lista possuem countdown.");
        }
    };
}

    function isValidCountdownData(data) {
        // Verifica se o objeto é válido com base nos critérios fornecidos
        if (typeof data !== 'object' || data === null || JSON.stringify(data).length < 3) {
            return false;
        }
        return true;
    }