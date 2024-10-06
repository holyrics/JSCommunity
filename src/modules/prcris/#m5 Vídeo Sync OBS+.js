// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
var mID = '@prcris#m5'; 
var mUID = '@prcris#m5'; 
var pause = false;

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID,'startup '+ mID);

}


function info() {
    return {
        id: mUID,
        name: 'Vídeo Sync OBS+',
        description: '<html>'+
                     '• Exibe um vídeo em uma cena previamente configurada no OBS simultaneamente à exibição no Holyrics.<br>'+
                     '• ##NEW## Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>'+
                     '• ##NEW## Aceita Pause/Resume direto no player do VLC<br>'+
                     '• Quando termina o vídeo no OBS, ativa cena anterior.<br>'+
                     '• Possui botão de pânico para interromper vídeo no OBS sem interferir no telão, ativando a cena anterior.<br>'+
                     '=== ATENÇÃO - O CONTROLE DO VOLUME DO MIXER DIGITAL FOI SEPARADO EM OUTRO MÓDULO. <br>'+
                     '=== Baixe o módulo "PC unMute Holyrics+"<br>'+
                     '@ Para mais informações sobre automação com holyrics, visite <br>'+"<a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"

    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir texto no telão e OBS
function triggers(module) {

  var arr = [];
  arr.push({
    id: "video_show_obs_" + mUID,
    when: "displaying",
    item: "any_video",
    action: function(obj) {

      obsVideo(module, true, obj.file_fullname);
      module.updatePanel();
    }
  });
  return arr; // Retorna o array de triggers
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: 'Sobre ' + mID,
            description: "<html><hr>@ Para mais informações sobre automação com holyrics, visite <br><a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        }, 
        {
            type: 'title',
            label: '<html>Configurações no OBS:'
        }, 
        {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: 'Nome do receptor do OBS.',
            type: 'receiver',
            receiver: 'obs_v5'
        }, 
        {       
            id: 'scene_name',
            name: jsc.i18n('Scene name'),
            description: 'Escolha a cena do OBS para passar o vídeo.',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        }, 
        {
            id: 'scene_item_name',
            name: 'Nome da "Fonte de Mídia" no OBS',
            description: 'O script interage diretamente com um objeto do tipo "fonte de mídia" presente na cena selecionada, configurando-o dinamicamente para o vídeo que o Holyrics estiver apresentando.',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, 
        {        
            id: 'exclamation_mark',
            label: jsc.i18n('Enviar para o OBS:'),
            description: 'Dá a opção de enviar apenas alguns vídeos ou pastas para o OBS',
            type: 'string',
            allowed_values: [
                { value: true , label: 'Apenas vídeos com ! no nome ou na pasta' },
                { value: false , label: 'Apenas vídeos sem ! no nome ou na pasta' }
            ],
            default_value: false
        },
        {
            id: 'samePC',
            label: 'Holyrics e OBS no mesmo computador',
            type: 'boolean'
        },{
            type: 'separator'
        }, 
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID,'onchange '+ mID); // Habilita ou desabilita o log de acordo com a configuração  
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function pauseResumeVideoOBS(module, playing) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_item_name;
    
    if (playing) {
          jsc.obs_v5.pauseMedia(p1,p2);
      }
      else {
          jsc.obs_v5.playMedia(p1,p2);   
    } 
    pause = !playing;
}

function intervalPauseVLC(module) {
var p = h.getPlayer();
var playing = true;
var id = h.setInterval(function(){
  //verifica condição para cancelar a verificação
  if (!h.getGlobal(mUID + '_jumpToScene', null)) {
    h.clearInterval(id);
    return;
  }

  if (p.isPlaying() == playing) return;
  playing = p.isPlaying();

  pauseResumeVideoOBS(module, !playing);

  }, 200);
}

function obsVideo(module, show, mediaName) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_name;
    var p3 = s.scene_item_name;
    pause = false;
    if (!show) { 
        var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
        if (jumpToScene) {
            jsc.obs_v5.setActiveScene(p1, jumpToScene);
            jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, false);
            h.log(mUID, "======= Execução de vídeo no OBS interrompida pelo botão de pânico, voltando para a cena {}", jumpToScene);
            h.notification("Execução de vídeo no OBS interrompida pelo botão de pânico.", 3);
        }
        return;
    }
    h.log(mUID, "exclamation_mark: {} , mediaName: {}", s.exclamation_mark, mediaName);
    h.log(mUID, "mediaName.indexOf('!') {}", mediaName.indexOf('!'));
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {  //caso não possua
           h.log(mUID, "======= Vídeo não enviado para o OBS por NÃO possuir ! no nome.");
           return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) { //caso possua:
           h.log(mUID, "======= Vídeo não enviado para o OBS por POSSUIR ! no nome.");
           return;
    }

/// ajusta e salva configurações do player
      h.log(mUID, "Ajustando player Holyrics: unMute, noRepeat, fullVolume");
      var player = h.getPlayer();
      var pMute = player.isMute();
      var pRepeat = player.isRepeat();
      var pVolume = player.getVolume();
      // aplica novas cfgs no player
      h.hly('MediaPlayerAction', {
        mute: false,
        repeat: false,
        volume: 100
      });
/// fim ajusta e salva configurações do player

    var pSettings = getPluginSettings();

    // Verifica se as configurações necessárias estão presentes
    if (!pSettings.ip || !pSettings.port || !pSettings.token) {
      h.log("Configurações de vídeo para o plugin não encontradas. Configure o Plugin do Holyrics");
      return;
    }

    h.log(mUID, "======= Vídeo enviado para o OBS: " + mediaName);
    
    var jumpToScene = jsc.obs_v5.getActiveScene(p1);
    h.setGlobal(mUID + '_jumpToScene', jumpToScene);
    
    module.updatePanel();
    
    h.log(mUID, "Salvando informação da cena atual, scene: {}", [jumpToScene]);

    // Ajusta a cena no OBS colocando o nome do vídeo e ativa a cena no OBS causando o play
   
    var url = createURL(pSettings, mediaName, s.samePC);

    jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, true);
    jsc.obs_v5.setInputSettings(p1, p3, {
        input: url,
        input_format: "",
        close_when_inactive: true,
        looping: false,
        is_local_file: false
    });
    jsc.obs_v5.setActiveScene(p1, p2);
    
    intervalPauseVLC(module);
   
    h.log(mUID, "======= Cena ativada no OBS, scene: {}, item_scene: {}, file: {}", [p2, p3, mediaName]);


    // Prepara para retornar à cena original quando o vídeo terminar ou for parado
    if (jumpToScene) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.obs_v5.getActiveScene(p1) == p2) { // Caso o botão de pânico tenha sido ativado, não trocar de cena
                h.log(mUID, "======= Vídeo concluído - ativando cena anterior no OBS, scene: {}", [jumpToScene]);
                jsc.obs_v5.setActiveScene(p1, h.getGlobal(mUID + '_jumpToScene'));
                jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, false);
                h.setGlobal(mUID + '_jumpToScene', null);
            }
            module.updatePanel();
            h.log(mUID, "Retornando cfgs VLC Player: mute: {}, repeat: {}, volume {}", [pMute, pRepeat, pVolume]);
            h.hly('MediaPlayerAction', { mute: pMute, repeat: pRepeat, volume: pVolume });
            pause = false;
        });
    }
}

function getPluginSettings() {
  var json = h.readFileAsText('.plugin_system_settings.txt');
  return JSON.parse(json);
}

function createURL(settings, path, samePC) {
  var token = h.sha256(path + "#" + settings.token);
  token = h.base64Encode(token);
  token = token.replaceAll("[^a-zA-Z0-9]", "");
  token = token.substring(0, Math.min(20, token.length()));
     
  return "http://" + (samePC ? 'localhost' : settings.ip) + (settings.port == '80' ? "" : ":" + settings.port)
         + "/get_video"
         + "?path=" + encodeURIComponent(path)
         + "&token=" + token;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
 var arr = [];
 arr.push(actionPanic(module));
 return arr;
}



function actionPanic(module) { // cancela a execução de um vídeo no OBS
 
return {
            id: 'clearTimeout',
            label: '',
            icon : 'video_camera_front',
            hint : 'Cancela a execução do vídeo no OBS, retornando à cena original, mas continua a execução no VLC',
            action: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                      obsVideo(module, false);
                      h.setGlobal(mUID + '_jumpToScene', null)
                      h.notification("Vídeo no OBS cancelado, voltando à cena " + jumpToScene,3);
                      module.updatePanel();
                      module.settings.pause = false;
                      }
                  else { 
                  h.notification("Não entre em pânico, não há vídeo para ser cancelado!",3);
                  }
            },
            status: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                  return {
                        description : '<-Pânico',
                        icon : 'camera',
                        background: '790903',  
                    };
                } else {
                    return null; // default values
                }
            }
         }
}