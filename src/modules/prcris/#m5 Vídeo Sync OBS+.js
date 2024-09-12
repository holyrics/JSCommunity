// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
mID = '@prcris#m5';

function info() {
    return {
        id: mID,
        name: 'Vídeo Sync OBS+',
        description: '<html>'+
                     '• Exibe um vídeo em uma cena previamente configurada no OBS simultaneamente à exibição no Holyrics.<br>'+
                     '• Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>'+
                     '• Quando termina o vídeo no OBS, ativa cena anterior.<br>'+
                     '• Possui botão de pânico para interromper vídeo no OBS sem interferir no telão, ativando a cena anterior.<br>'+
                     '• Opção para liberar o canal e ajustar o volume nos mixers digitais Behinger e SoundCraft.<br>'+
                     '<br><hr>Para mais informações, acesse '+"<a href='https://www.youtube.com/watch?v=wW-cZJYV6hg'>youtube.com/@multimidiaverdadebalneario</a></html>"
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir texto no telão e OBS
function triggers(module) {

  logState(module.settings.log); // Habilita ou desabilita o log de acordo com a configuração

  var arr = [];
  arr.push({
    id: "video_show_obs_" + mID,
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

      // envia comandos para o OBS
      obsVideo(module, true, obj.file_fullname);
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
            type: 'separator'
        }, 
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log); // Habilita ou desabilita o log de acordo com a configuração  
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function obsVideo(module, show, mediaName) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_name;
    var p3 = s.scene_item_name;
    
    if (!show) { 
        var jumpToScene = h.getGlobal(mID + '_jumpToScene', null);
        if (jumpToScene) {
            jsc.obs_v5.setActiveScene(p1, jumpToScene);
            jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, false);
            h.log(mID, "======= Execução de vídeo no OBS interrompida pelo botão de pânico, voltando para a cena {}", jumpToScene);
            h.notification("Execução de vídeo no OBS interrompida pelo botão de pânico.", 3);
        }
        return;
    }
    h.log(mID,'mediaName: {} exlamationMark: {}', mediaName, s.exclamation_mark);

/// ajusta e salva configurações do player
      h.log(mID, "Ajustando player Holyrics: unMute, noRepeat, fullVolume");
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

    h.log(mID, "exclamation_mark: {} , mediaName: {}", s.exclamation_mark, mediaName);
    h.log(mID, "mediaName.indexOf('!') {}", mediaName.indexOf('!'));
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {  //caso não possua
           h.log(mID, "======= Vídeo não enviado para o OBS por NÃO possuir ! no nome.");
           return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) { //caso possua:
           h.log(mID, "======= Vídeo não enviado para o OBS por POSSUIR ! no nome.");
           return;
    }

    // Caso contrário, o vídeo é enviado normalmente
    h.log(mID, "======= Vídeo enviado para o OBS: " + mediaName);
    
    var jumpToScene = jsc.obs_v5.getActiveScene(p1);
    h.setGlobal(mID + '_jumpToScene', jumpToScene);
    
    h.log(mID, "Salvando informação da cena atual, scene: {}", [jumpToScene]);

    // Ajusta a cena no OBS colocando o nome do vídeo e ativa a cena no OBS causando o play
   
    var url = createURL(pSettings, mediaName);

    jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, true);
    jsc.obs_v5.setInputSettings(p1, p3, {
        input: url,
        input_format: "",
        close_when_inactive: true,
        looping: false,
        is_local_file: false
    });
    jsc.obs_v5.setActiveScene(p1, p2);

    h.log(mID, "======= Cena ativada no OBS, scene: {}, item_scene: {}, file: {}", [p2, p3, mediaName]);


    // Prepara para retornar à cena original quando o vídeo terminar ou for parado
    if (jumpToScene) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.obs_v5.getActiveScene(p1) == p2) { // Caso o botão de pânico tenha sido ativado, não trocar de cena
                h.log(mID, "======= Vídeo concluído - ativando cena anterior no OBS, scene: {}", [jumpToScene]);
                jsc.obs_v5.setActiveScene(p1, h.getGlobal(mID + '_jumpToScene'));
                jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, false);
                h.setGlobal(mID + '_jumpToScene', null);
            }
            h.log(mID, "Retornando cfgs VLC Player: mute: {}, repeat: {}, volume {}", [pMute, pRepeat, pVolume]);
            h.hly('MediaPlayerAction', { mute: pMute, repeat: pRepeat, volume: pVolume });
        });
    }
}



function logState(log){ 
    h.log.setEnabled('' + mID, log);
}

function setVolume(receiverID, channel, volume) {
  if (!receiverID) {
    h.log(mID,'setVolume: Mixer não configurado!'); 
    return;
  }
  var id = receiverID;
  var type = h.getReceiverInfo(id).type || "nenhum";
  h.log(mID,"tipo mixer configurado: {}", type);
  try {
    if (type == 'osc') {
        jsc.x32.setChannelVolume(id, channel, volume);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).setVolume(volume);
    }
  } catch (e) { h.log(mID,'Erro {}',[e]) };
}

function unMute(receiverID, channel) {
  if (!receiverID) {
    h.log(mID,'unMute: Mixer não configurado!'); 
    return;
  }
  var id = receiverID;
  var type = h.getReceiverInfo(id).type || "nenhum";
  h.log(mID,"tipo mixer configurado: {}", type);
  try { 
    if (type == 'osc') {
        jsc.x32.setChannelMute(id, channel, false);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).unmute();
    }
  } catch (e) { h.log(mID,'Erro {}',[e]) };
}

function getPluginSettings() {
  var json = h.readFileAsText('.plugin_system_settings.txt');
  return JSON.parse(json);
}

function createURL(settings, path) {
  var token = h.sha256(path + "#" + settings.token);
  token = h.base64Encode(token);
  token = token.replaceAll("[^a-zA-Z0-9]", "");
  token = token.substring(0, Math.min(20, token.length()));
  return "http://" + settings.ip + ":" + settings.port
         + "/get_video"
         + "?path=" + encodeURIComponent(path)
         + "&token=" + token;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {

 logState(module.settings.log); //habilita ou desabilita o log de acordo com a configuração
 return [
    actionPanic(module)
    ]
}

function actionPanic(module) { // cancela a execução de um vídeo no OBS
return   { 
            id: 'clearTimeout',
            label: '',
            icon : 'video_camera_front',
            hint : 'Cancela a execução do vídeo no OBS, retornando à cena original, mas continua a execução no VLC',
            action: function(evt) {
                  var jumpToScene = h.getGlobal(mID + '_jumpToScene', null);
                  if (jumpToScene) {
                      obsVideo(module, false);
                      h.setGlobal(mID + '_jumpToScene', null)
                      h.notification("Vídeo no OBS cancelado, voltando à cena " + jumpToScene,3);
                      }
                  else { 
                  h.notification("Não entre em pânico, não há vídeo para ser cancelado!",3);
                  }
            },
            status: function(evt) {
                  var jumpToScene = h.getGlobal(mID + '_jumpToScene', null);
                  if (jumpToScene) {
                  return {
                        description : '<-Pânico', //h.getCountdown(mID+'TimeOut'),
                        icon : 'camera',
                        background: 'FF0000',   // default = null
                    };
                } else {
                    return null; // default values
                }
            }
         }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874616374696f6e73227d
/*
function contextActions(module) {
    return [
            {
             name: spanIcon("\ueaca")+ 
                   "Enviar para o OBS (" + mID + ")",
             types: ['video','video_folder'],
             action: function(module) {
             
             
             
             }
        }
       ];
}
   
*/
        