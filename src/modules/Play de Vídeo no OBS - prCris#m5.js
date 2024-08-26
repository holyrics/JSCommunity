// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
//@prcris#m5_

function info() {
    return {
        name: '@prcris#m5 Cria gatilhos para Exibir/Ocultar um vídeo no OBS',
        description: '<html>'+
                     '• Exibe um vídeo em uma cena configurada previamente no OBS simultaneamente à exibição no Holyrics.<br>'+
                     '• Encerra o vídeo no OBS e retorna à cena original.<br>'+
                     '• Libera o canal e ajusta o volume nos mixers digitais Behinger e SoundCraft.<br><br>'+
                     '<hr>Para mais informações, acesse '+"<a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
//@prcris#m5_

/// triggers para ocultar / exibir texto no telão e OBS
function triggers(module) {

  logState(module.settings.log); //habilita ou desabilita o log de acordo com a configuração  

  var arr = [];
  arr.push({
    id: "video_show_obs" + '_@prcris#m5_',
    when: "displaying",
    item: "any_video",
    action: function(obj) {
      var s = module.settings;
      var mediaName = obj.file_fullname;
      var localFile = obj.file_path;
      if (s.path) {
          var basePath = s.path.replace(/\\/g, '/');
          if (!basePath.endsWith('/'))
              basePath += '/';
          localFile = basePath + mediaName;
      }

      if (s.exclamation_mark && localFile.indexOf('!') == -1) {
          return 
      }
      
      var m1 = s.digital_mixer_id;
      var m2 = s.mixer_channel;
      var m3 = s.mixer_volume;
      
      h.log("@prcris#m5", "Liberando mesa de som, receiver: {} , channel: {}, volume: {}",[m1,m2,m3]);
      // Seta volume e libera o canal.
      unMute(m1, m2);      
      setVolume(m1, m2, m3 / 100);
      
      h.log("@prcris#m5", "Ajustando player Holyrics: unMute, noRepeat, fullVolume");
      
      var player = h.getPlayer(); 
      var pMute = player.isMute();
      var pRepeat = player.isRepeat();
      var pVolume = player.getVolume();      
      
      h.hly('MediaPlayerAction', { 
             mute: false,
             repeat: false,
             volume: 100
      });

      var p1 = s.receiver_id;
      var p2 = s.scene_name;
      var p3 = s.scene_item_name;
      
      var jumpToScene = jsc.obs_v5.getActiveScene(p1);
      h.log("@prcris#m5", "Salvando informação da cena atual, scene: {}",[jumpToScene]);

      h.log("@prcris#m5", "Ativando cena no OBS, receiver: {} , scene: {}, item_scene: {}, file: {}",[p1,p2,p3,localFile]);
      // ajusta a cena no OBS colocando o nome do vídeo e ativa a cena no OBS causando o play
      jsc.obs_v5.setInputSettings(p1, p3, {close_when_inactive: true, looping: false, local_file: localFile });
      jsc.obs_v5.setActiveScene(p1, p2);
      
      // pepara para retornar à cena original quando o vídeo terminar ou for parado
      if (jumpToScene) {
          jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
              h.log("@prcris#m5", "Vídeo concluído - ativando cena anterior no OBS, receiver: {} , scene: {}",[p1, jumpToScene]);
              jsc.obs_v5.setActiveScene(p1, jumpToScene);
              h.log("@prcris#m5", "Retornando cfgs VLC Player: mute: {} , repeat: {}, volume {} ",[pMute, pRepeat, pVolume]);
              h.hly('MediaPlayerAction', {mute: pMute, repeat: pRepeat, volume: pVolume});
          });
      }
    }
  });
   
  return arr;
  
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
//@prcris#m5_

function settings() {
    return [
        {
            name: 'Sobre @prcris#m5',
            description: "<html><hr>Para mais informações acesse <a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        }, {
            type: 'title',
            label: 'Configurações mixer digital:',
        }, {
            id: 'digital_mixer_id',
            name: jsc.i18n('Receptor'),
            description: '<html><hr>Associe ao receptor da Behinger/Soundcraft caso você possua um, para que funcionem as rotinas de alteração de volume/mute',
            type: 'receiver',
            receiver: 'osc,soundcraft'
        }, {
            id: 'mixer_channel',
            name: jsc.i18n('Channel number'),
            description: '',
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox : true
        }, {
            id: 'mixer_volume',
            name: '% '+jsc.i18n('Volume ')+ '(0-100)',
            description: '',
            type: 'number',
            min: 0,
            max: 100,
            default_value: 0,
            show_as_combobox : true
        }, {
            type: 'separator'
        }, {
            type: 'title',
            label: '<html>Configurações no OBS:',
        }, {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: '',
            type: 'receiver',
            receiver: 'obs_v5'
        }, {       
            id: 'scene_name',
            name: jsc.i18n('Scene name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        }, {
            id: 'scene_item_name',
            name: jsc.i18n('Item name'),
            description: '',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        }, {
            id: 'path',
            name: jsc.utils.format('{} ({})', [jsc.i18n('Base directory'), jsc.i18n('Optional')]),
            description: jsc.i18n('Location of the folder with videos on the computer where OBS Studio is open'),
            type: 'string',
            hint: 'C:/folder/example'
        }, {        
            id: 'exclamation_mark',
            label: jsc.i18n('Exibir apenas vídeos com exclamação (!) no nome'),
            description: '<html>Dá a opção de <b>"não"</b> exibir qualquer vídeo no OBS, exibirá somente os que tiverem exclamação em qualquer parte do nome.',
            type: 'boolean'
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
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
//@prcris#m5_

function logState(log){ 
    h.log.setEnabled('@prcris#m5', log);
}

function setVolume(receiverID, channel, volume) {
  var id = receiverID;
  var type = h.getReceiverInfo(id).type;
  try {
    if (type == 'osc') {
        jsc.x32.setChannelVolume(id, channel, volume);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).setVolume(volume);
    }
  } catch (e) { h.log("@prcris#m5",'Erro {}',[e]) };
}

function unMute(receiverID, channel) {
  var id = receiverID;
  var type = h.getReceiverInfo(id).type;
  try { 
    if (type == 'osc') {
        jsc.x32.setChannelMute(id, channel, false);
    }
    if (type == 'soundcraft') {
        jsc.soundcraft.conn(id).input(channel).unmute();
    }
  } catch (e) { h.log("@prcris#m5",'Erro {}',[e]) };
}