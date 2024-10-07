// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m7';
var mUID = '@prcris#m7';

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  logState(module.settings.log, mUID, 'startup '+ mID);
}

function info() {
    return {
        id: mUID,
        name: 'Lumikit Automático',
        description: '<html>'+
                     '• Sorteia cenas cadastradas como em movimento para versos de Refrão e Instrumental<br>'+
                     '• Sorteia cenas estáticas para demais versos<br>'+
                     '• Ajusta o BPM das luzes do Lumikit e do vídeo do Holyrics.<br>'+
                     '• Usa o campo extra slideBPM da música para estabelecer BPM variável exemplo: <br>'+
                     '   23,2|30,80,5 que significa:<br>'+
                     '   no slide 23 divida o bpm por 2, e no 30 ajuste o bpm para 80, 5 segundos após exibir o verso 30.<br>'+
                     infoVDDMM
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
        h.log(mUID, 'BPM alterado para: ' + BPM);
        h.hly('SetBpm', { bpm: BPM });
        // Ajusta o BPM das luzes
        jsc.lumikit.setBPM(module.settings.receiverID, BPM);
    }
}

function setTimeoutBPM(module, bpm, slide, time) {
    time = time == 0 ? 500 : time;
    var timeoutDuration = time < 10 ? time * 1000 : time;
    h.log(mUID, 'Velocidade será alterada pelo Slide {} para {} depois de {} segundos', [slide, bpm, timeoutDuration / 1000]); 
    h.setTimeout(function() {
        h.log(mUID, '************ Executando timeout');
        h.log(mUID, 'Velocidade Alterada pelo Slide {} para {} depois de {} segundos', slide, bpm, timeoutDuration / 1000); 
        setBpm(bpm, module);
    }, timeoutDuration, mUID + '_alterBPM'); // Tempo em milissegundos
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: 'Sobre ' + mID,
            description: "<html><hr>Para mais informações, visite <a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        }, 
        {
            id: 'receiverID',
            name: 'Receptor',
            description: '',
            type: 'receiver',
            receiver: 'lumikit'
        },
        {
            id: 'movingScene',
            name: 'Cenas em Movimento',
            description: 'Índice das cenas em movimento, ex: {}',
            type: 'string',
            default_value: '9,13,14,15,16'
        },
        {
            id: 'staticScene',
            name: 'Cenas Estáticas',
            description: 'Índice das cenas estáticas, ex: {}',
            type: 'string',
            default_value: '1,2,3,4,5,6,7'
        },
        {
            id: 'movementRequiresBpm',
            name: 'Movimento Requer BPM?',
            description: 'Define se será executado cenas em movimento mesmo se a música não tiver BPM preenchido',
            type: 'boolean',
            default_value: true
        },
        {
            id: 'defaultLightScene',
            name: 'Cena de Luz Padrão',
            description: 'Índice da cena que você deseja acionar quando a música terminar',
            type: 'string',
            default_value: '7'
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onchange '+ mID); // Habilita ou desabilita o log de acordo com a configuração  
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
                             h.log(mUID, 'BPM variável encontrado: {} ', slides[j]);    
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