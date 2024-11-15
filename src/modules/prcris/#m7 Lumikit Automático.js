// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m7';
var mUID = mID + ''; 

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  logState(module.settings.log, mUID, 'startup '+ mID);
}

function info() {
    return {
        id: mID,
        name: 'Automatic Lumikit',
        description: '<html>' +
                     '• Draws registered scenes as moving for Chorus and Instrumental verses<br>' +
                     '• Draws static scenes for other verses<br>' +
                     '• Adjusts the BPM of Lumikit lights and Holyrics video.<br>' +
                     '• Uses the extra slideBPM field of the song to set variable BPM, example: <br>' +
                     '   23,2|30,80,5 which means:<br>' +
                     '   on slide 23, divide the bpm by 2, and on 30, adjust the bpm to 80, 5 seconds after showing verse 30.<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Automatic Lumikit',
                pt: 'Lumikit Automático',
                es: 'Lumikit Automático',
                ru: 'Автоматический Lumikit'
            },
            description: {
                en: '<html>' +
                    '• Draws registered scenes as moving for Chorus and Instrumental verses<br>' +
                    '• Draws static scenes for other verses<br>' +
                    '• Adjusts the BPM of Lumikit lights and Holyrics video.<br>' +
                    '• Uses the extra slideBPM field of the song to set variable BPM, example: <br>' +
                    '   23,2|30,80,5 which means:<br>' +
                    '   on slide 23, divide the bpm by 2, and on 30, adjust the bpm to 80, 5 seconds after showing verse 30.<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Sorteia cenas cadastradas como em movimento para versos de Refrão e Instrumental<br>' +
                    '• Sorteia cenas estáticas para demais versos<br>' +
                    '• Ajusta o BPM das luzes do Lumikit e do vídeo do Holyrics.<br>' +
                    '• Usa o campo extra slideBPM da música para estabelecer BPM variável, exemplo: <br>' +
                    '   23,2|30,80,5 que significa:<br>' +
                    '   no slide 23, divida o bpm por 2, e no 30 ajuste o bpm para 80, 5 segundos após exibir o verso 30.<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Sortea escenas registradas como en movimiento para versos de Estribillo e Instrumental<br>' +
                    '• Sortea escenas estáticas para otros versos<br>' +
                    '• Ajusta el BPM de las luces de Lumikit y el video de Holyrics.<br>' +
                    '• Usa el campo extra slideBPM de la canción para establecer un BPM variable, ejemplo: <br>' +
                    '   23,2|30,80,5 que significa:<br>' +
                    '   en el slide 23 divide el bpm por 2, y en el 30 ajusta el bpm a 80, 5 segundos después de mostrar el verso 30.<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• Выбирает зарегистрированные сцены как движущиеся для хоров и инструментальных куплетов<br>' +
                    '• Выбирает статические сцены для других куплетов<br>' +
                    '• Настраивает BPM огней Lumikit и видео Holyrics.<br>' +
                    '• Использует дополнительное поле slideBPM песни для установки переменного BPM, пример: <br>' +
                    '   23,2|30,80,5, что означает:<br>' +
                    '   на слайде 23 разделите bpm на 2, и на 30 установите bpm на 80, через 5 секунд после показа стиха 30.<br>' +
                    infoVDDMM
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function decodeLight(obj, marker) {
    var slideType = obj.slide_type + obj.slide_description;  
    return slideType.indexOf(marker) > -1;
}

function randomizeLight(type) {
    // Sorteia uma cena de luz e grava para não repetir no próximo sorteio
    return type[h.random(0, type.length - 1, 'randomLight')];
}
function setBpm(BPM, module) {
    if (BPM > 29) { 
        h.log(mUID, jsc.i18n('BPM changed to') + ': ' + BPM);
        h.hly('SetBpm', { bpm: BPM });
        // Ajusta o BPM das luzes
        jsc.lumikit.setBPM(module.settings.receiverID, BPM);
    }
}

function setTimeoutBPM(module, bpm, slide, time) {
    time = time == 0 ? 500 : time;
    var timeoutDuration = time < 10 ? time * 1000 : time;
    h.log(mUID, jsc.i18n('Speed will be changed by Slide {} to {} after {} seconds'), [slide, bpm, timeoutDuration / 1000]); 
    h.setTimeout(function() {
        h.log(mUID, '************ ' + jsc.i18n('Executing timeout'));
        h.log(mUID, jsc.i18n('Speed changed by Slide {} to {} after {} seconds'), [slide, bpm, timeoutDuration / 1000]); 
        setBpm(bpm, module);
    }, timeoutDuration, mUID + '_alterBPM'); // Tempo em milissegundos
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
            id: 'receiverID',
            name: jsc.i18n('Receptor'),
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'movingScene',
            name: jsc.i18n('Cenas em Movimento'),
            description: jsc.i18n('Índice das cenas em movimento, ex: {}'),
            type: 'string',
            default_value: '9,13,14,15,16'
        },
        {
            id: 'staticScene',
            name: jsc.i18n('Cenas Estáticas'),
            description: jsc.i18n('Índice das cenas estáticas, ex: {}'),
            type: 'string',
            default_value: '1,2,3,4,5,6,7'
        },
        {
            id: 'movementRequiresBpm',
            name: jsc.i18n('Movimento Requer BPM?'),
            description: jsc.i18n('Define se será executado cenas em movimento mesmo se a música não tiver BPM preenchido'),
            type: 'boolean',
            default_value: true
        },
        {
            id: 'defaultLightScene',
            name: jsc.i18n('Cena de Luz Padrão'),
            description: jsc.i18n('Índice da cena que você deseja acionar quando a música terminar'),
            type: 'string',
            default_value: '7'
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, jsc.i18n('onchange') + ' ' + mID); // Habilita ou desabilita o log de acordo com a configuração  
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
// Triggers

function triggers(module) {
    var arr = [];

    if (isDev() && module.settings.log) {
        h.openWindow('js_monitor');   
    }    
    
    arr.push({
        id: 'lumikitChangeScene_' + mUID,
        when: 'displaying',
        item: 'any_song_slide',
        action: function(obj) {
            var receiverID = module.settings.receiverID;
            var movingScenes = module.settings.movingScene.replace(/\s/g, '').split(',');  // Índice das cenas ritmadas
            var staticScenes = module.settings.staticScene.replace(/\s/g, '').split(',');    // Índice das cenas estáticas
            var movementActive = h.getGlobal(mUID + '_movementActive', false);
            var bpm = obj.bpm > 0 || !module.settings.movementRequiresBpm;
            var code;

            if ((bpm && obj.slide_show_index < 1) ||  
                decodeLight(obj, '/') ||
                (decodeLight(obj, '!') && obj.slide_show_index < 4) ||
                ((decodeLight(obj, '*') || jsc.utils.isInstrumental(obj) || jsc.utils.isChorus(obj)) && bpm && obj.slide_show_index < obj.slide_show_total)
            ) { 
                if (movementActive) {
                    return;
                }
                code = randomizeLight(movingScenes);
            } else {  
                code = randomizeLight(staticScenes);
            }
            h.setGlobal(mUID + '_movementActive', movingScenes.indexOf(code) > -1);
            h.log(mUID, 'Luz sorteada: {} ', code); 
            jsc.lumikit.setActiveScene(receiverID, 1, code);
        }
    });

    // Verifica se existe um campo extra com marcação do verso, bpm
    // Usando a seguinte sintaxe: 23,2|30,80 que significa 
    // no slide 23 divida o bpm por 2, e no 30 ajuste o bpm para 80
    arr.push({
        id: "BPM_variable_" + mUID,
        when: "displaying",
        item: "any_song_slide",
        action: function(obj) {
            try {
                if (obj.slideBPM != null) {
                    var slides = obj.slideBPM.split('|');
                    for (var j = 0; j < slides.length; j++) {
                        var bpmInfo = slides[j].split(',');
                        var slide = bpmInfo[0];
                        if (slide == obj.slide_show_index) {
                             var bpm = bpmInfo[1];
                             var time = bpmInfo[2] || 0;
                             h.log(mUID, jsc.i18n('BPM variável encontrado: {} '), slides[j]);    
                             if (bpm == '!') { bpm = obj.bpm * 2; }
                             else if (bpm < 4) { bpm = obj.bpm / bpm; }
                             setTimeoutBPM(module, parseInt(bpm).toFixed(0), slide, time);
                        }  
                    }
                }
            } catch (e) { h.log("", 'Erro {}', [e]); }
        }
    });
    
    arr.push({
        id: 'lumikitResetScene_' + mUID,
        when: 'closing',
        item: 'any_song',
        action: function (obj) {    
            h.setGlobal(mUID + '_movementActive', false);
            jsc.lumikit.setActiveScene(module.settings.receiverID, 1, module.settings.defaultLightScene);
        }
    });

    // Seta a velocidade do ritmo / luzes caso esteja preenchido o BPM na música
    arr.push({ 
        id: 'lumikitSetBpm_' + mUID,
        when: 'displaying',
        item: 'any_song',
        action: function (obj) {    
            h.setGlobal(mUID + '_movementActive', false);
            if (obj.bpm > 29) { 
                setBpm(obj.bpm, module);
            }
        }
    });

    return arr;
}