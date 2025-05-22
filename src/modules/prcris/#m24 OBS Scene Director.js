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
            '• Compact menu for fast access to multiple scenes<br>' +
            '• Experimental integration with Home Assistant<br>' +
            '• PTZ camera control via OBS plugin, including focus adjustment buttons<br>' +
            '• Automatically activates the OBS scene that matches the title of the inserted media<br><br>' +
            infoVDDMM,
        allowed_requests: [],
        i18n: {
            name: {
                en: 'OBS Scene Director',
                pt: 'Diretor de Cena OBS',
                es: 'Director de Escena OBS',
                ru: 'Режиссёр Сцен OBS'
            },
            description: {
                en: '<html>' +
                    'Module for smart and visual control of OBS scenes, with optional integration to Home Assistant and support for PTZ cameras.<br><br>' +
                    '• Customizable buttons for quick scene switching<br>' +
                    '• Automatic highlight of the active scene<br>' +
                    '• Compact menu for fast access to multiple scenes<br>' +
                    '• Experimental integration with Home Assistant<br>' +
                    '• PTZ camera control via OBS plugin, including focus adjustment buttons<br>' +
                    '• Automatically activates the OBS scene that matches the title of the inserted media<br><br>' +
                    infoVDDMM,
                pt: '<html>' +
                    'Módulo para controle inteligente e visual das cenas no OBS, com integração opcional ao Home Assistant e suporte a câmeras PTZ.<br><br>' +
                    '• Botões customizáveis para troca rápida de cena<br>' +
                    '• Destaque automático da cena ativa<br>' +
                    '• Menu compacto com acesso a várias cenas<br>' +
                    '• Integração experimental com Home Assistant<br>' +
                    '• Controle de câmeras PTZ via plugin do OBS, incluindo botões de foco<br>' +
                    '• Ativa automaticamente a cena no OBS que possuir o mesmo nome do título em que a mídia está inserida<br><br>' +
                    infoVDDMM,
                es: '<html>' +
                    'Módulo para control inteligente y visual de escenas en OBS, con integración opcional con Home Assistant y soporte para cámaras PTZ.<br><br>' +
                    '• Botones personalizables para cambio rápido de escena<br>' +
                    '• Resaltado automático de la escena activa<br>' +
                    '• Menú compacto para acceder rápidamente a múltiples escenas<br>' +
                    '• Integración experimental con Home Assistant<br>' +
                    '• Control de cámaras PTZ vía plugin de OBS, con botones para enfocar<br>' +
                    '• Activa automáticamente la escena en OBS que tenga el mismo nombre que el título de la media insertada<br><br>' +
                    infoVDDMM,
                ru: '<html>' +
                    'Модуль для умного и наглядного управления сценами OBS, с возможной интеграцией с Home Assistant и поддержкой камер PTZ.<br><br>' +
                    '• Настраиваемые кнопки для быстрой смены сцен<br>' +
                    '• Автоматическое выделение активной сцены<br>' +
                    '• Компактное меню для быстрого доступа к сценам<br>' +
                    '• Экспериментальная интеграция с Home Assistant<br>' +
                    '• Управление PTZ-камерами через плагин OBS, включая кнопки фокусировки<br>' +
                    '• Автоматически активирует сцену OBS с тем же именем, что и заголовок вставленного медиа<br><br>' +
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
            type: 'title',
            name: jsc.i18n('Funções Experimentais')
        },
        {
            id: 'ha_id',
            name: jsc.i18n('Home Assistant (Para comandos em PTZ)'),
            description: '<html><hr>' + jsc.i18n('Associate with the Home Assistant receiver'),
            type: 'receiver',
            receiver: 'ha'                        
        },
        {
            id: 'btnConfigurarHA_RF',
            type: 'button',
            button_label: jsc.i18n('Configurar'),
            name: jsc.i18n('Comandos PTZ via Infravermelho no HA'),
            action: function(obj) {

            var sceneList = jsc.ha.getSceneList(obj.ha_id);	
            var allowedValues = [{ value: '', label: '' }].concat(
                  sceneList.map(function(scene) {
                    return { value: scene, label: scene };
                  })
            );
            var inputs =[
                    {
                        id: 'ia_tracking_on',
                        name: jsc.i18n('IA Auto Tracking On'),
                        description: jsc.i18n('Cena Emissor Infravermelho para habilitar IA Auto Tracking'),
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'ia_tracking_off',
                        name: jsc.i18n('IA Auto Tracking Off'),
                        description: jsc.i18n('Cena Emissor Infravermelho para desabilitar IA Auto Tracking'),
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'autofocus',
                        name: jsc.i18n('Auto Focus'),
                        description: jsc.i18n('Cena Emissor Infravermelho para habilitar Foco Automático'),
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'manualfocus',
                        name: jsc.i18n('Manual Focus'),
                        description: jsc.i18n('Cena Emissor Infravermelho para desabilitar Foco Automático'),
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'focus_up',
                        name: jsc.i18n('Manual Focus')+' +',
                        description: jsc.i18n('Ajuste do foco manual')+' +',
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'focus_down',
                        name: jsc.i18n('Manual Focus')+' -',
                        description: jsc.i18n('Ajuste do foco manual')+' -',
                        type: 'string',
                        allowed_values: allowedValues
                    },
                    {
                        id: 'atrasoHA',
                        name: jsc.i18n('Tempo médio de execução HA (ms)'),
                        description: jsc.i18n('Tempo de resposta do Home Assistant, para aguardar terminar e enviar o próximo comando'),
                        type: 'string',
                        default_value : 4000
                        
                    },
                    {
                        id: 'Scenes',
                        label: jsc.i18n('Troca de cena por IR com cena do OBS'),
                        description: jsc.i18n('Quando trocar de cena pelo holyrics, envia um comando para o HA, executando a cena iniciando com "ptz_" seguido do mesmo nome da cena do OBS '),
                        type: 'boolean'
                    }
                    ];
                 module.inputSettings('cfg_ha_rf', inputs);  
                 module.updatePanel();            
                }
        },
        {
            type: 'separator'
        },{
             id: 'ptzFocusActions',
             label: jsc.i18n('Habilitar os botões de foco OBS PTZ Plugin'),
             type: 'boolean'

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


function setPTZfocus(focusType) {  


  var s = module.settings;

  jsc.obs_v5.triggerHotkeyByName(module.settings.receiver_id, 'PTZ.SelectNext'); //seleciona a próxima câmera
  
  var atualFocus = h.getGlobal('focusType') || 'manual';
 
  if (focusType === 'auto') {
      jsc.obs_v5.triggerHotkeyByName(module.settings.receiver_id, 'PTZ.FocusAutoFocus'); //envia o comando de efetuar o foco

      if (s.cfg_ha_rf.Scenes) {
         h.log(mUID,'{%t} s.cfg_ha_rf.autofocus {}',s.cfg_ha_rf.autofocus);
         jsc.ha.activateScene(s.ha_id, s.cfg_ha_rf.autofocus)
      }
  } 

  if (focusType === 'manual') {
      jsc.obs_v5.triggerHotkeyByName(s.receiver_id, 'PTZ.FocusOneTouch'); //envia o comando de efetuar o foco

      if (s.cfg_ha_rf.Scenes) {
          h.log(mUID,'{%t} s.cfg_ha_rf.manualfocus {}',s.cfg_ha_rf.manualfocus);
          jsc.ha.activateScene(s.ha_id, s.cfg_ha_rf.manualfocus);        
      }
  } 

  if (focusType === 'far') {
      jsc.obs_v5.triggerHotkeyByName(s.receiver_id, 'PTZ.FocusFar'); //envia o comando de efetuar o foco

      if (s.cfg_ha_rf.Scenes) {
         jsc.ha.activateScene(s.ha_id, s.cfg_ha_rf.focus_up)
      }
      
  } 

  if (focusType === 'near') {
      jsc.obs_v5.triggerHotkeyByName(s.receiver_id, 'PTZ.FocusNear'); //envia o comando de efetuar o foco

      if (s.cfg_ha_rf.Scenes) {
         jsc.ha.activateScene(s.ha_id, s.cfg_ha_rf.focus_down)
      }
  } 

  if (focusType != 'auto') {
     focusType = 'manual';
  }   
  
  h.log(mUID,'{%t} focusType {}', focusType);
  h.setGlobal('focusType', focusType);
  module.repaintPanel();
}

function setActiveScene(scene) {
 var s = module.settings;
 
 if (scene != 'ia_tracking_off' 
     && h.getGlobal('iaTrackingActive')
     && !s.cfg_ha_rf.Scenes) {
         h.log(mUID,'{%t} desativando autotracking'); 
         setActiveScene('ia_tracking_off');
     }
 
 if (scene === 'ia_tracking_off') {
    jsc.ha.activateScene(s.ha_id,s.cfg_ha_rf.ia_tracking_off);
    h.setGlobal('iaTrackingActive',false);
    return;
 }

 if (scene === 'ia_tracking_on') {
    jsc.obs_v5.setActiveScene(s.receiver_id, 'ia_tracking_on');
    jsc.ha.activateScene(module.settings.ha_id,module.settings.cfg_ha_rf.ia_tracking_on);
    module.setGlobal('iaTrackingActive',true);
 }
 
 jsc.obs_v5.setActiveScene(s.receiver_id, scene);
 
 if (s.cfg_ha_rf.Scenes) {
    h.setGlobal('focusType','auto');
    var ha_sceneId = 'scene.ptz_' + scene.toLowerCase().replace(/ /g, '_');
    h.setGlobal('iaTrackingActive',false);
    jsc.ha.activateScene(module.settings.ha_id, ha_sceneId);
 }
 
 module.repaintPanel();
}



function getHotkeyList(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetHotkeyList');
    return response.hotkeys;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
  var act = [];

  if (module.settings.ptzFocusActions) {
     act.push.apply(act, createPTZFocusActions());
  }
  
  if (module.settings.cfg_ha_rf.ia_tracking_on) {
      act.push(actionPTZAutoTracking());
  }
  
  act.push.apply(act, actionBtnScenes());
  act.push(actionScenesMenu());

  return act;
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




function actionPTZAutoTracking() {
return   { 
            id: 'PTZAutoTracking',
            label: '',
            icon : 'auto_fix_high',
            hint : jsc.i18n('Envia um comando de IR para ativar/desativar o modo "Auto Tracking" da Câmera PTZ'),
            action: function(evt) {
                 if (h.getGlobal('iaTrackingActive')) {
                   setActiveScene('ia_tracking_off');
                 } else {
                   setActiveScene('ia_tracking_on');
                 }    
                 module.repaintPanel();         
            },
            status: function(evt) {
              if (h.getGlobal('iaTrackingActive')) {
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


function createPTZFocusActions() {
  var focusOptions = [
    { type: 'auto',   id: 'PTZAutoFocus',     icon: 'center_focus_strong', hint: jsc.i18n('Ativa/Desativa foco automático no plugin da PTZ') },
    { type: 'near',   id: 'PTZNearFocus',     icon: 'video_camera_front',  hint: jsc.i18n('Em uma cena mostrando a igreja toda, foca no que estiver mais próximo.') },
    { type: 'far',    id: 'PTZFarFocus',      icon: 'video_camera_back',   hint: jsc.i18n('Em uma cena mostrando a igreja toda, foca no que estiver mais distante.') },
    { type: 'manual', id: 'PTZOneTouchFocus', icon: 'center_focus_weak',   hint: jsc.i18n('Envia um comando de foco manual para plugin da PTZ') }
  ];

  var actions = [];

  for (var i = 0; i < focusOptions.length; i++) {
    var fn = function(opt) {
      actions.push({
        id: opt.id,
        label: '',
        icon: opt.icon,
        hint: jsc.i18n(opt.hint),
        action: function(evt) {
          setPTZfocus(opt.type);
        },
        status: function(evt) {
          var atualFocus = h.getGlobal('focusType') || 'manual';
          if (atualFocus === opt.type) {
            return {
              active: true,
              foreground: 'E6E6E6',
              background: '790903',
              iconColor: 'E6E6E6'
            };
          } else {
            return null;
          }
        }
      });
    };
    fn(focusOptions[i]);
  }

  return actions;
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