var mID = '@prcris#m18';
var mUID = mID+''; 

//#import modules_generic_functions
//#import plugin_video_resources.js

function startup(module) { 

mUID = mID + module.id;
setScheduleName();

logState(module.settings.log, mUID, 'startup '+ mID);

refreshShowTimeSchedules(module);

//h.log(mUID,'{%t} Module Settings: {}', module.settings);
//if (isDev() && module.settings.log && module.isEnabled()) { 
//   h.openWindow('js_monitor');    
//   }
}
function info() {
    return {
        id: mID,
        name: 'Showtime',
        description: '> <b>Hora do Show</b> é um módulo automatizado para sincronização de eventos, projetado para criar uma impressionante apresentação de abertura. Integrando diversos sistemas e dispositivos, ele oferece total controle sobre iluminação, efeitos especiais, áudio e cenas de vídeo em tempo real.<br>' +
                     '<br>' +
                     '<b>Recursos Principais</b><br>' +
                     '• <b>Timers Coordenados:</b> Define e sincroniza múltiplos timers para garantir o início exato de cada efeito na abertura do evento.<br>' +
                     '• <b>Integração com Lumikit para DMX:</b> Controle de luzes, dispositivos de efeitos especiais (máquina de fumaça, bolhas, confete) e outros equipamentos de show.<br>' +
                     '• <b>Integração com Home Assistant:</b> Permite acionar dispositivos domésticos inteligentes, como lâmpadas e motores de telão, ampliando as possibilidades de automação.<br>' +
                     '• <b>Suporte a Mixers Profissionais:</b> Integra-se com mixers Behringer, Midas e SoundCraft, liberando volumes e canais conforme o evento progride.<br>' +
                     '• <b>Controle de Cenas no OBS:</b> Coordena cenas em loop e uma contagem regressiva no OBS, além de suportar vídeos simultâneos diferenciados para transmissão ao vivo e projeção local.<br>' +
                     infoVDDMM,
        allowed_requests: [
                     allowedPrcrisModuleRequests
        ],
        permissions: [
            {
                type: 'blacklist_request',
                key: 'obs_v5',
                value: 'SetInputSettings'
            }
         ],    
        min_version: '2.24.0'
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    //mesma sintaxe de function input
    return [
        {
            name: 'Sobre ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            label: 'Selecione Receceptores que for usar',
            type: 'title'
        },
        {
            id: 'mixer_id',
            name: jsc.i18n('Mixer Digital'),
            description: '<html><hr>Associe ao receptor da Behinger/Soundcraft',
            type: 'receiver',
            receiver: 'osc,soundcraft'
        }, 
        {
            id: 'dmx_id',
            name: 'DMX',
            description: 'Selecione o Receptor do Lumikit',
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'ha_id',
            name: jsc.i18n('Home Assistant'),
            description: '<html><hr>Associe ao receptor do Home Assistant',
            type: 'receiver',
            receiver: 'ha'
        }, 
        {
            id: 'streaming_id',
            name: 'Transmissão',
            description: 'Nome do receptor do OBS.',
            type: 'receiver',
            receiver: 'obs_v5'
        },
        {
            type: 'separator'
        },        
        {       
            id: 'video_scene',
            name: 'Cena OBS para os vídeos',
            description: 'Escolha a cena do OBS para passar o vídeo.',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.streaming_id);
            }
        }, 
        {
            id: 'scene_item_name',
            name: 'Nome da "Fonte de Mídia" no OBS',
            description: 'O script interage diretamente com um objeto do tipo "fonte de mídia" presente na cena selecionada, configurando-o dinamicamente para o vídeo que o Holyrics estiver apresentando.',
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.streaming_id, obj.input.video_scene);
            }
        },         
        {
            type: 'separator'
        },
        {
            id: 'inputs',
            type: 'number',
            label: 'Quantidade de Inputs nas configurações' ,
            default_value : 4,
            description: 'Permite alterar a quantidade de entradas nas janelas de input do módulo.' 
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log, mUID,' onchange '+ mID); //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
    var act = [
        actionShow(module),
        copySchedule(module),
        {
            hint: 'Agendar/Cancelar Show',
            icon: 'hourglass_bottom',
            action: function() {
               if (getTaskShowCount() > 0) {
                 cancelShowRunAt(); 
               } else {
                 if (!isTodaySchedule()) { //aborta o agendamento caso o evento não seja hoje.
                     showMessage('ops!','O evento selecionado não é na data de hoje!');
                     return 
                    }
                 refreshShowTimeSchedules(module);
               }
            },
            status: function(evt) {
                if (getTaskShowCount() > 0) {
                    return jsc.utils.ui.item_status.danger({
                             icon: 'hourglass_top',
                             hint: 'Cancelar Show de Abertura'
                           });
                } else {
                    return null; // default values
                }
            }
        }
    ];
    
        act.push({
            hint: 'Imprime Showtime',
            icon: 'prin'+'t', // Corrigido para o nome correto do ícone
            action: function() {
                  eventReport(module);
            }
        });
    
    return act;
}


function copySchedule(module) {
    return {
        hint: 'Copiar as configs de outro evento',
        icon: 'file_copy',
        action: function() {
            var s = module.settings;
            var inputs = [];
            inputs.push({
                type: 'title',
                name: '<html><b>Copiar show</b>'
            });
            inputs.push({ type: 'separator' });

            inputs.push({
                id: 'copyshow',
                type: 'string',
                label: 'Escolha o evento para copiar os dados',
                allowed_values: getShowList(s)
            });
            
            var q = h.input(inputs);
            if (q !== null) {
                var sn = getScheduleName();
                var sc = q.replace('cfg_', '');
                s['cfg_' + sn] = s[q]; // clona configurações gerais
                h.log(mUID, '{%t} Copiados os dados de {}: {}', q, s['cfg_' + getScheduleName()]);
                
                var keys = ['dmx', 'mixer', 'ha', 'js']; // tipos de inputs possíveis
                keys.forEach(function(key) {  
                    for (var i = 0; i < 2; i++) {
                        s[key + '_' + i + '_' + sn] = s[key + '_' + i + '_' + sc] || []; // clona configurações dos buttons
                        h.log(mUID, '{%t} Copiados os dados de {}: {}', key, s[key + '_' + i + '_' + sn]);
                    }
                });
            }
        }
    };
}



function actionShow(module) {
    var sn = getScheduleName();
    return {
        hint: 'Configurar Show do '+sn,
        icon: 'set_meal',
        action: function() {
            var s = module.settings;
            var inputs = [];
            var vdDur = '';
            var sn = getScheduleName();
            var sc = 'cfg_'+sn;
            
            inputs.push({type: 'title', 
                            name: '<html><b>Configurações para o show de abertura do ' +sn
                         });
             inputs.push({type: 'separator'});

             inputs.push({
                 id: 'active',
                 label: 'Show Ativo para "'+sn+'"',
                 type: 'boolean',
                 default_value : false,
                 onchange :  function(obj) {
                     logState(obj.input.log, mUID,' onchange '+ mID); //habilita ou desabilita o log de acordo com a configuração  
               }
             });
             inputs.push({
                id: 'atraso',
                type: 'number',
                label: 'Atrasar abertura ('+getScheduleTime()+'+): ' ,
                description: 'Minutos para somar na hora de abertura do evento programado para as ' + getScheduleTime()
                })
                
            for (var i = 0; i < 2; i++) {
               (function(i) {
               
               inputs.push({type: 'separator'});
               inputs.push({type: 'title', 
                            name: '<html><b>Vídeo' + (i + 1) + (i == 0 ? ' (Pré-evento em Loop)' : ' (Contagem Regressiva)') 
                          });
               if (i === 0) {
                   inputs.push({
                   id: 'preservice',
                   type: 'number',
                   label: 'Iniciar quantos minutos antes da hora alvo?' ,
                   description: 'Determina quanto tempo antes o vídeo de pré-evento deve iniciar. Exemplo: culto inicia 19:00, se preencher 20, este vídeo iniciará às 18:40.'
                })

               }
              if (s[sc]) {
                  vdDur = ' (' + formatDuration(getVideoDuration(s[sc]['vlcVideo' + i]))+')';
              }

              inputs.push({
                    id: 'vlcVideo'+i,
                    type: 'video',
                    name: 'Local' + vdDur,
                    description : 'Vídeo a ser executado nas telas Público configuradas, ' + (i == 0 ? ' em loop, no tempo programado antes da contagem regressiva' : ' que terminará no horário exato de início do evento.')
               });
               
               if (s.streaming_id != "") {
                 if (s[sc]) { 
                   vdDur = ' (' + formatDuration(getVideoDuration(s[sc]['liveVideo' + i]))+')';
                   }
                   inputs.push({
                        id: 'liveVideo'+i,
                        type: 'video', 
                        name: 'Live' + vdDur,
                        description : 'Vídeo a ser executado na Live ' + (i == 0 ? ' em loop no tempo programado antes da contagem regressiva' : ' que terminará no horário exato de início do evento.')
                   });
                 if (i === 1) {
                   inputs.push({
                      id: 'cam_scene',
                      name: 'Cena câmera (fim show)',
                      description: 'Escolha a cena do OBS após encerrar a abertura.',
                      type: 'string',
                      suggested_values: function(obj) {
                      return jsc.obs_v5.getSceneList(s.streaming_id);
                      }
                   }); 
                   inputs.push({
                      id: 'stop_obs_at',
                      type: 'number',
                      label: 'Ir para a câmera quando faltar (s): ' ,
                      description: 'Ir para a câmera faltando quantos segundos para terminar o vídeo? A ideia é fazer uma conexão entre a contagem da live e o final da contagem no culto.' 
                   })
                 }
               }

               if (s.dmx_id != "") {
                 inputs.push({
                      id: 'dmx'+i,
                      type: 'button',
                      name: 'Lumikit' ,
                      button_label : 'Configurar Ações DMX',
                      action : function() { 
                          actionDMXInput(module,i)
                      }
                  });
               }
               if (s.mixer_id != "") {
                 inputs.push({
                      id: 'mixer'+i,
                      type: 'button',
                      name: 'Mixer' ,
                      button_label : 'Configurar Ações Mixer',
                      action : function() { 
                          actionMixerInput(module,i)
                      }
                  });
               }
               if (s.ha_id != "") {
                 inputs.push({
                      id: 'ha'+i,
                      type: 'button',
                      name: 'Home Assistant',
                      button_label : 'Configurar Ações HA',
                      action : function() { 
                          actionHAInput(module,i)
                      }
                });
               }
               inputs.push({
                    id: 'js'+i,
                    type: 'button',
                    name: 'Funções JS no seu Include',
                    button_label : 'Rotinas Extras',
                    action : function() { 
                        actionJSInput(module,i)
                    }
                });
              })(i);
            } 
            var q = module.inputSettings('cfg_'+sn, inputs);
            if (q !== null) {
                h.log(mUID,"{%t} Valores escolhidos = {}",q);
                s[sc] = checkData(q);
                
                timingCheckAndSet(s,sc);
                refreshShowTimeSchedules(module);
           }
        },
        status: function(evt) {
                var s = module.settings;
                var sc = 'cfg_'+getScheduleName();
                if (s[sc] && s[sc].active !== true) {
                    return {
         	         hint: 'Configurar Show do '+sn+' (inativo)',
                           foreground: '727272', 
                           background: '444444', 
                           iconColor: '727272'
                    };
                } else {
                    return null; // default values
                }
        }
    }
}

function actionJSInput(module,video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'js';
    
    inputs.push({
        type: 'title',
        name: '<html><b>Ações extras em Ja'+'vaScript para o vídeo ' + (video + 1) + ' do evento ' + getScheduleName()
    });
       
    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });
        
        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>Ativar Comando ' + (i + 1)
        });
        
        inputs.push({
            id: 'fnInclude' + i,
            type: 'string',
            label: 'Nome da Função show.() no Include',
            description: 'Execute suas próprias funções em Ja'+'vaScript no Include do Holyrics e chame elas no módulo.<br><br><hr><br><b><u>Exemplo:</b></u><br><br>' +
                '1. Abra a tela de Include no menu arquivo -> configurações -> avançado -> Botão Ja'+'vaScript -> Include.<br>' +
                '2. Crie um objeto em uma var global chamado show, que conterá suas funções, seguindo o exemplo abaixo.<br><br>' +
                '<pre style="color: #D4D4D4; font-family: monospace; background-color: #1E1E1E; padding: 10px; border-radius: 5px;">' +
                'var show = { <br>' +
                '    helloworld: function () {<br>' +
                '        h.log("=== hello world ===");<br>' +
                '        // escreva todo o código pra sua função helloworld<br>' +
                '    },<br>' +
                '    helloholyrics: function () {<br>' +
                '        h.log("=== hello holyrics ===");<br>' +
                '        // escreva todo o código pra sua função helloholyrics<br>' +
                '    }<br>' +
                '};</pre><br><br>' +
                '<b><u>Nota:</u></b> As funções não recebem parâmetros e são chamadas sem ()<br>' +
                'Coloque apenas o nome dela na hora de configurar no módulo, exemplo: helloholyrics<br>' +
                'Ficou com dúvidas? É melhor você estudar mais e usar só as coisas prontas do módulo!'
        });

        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }    

    var sc = k+'_'+video+'_'+getScheduleName();
    var q = module.inputSettings(sc, inputs);
        if (q !== null) {
            h.log(mUID,"{%t} Valores escolhidos = {}",[q]);
            s[sc] = resetInactive(q, k);;
        }
}

function actionHAInput(module,video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'ha';
    inputs.push({
        type: 'title',
        name: '<html><b>Configurações de interruptores Home Assistant para o vídeo ' + (video + 1) + ' do evento ' + getScheduleName()
    });
    
    var allowedValues = [{value: '', label : ''}];
    var switchs = jsc.ha.getSwitchList(s.ha_id);
    for (var i = 0; i < switchs.length; i++) { 
       var item = switchs[i];
       var label = item.replace('switch.', ''); // Remove o prefixo "switch."
       label = label.replace(/_/g, ' '); // Substitui "_" por espaço
       label = label.replace(/\b\w/g, function(c) { return c.toUpperCase(); }); // Capitaliza a primeira letra de cada palavra
       allowedValues.push({
          value: item, // O item original da lista
          label: label // O label formatado
       });
    }

    
    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });
        
        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>Ativar Comando ' + (i + 1)
        });
        
        inputs.push({
            id: 'switch' + i,
            type: 'string',
            label: 'Interruptor',
            allowed_values: allowedValues
        });
        
        inputs.push({
            id: 'state' + i ,
            type: 'string',
            label: 'Ação',
            allowed_values: [{ value: null , label: '' },
                             { value: true , label: 'Ligar' },
                             { value: false , label: 'Desligar'}]
            });
            
         inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }
    var sc = k + '_'+video+'_'+getScheduleName();
    var q = module.inputSettings(sc, inputs);
        if (q !== null) {
            h.log(mUID,"{%t} Valores escolhidos = {}",[q]);
            s[sc] = resetInactive(q, k);
        }
}

function actionMixerInput(module, video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'mixer';
    
    inputs.push({
        type: 'title',
        name: '<html><b>Ações do Mixer durante o vídeo ' + (video + 1) + ' do evento ' + getScheduleName()
    });
    
    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });
        
        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>Ativar Comando ' + (i + 1)
        });
        
        var allowedValues = [{value: '',
                              label: ''}];
                              
        var types = ['Input', 'Aux', 'Line'];
        var max_input = 32; // Máximo de canais de input
        
        // Gerar a lista para 'Input' channels
        for (var j = 1; j <= max_input; j++) {
            allowedValues.push({
                value: 'Input ' + j,
                label: 'Input ' + j // Ex: "Input 1", "Input 2", etc.
            });
        }
        
        // Gerar a lista para 'Aux' channels (1 a 6)
        for (var j = 1; j <= 6; j++) {
            allowedValues.push({
                value: 'Aux ' + j,
                label: 'Aux ' + j // Ex: "Aux 1", "Aux 2", etc.
            });
        }
        
        // Gerar a lista para 'Line' channels (1 a 16 ou outra faixa desejada)
        for (var j = 1; j <= 16; j++) {
            allowedValues.push({
                value: 'Line ' + j,
                label: 'Line ' + j // Ex: "Line 1", "Line 2", etc.
            });
        }
        
        // Adicionando o campo ao inputs
        inputs.push({
            id: 'channel' + i,
            type: 'string',
            label: 'Canal',
            allowed_values: allowedValues
        });

        inputs.push({
            id: 'volume' + i,
            type: 'number',
            component: 'slider',
            unit: '%'
        });
        
        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }
    var sc = k + '_' + video + '_' + getScheduleName();
    var q = module.inputSettings(sc , inputs);
    if (q !== null) {
        h.log(mUID, "{%t} Valores escolhidos = {}", [q]);
        s[sc] = resetInactive(q, k);
    }
}


function actionDMXInput(module, video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'dmx';
    
    inputs.push({
        type: 'title',
        name: '<html><b>Configurações de cenas Lumikit para o vídeo ' + (video + 1) + ' do evento ' + getScheduleName()
    });
    
    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });
        
        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>Ativar Comando ' + (i + 1)
        });
        
        var allowedValues = [{label: '', page: ''}];
        var letters = 'ASDFGHJKLZXCVBNM'.split(''); // Sequência de cenas do lumikit
        
        for (var page = 1; page <= 10; page++) {
            for (var j = 0; j < letters.length; j++) {
                allowedValues.push({
                    value: page + '|' + letters[j], // Combina a página com a cena
                    label: 'Página ' + page + ' - Cena ' + letters[j] // Label descritivo
                });
            }
        }

        inputs.push({
            id: 'bpm' + i ,
            type: 'number',
            min: 0,
            max: 200,
            show_as_combobox : true,
            label: 'BPM'
        });
        
        inputs.push({
            id: 'scene' + i,
            type: 'string',
            label: 'Cena',
            allowed_values: allowedValues
        });
        
        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }
    
    var sc = k + '_'+video+'_'+getScheduleName();
    var q = module.inputSettings(sc, inputs);
        if (q !== null) {
            h.log(mUID,"{%t} Valores escolhidos = {}",[q]);
            s[sc] = resetInactive(q, k);
        }
}

function createRelativeTimeInputs(i, video) {

    var add = video === 0 ? '' : '/final';
    var allowedValues = [{ value: null, label: '' },{ value: true, label: 'Início do Vídeo' }];
    if (video === 1) {
          allowedValues.push({ value: false, label: 'Final do Vídeo' });
    }

    var result = [ 
        {
            id: 'timer' + i,
            type: 'number',
            min: -1000,
            max: 1000,
            default_value: 0,
            label: 'Ajuste (±S)',
            description: 'Tempo em relação ao início' + add + ' do vídeo. Exemplo 5 segundos antes de iniciar o vídeo coloque -5, 4 segundos depois do inicio' + add + ' do vídeo coloque 4'
        },
        {
            id: 'timer_index' + i,
            type: 'string',
            label: 'Em relação ao ',
            allowed_values: allowedValues
        }];
   return result;
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
function triggers(module) {
  var arr = [];

  arr.push({
    id: mUID + "_rel"+"oad_schedule",
    when: "change",
    item: "playlist",
    action: function(obj) {
      refreshShowTimeSchedules(module);
    }
  });

return arr;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226d616b652069742068617070656e227d
function startSchedulesShow(module) {

cancelShowRunAt();
var s = module.settings;
var d = getTimersToShow(s);

if (d.startShow<0) {
  return
}

h.log(mUID, "{%t} Tempos em MS de cada evento: {}", h.toPrettyJson(d));

timingCheckAndSet(s,d.c)

suspendConflictingModules(true, [13,15]);  // suspende o módulo de vídeo e de mesa de som

sc(s,d);
scVideosLocal(s,d);
if (s.streaming_id != "") {
   scVideosLive(s,d);
}

setShowRunAt(function() { cancelShowRunAt(); }, getFurthestFutureTime(d, s, true) + 2000, 'Clear List');

}


function scVideosLocal(s,d) {
var cfg = s[d.c];
setShowRunAt(function() { playVLC(cfg.vlcVideo0, true); }, d.startShow, 'vlcLoop');
setShowRunAt(function() { playVLC(cfg.vlcVideo0, false); }, d.startVlcVideoLastRepeat, 'vlcLastRepeat'); // garante que a última execução do vídeo será completa
if (!cfg.vlcVideo1.isDir) {
   setShowRunAt(function() { playVLC(cfg.vlcVideo1, false);}, d.startVlcVideo1, 'vlcFinal');
}
}

function scVideosLive(s,d) {
var cfg = s[d.c];
setShowRunAt(function() { playOBS(s, cfg.liveVideo0, true); }, d.startShow, 'liveLoop');
setShowRunAt(function() { playOBS(s, cfg.liveVideo0, false); }, d.startLiveVideoLastRepeat, 'liveLastRepeat'); // garante que a última execução do vídeo será completa
setShowRunAt(function() { playOBS(s, cfg.liveVideo1, false); }, d.startLiveVideo1, 'liveFinal');
setShowRunAt(function() { 
         //h.log(mUID, '{%t} s.streaming_id {}, cfg.cam_scene {}',s.streaming_id,cfg.cam_scene);
         jsc.obs_v5.setActiveScene(s.streaming_id, cfg.cam_scene); }
         , d.endShow - (s[d.c].stop_obs_at * 1000) , 'liveCAM'); 
}

function sc(s, d) {
    var keys = ['dmx', 'mixer', 'ha', 'js'];  // tipos de inputs possíveis
    keys.forEach(function(key) {  
        if (s[key + '_id'] != "" || key === 'js') {
            for (var i = 0; i < 2; i++) {
                var cfg = s[key + '_' + i + '_' + d.s];
                var ic = inputCount(cfg, key);
                for (var n = 0; n < ic + 1; n++) { 
                    if (cfg[key + n]) {
                        var when = whenTime(i, d, cfg['timer_index' + n], cfg['timer' + n]);
                        (function(i, n, when, cfg, key) {  
                            setShowRunAt(function() { 
                                try {
                                    makeItHappen(s, i, n, cfg, key);
                                } catch (e) { 
                                    h.log("", 'Erro {}', [e]);
                                }
                            }, when, key + '_' + i + '_' + n);
                        })(i, n, when, cfg, key);  
                    }
                }
            }
        }
    });
}



function makeItHappen(s, i, n, cfg, key) {
  
  if (s[key+'_id']) {
     var receiverID = h.getReceiverInfo(s[key+'_id']).name;
  }
  
  switch (key) {
    case 'dmx': {
      h.log(mUID, "{%t} setDMX('{}', '{}', '{}');",  receiverID, cfg['scene' + n], cfg['bpm' + n]);   
      setDMX(s.dmx_id, cfg['scene' + n], cfg['bpm' + n]);
      break;
    }
    case 'mixer': {
      h.log(mUID, "{%t} setMixer('{}', '{}', {});", receiverID, cfg['channel' + n], cfg['volume' + n]);
      setMixer(s.mixer_id, cfg['channel' + n], cfg['volume' + n]);
      break;
    }
    case 'ha': {
      h.log(mUID, "{%t} setHA('{}', '{}', {});", receiverID, cfg['switch' + n], cfg['state' + n]);
      setHA(s.ha_id, cfg['switch' + n], cfg['state' + n]);
      break;
    }
    case 'js': {
      h.log(mUID, "{%t} executeJS({});", cfg['fnInclude' + n]);
      executeJS(cfg['fnInclude' + n]);
      break;
    }
  }
}


function timingCheckAndSet(s,cfg) {

var totalVideos = Math.ceil((getVideoDuration(s[cfg]['vlcVideo0']) + getVideoDuration(s[cfg]['vlcVideo1'])) / 1000 / 60);
if (s[cfg].preservice < totalVideos) {
  h.notification('Tempo para início foi definido para o mínimo da soma de todos os vídeos: '+totalVideos+' minutos');
  s[cfg].preservice = totalVideos;
}

}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22687562227d
function setDMX(receiverID, scene, bpm) {
  var str = 'ASDFGHJKLZXCVBNM';
  scn = scene.split('|');
  var posicao = str.indexOf(scn[1]);
  //h.log(mUID,"{%t} Scene page {} light {} bpm {}", scn[0], posicao, bpm);
  jsc.lumikit.setActiveScene(receiverID, scn[0], posicao + 1);
  jsc.lumikit.setBPM(receiverID, bpm);
}


function executeJS(fnName) {
  //h.log(mUID,"{%t} executando a função do include show.{}()",fnName);
  show[fnName]();
}
 
function setHA(receiverID, deviceID, state) {
  var st = state == "true";
  jsc.ha.setSwitch(receiverID, deviceID, st);
}

function setMixer(receiverID, channel, volume) {
  var ch = channel.split(' ');
  setVolume(receiverID, ch[1], volume / 100, ch[0]);
  mute(receiverID, ch[1], ch[0],volume == 0);
}


function playVLC(mediaName, repeat) {
   h.log(mUID,"{%t} playVLC('{}', {})", mediaName.name, repeat);
   h.playVideo(mediaName.name, { volume: 100, repeat: repeat });
}

function playOBS(s, mediaName, repeat) {
    var p1 = s.streaming_id;
    var p2 = s.video_scene;
    var p3 = s.scene_item_name;
 
    var pSettings = getPluginSettings();
 
    if (!pSettings.ip || !pSettings.port || !pSettings.token) {
      h.log("Configurações de vídeo para o plugin não encontradas. Configure o Plugin do Holyrics");
      return;
    }
    
    var url = createURL(pSettings, mediaName.name, s.samePC);

    jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, true);
    jsc.obs_v5.setInputSettings(p1, p3, {
        input: 'about:blank',
        input_format: "",
        close_when_inactive: true,
        looping: repeat,
        is_local_file: false
    });
        
    jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, true);
    jsc.obs_v5.setInputSettings(p1, p3, {
        input: url,
        input_format: "",
        close_when_inactive: true,
        looping: repeat,
        is_local_file: false
    });
    jsc.obs_v5.setActiveScene(p1, p2);
    h.log(mUID,"{%t} playOBS(s, '{}', {})", mediaName.name, repeat);
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226d6978657273227d
function getMixerDetails(receiverID, channel_type) {
  if (!receiverID) {
    h.log(mUID, '{%t} : Mixer não configurado!');
    return null;
  }

  var type = h.getReceiverInfo(receiverID).type || "nenhum"; 

  var channelAction = null; 
  if (type === 'osc') {
    channelAction = channel_type == 'Input' ? 'Channel' : 'Aux'; 
  } else if (type === 'soundcraft') {
    channelAction = channel_type == 'Input' ? 'input' : channel_type == 'Aux' ? 'aux' : channel_type == 'Line' ? 'line' : null; 
  }

  return { type: type, channelAction: channelAction }; 
}

function mute(receiverID, channel, channel_type, state) {
  var m = getMixerDetails(receiverID, channel_type);
  if (!m || !m.channelAction) return; 

  try {
    if (m.type == 'osc') {
      jsc.x32['set' + m.channelAction + 'Mute'](receiverID, channel, state); 
    } else if (m.type == 'soundcraft') {
      var mute = state ? 'mute' : 'unMute';
      jsc.soundcraft.conn(receiverID)[m.channelAction](channel)[mute]();
    }
  } catch (e) {
    h.log(mUID, '{%t} Erro {}', [e]);
  }
}

function setVolume(receiverID, channel, volume, channel_type) {
  var m = getMixerDetails(receiverID, channel_type);
  //h.log(mUID,"{%t} channel:{} type: {} m:{}",channel,channel_type,m); 
  if (!m) return;
  try {
    if (m.type == 'osc') {
      jsc.x32['set' + m.channelAction + 'Volume'](receiverID, channel, volume); 
    } else if (m.type == 'soundcraft') {
      jsc.soundcraft.conn(receiverID)[m.channelAction](channel).setVolume(volume); 
    }
  } catch (e) {
    h.log(mUID, '{%t} Erro {}', [e]);
  }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227363686564756c657273227d
function getScheduleTime() {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];
    return s.datetime;
}

function isTodaySchedule() {
    // Obtém a data do cronograma
    var scheduleDateTime = getScheduleTime();
    
    // Cria objetos Date para a data do cronograma e para a data atual
    var scheduleDate = new Date(scheduleDateTime);
    var today = new Date();
    
    // Compara o ano, mês e dia
    return (
        scheduleDate.getFullYear() === today.getFullYear() &&
        scheduleDate.getMonth() === today.getMonth() &&
        scheduleDate.getDate() === today.getDate()
    );
}

function setScheduleName() {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];
    h.setGlobal(mID+'_ScheduleName',s.name);
}

function getScheduleName() {
    return h.getGlobal(mID+'_ScheduleName') || setScheduleName();
}

function setShowRunAt(fn, milliseconds, timeoutName, cancel) {
    var openingTimers = h.getGlobal(mUID + '_openingServiceTimers') || [];
    var executionTime = timeToStart(milliseconds)
    //var name = executionTime + ' | ' + timeoutName;
    var name = timeoutName;
    h.log(mUID, executionTime + ' | ' + name);

    // Configurar o agendamento usando h.runAt()
    var id = h.runAt({
        //id: timeoutName, // ID opcional, se necessário
        name: name,
        datetime: executionTime, // Horário de execução calculado
        action: fn,
        notification : cancel || false
    });

    openingTimers.push(id);
    h.setGlobal(mUID + '_openingServiceTimers', openingTimers);
}

function timeToStart(milliseconds) {
    var now = new Date();
    var executionTime = new Date(now.getTime() + milliseconds);

    var hours = executionTime.getHours();
    var minutes = executionTime.getMinutes();
    var seconds = executionTime.getSeconds();

    // Manual formatting
    var formattedTime = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;

    return formattedTime;
}

function cancelShowRunAt() {
    var openingTimers = h.getGlobal(mUID + '_openingServiceTimers') || [];
    // Cancel each timer in the list
    for (var i = 0; i < openingTimers.length; i++) {
        h.cancelRunAt(openingTimers[i]);
    }
    // Clear the timer list
    h.setGlobal(mUID + '_openingServiceTimers', []);
    h.log(mUID, "{%t} Todos os agendamentos do módulo foram cancelados.");
    
    suspendConflictingModules(false);
}

function getTimeUntilSchedule(delayMinutes) {  //quanto tempo para encerrar o show baseado na hora de inicio + minutos de atraso
  var delayMillis = (delayMinutes || 0 ) * 60 * 1000; // converte minutos para milissegundos

  var r = h.hly('GetCurrentSchedule');
  var s = r.data[0];
  var scheduleTime = new Date(s.datetime).getTime();

  var now = Date.now();
  var timeUntilSchedule = scheduleTime + delayMillis - now;

  return timeUntilSchedule; // retorna daqui a quanto tempo deve encerrar o show
}

function calculateDifference(hour, minute, second, adjustment) {
    if (adjustment === undefined) {
        adjustment = 0;
    }
    var now = new Date();
    var target = new Date();
    target.setHours(hour, minute, second - adjustment);

    var difference = (target - now) / 1000;
    if (difference < 0) {
        difference += 86400; // Adjusts for the next day
    }
    return difference;
}


function getCurrentTime() {
    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Formatação manual
    var formattedTime = 
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds;

    return formattedTime;
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2267656e657269632066756e6374696f6e73227d
function checkData(q) {
    var tags = ['vlcVideo1', 'liveVideo0', 'liveVideo1'];
    var messages = { 'vlcVideo1': '2 local', 'liveVideo0': ' 1 da Live', 'liveVideo1': ' 2 da Live'};
    tags.forEach(function(tag) {
        if (q[tag] && q[tag].isDir) {
            showMessage('Para o Vídeo ' + messages[tag] + ' selecione apenas 1 vídeo e não uma pasta. Configuração Removida.');  
            q[tag] = null;               
        }
    });
    
    return q;
}

function resetInactive(q, k) {
    var keys = [];
    var abort = false;
    var maxParam = '';
    var qz = {};
    q.forEach(function(key) {
        if (key.endsWith("0") && !abort) {  
            var baseKey = key.slice(0, -1); 
            keys.push(baseKey);
         } 
         else 
         {
           maxParam = parseInt(key.replace(/\D/g, ''),10);
           abort = true;
         }
    });
    var n = 0;
    h.log(mUID,'{%t} keys {}, maxparam {}', keys, maxParam);
    for (var i = 0; i < maxParam + 1 ; i++) {
      h.log(mUID,'{%t} k {}, q[k+i] {}, i {}  ',k , q[k+i],i);
      if (q[k+i]) {
         keys.forEach(function(key) {
            qz[key+n] = q[key+i];
            h.log(mUID,'{%t} qz {} q {}',qz[key+n],q[key+i]);
         });
         n++;
       } 
    }
    h.log(mUID,'{%t} qz {}', qz );
    
    return qz;
}

function refreshShowTimeSchedules(module) {

     setScheduleName(); 
     cancelShowRunAt();
     
     var s = module.settings;
     var d = getTimersToShow(s);
     
     if (!isTodaySchedule() || (s[d.c] && s[d.c].active !== true)) { //aborta o agendamento caso o evento não seja hoje ou esteja inativo.
         return 
     }

     var timeToStartShow = getFurthestFutureTime(d, s, false);
     var timeToEndShow = getFurthestFutureTime(d, s, true);
     
     if (timeToStartShow - 10000 > -1) {
        setShowRunAt(function() { startSchedulesShow(module); }, timeToStartShow -10000, 'O Show vai iniciar!', true);
        h.notification('Show de abertura programado para iniciar às '+timeToStart(timeToStartShow),5);
     } else {
        
        h.notification('Já passou do horário mínimo para programação do evento em '+ formatDuration(d.startShow * -1) +'!',5);
     }

     module.repaintPanel();
     module.updatePanel();
}

function getTaskShowCount() {
    var tasks = h.getGlobal(mUID + '_openingServiceTimers') || [];
    //h.log(mUID,"{%t} Quantidade de agendamentos: {}", tasks.length);
    return tasks.length;
}

function getTimersToShow(s) {

var d = {}

d.s = getScheduleName();
d.c = 'cfg_' + d.s;
var cfg = s[d.c];

d.endShow = getTimeUntilSchedule(cfg.atraso);  // determina em quanto tempo o show vai terminar (ms)
d.startShow = d.endShow - (cfg.preservice * 60 * 1000); //quando deve iniciar o vídeo em loop (ms)
d.endVlcVideo1 = d.endShow;
d.startVlcVideo0 = d.startShow;
d.startVlcVideo1 = d.endShow - getVideoDuration(cfg.vlcVideo1); 
d.startVlcVideoLastRepeat = d.startVlcVideo1 - getVideoDuration(cfg.vlcVideo0);
d.startLiveVideo1 = d.endShow - getVideoDuration(cfg.liveVideo1); 
d.endLiveVideo1 = d.endShow - (cfg.stop_obs_at * 1000); 
d.startLiveVideoLastRepeat = d.startLiveVideo1 - getVideoDuration(cfg.liveVideo0);

return d

}


function getFurthestFutureTime(d, s, isMax) {
    var times = [];
    // Coleta todos os tempos em milissegundos de `d`
    for (var key in d) {
        if (d.hasOwnProperty(key) && typeof d[key] === 'number') {
            // Verifica se o tempo é negativo
            if (d[key] < 0) {
                return -1; // Retorna -1 se um tempo negativo for encontrado
            }
            times.push(d[key]);
        }
    }

    // Adiciona tempos das configurações da função `s`
    var keys = ['dmx', 'mixer', 'ha', 'js'];
    keys.forEach(function(key) {
        if (s[key + '_id'] !== "" || key === 'js') {
            for (var i = 0; i < 2; i++) {
                var cfg = s[key + '_' + i + '_' + d.s];
                if (cfg) {
                    var ic = inputCount(cfg, key);
                    for (var n = 0; n <= ic; n++) {
                        if (cfg[key + n]) {
                            // Calcula o tempo `when`
                            var when = whenTime(i, d, cfg['timer_index' + n], cfg['timer' + n]);
                            // Verifica se o tempo é negativo
                            if (when < 0) {
                                return -1; // Retorna -1 se um tempo negativo for encontrado
                            }
                            // Adiciona somente se o tempo é positivo (futuro)
                            times.push(when);
                        }
                    }
                }
            }
        }
    });

    // Filtra valores negativos
    var filteredTimes = times.filter(function(time) {
        return time >= 0;
    });

    // Determina o resultado com base no parâmetro isMax
    var result;
    if (isMax) {
        result = filteredTimes.length > 0 ? Math.max.apply(null, filteredTimes) : -1;
    } else {
        result = filteredTimes.length > 0 ? Math.min.apply(null, filteredTimes) : -1;
    }

    h.log(mUID, "{%t} tempo " + (isMax ? "máximo" : "mínimo") + ": {} | {}", result, timeToStart(result));

    return result;
}


function getShowList(s) {
    var allowedIValues = [{ value: '', label: '' }];
    var sn = getScheduleName();
    
    for (var key in s) {
        if (key.indexOf('cfg_') === 0) { // Compatível com ECMAScript 5.1
            var showName = key.replace('cfg_', '');
            if (showName !== sn && showName !== 'Temporário') {
                allowedIValues.push({ value: key, label: showName });
            }
        }
    }
    return allowedIValues;
}

function inputCount(config, prefix) {
  var maxIndex = -1;
  for (var key in config) {
    if (key.indexOf(prefix) === 0) {
      var index = parseInt(key.substring(prefix.length), 10);
      if (!isNaN(index) && index > maxIndex) {
        maxIndex = index;
      }
    }
  }
  return maxIndex;
}

function whenTime(video_index, d, onStart, delay) {
   var x = onStart == 'true' ? 'start' : 'end';
   var timeStart = d[x + 'VlcVideo' + video_index] + (delay * 1000);
      return timeStart
}

function getVideoDuration(fileOBJ) {

    // Verificar se fileOBJ existe e não é uma pasta (único vídeo)
    if (fileOBJ && !fileOBJ.isDir) {
        var mediaInfo = h.hly('getMediaDuration', { type: 'video', name: fileOBJ.name });
        return mediaInfo && mediaInfo.data ? mediaInfo.data.duration * 1000 : 0;
    }

    // Se for uma pasta, listar vídeos e somar suas durações
    if (fileOBJ && fileOBJ.isDir) {
        var totalDuration = 0;
        var files = h.hly('getVideos', { folder: fileOBJ.name, include_metadata: true });
        files.data.forEach(function(file) {
            totalDuration += file.duration_ms;
        });
        return totalDuration;
    }

    return 0;
}

function getCurrentTime() {
    return (new Date() + ' ').split(' ')[4];
}

function formatDuration(ms) {
    var totalSeconds = Math.floor(ms / 1000);
    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);
    var minutes = totalMinutes % 60;
    var hours = Math.floor(totalMinutes / 60);

    return (hours ? (hours < 10 ? '0' + hours : hours) + ':' : '') +
           (minutes < 10 && hours ? '0' : '') + minutes + ':' +
           (seconds < 10 ? '0' : '') + seconds;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226576656e747265706f7274227d
function eventReport(module) {
    var s = module.settings;
    var d = getTimersToShow(s);

    // Array para armazenar todos os eventos e seus tempos
    var events = [];
    // Adiciona os eventos do VLC local
    var cfgLocal = s[d.c];
    h.log('Storyboard Showtime ' + d.s);
    events.push({ time: d.startShow, description: 'Início do Vídeo 1 ('+cfgLocal.vlcVideo0.name+ ') na tela público' });
    events.push({ time: d.startVlcVideoLastRepeat, description: 'Última repetição do vídeo 1  ('+cfgLocal.vlcVideo0.name+ ') na tela público' });
    if (!cfgLocal.vlcVideo1.isDir) {
        events.push({ time: d.startVlcVideo1, description: 'Início do vídeo 2 ('+cfgLocal.vlcVideo1.name+ ') ' });
    }
    // Adiciona os eventos de transmissão ao vivo
    if (s.streaming_id != '') {
        var cfgLive = s[d.c];
        events.push({ time: d.startShow, description: 'Início do vídeo 1  ('+cfgLocal.liveVideo0.name+ ') em loop no OBS' });
        events.push({ time: d.startLiveVideoLastRepeat, description: 'Última repetição do vídeo 1   ('+cfgLocal.liveVideo0.name+ ') no OBS' });
        events.push({ time: d.startLiveVideo1, description: 'Início do Vídeo 2  ('+cfgLocal.liveVideo1.name+ ') no OBS' });
        events.push({ time: d.endShow - (s[d.c].stop_obs_at * 1000), description: 'Acionamento da Cena final no OBS' });
    }

    // Adiciona os eventos de outros inputs (dmx, mixer, ha, js)
    var keys = ['dmx', 'mixer', 'ha', 'js'];
    keys.forEach(function(key) {
        if (s[key + '_id'] != '' || key === 'js') {
            for (var i = 0; i < 2; i++) {
                var cfg = s[key + '_' + i + '_' + d.s];
                var ic = inputCount(cfg, key);
                for (var n = 0; n < ic + 1; n++) {
                    if (cfg[key + n]) {
                        var when = whenTime(i, d, cfg['timer_index' + n], cfg['timer' + n]);
                        var receiverID = s[key + '_id'] ? h.getReceiverInfo(s[key + '_id']).name : '';

                        // Define descrições detalhadas para cada tipo de input
                        switch (key) {
                            case 'dmx':
                                events.push({ time: when, description: 'Acionar a cena Lumikit \'' + cfg['scene' + n] + '\', BPM \'' + cfg['bpm' + n] + '\'' });
                                break;
                            case 'mixer':
                                events.push({ time: when, description: 'Ajustar volume do Mixer \'' + cfg['channel' + n] + '\', para \'' + cfg['volume' + n] + '%\'' });
                                break;
                            case 'ha':
                                var estado = cfg['state' + n] === true ? 'Ligado' : 'Desligado';
                                events.push({ time: when, description: 'Alterar o estado do dispositivo HA: \'' + cfg['switch' + n] + '\' para \'' + estado + '\'' });
                                break;
                            case 'js':
                                events.push({ time: when, description: 'Executar script JS: show.' + cfg['fnInclude' + n] + '()' });
                                break;
                        }
                    }
                }
            }
        }
    });

    // Ordena os eventos por tempo
    events.sort(function(a, b) {
        return a.time - b.time;
    });

    // Log dos eventos ordenados
    events.forEach(function(event) {
        h.log(timeToStart(event.time) + ' -> ' + event.description);
    });
}