var mID = '@prcris#m22';
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;

logState(module.settings.log, mUID, 'startup '+ mID);

}

function info() {
    return {
        id: mID,
        name: 'YouTube Timeline',
        description: '<html>' +
            '<div style="text-align: left;">' +
            'Turn your live streams into epic YouTube experiences! This module monitors media playback in real time, records the exact moment of each event, and automatically generates a perfect timeline to create chapters in your live stream. Simple, accurate, and powerful.' +
            '<br><br>' +
            '<b>How this module works:</b><br>' +
            '• When any item inside a section title in the Holyrics Media tab (e.g., "Opening", "Message", "Offerings", etc.) is played for the first time, the module automatically records the exact time and the corresponding section title.<br>' +
            '• These timestamps are saved and organized to generate a perfect timeline, ideal for creating automatic chapters in YouTube live stream videos.<br>' +
            '• Real-world example: check the video descriptions on our channel @verdadebalneario, where chapters are automatically generated based on this tracking.' +
            infoVDDMM,
        i18n: {
            name: {
                en: 'YouTube Timeline',
                pt: 'Timeline YouTube',
                es: 'Cronología de YouTube',
                ru: 'Таймлайн YouTube'
            },
            description: {
                en: '<html>' +
                    'Turn your live streams into epic YouTube experiences! This module monitors media playback in real time, records the exact moment of each event, and automatically generates a perfect timeline to create chapters in your live stream. Simple, accurate, and powerful.' +
                    '<br><br>' +
                    '<b>How this module works:</b><br>' +
                    '• When any item inside a section title in the Holyrics Media tab (e.g., "Opening", "Message", "Offerings", etc.) is played for the first time, the module automatically records the exact time and the corresponding section title.<br>' +
                    '• These timestamps are saved and organized to generate a perfect timeline, ideal for creating automatic chapters in YouTube live stream videos.<br>' +
                    '• Real-world example: check the video descriptions on our channel @verdadebalneario, where chapters are automatically generated based on this tracking.' +
                    infoVDDMM,
                pt: '<html>' +
                    '<div style="text-align: left;">' +
                    'Transforme suas transmissões ao vivo em experiências épicas no YouTube! Este módulo monitora em tempo real a execução de mídias, registra o momento exato de cada evento e gera automaticamente uma timeline perfeita para criar capítulos na sua live. Simples, preciso e poderoso.' +
                    '<br><br>' +
                    '<b>Como funciona este módulo:</b><br>' +
                    '• Ao executar pela primeira vez qualquer item dentro de um título da aba Mídia do Holyrics (ex: "Abertura", "Mensagem", "Contribuições", etc.), o módulo registra automaticamente o horário exato e o título da seção correspondente.<br>' +
                    '• Essas marcações são salvas e organizadas para gerar uma timeline (linha do tempo) perfeita, ideal para criar capítulos automáticos em vídeos de transmissões ao vivo no YouTube.<br>' +
                    '• Exemplo de uso real: veja as descrições das nossas lives no canal @verdadebalneario, onde os capítulos são gerados automaticamente com base nesse monitoramento.' +
                    infoVDDMM,
                es: '<html>' +
                    '<div style="text-align: left;">' + 
                    '¡Transforma tus transmisiones en vivo en experiencias épicas en YouTube! Este módulo monitorea en tiempo real la reproducción de medios, registra el momento exacto de cada evento y genera automáticamente una cronología perfecta para crear capítulos en tu transmisión en vivo. Simple, preciso y poderoso.' +
                    '<br><br>' +
                    '<b>Cómo funciona este módulo:</b><br>' +
                    '• Al reproducir por primera vez cualquier ítem dentro de un título de la pestaña Medios de Holyrics (ej.: "Apertura", "Mensaje", "Ofrendas", etc.), el módulo registra automáticamente la hora exacta y el título de la sección correspondiente.<br>' +
                    '• Estas marcas de tiempo se guardan y organizan para generar una cronología perfecta, ideal para crear capítulos automáticos en videos de transmisiones en vivo en YouTube.<br>' +
                    '• Ejemplo real: consulta las descripciones de nuestros videos en el canal @verdadebalneario, donde los capítulos se generan automáticamente con base en este monitoreo.' +
                    infoVDDMM,
                ru: '<html>' +
                    '<div style="text-align: left;">' +
                    'Преобразите свои прямые трансляции в эпические события на YouTube! Этот модуль в реальном времени отслеживает воспроизведение медиа, фиксирует точное время каждого события и автоматически создает идеальную временную шкалу для создания глав на вашей трансляции. Просто, точно и мощно.' +
                    '<br><br>' +
                    '</b>Как работает этот модуль:</b><br>' +
                    '• При первом воспроизведении любого элемента в разделе вкладки "Медиа" Holyrics (например, "Открытие", "Проповедь", "Пожертвования" и т.д.), модуль автоматически фиксирует точное время и название соответствующего раздела.<br>' +
                    '• Эти отметки сохраняются и организуются для создания идеальной временной шкалы, идеально подходящей для создания автоматических глав на видео в прямом эфире YouTube.<br>' +
                    '• Реальный пример: ознакомьтесь с описаниями наших трансляций на канале @verdadebalneario, где главы создаются автоматически на основе этого отслеживания.' +
                    infoVDDMM
            }
        }
    };
}



                   
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2253657474696e6773227d
function settings() {
    return [
        {
            name: jsc.i18n('About') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
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
            id: 'log',
            label: jsc.i18n('Enable log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, ' onchange ' + mID); // habilita ou desabilita o log de acordo com a configuração
            }
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a225472696767657273227d
function triggers(module) {
    var arr = [];    
    arr.push({
      id: "log_titulo_item_midia_"+ mUID,
      when: "displaying",
      item: "any_title_subitem",
      action: function(obj) {
          addToTimeline(obj.title);
      }
    });
    arr.push({ 
        id: 'log_musica' + mUID,
        when: 'displaying',
        item: 'any_song',
        action: function (obj) {    
           addToTimeline(obj.title + ' - ' + obj.artist + ' (Cover)');
        }
    });        
    return arr;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2246756e6374696f6e73227d
function getStreamStatus(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetStreamStatus');
    h.log('jsc.obs_v5', 'GetStreamStatus response: {}', response);
    return response;
}

function addToTimeline(eventName) {
    var storeKey = mUID + '_timeLog'; // Key for the global store
    var scheduleKey = h.hly('GetCurrentSchedule').data[0].datetime_millis; // Current schedule key
    var timeline = h.restore(storeKey) || {}; // Restore or create empty object
    
    h.logp(mUID,'{%t} timeline {}',timeline);
    
    if (!timeline[scheduleKey]) {
        timeline[scheduleKey] = []; // Initialize array if not exists
    }

    var events = timeline[scheduleKey];
    
    function saveEvent(name, timestamp) {
        // Check for duplicate
        for (var i = 0; i < events.length; i++) {
            if (events[i].event === name) {
                h.log(mUID, '{%t} duplicate event ignored: {}', name);
                return;
            }
        }

        events.push({
            date_time: timestamp || Date.now(),
            event: name
        });

        h.store(storeKey, timeline);

        h.log(mUID, '{%t} new event added - title: {} time: {}', name, timestamp || Date.now());
    }

    if (eventName === 'live_start') {
        // If manually adding 'live_start', just save
        saveEvent(eventName);
        return;
    }

    // For other events, ensure live_start exists
    var hasLiveStart = events.some(function(e) { return e.event === 'live_start'; });

    if (!hasLiveStart) {
        var streamStatus = getStreamStatus(module.settings.streaming_id);

        if (streamStatus && streamStatus.outputActive) {
            var now = Date.now();
            var streamDurationMs = streamStatus.outputDuration; // in milliseconds
            var liveStartTimestamp = now - streamDurationMs;

            // ⚡ Clear previous invalid events
            timeline[scheduleKey] = [];
            events = timeline[scheduleKey];

            h.log(mUID,'{%t}  {}',h.i18n('Live start detected automatically, previous events cleared.'));

            // Save live_start after clearing
            saveEvent('live_start', liveStartTimestamp);
        } else {
            h.log(mUID,'{%t}  {}',h.i18n('Live stream not detected. Please check OBS.'));
            return;
        }
    }
    h.logp(mUID,'{%t} timeline {}',timeline);
    // Save the actual event
    saveEvent(eventName);
}


function printTimeline() {
    var keyStore = mUID + '_timeLog'; // Store key to retrieve all events
    var timeLogs = h.restore(keyStore); // Retrieve data from store
    var scheduleKey = h.hly('GetCurrentSchedule').data[0].datetime_millis; // Current schedule key

    if (!timeLogs) {
        h.log(mUID, '{%t}  {}', h.i18n('No events found.'));
        return;
    }

    var timeline = timeLogs[scheduleKey];
    h.logp(mUID,'{%t} timeline {}', timeline);
    
    if (!timeline || timeline.length === 0) {
       h.log('','{%t} Nenhum registro de timeline para este evento.');
       return
    }
        
    h.log(mUID, 'Event Log:');

    // Find the "live_start" event
    var liveStartTime = null;
    for (var i = 0; i < timeline.length; i++) {
        if (timeline[i].event === 'live_start') {
            liveStartTime = timeline[i].date_time;
            break;
        }
    }

    if (!liveStartTime) {
        h.log(mUID, '{%t}  {}', h.i18n('Live start not found. Cannot generate timeline.'));
        return;
    }

    // For each event, calculate elapsed time from live_start
    for (var i = 0; i < timeline.length; i++) {
        var event = timeline[i];
        var elapsedMillis = event.date_time - liveStartTime;

        var elapsedSeconds = Math.floor(elapsedMillis / 1000);
        var hours = Math.floor(elapsedSeconds / 3600);
        var minutes = Math.floor((elapsedSeconds % 3600) / 60);
        var seconds = elapsedSeconds % 60;

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        var formattedTime = hours + ':' + minutes + ':' + seconds;

        h.log('', '{} - {}', formattedTime, event.event);
    }
}



function clearTimeline() {
    var keyStore = mUID + '_timeLog';  // Chave para o store que contém todos os eventos
    var key = h.hly('GetCurrentSchedule').data[0].datetime_millis;  // A chave datetime_millis atual

    // Recupera os dados do store
    var timeLogs = h.restore(keyStore);

    // Remove a chave correspondente ao datetime_millis atual
    delete timeLogs[key];

    // Armazena novamente os dados no store, sem o datetime_millis atual
    h.store(keyStore, timeLogs);

    // Exibe a notificação com a mensagem de sucesso
    h.log(mUID,'{%t}  {}',h.i18n('Timeline reiniciada.'));
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22416374696f6e73227d
function actions(module) {
    var act = [
        {
        id: 'menu',
        label: '',
        icon: 'system:menu',
        action: [
           {
           label: jsc.i18n("Print Timeline"),
           icon: "Print",
           action: function() {
               printTimeline();
            }
          },
          {
           label: jsc.i18n("Clear Timeline"),
           icon: "Clear",
           action: function() {
               clearTimeline();
            }
          }
       ]}
    ];
    return act;
}
   