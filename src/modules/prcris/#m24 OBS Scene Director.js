// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m24';  
var mUID = mID + ''; 

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  refreshTitleOverlayDatabase();
  logState(module.settings.log, mUID, 'startup '+ mID); 
}

function info() {
    return {
        id: mID,
        name: 'OBS Scene Director',
        description: '<html>' +
            'Module for smart and visual control of OBS scenes, with optional integration to Home Assistant and support for PTZ cameras.<br><br>' +
            '• Customizable buttons for quick scene switching<br>' +
            '• Automatic highlight of the active scene<br>' +
            '• Button to start/stop live streaming<br>' +
            '• Button to start/stop recording<br>' +
            '• Button to mute/unmute OBS audio input<br>' +
            '• Compact menu for fast access to multiple scenes<br>' +
            '• Automatically activates the OBS scene that matches the title of the inserted media<br><br>' +
            '<b>== To work, you need to allow SetInputSettings and GetStreamServiceSettings in the OBS receiver blacklist</b><br><br>' +
            infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        permissions: [
            {
                type: 'blacklist_request',
                key: 'obs_v5',
                value: 'SetInputSettings'
            },
            {
                type: 'blacklist_request',
                key: 'obs_v5',
                value: 'GetStreamServiceSettings'
            }
        ],
        min_version: '2.24.0',
        i18n: {
            name: {
                en: 'OBS Scene Director',
                pt: 'Diretor de Cena OBS',
                es: 'Director de Escena OBS',
                ru: 'Режиссёр Сцен OBS'
            },
            description: {
                pt: '<html>' +
                    'Módulo para controle inteligente e visual das cenas no OBS, com integração opcional ao Home Assistant e suporte a câmeras PTZ.<br><br>' +
                    '• Botões customizáveis para troca rápida de cena<br>' +
                    '• Destaque automático da cena ativa<br>' +
                    '• Botão para iniciar/encerrar a transmissão ao vivo<br>' +
                    '• Botão para iniciar/encerrar a gravação<br>' +
                    '• Botão ligar/desligar a entrada de áudio do OBS<br>' +
                    '• Menu compacto com acesso a várias cenas<br>' +
                    '• Ativa automaticamente a cena no OBS que possuir o mesmo nome do título em que a mídia está inserida<br><br>' +
                    '<b>== Para funcionar, você precisa liberar os recursos SetInputSettings e GetStreamServiceSettings na blacklist do receptor do OBS</b><br><br>' +
                    infoVDDMM,
                es: '<html>' +
                    'Módulo para control inteligente y visual de escenas en OBS, con integración opcional con Home Assistant y soporte para cámaras PTZ.<br><br>' +
                    '• Botones personalizables para cambio rápido de escena<br>' +
                    '• Resaltado automático de la escena activa<br>' +
                    '• Botón para iniciar/detener la transmisión en vivo<br>' +
                    '• Botón para iniciar/detener la grabación<br>' +
                    '• Botón para activar/desactivar la entrada de audio de OBS<br>' +
                    '• Menú compacto para acceder rápidamente a múltiples escenas<br>' +
                    '• Activa automáticamente la escena en OBS que tenga el mismo nombre que el título del medio insertado<br><br>' +
                    '<b>== Para que funcione, necesitas permitir SetInputSettings y GetStreamServiceSettings en la blacklist del receptor de OBS</b><br><br>' +
                    infoVDDMM,
                ru: '<html>' +
                    'Модуль для умного и наглядного управления сценами OBS, с возможной интеграцией с Home Assistant и поддержкой камер PTZ.<br><br>' +
                    '• Настраиваемые кнопки для быстрой смены сцен<br>' +
                    '• Автоматическое выделение активной сцены<br>' +
                    '• Кнопка для начала/остановки прямой трансляции<br>' +
                    '• Кнопка для начала/остановки записи<br>' +
                    '• Кнопка для включения/выключения аудиовхода OBS<br>' +
                    '• Компактное меню для быстрого доступа к сценам<br>' +
                    '• Автоматически активирует сцену OBS с тем же именем, что и заголовок вставленного медиа<br><br>' +
                    '<b>== Чтобы работало, необходимо разрешить SetInputSettings и GetStreamServiceSettings в черном списке OBS-приемника</b><br><br>' +
                    infoVDDMM
            }
        }
    };
}







// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: jsc.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: '',
            type: 'receiver',
            receiver: 'obs_v5'
        },
        {
            type: 'separator'
        },
        {
            id: 'show_stream_controls',
            label: jsc.i18n('Exibir botão de transmissão'),
            type: 'boolean'
        },
        {
            id: 'show_record_controls',
            label: jsc.i18n('Exibir botão de gravação'),
            type: 'boolean'
        },
        {
            id: 'show_mute_controls',
            label: jsc.i18n('Exibir botão de mute'),
            type: 'boolean'
        },
        {
            id: 'obs_audio_input_name',
            name: jsc.i18n('OBS audio input name'),
            description: jsc.i18n('Specifies the name of the audio input source (e.g., microphone or mixer) in the selected scene.'),
            type: 'string',
            suggested_values: function(obj) {
                   return jsc.obs_v5.getAudioInputList(obj.input.receiver_id);
            }
        },
        {
            type: 'separator'
        },
        {
            id: 'qtdCenas',
            type: 'number',
            name: jsc.i18n('Quantidade de Cenas a Controlar'),
            min: 0,
            max: 10,
            default_value: 4,
            component: 'combobox',
            decimal: false,
            onchange: function(obj) {
                module.updatePanel();
            }
        },
        {
            id: 'showLabel',
            label: jsc.i18n('Exibir o nome da cena no botão'),
            type: 'boolean'
        },
        {
            id: 'triggerSceneName',
            label: jsc.i18n('Usar o título de mídia para troca de cena'),
            description: jsc.i18n('Quando o título acima de um item de mídia possuir o mesmo nome de uma cena, efetua a troca para a cena ao acionar o item. Exemplo: Ao projetar a imagem que está abaixo do Título "Avisos", aciona a cena "Avisos" se ela existir no OBS.'),
            type: 'boolean'
        },
        {
            id: 'btnConfigurarCenasEmBotões',
            type: 'button',
            button_label: jsc.i18n('Configurar'),
            name: jsc.i18n('Botões de Cena'),
            description: jsc.i18n('Configuração de botões na interface do módulo para troca de cenas do OBS'),
            action: function(obj) {
                var qtd = parseInt(obj.qtdCenas, 10) || 0;
                var sceneList = jsc.obs_v5.getSceneList(obj.receiver_id);
                
                var allowedValues = [{ value: '', label: '' }].concat(
                  sceneList.map(function(scene) {
                    return { value: scene, label: scene };
                  })
                );
                
                var inputs = [
                    {
                        type: 'title',
                        name: jsc.i18n('Preencha as Cenas do OBS')
                    },
                    {
                        type: 'separator'
                    }
                 ];

                for (var i = 0; i < qtd; i++) {
                    inputs.push({
                        id: 'Cena' + i,
                        name: jsc.i18n('Cena ') + ' ' + (i + 1),
                        type: 'string',
                        allowed_values: allowedValues
                     });
                }
                inputs.push({type: 'separator'});
                inputs.push({
                    id: 'max_scenes',
                    name: jsc.i18n('Quantidade de Cenas em caixa de seleção'),
                    description: jsc.i18n('Define a quantidade de cenas que aparecerão em uma caixa pulldown, sempre a partir da cena 1 do OBS.'),
                    type: 'number',
                    default_value: 1,
                    min: 1,
                    max: 20
                })
                module.inputSettings('cfg_cenas', inputs);
                module.updatePanel();               
            }
        },            
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onChange ' + mID);
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function setActiveScene(scene) {
  jsc.obs_v5.setActiveScene(module.settings.receiver_id, scene);
}

function setHtmlPTZfunction(url) {
     
     h.log(mUID,'{%t} setHtmlPTZfunction url {}', url);
    
    var options = {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    };

   try {
    var response = h.apiRequest(url, options);
   } catch (err) { h.log("",'Erro {}',[err]) };

   h.log(mUID,'{%t} response URL {}', response); 
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
  var act = [];
  var s = module.settings;
  
  if (s.show_stream_controls) {
     act.push(actLiveStatus());
  }

  if (s.show_record_controls) {
     act.push(actRecStatus());
  }
  
  if (s.show_mute_controls) {
     act.push(actionStatusChannel());
  }
  
  if (s.show_mute_controls || s.show_record_controls || s.show_stream_controls) {   
     act.push(actSeparator());
  }   
     
  act.push.apply(act, actionBtnScenes());
  act.push(actSeparator());
  act.push(actionScenesMenu());

  return act;
}

function actionStatusChannel() { 
    var receiverID = module.settings.receiver_id;
    var inputName = module.settings.obs_audio_input_name;
    var mute = jsc.obs_v5.getInputMute(receiverID, inputName);    
    
    return {
        id: 'toggleMute',
        hint: mute ?  jsc.i18n('Ativar Audio OBS') : jsc.i18n('Desativar Audio OBS'),
        icon : mute ?  'volume_off' : 'volume_up',
        action: function(evt) {
          var mute = jsc.obs_v5.getInputMute(receiverID, inputName); 
          jsc.obs_v5.setInputMute(receiverID, inputName, !mute); // alterna o estado de mute
        },
        status: function(evt) {
            if (!module.isEnabled()) {
               return
            }
            var mute = jsc.obs_v5.getInputMute(receiverID, inputName);
            var result = {};
            result.icon = mute ?  'volume_off' : 'volume_up';
            result.hint = mute ?  jsc.i18n('Ativar Audio OBS') : jsc.i18n('Desativar Audio OBS');
            if (mute) {
               return jsc.utils.ui.item_status.danger(result);
            } else {
               return result;
            }
            
        }
    };
}
function actRecStatus() {
    var receiverID = module.settings.receiver_id;
    return {
        id: 'recordControl',
        label: '',
        hint: jsc.i18n('Gravação OBS'),
        icon: 'system:fiber_manual_record',
        action: function(evt) {
            var recording = getRecordingStatus(receiverID);
            if (recording && recording.active) {
               if (h.confirm(jsc.i18n('Deseja encerrar a gravação?'), jsc.i18n('Confirmação'))) {
                  h.log(mUID,'{%t} '+jsc.i18n('Gravação encerrada'));
                  jsc.obs_v5.stopRecord(receiverID)
               } 
            } else {
               h.log(mUID,'{%t} '+jsc.i18n('Gravação iniciada'));
               jsc.obs_v5.startRecord(receiverID);
            }
        },
        status: function(evt) {
            if (!module.isEnabled()) {
               return
            }
            var recording = getRecordingStatus(receiverID);
             if (recording && recording.active) {
                return jsc.utils.ui.item_status.danger();
            } else {
                return null;
            }
        }
    };
}

function actLiveStatus() {
    var receiverID = module.settings.receiver_id;
    return {
        id: 'streamingControl',
        label: '',
        icon: 'live_tv',
        hint: jsc.i18n('Transmissão OBS'),
        action: function(evt) {
            var isConfigured = isYoutubeStreamingConfigured(receiverID);
            if (!isConfigured) {
               h.confirm(jsc.i18n('Você precisa configurar a transmissão no OBS primeiro!'),jsc.i18n('ATENÇÃO'));
               return;
            } else {
               var streamStarted = getStreamingStatus(receiverID).active;
               if (!streamStarted) {
                 if (h.confirm(jsc.i18n('Deseja iniciar a transmissão?'), jsc.i18n('Confirmação'))) {
                    jsc.obs_v5.startStream(receiverID);
                 }
               } else {
                 if (h.confirm(jsc.i18n('Deseja encerrar a transmissão?'), jsc.i18n('Confirmação'))) {
                    jsc.obs_v5.stopStream(receiverID);
                 }
               }
           }
        },
        status: function(evt) {
            if (!module.isEnabled()) {
               return
            }
            var isConfigured = isYoutubeStreamingConfigured(receiverID);
            if (!isConfigured) {
                return jsc.utils.ui.item_status.warning();
            } else {
              var streamStarted = getStreamingStatus(receiverID).active;
              if (streamStarted) { 
                return jsc.utils.ui.item_status.danger()
              } else {
                return null;
              }
            }
        }
    };
}


function actionBtnScenes() {
  var scenes = jsc.obs_v5.getSceneList(module.settings.receiver_id); // array de strings
  var buttons = [];
  var cenas = module.settings.cfg_cenas;
  var maxCenas = module.settings.qtdCenas;
  var count = 0;

  h.logp(mUID, '{%t} cenas {}', cenas);

  for (var key in cenas) {
    if (key === 'max_scenes') continue;
    if (count >= maxCenas) break;

    var sceneName = cenas[key];
    if (scenes.indexOf(sceneName) === -1) continue; // ignora se a cena não existe

    (function(sceneKey, sceneName) {
      var icon = '';
      var num = 0;
      
      if (/^Cena[0-9]+$/.test(sceneKey)) {
        num = parseInt(sceneKey.replace('Cena', ''), 10) + 1;
        icon = 'filter_' + num;
      }

      buttons.push({
        id: sceneKey,
        label: module.settings.showLabel ? sceneName : '',
        icon: icon,
        hint: jsc.i18n('Cena')+': "' + sceneName + '"',
        action: function(evt) {
          setActiveScene(sceneName);
          module.global.cenaAtual = sceneName;
          module.repaintPanel();
        },
        status: function(evt) {
          if (module.global.cenaAtual === sceneName) {
              return jsc.utils.ui.item_status.danger();
          } else {
            return null;
          }
        }
      });
    })(key, sceneName);

    count++;
  }

  return buttons;
}

function actionScenesMenu() {
    var scenes = jsc.obs_v5.getSceneList(module.settings.receiver_id);
    var menu = {
        id: 'mnuScenes',
        label: '',
        icon: 'system:menu',
        status: function(evt) {
            module.global.cenaAtual = jsc.obs_v5.getActiveScene(module.settings.receiver_id);
            module.repaintPanel();
            return {
              description : module.global.cenaAtual
            }
        },
        action: []
    };

    var maxScenes = module.settings.max_scenes || scenes.length;
    var i;
    for (i = 0; i < scenes.length && i < maxScenes; i++) {
        (function(sceneName) { // IIFE para capturar o valor correto da cena
            menu.action.push({
                label: jsc.i18n(sceneName),
                icon: 'camera',
                action: function() {
                    setActiveScene(sceneName);
                    module.global.cenaAtual = sceneName;
                    module.repaintPanel();
                }
            });
        })(scenes[i]);
    }

    return menu;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
function triggers(module) {
    var arr = [];    

    arr.push({
      id: "cena_titulo_item_midia_"+ mUID,
      when: "displaying",
      item: "any_title_subitem",
      action: function(obj) {
         if (module.settings.triggerSceneName) {
             setSceneByTitle(obj.title); 
         }
      }
    });
    
    arr.push({
     id: mUID + "_rel"+"oad_schedule",
     when: "change",
     item: "playlist",
     action: function(obj) {
         refreshTitleOverlayDatabase();
     }
    });
   
    return arr;
}



function setSceneByTitle(title) {
    if (!module.restore('autoSceneByTitle')){
        isNewTitle(null,true);
    }
    
    if (!isNewTitle(title)) return
    
    var r = jsc.obs_v5.getSceneList(module.settings.receiver_id);
    for (var i = 0; i < r.length; i++) {
        h.log(mUID,'{%t} Procurando cena: {}',r[i]);
        if (r[i] === title) {
            h.log(mUID,'{%t} Título com cena encontrado: {}',r[i]);
            jsc.obs_v5.setActiveScene(module.settings.receiver_id, title);
            break;
        }
    }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e7320747269676765727469746c65227d
function refreshTitleOverlayDatabase() {
 
  h.log(mUID,'{%t} Executando refreshTitleOverlayDatabase {}');  
  
  var runAT = module.restore('runAT')
  if (runAT) {
     h.cancelRunAt(runAT);
     h.log(mUID,'{%t} Execução do evento cancelada {}', runAT); 
     module.store('runAT',null);
  }
 
 
  if (isTodaySchedule()) {
    var rAT = getScheduleTime();
    h.log(mUID,'{%t} Evento agendado para {}', rAT); 
    var id = h.runAt({
       name: mUID,
       datetime: rAT,
       action: function() {
            isNewTitle(null, true);
            h.log(mUID,'{%t} Registro de repetição de títulos inicializado.');
            module.store('runAT',null);
            module.store('autoSceneByTitle', true);
       }
    });
    module.store('runAT',id);
  }
}


function getScheduleTime() {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];   
    h.log(mUID,'{%t} GetCurrentSchedule.datetime:{} ',s.datetime);
    return s.datetime;
}


function isTodaySchedule() {
      
    var scheduleDateTime = getScheduleTime();
    
    var scheduleDate = new Date(scheduleDateTime);
    var today = new Date();
    
    var isToday = (
        scheduleDate.getFullYear() === today.getFullYear() &&
        scheduleDate.getMonth() === today.getMonth() &&
        scheduleDate.getDate() === today.getDate()
    );
    
    h.log(mUID,'{%t} scheduleDate:{} isToday:{}',scheduleDate, isToday);
    
    return isToday;
}

function isNewTitle(title, clear) {
    var key = mUID + '_used_titles';
    var used = h.getGlobal(key) || [];

    // Se clear for true, limpa o registro
    if (clear) {
        h.setGlobal(key, []);
        h.log(mUID, '{%t} Lista de títulos reiniciada.');
        return true;
    }

    // Se já existe, retorna false
    if (used.indexOf(title) !== -1) {
        h.log(mUID, '{%t} Título repetido ignorado: {}', title);
        return false;
    }

    // Se for novo, adiciona e salva
    used.push(title);
    h.setGlobal(key, used);
    h.log(mUID, '{%t} Título novo registrado: {}', title);
    return true;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226f62735f66756e6374696f6e73227d
function isYoutubeStreamingConfigured(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetStreamServiceSettings');
    h.log(mUID, 'GetStreamServiceSettings response: {}', response);

    var settings = response && response.streamServiceSettings;
    var stream_id = settings && settings.stream_id;

    if (!stream_id) return false;

    var storedList = module.restore('stream_ids') || [];
    var i, item, isUsed = false;

    for (i = 0; i < storedList.length; i++) {
        if (storedList[i].stream_id === stream_id) {
            item = storedList[i];
            isUsed = item.used === true;
            break;
        }
    }

    h.log(mUID, 'Streaming ID configurado: {} | Já usado: {}', [stream_id, isUsed]);

    return !isUsed;
}

function getStreamingStatus(receiverID) {
    try {
        var response = jsc.obs_v5.request(receiverID, 'GetStreamStatus');
        h.log(mUID, 'GetStreamStatus response: {}', response);

        var isActive = response && response.outputActive === true;

        var streamSettings = jsc.obs_v5.request(receiverID, 'GetStreamServiceSettings');
        var settings = streamSettings && streamSettings.streamServiceSettings;
        var stream_id = settings && settings.stream_id;

        if (stream_id) {
            var storedList = module.restore('stream_ids') || [];
            var i, entry, found = false;

            for (i = 0; i < storedList.length; i++) {
                if (storedList[i].stream_id === stream_id) {
                    entry = storedList[i];
                    found = true;
                    break;
                }
            }

            if (!found) {
                storedList.push({
                    stream_id: stream_id,
                    used: false,
                    wasActive: isActive
                });
            } else {
                if (entry.used === false) {
                    if (entry.wasActive && !isActive) {
                        entry.used = true;
                    } else if (isActive) {
                        entry.wasActive = true;
                    }
                }
            }

            module.store('stream_ids', storedList);
        }

        return {
            active: isActive,
            reconnecting: response.outputReconnecting || false,
            timecode: response.outputTimecode || null
        };
    } catch (e) {
        h.log(mUID, 'GetStreamStatus erro: {}', e);
        return {
            active: false,
            reconnecting: false,
            timecode: null
        };
    }
}

function getRecordingStatus(receiverID) {
    try {
        var response = jsc.obs_v5.request(receiverID, 'GetRecordStatus');
        h.log('jsc.obs_v5', 'GetRecordStatus response: {}', response);

        return {
            active: response.outputActive || false,
            paused: response.outputPaused || false,
            timecode: response.outputTimecode || null
        };
    } catch (e) {
        h.log('jsc.obs_v5', 'GetRecordStatus erro: {}', e);
        return {
            active: false,
            paused: false,
            timecode: null
        };
    }
}