// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m4';
var mUID = mID + ''; 

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  logState(module.settings.log, mUID, 'startup '+ mID); 
}

function info() {   
    return {  
        id: mID,
        name: 'OBS Autopilot',
        description: '<html>' +
                    '• Shows or hides an item in an OBS scene when a slide is shown or hidden.<br>' +
                    '• Compatible with F8/F9/F10/End Key triggers.<br>' + 
                    '• Compatible with presentations in text/bible/music/image/PowerPoint/Automatic Presentation formats.<br><br>' +
                    'Update: Text/bible/music items have dynamic minimum display times, which increase based on the amount of text shown.<br><br>' + 
                    infoVDDMM,
        allowed_requests: [
            'https://holyrics.com.br/api/jsc/map_verse_length.php'
        ],
        i18n: {
            name: {
                en: 'OBS Autopilot',
                pt: 'Piloto Automático OBS',
                es: 'Piloto Automático OBS',
                ru: 'Автопилот OBS'
            },
            description: {
                en: '<html>' +
                    '• Shows or hides an item in an OBS scene when a slide is shown or hidden.<br>' +
                    '• Compatible with F8/F9/F10/End Key triggers.<br>' + 
                    '• Compatible with presentations in text/bible/music/image/PowerPoint/Automatic Presentation formats.<br><br>' +
                    'Update: Text/bible/music items have dynamic minimum display times, which increase based on the amount of text shown.<br><br>' + 
                    infoVDDMM,
                pt: '<html>' +
                    '• Exibe ou oculta um item em uma cena no OBS ao mostrar ou esconder um slide.<br>' +
                    '• Compatível com pressionamento de F8/F9/F10/Finalização.<br>' + 
                    '• Compatível com apresentações do tipo texto/bíblia/música/imagem!/Power Point/Apresentação automática.<br><br>' +
                    'Atualização: Os itens de texto/bíblia/música têm tempo mínimo dinâmico, aumentando de acordo com a quantidade de texto exibida.<br><br>' + 
                    infoVDDMM,
                es: '<html>' +
                    '• Muestra u oculta un elemento en una escena de OBS al mostrar u ocultar una diapositiva.<br>' +
                    '• Compatible con las teclas F8/F9/F10/Finalización.<br>' + 
                    '• Compatible con presentaciones de tipo texto/biblia/música/imagen/PowerPoint/Presentación automática.<br><br>' +
                    'Actualización: Los elementos de texto/biblia/música tienen un tiempo mínimo dinámico, que aumenta según la cantidad de texto mostrado.<br><br>' + 
                    infoVDDMM,
                ru: '<html>' +
                    '• Показывает или скрывает элемент на сцене OBS при показе или скрытии слайда.<br>' +
                    '• Совместим с F8/F9/F10/Завершение.<br>' + 
                    '• Совместим с презентациями типа текст/библия/музыка/изображение/PowerPoint/автоматическая презентация.<br><br>' +
                    'Обновление: элементы текста/библии/музыки имеют динамическое минимальное время отображения, увеличивающееся в зависимости от количества отображаемого текста.<br><br>' + 
                    infoVDDMM
            }
        }
    };
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir itens no telão e OBS
function triggers(module) {
  if (module.isEnabled()) {
     disableSceneItems(module.settings); // oculta no OBS todos os itens configurados no módulo
  }
  
  if (isDev() && module.settings.log && module.isEnabled()) { 
     h.openWindow('js_monitor');    
  }
  
 var arr = [];
  
 addTriggFX(arr, module);
 addAllTrigg(arr, module);
  
 
 return arr;
  
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2267656e657269635472696767657273227d
function addAllTrigg(arr, module) {
    var triggers = [
        { displayItem: 'any_text_slide|', closeItem: 'any_text|' },
        { displayItem: 'any_song_slide|', closeItem: 'any_song|' },
        { displayItem: 'any_verse|', closeItem: 'any_verse|'  },
        { displayItem: 'any_image|', closeItem: 'any_image|' },
        { displayItem: 'any_ppt_slide|', closeItem: 'any_ppt|' }
    ];

    for (var i = 0; i < triggers.length; i++) {
        var trig = triggers[i];
        h.setGlobal(mUID+'_close_item', trig.closeItem);
        addTriggGeneric(arr, module, trig.displayItem, trig.closeItem, trig.isPpt);
    }
}

function addTriggGeneric(arr, module, displayItem, closeItem) {
    
    arr.push({
        id: closeItem + "_close_obs_" + mUID,
        when: "closing",
        item: closeItem.split('|')[0],
        action: function(obj) {
            verseOBS(false, obj, module);
            clearIntervalVerse();
        }
    });

    arr.push({
        id: displayItem + "_show_obs_" + mUID,
        when: "displaying",
        item: displayItem.split('|')[0],
        action: function(obj) {
            verseOBS(true, obj, module);
        }
    });
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22665f7472696767657273227d
function addTriggFX(arr, module) {

 for (var i = 8; i <= 10 ; i++) {
 arr.push({
    id: "press_f" + i +"_obs_" + mUID,
    when: "displaying",
    item: "f"+i,
    action: function(obj) {
      verseOBS(false, obj, module);
    }
  });

  arr.push({
    id: "release_f" + i +"_obs_" + mUID,
    when: "closing",
    item: "f"+i,
    action: function(obj) {
      var type = typePres();
      var allowTypes = ['verse','image','song'];
      if (allowTypes.indexOf(type) != -1) {
         verseOBS(true, obj, module);
      }
    }
  });
 }
 
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
            id: 'receiver_id',
            name: 'OBS Studio',
            description: '',
            type: 'receiver',
            receiver: 'obs_v5'
        }, {       
            id: 'scene_name',
            name: jsc.i18n('Cena base'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        }, {
            type: 'separator'
        }, {
            type: 'title',
            label: jsc.i18n('Associe os objetos da cena base') + ':',
        }, {
            id: 'scene_item_name_verse',
            name: jsc.i18n('Bíblia'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'scene_item_name_song',
            name: jsc.i18n('Letra Música') + '/' + jsc.i18n('Apresentação Automática'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'scene_item_name_text',
            name: jsc.i18n('Texto'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                 return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'scene_item_name_image',
            name: jsc.i18n('Imagens com !'),
            description: '<html>' + jsc.i18n('Ao exibir imagens') + ': <i>' + jsc.i18n('(nome precisa conter uma exclamação "!")') + '</i>',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'scene_item_name_ppt',
            name: jsc.i18n('Apresentações Power Point'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'hide_title',
            label: jsc.i18n('Desbilitar exibição de título da música no OBS'),
            type: 'boolean',
        }, {
            id: 'timerTexto',
            name: jsc.i18n('F8 automático') + ' (' + jsc.i18n('segundos') + ')',
            description: '<html>' + jsc.i18n('Tempo mínimo de exibição de um slide antes de ativar a tecla F8 e ocultar o item') + '.<br>' +
                         jsc.i18n('Slides de texto, música e bíblia podem ter um tempo maior baseado na quantidade de caracteres, sendo aproximadamente 1 segundo a cada 10 letras') + '.',
            type: 'number',
            default_value : 20,
            min : 0,
            max : 60
        }, {
            type: 'separator'
        }, {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log, mUID, 'onChange ' + mID); //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22736574496e74657276616c227d
function setIntervalVerse(receiverID, scene, item, time) { 

var id = h.getGlobal(mUID+'_setIntervalVerse_id') || 0;

h.log(mUID,'setInterval values {} {} {} {}',receiverID, scene, item, time);
h.setGlobal(mUID+'_setInterval_values',{receiverID : receiverID, scene : scene, item: item, time : time});

if (id>0) {
    return
}
  
id = h.setInterval(function (receiverID, scene, item, time) {
    
    var cP = h.hly('GetCurrentPresentation').data;
    if (cP.type != 'verse') {
       clearIntervalVerse(); 
       return;
    }
    
    var c = h.getGlobal(mUID+'_setInterval_values');
        
    var verse = cP.name;
    var types_screen = ['blank', 'black', 'wallpaper'];
    
    var isBlank = types_screen.indexOf(cP.slide_type) !== -1 ? true : false;
    
    if (isBlank) {
      h.setGlobal(mUID+'_setIntervalVerse_name', ''); 
      return;
    }
    
    var oldVerse = h.getGlobal(mUID+'_setIntervalVerse_name') || ''; 
    
    if (oldVerse != verse) {
        h.log(mUID,'verse {}, oldVerse {}, isBlank {}', verse, oldVerse, isBlank);
        h.log(mUID,'setTimeoutKeyF do setInterval {} {} {} {}', c.receiverID, c.scene, c.item, c.time);
        h.setGlobal(mUID+'_setIntervalVerse_name', verse);
        setTimeoutKeyF(c.receiverID, c.scene, c.item, c.time, 'verse');   
    }

}, 1000);

h.setGlobal(mUID+'_setIntervalVerse_id', id);

} 

function clearIntervalVerse() {
  h.setGlobal(mUID+'_setIntervalVerse_name', '');
  var id = h.getGlobal(mUID+'_setIntervalVerse_id') || 0;
  if (id>0) {
     h.setGlobal(mUID+'_setIntervalVerse_id', 0);
     h.clearInterval(id);
  }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function verseOBS(show, obj, module) {
  var trigg = obj.metadata.trigger.id;
  h.log(mUID, '==== ' + jsc.i18n('Trigger acionada') + ': {}', trigg);
  
 
  //h.logp(mUID,'{%t} dados do OBJ {}',obj);
     
  var type = typePres();
  var typeTrigg = typeOfTrigger(trigg);

  type = type || typeTrigg; // Usa `typeTrigg` se `type` estiver vazio
  var timeoutDisabled = (type === "unknown");
  type = (type === "unknown") ? typeTrigg : type;

  if (type === 'automatic_presentation') {
    type = 'song';
  }

  h.log(mUID, '+==== ' + jsc.i18n('Tipo de dados na tela') + ' | type : {}, typeTrigg: {}', type, typeTrigg);

  clearTimeouts();
  clearIntervalVerse();

  if (typeAbort(type) && show) {
    h.log(mUID, jsc.i18n('Abortando VerseOBS - tipo da apresentação é blank, black ou wallpaper'));
    return;
  }

  var receiverID = module.settings.receiver_id;
  var scene = module.settings['scene_name'];
  var item = module.settings['scene_item_name_' + type];
  var time = module.settings.timerTexto;

  if (module.settings.hide_title && obj.slide_show_index == -1 && obj.metadata && obj.metadata.trigger && obj.metadata.trigger.item === 'any_song_slide') {
     sceneItemEnabled(receiverID, scene, item, false);
     module.setGlobal('wait_first_slide',true);
     return null;
  }
  
  h.log(mUID, "keyItem: {} | item: {}", 'scene_item_name_' + type, item);

  if (!scene) {
    h.log(mUID, jsc.i18n('Sem cena para o tipo') + ': {}', type);
    return;
  }

  if (show && !timeoutDisabled) {
    setTimeoutKeyF(receiverID, scene, item, time, type, obj);
  }

  h.log(mUID, 'type: {} setSceneItemEnabled( "{}", "{}", "{}", {})', type, receiverID, scene, item, show);
  var wait = 0;
  if (module.getGlobal('wait_first_slide')) {
     wait = 100;
     module.setGlobal('wait_first_slide', false);
  }
  h.setTimeout(sceneItemEnabled(receiverID, scene, item, show), wait);
}

function sceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, show) {
    var maxAttempts = 10;
    var attempts = 0;
    var itemEnabled;
    var status = h.getGlobal(mUID+'_status_of_types') || [];

    function updateStatus(sceneItemNameOrID, show) {
        var found = false;
        for (var i = 0; i < status.length; i++) {
            if (status[i].sceneItemNameOrID === sceneItemNameOrID) {
                status[i].show = show;
                found = true;
                break;
            }
        }
        if (!found) {
            status.push({ sceneItemNameOrID: sceneItemNameOrID, show: show });
        }
        h.setGlobal(mUID+'_status_of_types', status);
    }

    function disableAllOtherItems(currentSceneItemNameOrID) {
        for (var i = 0; i < status.length; i++) {
            if (status[i].sceneItemNameOrID !== currentSceneItemNameOrID && status[i].show === true) {
                sceneItemEnabled(receiverID, sceneName, status[i].sceneItemNameOrID, false);
            }
        }
    }

    if (show) {
        disableAllOtherItems(sceneItemNameOrID);
    }

    while (attempts < maxAttempts) {
        try {
            itemEnabled = jsc.obs_v5.getSceneItemEnabled(receiverID, sceneName, sceneItemNameOrID);
        } catch (e) {
            h.log(mUID, jsc.i18n('Erro OBS') + ': {}', [e]);
            return;
        }
        h.log(mUID, jsc.i18n('Status inicial item') + ' {}: {} | ' + jsc.i18n('passada') + ' {}', [sceneItemNameOrID, itemEnabled, attempts + 1]);
        if (itemEnabled == show) {
            break;
        } else {
            try {
                jsc.obs_v5.setSceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, show);
            } catch (e) {
                h.log(mUID, jsc.i18n('Erro OBS') + ': {}', [e]);
                return;
            }
            if (attempts > 0) {
                h.sleep(200);
            }
            attempts++;
        }
    }

    if (attempts == maxAttempts) {
       h.log(mUID, jsc.i18n("Número máximo de tentativas atingido. O item da cena pode não ter sido configurado corretamente."));
    } else {
        updateStatus(sceneItemNameOrID, show);
    }
}

function typeAbort(type) {
    var currentPresentation = h.hly('GetCurrentPresentation').data;
    var slide_type = currentPresentation ? currentPresentation.slide_type : "undefined";
    
    var types_presentation_abort = ['verse', 'ppt', 'text'];
    var types_screen_abort = ['blank', 'black', 'wallpaper'];

    var abortS = types_screen_abort.indexOf(slide_type) !== -1;
    var abortT = types_presentation_abort.indexOf(type) !== -1;
    
    return abortS && abortT;
}

function typePres() {
    var currentPresentation = h.hly('GetCurrentPresentation').data;
    h.log(mUID, 'currentPresentation= {}', [currentPresentation]);
    var type = "";
    if (currentPresentation && currentPresentation.type !== undefined) {
        type = currentPresentation.type.toLowerCase();
        type = type === 'file' ? 'ppt' : type;
        if (type == 'image' && currentPresentation.name.indexOf("!") < 0) {
            type = "image_without_!";
        }
    }
    type = type.indexOf("system_") === 0 ? type.substring(7) : type;
    return type;
}

function addTimeoutID(timeoutID) {
    var timeouts = h.getGlobal(mUID+"_timeouts", []);
    timeouts.push(timeoutID);
    h.setGlobal(mUID+"_timeouts", timeouts);
}

function clearTimeouts() {
    var timeouts = h.getGlobal(mUID+"_timeouts", []);
    for (var i = 0; i < timeouts.length; i++) {
        h.log(mUID, jsc.i18n('Cancelando timeout') + ' {}', timeouts[i]);
        h.clearTimeout(timeouts[i]);
    }
    var id = h.getGlobal(mUID+'_setRepaint_id') || 0;
    if (id > 0) {
        h.setGlobal(mUID+'_setRepaint_id', 0);
        h.clearInterval(id);
    }
    h.setGlobal(mUID+"_timeouts", []);
}

function disableSceneItems(settings) {
    var receiverID = settings.receiver_id;
    var sceneName = settings.scene_name;

    var itemKeys = [
        'scene_item_name_verse',
        'scene_item_name_song',
        'scene_item_name_text',
        'scene_item_name_image',
        'scene_item_name_ppt'
    ];

    for (var i = 0; i < itemKeys.length; i++) {
        var sceneItemNameOrID = settings[itemKeys[i]];
        if (sceneItemNameOrID) {
            sceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, false);
        }
    }
}

function typeOfTrigger(type) {
    var triggerID = type.substring(4).split('|')[0];
    triggerID = (type.indexOf('close') !== -1) ? (triggerID === "ppt_slide" ? "ppt" : triggerID) : triggerID;
    if (triggerID.indexOf('_slide') != -1) {
        triggerID = triggerID.slice(0, -6);
    }
    h.log(mUID, '+*********** ' + jsc.i18n('Nome da Trigger') + ': {}, ' + jsc.i18n('resultado da limpeza') + ': {}', type, triggerID);
    return triggerID;
}

function calculateDisplayDuration(time, type, obj) {
    var timeoutMin = time * 1000;
    var textLength = 0;
    
    h.log(mUID, '================== {}', obj);

    if (type === "text" || type === "song") {
        textLength = obj.text ? obj.text.length : 0;
    } else if (type === 'verse') {
        var pres = h.hly('GetCurrentPresentation');
        textLength = getVerseLengthByID(pres.data.id);
    }

    var calculatedTimeout = textLength * 100;
    var timeoutDuration = calculatedTimeout < timeoutMin ? timeoutMin : calculatedTimeout + 5000;

    h.log(mUID, "calculateDisplayDuration(): Text length: {} | type: {}  | timeOutMin {}s | newTimeOut {}s",
       textLength, type, timeoutMin / 1000, timeoutDuration / 1000);
    return timeoutDuration;
}

function setTimeoutKeyF(receiverID, scene, item, time, type, obj) {
    if (time > 0) {
        clearTimeouts();
        
        var clearType = (type === 'song') ? 'SetF9' : 'SetF8';
        var timeoutDuration = calculateDisplayDuration(time, type, obj);

        if (type === 'verse') {
            setIntervalVerse(receiverID, scene, item, time);
        }

        var timeoutID = h.setTimeout(function() {
            h.hly(clearType, { enable: true });
            h.log(mUID, '************' + jsc.i18n('Executando timeout'));
            sceneItemEnabled(receiverID, scene, item, false);
        }, timeoutDuration);

        addTimeoutID(timeoutID);
        h.log(mUID, '++++++ ' + jsc.i18n('novo timeOut') + ' {} | {} | {}s | setSceneItemEnabled("{}", "{}", "{}", false)', type, clearType, timeoutDuration / 1000, receiverID, scene, item);
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
 return [
    actionClearF8(module)
    ]
}

function actionClearF8(module) { //função para converter base salva de múltiplos slides para primeiro slide, reduzindo o arquivo
return   { 
            id: 'clearTimeout',
            label: '',
            icon : 'timer',
            hint : jsc.i18n('Cancela o F8 automático programado pelo tempo de exibição do Slide'),
            action: function(evt) {
                  h.notification(jsc.i18n('F8 automático cancelado para o slide atual.'),3);
                  h.hly('SetF8', { enable: false });
                  h.hly('SetF9', { enable: false });
                  h.hly('SetF10', { enable: false });
                  clearTimeouts();
            },
            status: function(evt) {
                  var timeouts = h.getGlobal(mUID+"_timeouts") || [];
                  if (timeouts.length>0) {
                  return {
                        description : '<-' + jsc.i18n('Cancelar'), //h.getCountdown(mID+'TimeOut'),
                        hint : jsc.i18n('Timer ativo, pressione para cancelar o timer e/ou reexibir o item'),
                        icon : 'timer_off',
                        background: '790903',   // default = null
                    };
                } else {
                    return null; // default values
                }
            }
         }
}





// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226d6170566572736546756e6374696f6e73227d
function getMapVerseLength(lang) {
  lang = lang || 'pt';
  var keyCache = 'map_verse_length_' + lang;
  var map = h.getGlobal(keyCache);
  if (map) {
    return map;
  }
  map = h.restore(keyCache);
  if (map) {
    return h.setGlobal(keyCache, map);
  }
  var url = 'https://holyrics.com.br/api/jsc/map_verse_length.php?lang=' + lang;
  var data = h.apiRequest(url, '');
  var books = [];
  data.split("#").forEach(dataChapters => {
    books.push(dataChapters.split("!"));
  });
  map = books;
  h.store(keyCache, map);
  return h.setGlobal(keyCache, map);
}

function getVerseLength(b, c, v, lang) {
  var map = getMapVerseLength(lang);
  try {
      var c = map[b - 1][c - 1].charAt(v - 1);
      return (c.charCodeAt(0) - 65) * 10
  } catch (e) {
      return 0;
  }  
}

function getVerseLengthByID(id, lang) {
  return getVerseLength(
    id.substring(0, 2),
    id.substring(2, 5),
    id.substring(5, 8),
    lang
  );
}