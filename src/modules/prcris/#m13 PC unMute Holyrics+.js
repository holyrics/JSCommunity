// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
var mID = '@prcris#m13'; 
var mUID = mID + ''; 
var pause = false;

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID,'startup '+ mID);
}

function info() {
    return {
        id: mID,
        name: 'PC unMute Holyrics+',
        description: '<html>'+
                     'Que tal <b><u>liberar o canal de áudio conectado ao PC</u></b> em seu mixer digital sempre que iniciar um áudio no holyrics?<br><hr>'+
                     'Este módulo cria 3 triggers que fazem todo o trabalho para você, além de adicionar botões de mute e volume ao seu holyrics!<br><br>'+
                     '• Libera o canal e ajusta o volume nos mixers digitais Behinger e SoundCraft ao inicializar arquivos com áudio.<br>'+
                     '• Cria um botão exclusivo para gerenciar o mute do canal.<br>'+
                     '• Cria um fader exclusivo para ajuste do volume do canal.<br>'+
                     '• Compatível com Vídeo, Áudio e Apresentação Automática.<br>'+
                     '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Opção de alterar o Volume do VLC do Holyrics<br>'+
                     '• Aceita as entradas AUX dos mixers.<br>'+
                     infoVDDMM,
         allowed_requests: [
                     allowedPrcrisModuleRequests
         ]
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir texto no telão e OBS
function triggers(module) {
  var arr = [];
  var types = ['video', 'audio', 'automatic_presentation'];
  
  // Loop para cada tipo em 'types'
  for (var i = 0; i < types.length; i++) {
    var type = types[i]; 
    
    arr.push({
      id: "mixer_volume_" + type + mUID, 
      when: "displaying",
      item: "any_" + type, 
      action: (function(type) {
        return function(obj) {
          var s = module.settings;
          var m1 = s.digital_mixer_id;
          var m2 = s.mixer_channel;
          var m3 = s.mixer_volume;

          h.log(mUID, "Liberando mesa de som, receiver: {} , channel: {}, volume: {}", [m1, m2, m3]);
          
          SetPluginSettings(module); 
          unMute(m1, m2, s.channel_type);
          setVolume(m1, m2, m3 / 100, s.channel_type);

          module.updatePanel();
        };
      })(type)
    });
  }

  return arr; 
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
            type: 'separator'
        },  
        {
            type: 'title',
            label: 'Configurações mixer digital:'
        }, 
        {
            id: 'digital_mixer_id',
            name: jsc.i18n('Mixer Digital'),
            description: '<html><hr>Associe ao receptor da Behinger/Soundcraft caso você possua um, para que funcionem as rotinas de alteração de volume/mute',
            type: 'receiver',
            receiver: 'osc,soundcraft'
        }, 
        {
            id: 'channel_type',
            name: jsc.i18n('Tipo Entrada'),
            description: '',
            type: 'integer',
            allowed_values : [
                             {value: 0,  label: 'Input Channel'},
                             {value: 1,  label: 'Aux Channel'},
                             {value: 2,  label: 'Line Channel'},
                       ],
            default_value : 0
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
            name: jsc.i18n('Volume'),
            description: '',
            type: 'number',
            component: 'slider',
            unit: '%'
        },
        {
            type: 'separator'
        },  
        {
            type: 'title',
            label: 'Configurações VLC Player:'
        },
        {
            id: 'vlc_volume_unmute',
            label: 'Alterar volume / Mute',
            type: 'boolean',
        },
        {
            id: 'vlc_volume_level',
            name: jsc.i18n('Volume VLC'),
            description: '',
            type: 'number',
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
                logState(obj.input.log, mUID,'onchange '+ mID); // Habilita ou desabilita o log de acordo com a configuração  
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
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



function getMute(receiverID, channel, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m) return;

  try {
    if (m.type == 'osc') {
      return jsc.x32['is' + m.channelAction + 'Mute'](receiverID, channel); 
    } else if (m.type == 'soundcraft') {
      return jsc.soundcraft.conn(receiverID)[m.channelAction](channel).isMute();
    }
  } catch (e) {
    h.log(mUID, 'Erro ao obter estado de mute: {}', [e]);
    return null; 
  }
}


function getVolume(receiverID, channel, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m) return; 

  try {
    if (m.type == 'osc') {
      return jsc.x32['get' + m.channelAction + 'Volume'](receiverID, channel); 
    } else if (m.type == 'soundcraft') {
      return jsc.soundcraft.conn(receiverID)[m.channelAction](channel).getVolume();
    }
  } catch (e) {
    h.log(mUID, 'Erro ao obter volume: {}', [e]);
    return null; 
  }
}


function toggleMute(receiverID, channel, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m) return; 

  try {
    var isMuted = getMute(receiverID, channel, channel_type); 

    if (m.type == 'osc') {
      jsc.x32['set' + m.channelAction + 'Mute'](receiverID, channel, !isMuted); 
    } else if (m.type == 'soundcraft') {
      var conn = jsc.soundcraft.conn(receiverID)[m.channelAction](channel);
      isMuted ? conn.unmute() : conn.mute(); 
    }
  } catch (e) {
    h.log(mUID, 'Erro ao alternar mute: {}', [e]);
  }
}


function SetPluginSettings(module) {

      var s = module.settings;

      // aplica novas cfgs no player
      if (s.vlc_volume_unmute) { 
        h.hly('MediaPlayerAction', {
                  mute: false,
                volume: s.vlc_volume_level
            });
      }

  h.setTimeout( function (obj)  {
      var player = h.getPlayer();
      var pMute = player.isMute();
      var pRepeat = player.isRepeat();
      var pVolume = player.getVolume();
      
      var message = '<html><img src="icon,warning"/> <b><u>A t e n ç ã o :</u></b><br>';

      // gera alertas de segurança
            
      if (pRepeat) {
         message += '<br><img src="icon,repeat"/> O modo <b>Repeat</b> está ativado.';
      }
      if (pVolume < 30) { 
         message += '<br><img src="icon,volume_down"/> O <b>volume</b> está abaixo de 30%.';
      }
      if (pMute) { 
         message += '<br><img src="icon,volume_off"/> O <b>mute</b> está ativado.';
      }      
      
      h.notification(message,5);
      
   },500);
      
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
 var arr = [];
 arr.push(actionStatusChannel(module));
 arr.push(actionVolumeChannel(module));
 return arr;
}

function actionVolumeChannel(module) { 
    var s = module.settings;
    var m1 = s.digital_mixer_id;
    var m2 = s.mixer_channel;
    var m3 = s.channel_type;
    return {
              id: 'Alterar Volume',
              label: '',
              icon : 'tune',
              hint : 'Alterar Volume',
              action: function(evt) {
                 var inputs = [{
                        id: 'mixer_volume',
                        name: jsc.i18n('Volume'),
                        type: 'number',
                        component: 'slider',
                        default_value: (getVolume(m1,m2,m3) * 100).toFixed(0),
                        unit: '%',
                        onchange: function(obj) {
                          setVolume(m1, m2, obj.input.mixer_volume/100, m3);
                        }
                    }];
                    h.setTimeout(() => h.input(inputs), 0);
                }
            }
}

function actionStatusChannel(module) { 
    var s = module.settings;
    var m1 = s.digital_mixer_id;
    var m2 = s.mixer_channel;
    var m3 = s.channel_type;
    var mute = getMute(m1,m2,m3);
    return {
        id: 'toggleMute',
        hint: 'Mute on/off',
        icon : mute ?  'volume_off' : 'volume_up',
        action: function(evt) {
          toggleMute(m1,m2,m3);
        },
        status: function(evt) {
            if (!module.isEnabled()) {
               return
            }
            var vol = (getVolume(m1,m2,m3) * 100).toFixed(0);
            var mute = getMute(m1,m2,m3);
            var result = {};
            result.icon = mute ?  'volume_off' : 'volume_up';
            if (mute) { 
                result.background = '790903'; 
            }
            return result;
        }
    };
}