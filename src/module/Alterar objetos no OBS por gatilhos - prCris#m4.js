// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
//@prcris#m4_

function info() {   
    return {  
        name: '@prcris#m4 Cria gatilhos para Exibir/Ocultar Item em Cena no OBS',           
        description: '<html>'+
                     '• Exibe ou oculta um item em uma cena no OBS ao mostrar ou esconder um slide.<br>'+
                     '• Compatível com pressionamento de F8/F9/F10/Finalização.<br>'+ 
                     '• Compatível com apresentações do tipo texto/bíblia/música/imagem!/Power Point/Apresentação automática.<br><br>'+
                     '<hr>Para mais informações, acesse '+"<a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
//@prcris#m4_

/// triggers para ocultar / exibir itens no telão e OBS
function triggers(module) {
  
 logState(module.settings.log); //habilita ou desabilita o log de acordo com a configuração  
 disableSceneItems(module.settings); // oculta no OBS todos os itens configurados no módulo
 if (module.settings.log) {
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
        h.setGlobal('@prcris#m4_close_item', trig.closeItem);
        addTriggGeneric(arr, module, trig.displayItem, trig.closeItem, trig.isPpt);
    }
}

function addTriggGeneric(arr, module, displayItem, closeItem) {
    
    arr.push({
        id: closeItem + "_close_obs" + '_@prcris#m4_',
        when: "closing",
        item: closeItem.split('|')[0],
        action: function(obj) {
            verseOBS(false, obj, module);
            clearIntervalVerse();
        }
    });

    arr.push({
        id: displayItem + "_show_obs" + '_@prcris#m4_',
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
    id: "press_f" + i +"_obs" + '_@prcris#m4_',
    when: "displaying",
    item: "f"+i,
    action: function(obj) {
      verseOBS(false, obj, module);
    }
  });

  arr.push({
    id: "release_f" + i +"_obs" + '_@prcris#m4_',
    when: "closing",
    item: "f"+i,
    action: function(obj) {
      var type = typePres();
      var allowTypes = ['verse','image'];
      if (allowTypes.indexOf(type) != -1) {
         verseOBS(true, obj, module);
      }
    }
  });
 }
 
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
//@prcris#m4_

function settings() {
    return [
        {
            name: 'Sobre @prcris#m4',
            description: "<html><hr>Para mais informações acesse <a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
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
            label: 'Associe os objetos da cena base:',
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
            name: jsc.i18n('Letra Música'),
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
            description: '<html>Ao exibir imagens: <i>(nome precisa conter uma exclamação "!")</i>',
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
            id: 'timerTexto',
            name: jsc.i18n('F8 automático (segundos)'),
            description: '<html>Tempo máximo de exibição de um slide antes de ativar a tecla F8 e ocultar o item no OBS.',
            type: 'number',
            default_value : 20,
            min : 0,
            max : 60
        }, {
            type: 'separator'
        }, {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log); //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];

}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22736574496e74657276616c227d
function setIntervalVerse(receiverID, scene, item, time) { 

var id = h.getGlobal('@prcris#m4_setIntervalVerse_id') || 0;

h.log('@prcris#m4','setInterval values {} {} {} {}',receiverID, scene, item, time);
h.setGlobal('@prcris#m4_setInterval_values',{receiverID : receiverID, scene : scene, item: item, time : time});

if (id>0) {
    return
}
  
id = h.setInterval(function (receiverID, scene, item, time) {
    
    var cP = h.hly('GetCurrentPresentation').data;
    if (cP.type != 'verse') {
       clearIntervalVerse(); 
       return;
    }
    
    var c = h.getGlobal('@prcris#m4_setInterval_values');
        
    var verse = cP.name;
    var types_screen = ['blank', 'black', 'wallpaper'];
    
    var isBlank = types_screen.indexOf(cP.slide_type) !== -1 ? true : false;
    
    if (isBlank) {
      h.setGlobal('@prcris#m4_setIntervalVerse_name', ''); 
      return;
    }
    
    var oldVerse = h.getGlobal('@prcris#m4_setIntervalVerse_name') || ''; 
    
    if (oldVerse != verse) {
        h.log('@prcris#m4','verse {}, oldVerse {}, isBlank {}', verse, oldVerse, isBlank);
        h.log('@prcris#m4','setTimeoutKeyF do setInterval {} {} {} {}', c.receiverID, c.scene, c.item, c.time);
        h.setGlobal('@prcris#m4_setIntervalVerse_name', verse);
        setTimeoutKeyF(c.receiverID, c.scene, c.item, c.time, 'verse', '');   
    }

}, 1000);

h.setGlobal('@prcris#m4_setIntervalVerse_id', id);

} 

function clearIntervalVerse() {
  h.setGlobal('@prcris#m4_setIntervalVerse_name', '');
  var id = h.getGlobal('@prcris#m4_setIntervalVerse_id') || 0;
  if (id>0) {
     h.setGlobal('@prcris#m4_setIntervalVerse_id', 0);
     h.clearInterval(id);
  }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
//@prcris#m4_
function verseOBS(show, obj, module) {
  var trigg = obj.metadata.trigger.id
  h.log('@prcris#m4', '====trigger acionada: {} ', [trigg]);
  var type = typePres();
  var typeTrigg = typeOfTrigger(trigg); 
  var text = type === "text" ? obj.text : "";

  type = type === "" ? typeTrigg : type;
  var timeoutDisabled = type === "unknown" || type === "verse";
  type = type === "unknown" ? typeTrigg : type;
  
  h.log('@prcris#m4', '+==== Tipo de dados na tela | type: {}, typeTrigg: {}', [type, typeTrigg]);
  
  clearTimeouts();
  clearIntervalVerse();

  
  if (typeAbort(type) && show) { 
    h.log('@prcris#m4', 'Abortando VerseOBS - tipo da apresentação é blank, black ou wallpaper');
    return  
  }
  
  var receiverID = module.settings.receiver_id;
  
  var keyScene = 'scene_name';
  var keyItem = 'scene_item_name_' + type;
  
  var scene = module.settings[keyScene];
  var item = module.settings[keyItem];
  
  var time = module.settings.timerTexto;

  if (type == 'verse') {
      setIntervalVerse(receiverID, scene, item, time);
  }
    
  h.log('@prcris#m4',"keyItem:{} | item {} ",[keyItem,item]);
  
  if (!scene) { 
     h.log('@prcris#m4','Sem cena para o tipo: {}',[type]);
     return;
  }
  
  if (show && !timeoutDisabled) {
     setTimeoutKeyF(receiverID, scene, item, time, type, text);
  }
    
   h.log('@prcris#m4','type: {} setSceneItemEnabled( "{}", "{}", "{}", {})',[type, receiverID, scene, item, show]);
   sceneItemEnabled(receiverID, scene, item, show);


}

function sceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, show) {
    var maxAttempts = 10;
    var attempts = 0;
    var itemEnabled;
    var status = h.getGlobal('@prcris#m4_status_of_types') || [];

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
        h.setGlobal('@prcris#m4_status_of_types', status);
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
            h.log('@prcris#m4', 'Erro OBS: {}', [e]);
            return;
        }
        h.log('@prcris#m4', 'Status inicial item {}: {} | passada {}', [sceneItemNameOrID, itemEnabled, attempts + 1]);
        if (itemEnabled == show) {
            break;
        } else {
            try {
                jsc.obs_v5.setSceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, show);
            } catch (e) {
                h.log('@prcris#m4', 'Erro OBS:  {}', [e]);
                return;
            }
            if (attempts > 0) {
                h.sleep(200);
            }
            attempts++;
        }
    }

    if (attempts == maxAttempts) {
        h.log('@prcris#m4', "Max attempts reached. The scene item may not have been set correctly.");
    } else {
        updateStatus(sceneItemNameOrID, show);
    }
}

function typeAbort(type) {
    
    var currentPresentation = h.hly('GetCurrentPresentation');
    var slide_type = currentPresentation && currentPresentation.data ? currentPresentation.data.slide_type : "undefined";
    
    var types_presentation_abort = ['verse', 'ppt', 'text'];
    var types_screen_abort = ['blank', 'black', 'wallpaper'];

    var abortS =  types_screen_abort.indexOf(slide_type) !== -1 ? true : false;
    var abortT =  types_presentation_abort.indexOf(type) !== -1 ? true : false;
    
    return abortS && abortT;
} 

function typePres() {
    var currentPresentation = h.hly('GetCurrentPresentation');
    h.log('@prcris#m4', 'currentPresentation = {}', [currentPresentation]);
    var type = "";
    if (currentPresentation && currentPresentation.data && currentPresentation.data.type !== undefined) {
           type = currentPresentation.data.type.toLowerCase();
           type = type === 'file' ? 'ppt' : type;
           if (type == 'image' && currentPresentation.data.name.indexOf("!") < 0) {
                type = "image_without_!";
           }
    }
    type = type.indexOf("system_") === 0 ? type.substring(7) : type;
    return type;
}


function addTimeoutID(timeoutID) {
  // Obtém o array global de timeouts
  var timeouts = h.getGlobal("@prcris#m4_timeouts") || [];
  
  // Adiciona o novo timeoutID ao array
  timeouts.push(timeoutID);
  
  // Salva o array atualizado globalmente
  h.setGlobal("@prcris#m4_timeouts", timeouts);
}

function clearTimeouts() {
  // Obtém o array global de timeouts
  var timeouts = h.getGlobal("@prcris#m4_timeouts") || [];
  
  // Cancela cada timeout no array
  for (var i = 0; i < timeouts.length; i++) {
    h.log('@prcris#m4','Cancelando timeout {}', timeouts[i]);
    h.clearTimeout(timeouts[i]);
  }
  
  // Limpa o array de timeouts
  h.setGlobal("@prcris#m4_timeouts", []);
}


function disableSceneItems(settings) {
    var receiverID = settings.receiver_id;
    var sceneName = settings.scene_name;

    // Lista de keys que contêm os nomes dos itens da cena
    var itemKeys = [
        'scene_item_name_verse',
        'scene_item_name_song',
        'scene_item_name_text',
        'scene_item_name_image',
        'scene_item_name_ppt'
    ];

    // Iterar sobre as keys para desabilitar os itens correspondentes
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
    h.log('@prcris#m4', '+*********** Nome da Trigger: {}, resultado da limpeza: {}', type, triggerID);
    return triggerID;
}

function logState(log){ 
    h.log.setEnabled('@prcris#m4', log);
}



function setTimeoutKeyF(receiverID, scene, item, time, type, text) {
    var timeoutMin = time * 1000;
    h.log('@prcris#m4',"Text length: {} | type: {}  | timeOutMin {}s",text.length, type, timeoutMin/1000);
    if (timeoutMin > 0) {
      clearTimeouts();
      var timeoutDuration = (text.length * 100) < timeoutMin ? timeoutMin : (text.length * 100) + 5000;
      var clearType = type == 'song' ? 'SetF9' : 'SetF8';
      var timeoutID = h.setTimeout(function() {
         h.hly(clearType, { enable: true }); // decide qual F apertar
         h.log('@prcris#m4','************ Executing timeout');
         sceneItemEnabled(receiverID, scene, item, false); 
      }, timeoutDuration); // Time in milliseconds
      // name: clear_type + '_' + type
      addTimeoutID(timeoutID);
      h.log('@prcris#m4','++++++ new timeOut {} | {} | {}s | setSceneItemEnabled( "{}", "{}", "{}", false)',type, clearType,timeoutDuration/1000, receiverID, scene, item);
    }
}