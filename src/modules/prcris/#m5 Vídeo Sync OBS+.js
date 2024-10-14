// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
var mID = '@prcris#m5'; 
var mUID = mID + ''; 
var pause = false;

//#import modules_generic_functions
//#import plugin_video_resources

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID,'startup '+ mID);

}

function info() {
    return {
        id: mID,
        name: 'Vídeo Sync OBS+',
        description: '<html>'+
                     '• Exibe um vídeo em uma cena previamente configurada no OBS simultaneamente à exibição no Holyrics.<br>'+
                     '• Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>'+
                     '• Aceita Pause/Resume direto no player do VLC<br>'+
                     '• Quando termina o vídeo no OBS, ativa cena anterior.<br>'+
                     '• Possui botão de pânico para interromper vídeo no OBS sem interferir no telão, ativando a cena anterior.<br>'+
                     '• Opção para liberar o canal e ajustar o volume nos mixers digitais Behinger e SoundCraft.<br>'+
                     infoVDDMM,
        min_version: '99.0.0'
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

      var s = module.settings;
      var m1 = s.digital_mixer_id;
      var m2 = s.mixer_channel;
      var m3 = s.mixer_volume;

      h.log(mID, "Liberando mesa de som, receiver: {} , channel: {}, volume: {}", [m1, m2, m3]);
      // Seta volume e libera o canal.
      unMute(m1, m2);
      setVolume(m1, m2, m3 / 100);

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
            description: "<html><hr>Para mais informações acesse <a href='https://www.youtube.com/watch?v=wW-cZJYV6hg'>youtube.com/@multimidiaverdadebalneario</a></html>",
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
            type: 'title',
            label: 'Configurações mixer digital: (opcional)'
        }, 
        {
            id: 'digital_mixer_id',
            name: jsc.i18n('Receptor'),
            description: '<html><hr>Associe ao receptor da Behinger/Soundcraft caso você possua um, para que funcionem as rotinas de alteração de volume/mute',
            type: 'receiver',
            receiver: 'osc,soundcraft'
        }, 
        {
            id: 'mixer_channel',
            name: jsc.i18n('Channel number'),
            description: '',
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox: true
        }, 
        {
            id: 'mixer_volume',
            name: '% ' + jsc.i18n('Volume ') + '(0-100)',
            description: '',
            type: 'number',
            min: 0,
            max: 100,
            default_value: 0,
            component: 'slider',
            unit: '%'
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
  if (!gsJump()) {
    h.clearInterval(id);
    return;
  }

  if (p.isPlaying() == playing) return;
  playing = p.isPlaying();

  pauseResumeVideoOBS(module, !playing);

  }, 200);
}

function restorePreviousScene(module) {
      var s = module.settings;
      var p1 = s.receiver_id
      var p2 = s.scene_name;
      var p3 = s.scene_item_name;
      jsc.obs_v5.setActiveScene(p1, gsJump());
      //jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, false);
      gsJump("");
}

function gsJump(value) {

h.log(mUID, "gsJump:{}", value);

if (value != undefined) { 
  h.setGlobal(mUID + '_jumpToScene', value == "" ? null : value);
  }
else
  return h.getGlobal(mUID + '_jumpToScene', null);
}


function obsVideo(module, show, mediaName) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_name;
    var p3 = s.scene_item_name;
    pause = false;
    if (!show) { 
        if (gsJump()) {
            h.log(mUID, "======= Execução de vídeo no OBS interrompida pelo botão de pânico, voltando para a cena {}", gsJump());
            h.notification("Execução de vídeo no OBS interrompida pelo botão de pânico.", 3);
            restorePreviousScene(module); 
        }
        return;
    }
    h.log(mUID, "exclamation_mark: {} , mediaName: {}", s.exclamation_mark, mediaName);
    h.log(mUID, "mediaName.indexOf('!') {}", mediaName.indexOf('!'));
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {  //caso não possua
           h.log(mUID, "======= Vídeo não enviado para o OBS por NÃO possuir ! no nome.");
           restorePreviousScene(module);
           return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) { //caso possua:
           h.log(mUID, "======= Vídeo não enviado para o OBS por POSSUIR ! no nome.");
           restorePreviousScene(module);
           return;
    }

/// ajusta e salva configurações do player
      h.log(mUID, "Ajustando player Holyrics: unMute, noRepeat, fullVolume");
      var player = h.getPlayer();
      var pMute = player.isMute();
      var pRepeat = player.isRepeat();
      var pVolume = player.getVolume();
      // aplica novas cfgs no player
/*     h.hly('MediaPlayerAction', {
        mute: false,
        repeat: false,
        volume: 100
      });
*/      
     
    /// fim ajusta e salva configurações do player

    var pSettings = getPluginSettings();

    // Verifica se as configurações necessárias estão presentes
    if (!pSettings.ip || !pSettings.port || !pSettings.token) {
      h.log("Configurações de vídeo para o plugin não encontradas. Configure o Plugin do Holyrics");
      return;
    }

    h.log(mUID, "======= Vídeo enviado para o OBS: " + mediaName);
    
    var previousScene = jsc.obs_v5.getActiveScene(p1);
    
    if (previousScene != s.scene_name) { // nunca captura a cena do video
        gsJump(previousScene); 
        h.log(mUID,"Cena atual capturada: {}", previousScene);
    }

    module.updatePanel();
    
    // Ajusta a cena no OBS colocando a url do vídeo e ativa a cena no OBS causando o play
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
    if (gsJump()) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.obs_v5.getActiveScene(p1) == p2) { // Caso o botão de pânico tenha sido ativado, não trocar de cena
               h.setTimeout(function() { 
                  if (!isPlaying()) {
                      h.log(mUID, "======= Vídeo concluído - ativando cena anterior no OBS, scene: {}", [gsJump()]);
                      restorePreviousScene(module); 
                      module.updatePanel();
                     // h.log(mUID, "Retornando cfgs VLC Player: mute: {}, repeat: {}, volume {}", [pMute, pRepeat, pVolume]);
                     // h.hly('MediaPlayerAction', { mute: pMute, repeat: pRepeat, volume: pVolume });
                      pause = false;
                  }
              }, 800);
            }
        });
    }
}

function isPlaying() {
var p = h.getPlayer();
   return p.isPlaying()
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
                 
                  if (gsJump()) {
                      obsVideo(module, false);
                      h.setGlobal(mUID + '_jumpToScene', null)
                      h.notification("Vídeo no OBS cancelado, voltando à cena " + gsJump(),3);
                      module.updatePanel();
                      module.settings.pause = false;
                      }
                  else { 
                  h.notification("Não entre em pânico, não há vídeo para ser cancelado!",3);
                  }
            },
            status: function(evt) {
                  if (h.getGlobal(mUID + '_jumpToScene', null)) {
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

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226469676974616c5f6d6978227d
function getMixerDetails(receiverID, channel_type) {
  if (!receiverID) {
    h.log(mUID, ': Mixer não configurado!');
    return null;
  }

  var type = h.getReceiverInfo(receiverID).type || "nenhum"; 

  var channelAction = null; 
  if (type === 'osc') {
    channelAction = channel_type == 0 ? 'Channel' : 'Aux'; 
  } else if (type === 'soundcraft') {
    channelAction = channel_type == 0 ? 'input' : channel_type == 1 ? 'aux' : channel_type == 2 ? 'line' : null; 
  }

  return { type: type, channelAction: channelAction }; 
}

function unMute(receiverID, channel, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m || !m.channelAction) return; 

  try {
    if (m.type == 'osc') {
      jsc.x32['set' + m.channelAction + 'Mute'](receiverID, channel, false); 
    } else if (m.type == 'soundcraft') {
      jsc.soundcraft.conn(receiverID)[m.channelAction](channel).unmute();
    }
  } catch (e) {
    h.log(mUID, 'Erro {}', [e]);
  }
}

function setVolume(receiverID, channel, volume, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m) return;

  try {
    if (m.type == 'osc') {
      jsc.x32['set' + m.channelAction + 'Volume'](receiverID, channel, volume); 
    } else if (m.type == 'soundcraft') {
      jsc.soundcraft.conn(receiverID)[m.channelAction](channel).setVolume(volume); 
    }
  } catch (e) {
    h.log(mUID, 'Erro {}', [e]);
  }
}