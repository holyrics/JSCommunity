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
        description: '<html>' +
                     '> <b>Showtime</b> is an automated module for event synchronization, designed to create an impressive opening presentation. By integrating various systems and devices, it offers full control over lighting, special effects, audio, and video scenes in real-time.<br>' +
                     '<br>' +
                     '<b>Main Features</b><br>' +
                     '• <b>Coordinated Timers:</b> Set and synchronize multiple timers to ensure the exact start of each effect during the event opening.<br>' +
                     '• <b>Integration with Lumikit for DMX:</b> Control lights, special effect devices (smoke machine, bubbles, confetti), and other show equipment.<br>' +
                     '• <b>Integration with Home Assistant:</b> Allows triggering of smart home devices such as lights and screen motors, expanding automation possibilities.<br>' +
                     '• <b>Support for Professional Mixers:</b> Integrates with Behringer, Midas, and SoundCraft mixers, adjusting volumes and channels as the event progresses.<br>' +
                     '• <b>Control of Scenes in OBS:</b> Coordinates looping scenes and a countdown in OBS, as well as supporting simultaneous differentiated videos for live streaming and local projection.<br>' +
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
        min_version: '2.24.0',
        i18n: {
            name: {
                en: 'Showtime',
                pt: 'Showtime',
                es: 'Showtime',
                ru: 'Шоутайм'
            },
            description: {
                en: '<html>' +
                    '> <b>Showtime</b> is an automated module for event synchronization, designed to create an impressive opening presentation. By integrating various systems and devices, it offers full control over lighting, special effects, audio, and video scenes in real-time.<br>' +
                    '<br>' +
                    '<b>Main Features</b><br>' +
                    '• <b>Coordinated Timers:</b> Set and synchronize multiple timers to ensure the exact start of each effect during the event opening.<br>' +
                    '• <b>Integration with Lumikit for DMX:</b> Control lights, special effect devices (smoke machine, bubbles, confetti), and other show equipment.<br>' +
                    '• <b>Integration with Home Assistant:</b> Allows triggering of smart home devices such as lights and screen motors, expanding automation possibilities.<br>' +
                    '• <b>Support for Professional Mixers:</b> Integrates with Behringer, Midas, and SoundCraft mixers, adjusting volumes and channels as the event progresses.<br>' +
                    '• <b>Control of Scenes in OBS:</b> Coordinates looping scenes and a countdown in OBS, as well as supporting simultaneous differentiated videos for live streaming and local projection.<br>',
                pt: '<html>' +
                    '> <b>Hora do Show</b> é um módulo automatizado para sincronização de eventos, projetado para criar uma impressionante apresentação de abertura. Integrando diversos sistemas e dispositivos, ele oferece total controle sobre iluminação, efeitos especiais, áudio e cenas de vídeo em tempo real.<br>' +
                    '<br>' +
                    '<b>Recursos Principais</b><br>' +
                    '• <b>Timers Coordenados:</b> Define e sincroniza múltiplos timers para garantir o início exato de cada efeito na abertura do evento.<br>' +
                    '• <b>Integração com Lumikit para DMX:</b> Controle de luzes, dispositivos de efeitos especiais (máquina de fumaça, bolhas, confete) e outros equipamentos de show.<br>' +
                    '• <b>Integração com Home Assistant:</b> Permite acionar dispositivos domésticos inteligentes, como lâmpadas e motores de telão, ampliando as possibilidades de automação.<br>' +
                    '• <b>Suporte a Mixers Profissionais:</b> Integra-se com mixers Behringer, Midas e SoundCraft, liberando volumes e canais conforme o evento progride.<br>' +
                    '• <b>Controle de Cenas no OBS:</b> Coordena cenas em loop e uma contagem regressiva no OBS, além de suportar vídeos simultâneos diferenciados para transmissão ao vivo e projeção local.<br>',
                es: '<html>' +
                    '> <b>Showtime</b> es un módulo automatizado para la sincronización de eventos, diseñado para crear una impresionante presentación de apertura. Al integrar diversos sistemas y dispositivos, ofrece control total sobre la iluminación, los efectos especiales, el audio y las escenas de video en tiempo real.<br>' +
                    '<br>' +
                    '<b>Características Principales</b><br>' +
                    '• <b>Temporizadores Coordinados:</b> Configura y sincroniza varios temporizadores para garantizar el inicio exacto de cada efecto durante la apertura del evento.<br>' +
                    '• <b>Integración con Lumikit para DMX:</b> Controla luces, dispositivos de efectos especiales (máquina de humo, burbujas, confeti) y otros equipos de espectáculo.<br>' +
                    '• <b>Integración con Home Assistant:</b> Permite activar dispositivos inteligentes del hogar, como luces y motores de pantallas, ampliando las posibilidades de automatización.<br>' +
                    '• <b>Soporte para Mezcladores Profesionales:</b> Se integra con mezcladores Behringer, Midas y SoundCraft, liberando volúmenes y canales a medida que avanza el evento.<br>' +
                    '• <b>Control de Escenas en OBS:</b> Coordina escenas en bucle y una cuenta regresiva en OBS, además de soportar videos simultáneos diferenciados para transmisión en vivo y proyección local.<br>',
                ru: '<html>' +
                    '> <b>Шоутайм</b> — это автоматизированный модуль для синхронизации событий, предназначенный для создания впечатляющей вступительной презентации. Интегрируя различные системы и устройства, он обеспечивает полный контроль над освещением, спецэффектами, аудио и видеосценами в реальном времени.<br>' +
                    '<br>' +
                    '<b>Основные характеристики</b><br>' +
                    '• <b>Согласованные таймеры:</b> Устанавливает и синхронизирует несколько таймеров, чтобы гарантировать точное начало каждого эффекта при открытии мероприятия.<br>' +
                    '• <b>Интеграция с Lumikit для DMX:</b> Управление светом, спецэффектами (дым-машина, пузыри, конфетти) и другим оборудованием для шоу.<br>' +
                    '• <b>Интеграция с Home Assistant:</b> Позволяет запускать умные устройства, такие как светильники и моторы экрана, расширяя возможности автоматизации.<br>' +
                    '• <b>Поддержка профессиональных микшеров:</b> Интегрируется с микшерами Behringer, Midas и SoundCraft, регулируя громкость и каналы по мере прогресса мероприятия.<br>' +
                    '• <b>Управление сценами в OBS:</b> Координирует сцены в цикле и обратный отсчет в OBS, а также поддерживает одновременные разные видео для трансляции в прямом эфире и локальной проекции.<br>'
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: jsc.i18n('About ') + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            label: jsc.i18n('Select Receivers to use'),
            type: 'title'
        },
        {
            id: 'mixer_id',
            name: jsc.i18n('Digital Mixer'),
            description: '<html><hr>' + jsc.i18n('Associate with the Behringer/Soundcraft receiver'),
            type: 'receiver',
            receiver: 'osc,soundcraft'
        }, 
        {
            id: 'dmx_id',
            name: 'DMX',
            description: jsc.i18n('Select the Lumikit Receiver'),
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'ha_id',
            name: jsc.i18n('Home Assistant'),
            description: '<html><hr>' + jsc.i18n('Associate with the Home Assistant receiver'),
            type: 'receiver',
            receiver: 'ha'
        }, 
        {
            id: 'streaming_id',
            name: jsc.i18n('Streaming'),
            description: jsc.i18n('OBS receiver name'),
            type: 'receiver',
            receiver: 'obs_v5'
        },
        {
            type: 'separator'
        },        
        {       
            id: 'video_scene',
            name: jsc.i18n('OBS Scene for videos'),
            description: jsc.i18n('Choose the OBS scene to play the video.'),
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.streaming_id);
            }
        }, 
        {
            id: 'scene_item_name',
            name: jsc.i18n('OBS "Media Source" name'),
            description: jsc.i18n('The script interacts directly with a "media source" object in the selected scene, dynamically configuring it for the video that Holyrics is displaying.'),
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
            label: jsc.i18n('Number of Inputs in settings'),
            default_value: 4,
            description: jsc.i18n('Allows changing the number of input windows in the module.')
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Enable log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, ' onchange ' + mID); // habilita ou desabilita o log de acordo com a configuração
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
            hint: jsc.i18n('Schedule/Cancel Show'),
            icon: 'hourglass_bottom',
            action: function() {
                if (getTaskShowCount() > 0) {
                    cancelShowRunAt(); 
                } else {
                    if (!isTodaySchedule()) { // aborts scheduling if event is not today
                        showMessage(jsc.i18n('Oops!'), jsc.i18n('The selected event is not scheduled for today!'));
                        return;
                    }
                    refreshShowTimeSchedules(module);
                }
            },
            status: function(evt) {
                if (getTaskShowCount() > 0) {
                    return jsc.utils.ui.item_status.danger({
                        icon: 'hourglass_top',
                        hint: jsc.i18n('Cancel Opening Show')
                    });
                } else {
                    return null; // default values
                }
            }
        }
    ];
    
    act.push({
        hint: jsc.i18n('Pr'+'int Showtime'),
        icon: 'pr'+'int',
        action: function() {
            eventReport(module);
        }
    });
    
    return act;
}

function copySchedule(module) {
    return {
        hint: jsc.i18n('Copy settings from another event'),
        icon: 'file_copy',
        action: function() {
            var s = module.settings;
            var inputs = [];
            inputs.push({
                type: 'title',
                name: '<html><b>' + jsc.i18n('Copy Show') + '</b>'
            });
            inputs.push({ type: 'separator' });

            inputs.push({
                id: 'copyshow',
                type: 'string',
                label: jsc.i18n('Choose the event to copy data from'),
                allowed_values: getShowList(s)
            });
            
            var q = h.input(inputs);
            if (q !== null) {
                var sn = getScheduleName();
                var sc = q.replace('cfg_', '');
                s['cfg_' + sn] = s[q];
                h.log(mUID, '{%t} ' + jsc.i18n('Copied data from') + ' {}: {}', q, s['cfg_' + getScheduleName()]);
                
                var keys = ['dmx', 'mixer', 'ha', 'js'];
                keys.forEach(function(key) {  
                    for (var i = 0; i < 2; i++) {
                        s[key + '_' + i + '_' + sn] = s[key + '_' + i + '_' + sc] || [];
                        h.log(mUID, '{%t} ' + jsc.i18n('Copied data from') + ' {}: {}', key, s[key + '_' + i + '_' + sn]);
                    }
                });
            }
        }
    };
}

function actionShow(module) {
    var sn = getScheduleName();
    return {
        hint: jsc.i18n('Configure Show for') + ' ' + sn,
        icon: 'set_meal',
        action: function() {
            var s = module.settings;
            var inputs = [];
            var vdDur = '';
            var sn = getScheduleName();
            var sc = 'cfg_' + sn;
            
            inputs.push({
                type: 'title',
                name: '<html><b>' + jsc.i18n('Opening show settings for') + ' ' + sn + '</b>'
            });
            inputs.push({ type: 'separator' });

            inputs.push({
                id: 'active',
                label: jsc.i18n('Active Show for "') + sn + '"',
                type: 'boolean',
                default_value: false,
                onchange: function(obj) {
                    logState(obj.input.log, mUID, ' onchange ' + mID);
                }
            });
            inputs.push({
                id: 'atraso',
                type: 'number',
                label: jsc.i18n('Delay opening (') + getScheduleTime() + '+):',
                description: jsc.i18n('Minutes to add to the scheduled opening time for') + ' ' + getScheduleTime()
            });
                
            for (var i = 0; i < 2; i++) {
                (function(i) {
                    inputs.push({ type: 'separator' });
                    inputs.push({
                        type: 'title',
                        name: '<html><b>' + jsc.i18n('Video') + ' ' + (i + 1) + (i == 0 ? jsc.i18n(' (Pre-event in Loop)') : jsc.i18n(' (Countdown)')) + '</b>'
                    });
                    if (i === 0) {
                        inputs.push({
                            id: 'preservice',
                            type: 'number',
                            label: jsc.i18n('Start how many minutes before the target time?'),
                            description: jsc.i18n('Defines how long before the pre-event video should start. Example: service starts at 7:00 PM, if set to 20, this video will start at 6:40 PM.')
                        });
                    }
                    if (s[sc]) {
                        vdDur = ' (' + formatDuration(getVideoDuration(s[sc]['vlcVideo' + i])) + ')';
                    }
                    inputs.push({
                        id: 'vlcVideo' + i,
                        type: 'video',
                        name: jsc.i18n('Local Video') + (i == 0 ? jsc.i18n(' (folder allowed)') : '') + vdDur,
                        description: jsc.i18n('Video to be played on the configured Public screens') + (i == 0 ? jsc.i18n(' in loop at the scheduled time before the countdown') : jsc.i18n(' which will end at the exact start time of the event.'))
                    });
                    if (s.streaming_id != "") {
                        if (s[sc]) {
                            vdDur = ' (' + formatDuration(getVideoDuration(s[sc]['liveVideo' + i])) + ')';
                        }
                        inputs.push({
                            id: 'liveVideo' + i,
                            type: 'video',
                            name: jsc.i18n('Live Video') + vdDur,
                            description: jsc.i18n('Video to be played on the Live') + (i == 0 ? jsc.i18n(' in loop at the scheduled time before the countdown') : jsc.i18n(' which will end at the exact start time of the event.'))
                        });
                        if (i === 1) {
                            inputs.push({
                                id: 'cam_scene',
                                name: jsc.i18n('Camera scene (end show)'),
                                description: jsc.i18n('Choose the OBS scene after closing the opening.'),
                                type: 'string',
                                suggested_values: function(obj) {
                                    return jsc.obs_v5.getSceneList(s.streaming_id);
                                }
                            });
                            inputs.push({
                                id: 'stop_obs_at',
                                type: 'number',
                                label: jsc.i18n('Switch to camera when ') + jsc.i18n(' seconds remain:'),
                                description: jsc.i18n('Switch to camera how many seconds before the video ends? This is meant to sync the live countdown with the event countdown.')
                            });
                        }
                    }
                    if (s.dmx_id != "") {
                        inputs.push({
                            id: 'dmx' + i,
                            type: 'button',
                            name: 'Lumikit',
                            button_label: jsc.i18n('Configure DMX Actions'),
                            action: function() { 
                                actionDMXInput(module, i);
                            }
                        });
                    }
                    if (s.mixer_id != "") {
                        inputs.push({
                            id: 'mixer' + i,
                            type: 'button',
                            name: 'Mixer',
                            button_label: jsc.i18n('Configure Mixer Actions'),
                            action: function() { 
                                actionMixerInput(module, i);
                            }
                        });
                    }
                    if (s.ha_id != "") {
                        inputs.push({
                            id: 'ha' + i,
                            type: 'button',
                            name: 'Home Assistant',
                            button_label: jsc.i18n('Configure HA Actions'),
                            action: function() { 
                                actionHAInput(module, i);
                            }
                        });
                    }
                    inputs.push({
                        id: 'js' + i,
                        type: 'button',
                        name: jsc.i18n('JS Functions in your Include'),
                        button_label: jsc.i18n('Extra Routines'),
                        action: function() { 
                            actionJSInput(module, i);
                        }
                    });
                })(i);
            }
            var q = module.inputSettings('cfg_' + sn, inputs);
            if (q !== null) {
                h.log(mUID, "{%t} " + jsc.i18n('Selected values =') + " {}", q);
                s[sc] = checkData(q);
                
                timingCheckAndSet(s, sc);
                refreshShowTimeSchedules(module);
            }
        },
        status: function(evt) {
            var s = module.settings;
            var sc = 'cfg_' + getScheduleName();
            if (s[sc] && s[sc].active !== true) {
                return {
                    hint: jsc.i18n('Configure Show for') + ' ' + sn + ' ' + jsc.i18n('(inactive)'),
                    foreground: '727272', 
                    background: 'EEEEEE'
                };
            } else {
                return null;
            }
        }
    };
}


function actionJSInput(module, video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'js';

    inputs.push({
        type: 'title',
        name: '<html><b>' + jsc.i18n('Extra JavaScript Actions for video ') + (video + 1) + jsc.i18n(' of event ') + getScheduleName()
    });

    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });

        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>' + jsc.i18n('Enable Command ') + (i + 1)
        });

        inputs.push({
            id: 'fnInclude' + i,
            type: 'string',
            label: jsc.i18n('Function Name show.() in Include'),
            description: jsc.i18n('Run your own JavaScript functions in Holyrics Include and call them in the module.')+'<br><br><hr><br><b><u>Example:</u></b><br><br>' +
                jsc.i18n('1. Open the Include screen from the File -> Settings -> Advanced -> JavaScript -> Include.<br>') +
                jsc.i18n('2. Create an object in a global variable called show, which will contain your functions, following the example below.') +' <br><br>'+
                '<pre style="color: #D4D4D4; font-family: monospace; background-color: #1E1E1E; padding: 10px; border-radius: 5px;">' +
                'var show = { <br>' +
                '    helloworld: function () {<br>' +
                '        h.log("=== hello world ===");<br>' +
                '        // write all the code for your helloworld function<br>' +
                '    },<br>' +
                '    helloholyrics: function () {<br>' +
                '        h.log("=== hello holyrics ===");<br>' +
                '        // write all the code for your helloholyrics function<br>' +
                '    }<br>' +
                '};</pre><br><br><b><u>'+
                jsc.i18n('Note') + ':</u></b> ' +
                jsc.i18n('Functions do not take parameters and are called without ().<br>') +
                jsc.i18n('Just enter the function name when configuring in the module, e.g., helloholyrics<br>') +
                jsc.i18n('Have questions? It\'s better to study more and only use the module\'s built-in features!')
        });

        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }    

    var sc = k + '_' + video + '_' + getScheduleName();
    var q = module.inputSettings(sc, inputs);
    if (q !== null) {
        h.log(mUID, "{%t} Selected values = {}", [q]);
        s[sc] = resetInactive(q, k);
    }
}

function actionHAInput(module, video) {
    var s = module.settings;
    var inputs = [];
    var qtd_inputs = s.inputs || 4;
    var k = 'ha';
    inputs.push({
        type: 'title',
        name: '<html><b>' + jsc.i18n('Home Assistant Switch Settings for video ') + (video + 1) + jsc.i18n(' of event ') + getScheduleName()
    });

    var allowedValues = [{ value: '', label: '' }];
    var switches = jsc.ha.getSwitchList(s.ha_id);
    for (var i = 0; i < switches.length; i++) {
        var item = switches[i];
        var label = item.replace('switch.', '').replace(/_/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
        allowedValues.push({ value: item, label: label });
    }

    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });

        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>' + jsc.i18n('Enable Command') + ' ' + (i + 1)
        });

        inputs.push({
            id: 'switch' + i,
            type: 'string',
            label: jsc.i18n('Switch'),
            allowed_values: allowedValues
        });

        inputs.push({
            id: 'state' + i,
            type: 'string',
            label: jsc.i18n('Action'),
            allowed_values: [{ value: null, label: '' }, { value: true, label: jsc.i18n('Turn On') }, { value: false, label: jsc.i18n('Turn Off') }]
        });

        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }
    var sc = k + '_' + video + '_' + getScheduleName();
    var q = module.inputSettings(sc, inputs);
    if (q !== null) {
        h.log(mUID, "{%t} Selected values = {}", [q]);
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
        name: '<html><b>' + jsc.i18n('Mixer Actions during video') + ' ' + (video + 1) + ' ' + jsc.i18n('of event') + ' ' +  getScheduleName()
    });

    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });

        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>' + jsc.i18n('Activate Command') + ' ' +  (i + 1)
        });

        var allowedValues = [{value: '', label: ''}];

        var types = ['Input', 'Aux', 'Line'];
        var max_input = 32; // Maximum input channels
        
        // Generate the list for 'Input' channels
        for (var j = 1; j <= max_input; j++) {
            allowedValues.push({
                value: 'Input ' + j,
                label: 'Input ' + j // Ex: "Input 1", "Input 2", etc.
            });
        }
        
        // Generate the list for 'Aux' channels (1 to 6)
        for (var j = 1; j <= 6; j++) {
            allowedValues.push({
                value: 'Aux ' + j,
                label: 'Aux ' + j // Ex: "Aux 1", "Aux 2", etc.
            });
        }

        // Generate the list for 'Line' channels (1 to 16 or other desired range)
        for (var j = 1; j <= 16; j++) {
            allowedValues.push({
                value: 'Line ' + j,
                label: 'Line ' + j // Ex: "Line 1", "Line 2", etc.
            });
        }

        // Adding the field to inputs
        inputs.push({
            id: 'channel' + i,
            type: 'string',
            label: jsc.i18n('Channel'),
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
        h.log(mUID, "{%t} Selected values = {}", [q]);
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
        name: '<html><b>' + jsc.i18n('Lumikit scene settings for video') + ' ' +  (video + 1) + ' ' +  jsc.i18n('of event') + ' ' +  getScheduleName()
    });

    for (var i = 0; i < qtd_inputs; i++) {
        inputs.push({ type: 'separator' });

        inputs.push({
            id: k + i,
            type: 'boolean',
            name: '<html><b>' + jsc.i18n('Activate Command') + ' ' +  (i + 1)
        });

        var allowedValues = [{label: '', page: ''}];
        var letters = 'ASDFGHJKLZXCVBNM'.split(''); // Lumikit scene sequence

        for (var page = 1; page <= 10; page++) {
            for (var j = 0; j < letters.length; j++) {
                allowedValues.push({
                    value: page + '|' + letters[j], // Combine page and scene
                    label: jsc.i18n('Page') + ' ' +  page + ' - ' +  jsc.i18n('Scene') + ' ' +  letters[j] // Descriptive label
                });
            }
        }

        inputs.push({
            id: 'bpm' + i,
            type: 'number',
            min: 0,
            max: 200,
            show_as_combobox : true,
            label: jsc.i18n('BPM')
        });

        inputs.push({
            id: 'scene' + i,
            type: 'string',
            label: jsc.i18n('Scene'),
            allowed_values: allowedValues
        });

        inputs = inputs.concat(createRelativeTimeInputs(i, video));
    }

    var sc = k + '_'+video+'_'+getScheduleName();
    var q = module.inputSettings(sc, inputs);
    if (q !== null) {
        h.log(mUID, "{%t} Selected values = {}", [q]);
        s[sc] = resetInactive(q, k);
    }
}

function createRelativeTimeInputs(i, video) {
    var add = video === 0 ? '' : '/'+jsc.i18n('end');
    var allowedValues = [{ value: null, label: '' }, { value: true, label: jsc.i18n('Start of Video') }];
    if (video === 1) {
        allowedValues.push({ value: false, label: jsc.i18n('End of Video') });
    }

    var result = [
        {
            id: 'timer' + i,
            type: 'number',
            min: -1000,
            max: 1000,
            default_value: 0,
            label: jsc.i18n('Adjustment (±S)'),
            description: jsc.i18n('Time relative to the start') + add + ' ' +  jsc.i18n('of the video. For example, 5 seconds before the start of the video, set -5, 4 seconds after the start') + add + ' ' +  jsc.i18n('of the video, set 4')
        },
        {
            id: 'timer_index' + i,
            type: 'string',
            label: jsc.i18n('Relative to'),
            allowed_values: allowedValues
        }
    ];
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

    if (d.startShow < 0) {
        return;
    }

    h.log(mUID, "{%t} " + jsc.i18n("Event times in MS") + ": {}", h.toPrettyJson(d));

    timingCheckAndSet(s, d.c);

    suspendConflictingModules(true, [13, 15]);  // suspends video and soundboard module

    sc(s, d);
    scVideosLocal(s, d);

    if (s.streaming_id != '' && cfg.liveVideo0 && cfg.liveVideo1) {
        scVideosLive(s, d);
    }

    setShowRunAt(function() { cancelShowRunAt(); }, getFurthestFutureTime(d, s, true) + 2000, 'Clear List');
}

function scVideosLocal(s, d) {
    var cfg = s[d.c];
    setShowRunAt(function() { playVLC(cfg.vlcVideo0, true); }, d.startShow, 'vlcLoop');
    setShowRunAt(function() { playVLC(cfg.vlcVideo0, false); }, d.startVlcVideoLastRepeat, 'vlcLastRepeat'); // ensures the last video run is complete
    if (!cfg.vlcVideo1.isDir) {
        setShowRunAt(function() { playVLC(cfg.vlcVideo1, false);}, d.startVlcVideo1, 'vlcFinal');
    }
}

function scVideosLive(s, d) {
    var cfg = s[d.c];
    setShowRunAt(function() { playOBS(s, cfg.liveVideo0, true); }, d.startShow, 'liveLoop');
    setShowRunAt(function() { playOBS(s, cfg.liveVideo0, false); }, d.startLiveVideoLastRepeat, 'liveLastRepeat'); // ensures the last video run is complete
    setShowRunAt(function() { playOBS(s, cfg.liveVideo1, false); }, d.startLiveVideo1, 'liveFinal');
    setShowRunAt(function() { 
        //h.log(mUID, '{%t} s.streaming_id {}, cfg.cam_scene {}',s.streaming_id,cfg.cam_scene);
        jsc.obs_v5.setActiveScene(s.streaming_id, cfg.cam_scene); 
    }, d.endShow - (s[d.c].stop_obs_at * 1000), 'liveCAM'); 
}

function sc(s, d) {
    var keys = ['dmx', 'mixer', 'ha', 'js'];  // possible input types
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
                                    h.log("", jsc.i18n('Error {}'), [e]);
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
  
  if (s[key + '_id']) {
     var receiverID = h.getReceiverInfo(s[key + '_id']).name;
  }
  
  switch (key) {
    case 'dmx': {
      h.log(mUID, "{%t} setDMX('{}', '{}', '{}');", receiverID, cfg['scene' + n], cfg['bpm' + n]);   
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

function timingCheckAndSet(s, cfg) {

    var totalVlcVideos = (getVideoDuration(s[cfg]['vlcVideo0']) + getVideoDuration(s[cfg]['vlcVideo1'])) / 1000 / 60;
    var totalLiveVideos = (getVideoDuration(s[cfg]['liveVideo0']) + getVideoDuration(s[cfg]['liveVideo1'])) / 1000 / 60;
    var totalVideos =  Math.ceil(totalLiveVideos < totalVlcVideos ? totalVlcVideos : totalLiveVideos);

    h.log(mUID, "{%t} " + jsc.i18n("Minimum time") + ": {}m | VLC {}m | Live {}m", totalVideos, totalVlcVideos, totalLiveVideos);

    if (s[cfg].preservice < totalVideos) {
        h.notification(jsc.i18n('The start time was set to the minimum')+': ' + totalVideos + ' ' + jsc.i18n('minutes'));
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
      h.log(jsc.i18n("Video settings for the plugin not found. Please configure the Holyrics plugin"));
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
    h.log(mUID, '{%t} : ' + jsc.i18n('Mixer not configured!'));
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
function getScheduleTime(text) {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];
    
    if (text) {
        // Extrai os componentes da data e hora
        var date = new Date(s.datetime);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // Função auxiliar para preencher com zero à esquerda
        function padZero(num) {
            return (num < 10 ? '0' : '') + num;
        }

        // Retorna no formato 'HH:MM:SS'
        return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
    }

    // Retorna o objeto datetime se text não for true
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
    h.log(mUID, '{%t} ' + jsc.i18n('All module schedules have been cancelled.'));
    
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
    var messages = { 
        'vlcVideo1': jsc.i18n('local video') + ' 2', 
        'liveVideo0': jsc.i18n('Live video') + ' 1', 
        'liveVideo1': jsc.i18n('Live video') + ' 2' 
    };
    
    tags.forEach(function(tag) {
        if (q[tag] && q[tag].isDir) {
            showMessage(jsc.i18n('For Video') + ' ' +  messages[tag]  + ' ' +  jsc.i18n('select only 1 video and not a folder. Configuration removed.'));
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
        setShowRunAt(function() { startSchedulesShow(module); }, timeToStartShow -10000, 'The show will start now!', true);
        h.notification(jsc.i18n('Opening show scheduled to start at')  + ' ' +  timeToStart(timeToStartShow), 5);
     } else {
        h.notification(jsc.i18n('The minimum time for event programming has passed by')  + ' ' +  formatDuration(d.startShow * -1) + '!', 5);
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

    h.log(mUID, "{%t} " + jsc.i18n('time') + " " + (isMax ? jsc.i18n('maximum') : jsc.i18n('minimum')) + ": {} | {}", result, timeToStart(result));

    return result;
}


function getShowList(s) {
    var allowedIValues = [{ value: '', label: '' }];
    var sn = getScheduleName();
    
    for (var key in s) {
        if (key.indexOf('cfg_') === 0) { // Compatível com ECMAScript 5.1
            var showName = key.replace('cfg_', '');
            if (showName !== sn && showName !== jsc.i18n('Temporary')) {
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
    var events = [];
    var cfg = s[d.c];

    // Adiciona os eventos do VLC local
    events.push({ time: d.startShow, description: 'VLC === ' + jsc.i18n('Start Video') + ' 1 (' + cfg.vlcVideo0.name + ') ' + jsc.i18n('on public screen') });
    events.push({ time: d.startVlcVideoLastRepeat, description: 'VLC >>> ' + jsc.i18n('Last repeat of Video') + ' 1 (' + cfg.vlcVideo0.name + ') ' + jsc.i18n('on public screen') });
    if (!cfg.vlcVideo1.isDir) {
        events.push({ time: d.startVlcVideo1, description: 'VLC === ' + jsc.i18n('Start Video') + ' 2 (' + cfg.vlcVideo1.name + ') ' + jsc.i18n('on public screen') });
    }

    // Adiciona os eventos de transmissão ao vivo
    if (s.streaming_id != '' && cfg.liveVideo0 && cfg.liveVideo1) {
        events.push({ time: d.startShow, description: 'OBS === ' + jsc.i18n('Start Video') + ' 1 (' + cfg.liveVideo0.name + ') ' + jsc.i18n('in loop on OBS') });
        events.push({ time: d.startLiveVideoLastRepeat, description: '>>> ' + jsc.i18n('Last repeat of Video') + ' 1 (' + cfg.liveVideo0.name + ') ' + jsc.i18n('on OBS') });
        events.push({ time: d.startLiveVideo1, description: 'OBS === ' + jsc.i18n('Start Video') + ' 2 (' + cfg.liveVideo1.name + ') ' + jsc.i18n('on OBS') });
        events.push({ time: d.endShow - (s[d.c].stop_obs_at * 1000), description: 'OBS --- ' + jsc.i18n('Trigger final scene on OBS') });
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
                        var description;
                        switch (key) {
                            case 'dmx':
                                description = 'DMX - ' + jsc.i18n('Trigger Lumikit scene') + ' \'' + cfg['scene' + n] + '\', ' + jsc.i18n('BPM') + ' \'' + cfg['bpm' + n] + '\'';
                                break;
                            case 'mixer':
                                description = 'MIX - ' + jsc.i18n('Adjust Mixer volume') + ' \'' + cfg['channel' + n] + '\', ' + jsc.i18n('to') + ' \'' + cfg['volume' + n] + '%\'';
                                break;
                            case 'ha':
                                var estado = cfg['state' + n] === true ? jsc.i18n('On') : jsc.i18n('Off');
                                description = 'HA  - ' + jsc.i18n('Change HA device state') + ': \'' + cfg['switch' + n] + '\' ' + jsc.i18n('to') + ' \'' + estado + '\'';
                                break;
                            case 'js':
                                description = 'JS  - ' + jsc.i18n('Execute JS script') + ': show.' + cfg['fnInclude' + n] + '()';
                                break;
                        }
                        events.push({ time: when, description: description });
                    }
                }
            }
        }
    });

    // Ordena os eventos por tempo
    events.sort(function(a, b) {
        return a.time - b.time;
    });

    // Calcula o comprimento máximo das linhas de log
    var maxLineLength = 0;
    events.forEach(function(event) {
        var lineLength = timeToStart(event.time).length + 4 + event.description.length;
        if (lineLength > maxLineLength) {
            maxLineLength = lineLength;
        }
    });

    function createSeparator(sep) {
        var separator = '';
        for (var i = 0; i < maxLineLength; i++) {
            separator += sep;
        }
        return separator;
    }

    function center(text) {
        var padding = Math.max((maxLineLength - text.length) / 2, 0);
        var pad = Array(Math.floor(padding) + 1).join(' ');
        return pad + text;
    }

    // Log inicial com linha separadora ajustada
    h.log(createSeparator('='));
    h.log(center(jsc.i18n('Storyboard Showtime') + ' ' + d.s + '.'));
    h.log(createSeparator('-'));
    h.log(jsc.i18n('End of Video 2 scheduled for') + ' ' + getScheduleTime(true) + ' + ' + cfg.atraso + ' ' + jsc.i18n('minutes delay.'));
    h.log(createSeparator('-'));

    // Log dos eventos
    events.forEach(function(event) {
        h.log(timeToStart(event.time) + ' -> ' + event.description);
    });

    // Linha separadora final
    h.log(createSeparator('='));
}