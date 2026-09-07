// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
// v2.13.2 | 2026-09-04
//#import wing
var mID = '@prcris#m13'; 
var mUID = mID + ''; 
var pause = false;
var moduleVersion = '2.13.2';
var currentModule = null;

function formatModuleLog(message, values) {
    var text = String(message == null ? '' : message);
    var list = values && typeof values.length === 'number' ? values : [];
    var index = 0;
    return text.replace(/\{\}/g, function() {
        var value = index < list.length ? list[index++] : '{}';
        return value == null ? String(value) : String(value);
    });
}

function moduleLog(message, values) {
    var text = formatModuleLog(message, values);
    try {
        h.log(mUID, message, values || []);
    } catch (e1) {}
    try {
        if (currentModule && typeof currentModule.log === 'function') {
            currentModule.log(text);
        }
    } catch (e2) {}
}

// X32/M32 e Soundcraft permanecem incorporadas. WING usa a API oficial jsc.wing publicada.
function getInfoVDDMM() {
    var translations = {
        pt: "<hr><br>@ Para dicas sobre automação com Holyrics, visite meu canal no YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@holyricris'>@holyricris</a></p><br><p style='padding-left: 20px;'>Em caso de dúvidas, fale comigo no grupo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, marque @prcris que terei prazer em ajudar - #juntos pelo Rei e pelo Reino!<br></p>",
        en: "<hr><br>@ For automation tips with Holyrics, visit my YouTube channel:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@holyricris'>@holyricris</a></p><br><p style='padding-left: 20px;'>For questions, contact me in the group <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, mention @prcris and I'll be happy to help - #together for the King and the Kingdom!<br></p>",
        es: "<hr><br>@ Para consejos de automatización con Holyrics, visita mi canal de YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@holyricris'>@holyricris</a></p><br><p style='padding-left: 20px;'>Para preguntas, háblame en el grupo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, menciona @prcris y estaré encantado de ayudar - #juntos por el Rey y el Reino!<br></p>",
        ru: "<hr><br>@ Для советов по автоматизации с Holyrics посетите мой канал на YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@holyricris'>@holyricris</a></p><br><p style='padding-left: 20px;'>По вопросам пишите мне в группе <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, упомяните @prcris.<br></p>",
        it: "<hr><br>@ Per consigli sull'automazione con Holyrics, visita il mio canale YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@holyricris'>@holyricris</a></p><br><p style='padding-left: 20px;'>Per domande, scrivimi nel gruppo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, menziona @prcris.<br></p>"
    };
    var lang = h.getLanguage();
    return translations[lang] || translations.en;
}

var infoVDDMM = getInfoVDDMM();
var allowedPrcrisModuleRequests = [];

function logState(log, id, caller) {
    h.log.setEnabled(id, log === true);
}

function isModuleSuspended() {
    var status = h.getGlobal('suspendConflictingModules' + mID) === true;
    if (status) {
        h.log(mUID, '{%t} Módulo {} temporariamente suspenso por outro processo.', [mID]);
    }
    return status;
}

function startup(module) {
    currentModule = module;
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID);
    moduleLog('PC unMute v{} | rota={} | wing={} | x32={} | soundcraft={}', [
        moduleVersion,
        getMixerModelLabel(module.settings.mixer_model),
        jsc.wing && typeof jsc.wing.setChannelVolume === 'function' ? (jsc.wing.version || 'publicada') : 'nao carregada',
        jsc.x32 && jsc.x32.version ? jsc.x32.version : 'nao carregada',
        jsc.soundcraft && jsc.soundcraft.version ? jsc.soundcraft.version : 'nao carregada'
    ]);
}

function info() {
    return {
        id: mID,
        name: 'PC unMute Holyrics+',
        description: '<html>' +
                    '• Unmutes the audio channel connected to the PC on your digital mixer whenever an audio file is started in Holyrics.<br>' +
                    '• Creates start and closing triggers, in addition to adding mute and volume buttons to your Holyrics!<br><br>' +
                    '• Unmutes the channel and adjusts the volume on Behringer (X32/WING) and SoundCraft digital mixers when initializing audio files.<br>' +
                    '• Creates a dedicated button to manage the channel mute.<br>' +
                    '• Creates a dedicated fader to adjust the channel volume.<br>' +
                    '• Compatible with Video, Audio, and Automatic Presentation.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Option to change VLC Volume from Holyrics.<br>' +
                    '• Supports AUX inputs, WING DCA and Soundcraft Line channels.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Saves an individual mixer volume for each video, audio file or Automatic Presentation through the context menu.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Optional smooth volume transition with an individual duration for each configured media item.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Applies an individual final volume when configured media closes and mutes the mixer when it reaches 0%.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Safe mode preserves mixer volume and mute when a video has no individual volume configured.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Explicit mixer selection prevents ambiguous detection between WING and X32/M32.<br>' +
                    '• Uses only the three confirmed direct integrations: jsc.wing, X32/M32 and Soundcraft.<br>' +
                    infoVDDMM,
        allowed_requests: allowedPrcrisModuleRequests,
        min_version: '2.29.0',
        i18n: {
            name: {
                en: 'PC unMute Holyrics+',
                pt: 'PC unMute Holyrics+',
                es: 'PC unMute Holyrics+',
                ru: 'PC unMute Holyrics+',
                it: 'PC unMute Holyrics+'
            },
            description: {
                en: '<html>' +
                    '• Unmutes the audio channel connected to the PC on your digital mixer whenever an audio file is started in Holyrics.<br>' +
                    '• Creates start and closing triggers, in addition to adding mute and volume buttons to your Holyrics!<br><br>' +
                    '• Unmutes the channel and adjusts the volume on Behringer and SoundCraft digital mixers when initializing audio files.<br>' +
                    '• Creates a dedicated button to manage the channel mute.<br>' +
                    '• Creates a dedicated fader to adjust the channel volume.<br>' +
                    '• Compatible with Video, Audio, and Automatic Presentation.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Option to change VLC Volume from Holyrics.<br>' +
                    '• Supports AUX inputs, WING DCA and Soundcraft Line channels.<br>' +
                    '• Saves an individual mixer volume for each video, audio file or Automatic Presentation through the context menu.<br>' +
                    '• Optionally applies that volume with a smooth transition and an individual duration for each item.<br>' +
                    '• Applies the configured final volume when media closes and mutes the mixer at 0%.<br>' +
                    '• Safe mode preserves mixer volume and mute when a video has no individual volume configured.<br>' +
                    '• Uses only the three confirmed direct integrations: jsc.wing, X32/M32 and Soundcraft.<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Libera o canal de áudio conectado ao PC no seu mixer digital sempre que um arquivo de áudio for iniciado no Holyrics.<br>' +
                    '• Cria gatilhos de início e encerramento, além de adicionar botões de mute e volume ao seu Holyrics!<br><br>' +
                    '• Libera o canal e ajusta o volume nos mixers digitais Behringer (X32/WING) e SoundCraft ao inicializar arquivos com áudio.<br>' +
                    '• Cria um botão dedicado para gerenciar o mute do canal.<br>' +
                    '• Cria um fader dedicado para ajustar o volume do canal.<br>' +
                    '• Compatível com Vídeo, Áudio e Apresentação Automática.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Opção de alterar o Volume do VLC do Holyrics.<br>' +
                    '• Aceita entradas AUX, DCA na WING e canais Line na Soundcraft.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NOVO </b></font></span> Salva um volume individual da mesa para cada vídeo, áudio ou AP pelo menu de contexto.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NOVO </b></font></span> Permite aplicar esse volume com transição suave e tempo individual para cada item.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NOVO </b></font></span> Aplica um volume final individual ao encerrar a mídia configurada e ativa o mute quando chegar a 0%.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NOVO </b></font></span> Modo seguro preserva o volume e o mute da mesa quando um vídeo não possui volume individual.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NOVO </b></font></span> Seleção explícita da mesa evita detecção ambígua entre WING e X32/M32.<br>' +
                    '• Usa somente as três integrações diretas confirmadas: jsc.wing, X32/M32 e Soundcraft.<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Desmutea el canal de audio conectado al PC en tu mezclador digital siempre que inicies un archivo de audio en Holyrics.<br>' +
                    '• Crea disparadores de inicio y cierre, además de añadir botones de mute y volumen a tu Holyrics!<br><br>' +
                    '• Desmutea el canal y ajusta el volumen en los mezcladores digitales Behringer y SoundCraft al iniciar archivos de audio.<br>' +
                    '• Crea un botón dedicado para gestionar el mute del canal.<br>' +
                    '• Crea un fader dedicado para ajustar el volumen del canal.<br>' +
                    '• Compatible con Vídeo, Audio y Presentación Automática.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Opción para cambiar el volumen del VLC desde Holyrics.<br>' +
                    '• Acepta entradas AUX, DCA en WING y canales Line en Soundcraft.<br>' +
                    '• Guarda un volumen individual de la mesa para cada vídeo, audio o presentación automática mediante el menú contextual.<br>' +
                    '• El modo seguro conserva el volumen y el mute de la mesa cuando un vídeo no tiene volumen individual.<br>' +
                    '• Aplica el volumen final configurado al cerrar la media y activa el mute cuando llega a 0%.<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• Размутирует аудиоканал, подключенный к ПК, на вашем цифровом микшере каждый раз, когда начинается воспроизведение аудиофайла в Holyrics.<br>' +
                    '• Создает триггеры запуска и закрытия, а также добавляет кнопки mute и регулировки громкости в Holyrics!<br><br>' +
                    '• Размутирует канал и регулирует громкость на цифровых микшерах Behringer и SoundCraft при инициализации аудиофайлов.<br>' +
                    '• Создает специальную кнопку для управления mute канала.<br>' +
                    '• Создает специальный фейдер для регулировки громкости канала.<br>' +
                    '• Совместим с Видео, Аудио и Автоматической Презентацией.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Опция изменения громкости VLC из Holyrics.<br>' +
                    '• Поддерживает входы AUX и управление DCA на WING/Soundcraft.<br>' +
                    '• Сохраняет индивидуальную громкость микшера для каждого видео, аудио или автоматической презентации.<br>' +
                    '• Безопасный режим сохраняет громкость и mute микшера для видео без индивидуальной настройки.<br>' +
                    '• При закрытии медиа применяет заданную конечную громкость и включает mute при достижении 0%.<br>' +
                    infoVDDMM,
                it: '<html>' +
                    '• Disattiva il muto del canale audio collegato al PC sul tuo mixer digitale ogni volta che un file audio viene avviato in Holyrics.<br>' +
                    '• Crea trigger di avvio e chiusura, oltre ad aggiungere pulsanti di muto e volume al tuo Holyrics!<br><br>' +
                    '• Disattiva il muto e regola il volume su mixer digitali Behringer e SoundCraft quando si avviano file audio.<br>' +
                    '• Crea un pulsante dedicato per gestire il muto del canale.<br>' +
                    '• Crea un fader dedicato per regolare il volume del canale.<br>' +
                    '• Compatibile con Video, Audio e Presentazioni Automatiche.<br>' +
                    '• <span style="background-color: yellow;"><font color="black"><b> ##NEW </b></font></span> Opzione per cambiare il volume di VLC da Holyrics.<br>' +
                    '• Supporta ingressi AUX, DCA su WING e canali Line su Soundcraft.<br>' +
                    '• Salva un volume individuale del mixer per ogni video, audio o presentazione automatica tramite il menu contestuale.<br>' +
                    '• La modalità sicura conserva volume e mute del mixer quando un video non ha un volume individuale.<br>' +
                    '• Applica il volume finale configurato alla chiusura del media e attiva il mute quando raggiunge 0%.<br>' +
                    infoVDDMM
            }
        }
    };
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22783332227d
// v1.1.0 | 2026-09-04
// Dependencia local minima para X32/M32. Mantem apenas o que o PC unMute usa.

function __pcX32Number2(value) {
    value = parseInt(value, 10);
    if (isNaN(value) || value < 1) throw 'Canal X32 invalido: ' + value;
    return value < 10 ? '0' + value : String(value);
}

function __pcX32Clamp01(value) {
    value = parseFloat(value);
    if (isNaN(value) || value < 0) return 0;
    if (value > 1) return 1;
    return value;
}

function __pcX32Request(receiverID, oscCommand) {
    var response = h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: true,
        timeout: 500,
        response_data_type: 'base64'
    });
    return response != null ? h.base64Decode(response) : null;
}

function __pcX32RequestAsync(receiverID, oscCommand) {
    h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: false
    });
}

function __pcX32CreateChannel(channel) {
    return h.createByteBuffer()
        .putString('/ch/')
        .putString(__pcX32Number2(channel));
}

function __pcX32CreateChannelMix(channel) {
    return __pcX32CreateChannel(channel).putString('/mix');
}

function __pcX32CreateChannelMute(channel) {
    return __pcX32CreateChannelMix(channel).putString('/on').put0(3);
}

function __pcX32CreateChannelMuteSet(channel, muted) {
    return __pcX32CreateChannelMute(channel)
        .putStringAndFill(',i', 4)
        .putInt(muted ? 0 : 1);
}

function __pcX32CreateChannelVolume(channel) {
    return __pcX32CreateChannelMix(channel).putString('/fader').put0(4);
}

function __pcX32CreateChannelVolumeSet(channel, volume) {
    return __pcX32CreateChannelVolume(channel)
        .putStringAndFill(',f', 4)
        .putFloat(__pcX32Clamp01(volume));
}

function __pcX32CreateAuxMute(aux) {
    return h.createByteBuffer()
        .putString('/auxin/')
        .putString(__pcX32Number2(aux))
        .putString('/mix/on')
        .put0(4);
}

function __pcX32CreateAuxMuteSet(aux, muted) {
    return __pcX32CreateAuxMute(aux)
        .putStringAndFill(',i', 4)
        .putInt(muted ? 0 : 1);
}

function __pcX32CreateAuxVolume(aux) {
    return h.createByteBuffer()
        .putString('/auxin/')
        .putString(__pcX32Number2(aux))
        .putString('/mix/fader')
        .put0(1);
}

function __pcX32CreateAuxVolumeSet(aux, volume) {
    return __pcX32CreateAuxVolume(aux)
        .putStringAndFill(',f', 4)
        .putFloat(__pcX32Clamp01(volume));
}

function __pcX32ReadInt(response, offset) {
    if (response == null) throw 'timeout X32';
    var reader = h.createByteBufferToRead(response);
    reader.readBytes(offset);
    return reader.readInt();
}

function __pcX32ReadFloat(response, offset) {
    if (response == null) throw 'timeout X32';
    var reader = h.createByteBufferToRead(response);
    reader.readBytes(offset);
    return reader.readFloat();
}

function __pcX32GetStatus(receiverID) {
    var response = __pcX32Request(receiverID, '/info');
    return response != null ? h.bytesToString(response) : null;
}

function __pcX32IsConnected(receiverID) {
    return __pcX32GetStatus(receiverID) != null;
}

function __pcX32IsChannelMute(receiverID, channel) {
    return __pcX32ReadInt(
        __pcX32Request(receiverID, __pcX32CreateChannelMute(channel).toBytes()),
        20
    ) === 0;
}

function __pcX32SetChannelMute(receiverID, channel, muted) {
    __pcX32RequestAsync(receiverID, __pcX32CreateChannelMuteSet(channel, muted).toBytes());
    return __pcX32IsChannelMute(receiverID, channel) === muted;
}

function __pcX32ToggleChannelMute(receiverID, channel) {
    return __pcX32SetChannelMute(receiverID, channel, !__pcX32IsChannelMute(receiverID, channel));
}

function __pcX32GetChannelVolume(receiverID, channel) {
    return __pcX32ReadFloat(
        __pcX32Request(receiverID, __pcX32CreateChannelVolume(channel).toBytes()),
        24
    );
}

function __pcX32SetChannelVolume(receiverID, channel, volume) {
    volume = __pcX32Clamp01(volume);
    __pcX32RequestAsync(receiverID, __pcX32CreateChannelVolumeSet(channel, volume).toBytes());
    return Math.abs(__pcX32GetChannelVolume(receiverID, channel) - volume) < 0.051;
}

function __pcX32SetChannelVolumeAsync(receiverID, channel, volume) {
    __pcX32RequestAsync(receiverID, __pcX32CreateChannelVolumeSet(channel, volume).toBytes());
}

function __pcX32IsAuxMute(receiverID, aux) {
    return __pcX32ReadInt(
        __pcX32Request(receiverID, __pcX32CreateAuxMute(aux).toBytes()),
        24
    ) === 0;
}

function __pcX32SetAuxMute(receiverID, aux, muted) {
    __pcX32RequestAsync(receiverID, __pcX32CreateAuxMuteSet(aux, muted).toBytes());
    return __pcX32IsAuxMute(receiverID, aux) === muted;
}

function __pcX32ToggleAuxMute(receiverID, aux) {
    return __pcX32SetAuxMute(receiverID, aux, !__pcX32IsAuxMute(receiverID, aux));
}

function __pcX32GetAuxVolume(receiverID, aux) {
    return __pcX32ReadFloat(
        __pcX32Request(receiverID, __pcX32CreateAuxVolume(aux).toBytes()),
        24
    );
}

function __pcX32SetAuxVolume(receiverID, aux, volume) {
    volume = __pcX32Clamp01(volume);
    __pcX32RequestAsync(receiverID, __pcX32CreateAuxVolumeSet(aux, volume).toBytes());
    return Math.abs(__pcX32GetAuxVolume(receiverID, aux) - volume) < 0.051;
}

function __pcX32SetAuxVolumeAsync(receiverID, aux, volume) {
    __pcX32RequestAsync(receiverID, __pcX32CreateAuxVolumeSet(aux, volume).toBytes());
}

function __pcX32SetSmoothVolume(receiverID, number, targetVolume, step, targetType) {
    var actionKey = 'pcunmute.x32.smooth.' + targetType + '.' + receiverID + '.' + number;
    var previousID = h.getGlobal(actionKey);
    if (previousID != null) h.clearInterval(previousID);

    targetVolume = __pcX32Clamp01(targetVolume);
    step = Math.max(0.001, Math.min(0.1, Math.abs(parseFloat(step) || 0.001)));
    var getter = targetType === 'aux' ? __pcX32GetAuxVolume : __pcX32GetChannelVolume;
    var setter = targetType === 'aux' ? __pcX32SetAuxVolumeAsync : __pcX32SetChannelVolumeAsync;
    var currentVolume = getter(receiverID, number);
    if (isNaN(currentVolume)) return false;

    var decreasing = targetVolume < currentVolume;
    var intervalID = h.setInterval(function() {
        currentVolume += decreasing ? -step : step;
        if (decreasing ? currentVolume <= targetVolume : currentVolume >= targetVolume) {
            h.clearInterval(intervalID);
            setter(receiverID, number, targetVolume);
            return;
        }
        setter(receiverID, number, currentVolume);
    }, 10);
    h.setGlobal(actionKey, intervalID);
    return true;
}

function __pcX32SetSmoothChannelVolume(receiverID, channel, targetVolume, step) {
    return __pcX32SetSmoothVolume(receiverID, channel, targetVolume, step, 'channel');
}

function __pcX32SetSmoothAuxVolume(receiverID, aux, targetVolume, step) {
    return __pcX32SetSmoothVolume(receiverID, aux, targetVolume, step, 'aux');
}

jsc.x32 = jsc.x32 || {};
jsc.x32.version = 'pcunmute-1.1.0';
jsc.x32.getStatus = __pcX32GetStatus;
jsc.x32.isConnected = __pcX32IsConnected;
jsc.x32.isChannelMute = __pcX32IsChannelMute;
jsc.x32.setChannelMute = __pcX32SetChannelMute;
jsc.x32.toggleChannelMute = __pcX32ToggleChannelMute;
jsc.x32.getChannelVolume = __pcX32GetChannelVolume;
jsc.x32.setChannelVolume = __pcX32SetChannelVolume;
jsc.x32.setChannelVolumeAsync = __pcX32SetChannelVolumeAsync;
jsc.x32.setSmoothChannelVolume = __pcX32SetSmoothChannelVolume;
jsc.x32.isAuxMute = __pcX32IsAuxMute;
jsc.x32.setAuxMute = __pcX32SetAuxMute;
jsc.x32.toggleAuxMute = __pcX32ToggleAuxMute;
jsc.x32.getAuxVolume = __pcX32GetAuxVolume;
jsc.x32.setAuxVolume = __pcX32SetAuxVolume;
jsc.x32.setAuxVolumeAsync = __pcX32SetAuxVolumeAsync;
jsc.x32.setSmoothAuxVolume = __pcX32SetSmoothAuxVolume;
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22736f756e646372616674227d
// v1.1.0 | 2026-09-04
// Dependencia local minima para Soundcraft Si. Mantem apenas volume e mute.

function __pcSoundcraftEndsWith(text, suffix) {
    text = String(text);
    suffix = String(suffix);
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
}

function __pcSoundcraftClamp01(value) {
    value = parseFloat(value);
    if (isNaN(value) || value < 0) return 0;
    if (value > 1) return 1;
    return value;
}

function __pcSoundcraftSaveState(ws, message) {
    var rows = String(message || '').split('\n');
    for (var i = 0; i < rows.length; i++) {
        var start = rows[i].indexOf('SETD^');
        if (start < 0) continue;

        var setd = rows[i].substring(start + 5);
        var separator = setd.indexOf('^');
        if (separator < 0) continue;

        var key = setd.substring(0, separator);
        var value = setd.substring(separator + 1);
        if (__pcSoundcraftEndsWith(key, '.mix') || __pcSoundcraftEndsWith(key, '.value') || __pcSoundcraftEndsWith(key, '.pan')) {
            ws.put('SETD^' + key, parseFloat(value));
        } else if (__pcSoundcraftEndsWith(key, '.mute') || __pcSoundcraftEndsWith(key, '.solo')) {
            ws.put('SETD^' + key, value === '1');
        } else if (__pcSoundcraftEndsWith(key, '.stereoIndex')) {
            ws.put('SETD^' + key, parseInt(value, 10));
        }
    }
}

function __pcSoundcraftWebSocket(receiverID) {
    var ws = h.ws(receiverID);
    if (ws != null) return ws;

    var stateLoaded = false;
    ws = h.ws(receiverID, {
        on_error: function(evt) {
            h.log('jsc.soundcraft', 'on_error: {}', [evt]);
        },
        loop: function(evt) {
            evt.source.send('3:::ALIVE');
        },
        on_message: function(message) {
            __pcSoundcraftSaveState(ws, message);
            stateLoaded = true;
        }
    });
    if (ws == null) throw 'Falha na conexao Soundcraft';

    var timerID = h.uuid();
    while (!stateLoaded && h.getTimerMillis(timerID) < 3000) {
        h.sleep(50);
    }
    return ws;
}

function __pcSoundcraftNormalizeMessage(data) {
    data = String(data || '');
    return data.indexOf('3:::') === 0 ? data : '3:::' + data;
}

function __pcSoundcraftRequest(receiverID, data) {
    var ws = __pcSoundcraftWebSocket(receiverID);
    data = __pcSoundcraftNormalizeMessage(data);
    h.log('jsc.soundcraft', 'send: {} {}', [receiverID, data]);
    ws.send(data);
    __pcSoundcraftSaveState(ws, data);
}

function __pcSoundcraftBatchRequest(receiverID, array) {
    var ws = __pcSoundcraftWebSocket(receiverID);
    for (var i = 0; i < array.length; i++) {
        var data = __pcSoundcraftNormalizeMessage(array[i]);
        h.log('jsc.soundcraft', 'send: {} {}', [receiverID, data]);
        ws.send(data);
        __pcSoundcraftSaveState(ws, data);
    }
}

function __pcSoundcraftGetSettings(receiverID, settingsID) {
    return __pcSoundcraftWebSocket(receiverID).get(settingsID);
}

function __pcSoundcraftCreateSETD(type, number, action, value) {
    var typeCode = type === 'input' ? 'i' : type === 'line' ? 'l' : type === 'aux' ? 'a' : null;
    if (!typeCode) throw 'Tipo Soundcraft invalido: ' + type;

    var command = 'SETD^' + typeCode + '.' + (parseInt(number, 10) - 1) + '.' + action;
    if (value !== null && value !== undefined) command += '^' + value;
    return command;
}

function __pcSoundcraftStereoIndexes(receiverID, type, number) {
    var setting = __pcSoundcraftGetSettings(
        receiverID,
        __pcSoundcraftCreateSETD(type, number, 'stereoIndex', null)
    );
    if (setting === 0) return [number, number + 1];
    if (setting === 1) return [number, number - 1];
    return [number];
}

function __pcSoundcraftCommands(receiverID, type, number, action, value) {
    var indexes = __pcSoundcraftStereoIndexes(receiverID, type, number);
    var commands = [];
    for (var i = 0; i < indexes.length; i++) {
        commands.push(__pcSoundcraftCreateSETD(type, indexes[i], action, value));
    }
    return commands;
}

function __pcSoundcraftConn(receiverID) {
    var targetType = null;
    var targetNumber = null;

    var builder = {
        input: function(number) {
            targetType = 'input';
            targetNumber = number;
            return builder;
        },
        line: function(number) {
            targetType = 'line';
            targetNumber = number;
            return builder;
        },
        aux: function(number) {
            targetType = 'aux';
            targetNumber = number;
            return builder;
        },
        isMute: function() {
            return __pcSoundcraftGetSettings(
                receiverID,
                __pcSoundcraftCreateSETD(targetType, targetNumber, 'mute', null)
            );
        },
        setMute: function(muted) {
            return __pcSoundcraftBatchRequest(
                receiverID,
                __pcSoundcraftCommands(receiverID, targetType, targetNumber, 'mute', muted ? 1 : 0)
            );
        },
        mute: function() {
            return builder.setMute(true);
        },
        unmute: function() {
            return builder.setMute(false);
        },
        getVolume: function() {
            return __pcSoundcraftGetSettings(
                receiverID,
                __pcSoundcraftCreateSETD(targetType, targetNumber, 'mix', null)
            );
        },
        setVolume: function(volume) {
            volume = __pcSoundcraftClamp01(volume).toFixed(4);
            return __pcSoundcraftBatchRequest(
                receiverID,
                __pcSoundcraftCommands(receiverID, targetType, targetNumber, 'mix', volume)
            );
        },
        setSmoothVolume: function(targetVolume, step) {
            var actionKey = 'pcunmute.soundcraft.smooth.' + receiverID + '.' + targetType + '.' + targetNumber;
            var previousID = h.getGlobal(actionKey);
            if (previousID != null) h.clearInterval(previousID);

            targetVolume = __pcSoundcraftClamp01(targetVolume);
            step = Math.max(0.001, Math.min(0.1, Math.abs(parseFloat(step) || 0.001)));
            var currentVolume = parseFloat(builder.getVolume());
            if (isNaN(currentVolume)) return false;

            var decreasing = targetVolume < currentVolume;
            var intervalID = h.setInterval(function() {
                currentVolume += decreasing ? -step : step;
                if (decreasing ? currentVolume <= targetVolume : currentVolume >= targetVolume) {
                    h.clearInterval(intervalID);
                    builder.setVolume(targetVolume);
                    return;
                }
                builder.setVolume(currentVolume);
            }, 10);
            h.setGlobal(actionKey, intervalID);
            return true;
        }
    };
    return builder;
}

jsc.soundcraft = jsc.soundcraft || {};
jsc.soundcraft.version = 'pcunmute-1.1.0';
jsc.soundcraft.createWebSocket = __pcSoundcraftWebSocket;
jsc.soundcraft.saveStateFromMessage = __pcSoundcraftSaveState;
jsc.soundcraft.request = __pcSoundcraftRequest;
jsc.soundcraft.batchRequest = __pcSoundcraftBatchRequest;
jsc.soundcraft.getSettings = __pcSoundcraftGetSettings;
jsc.soundcraft.conn = __pcSoundcraftConn;
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
// v2.13.2 | 2026-09-04
function settings() {
    return [
        {
            name: jsc.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            type: 'title',
            label: jsc.i18n('Configurações do mixer digital') + ':'
        },
        {
            id: 'mixer_model',
            name: jsc.i18n('Integração com a mesa'),
            description: jsc.i18n('Receptores WING e Soundcraft são reconhecidos automaticamente pelo tipo. Esta opção define a integração usada por receptores OSC/UDP legados.'),
            type: 'integer',
            allowed_values: [
                {value: 0, label: 'WING (jsc.wing)'},
                {value: 1, label: 'X32 / M32 (direto)'},
                {value: 2, label: 'Soundcraft (direto)'}
            ],
            default_value: 0
        },
        {
            id: 'digital_mixer_id',
            name: jsc.i18n('Mixer Digital'),
            description: '<html><hr>' + jsc.i18n('Associe o receptor da mesa selecionada. WING e X32/M32 usam OSC/UDP; Soundcraft usa receptor Soundcraft.'),
            type: 'receiver',
            receiver: 'osc,soundcraft,wing'
        },
        {
            id: 'channel_type',
            name: jsc.i18n('Tipo da Entrada'),
            description: jsc.i18n('WING: Input, Aux ou DCA. X32/M32: Input ou Aux. Soundcraft: Input, Aux ou Line.'),
            type: 'integer',
            allowed_values: [
                {value: 0, label: 'Input Channel'},
                {value: 1, label: 'Aux Channel'},
                {value: 2, label: 'Line Channel (Soundcraft)'},
                {value: 3, label: 'DCA (WING)'}
            ],
            default_value: 0
        },
        {
            id: 'mixer_channel',
            name: jsc.i18n('Número do canal'),
            description: jsc.i18n('Confira a faixa válida de canais no modelo selecionado.'),
            type: 'number',
            min: 1,
            max: 40,
            default_value: 1,
            show_as_combobox: true
        },
        {
            id: 'mixer_volume',
            name: jsc.i18n('Volume padrão'),
            description: jsc.i18n('Usado quando o vídeo, áudio ou AP não possui um volume individual definido pelo menu de contexto.'),
            type: 'number',
            component: 'slider',
            min: 0,
            max: 100,
            default_value: 100,
            unit: '%'
        },
        {
            id: 'mixer_volume_fade_seconds',
            name: jsc.i18n('Tempo padrão da mudança gradual'),
            description: jsc.i18n('Valor inicial sugerido ao definir o volume de cada item. Cada vídeo, áudio ou AP pode salvar seu próprio tempo.'),
            type: 'number',
            min: 0.1,
            max: 60,
            default_value: 2,
            unit: 's'
        },
        {
            id: 'preserve_mixer_on_unconfigured_video',
            label: jsc.i18n('Só alterar se o vídeo possuir volume definido'),
            description: '<html>' + jsc.i18n('Quando ativado, vídeos sem volume individual não alteram o fader nem o mute da mesa. Útil para vídeos sem áudio executados enquanto Spotify ou outra fonte continua tocando.'),
            type: 'boolean',
            default_value: true
        },
        {
            type: 'separator'
        },
        {
            type: 'title',
            label: jsc.i18n('Configurações') + ' VLC Player:'
        },
        {
            id: 'vlc_volume_unmute',
            label: jsc.i18n('Alterar Volume') + '/' + jsc.i18n('Mute'),
            type: 'boolean'
        },
        {
            id: 'vlc_volume_level',
            name: jsc.i18n('Volume') + ' VLC',
            description: '',
            type: 'number',
            component: 'slider',
            default_value: 100,
            unit: '%'
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onchange ' + mID);
            }
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// v2.13.2 | 2026-09-04
var mixerLastErrors = {};
var mixerVolumeFadeSerial = 0;
var mixerActiveSmoothCancel = null;
var MIXER_VOLUME_FADE_DEFAULT_SECONDS = 2;
var MIXER_VOLUME_FADE_STEP_MS = 100;

function mixerErrorText(error) {
    return error && error.message ? error.message : String(error);
}

function mixerStageError(stage, error) {
    return '[pcunmute:' + stage + '] ' + mixerErrorText(error);
}
function getMixerTargetType(channelType) {
    if (channelType === 0 || channelType === '0' || channelType === 'channel' || channelType === 'input') {
        return 'channel';
    }
    if (channelType === 1 || channelType === '1' || channelType === 'aux') {
        return 'aux';
    }
    if (channelType === 2 || channelType === '2' || channelType === 'line') {
        return 'line';
    }
    if (channelType === 3 || channelType === '3' || channelType === 'dca' || channelType === 'vca') {
        return 'dca';
    }
    return null;
}

function getMixerModel(mixerModel) {
    if (mixerModel === undefined || mixerModel === null || mixerModel === '' || mixerModel === 0 || mixerModel === '0' || mixerModel === 'wing') {
        return 'wing';
    }
    if (mixerModel === 1 || mixerModel === '1' || mixerModel === 'x32' || mixerModel === 'm32') {
        return 'x32';
    }
    if (mixerModel === 2 || mixerModel === '2' || mixerModel === 'soundcraft') {
        return 'soundcraft';
    }
    throw 'Modelo de mesa invalido: ' + mixerModel;
}

function getMixerModelLabel(mixerModel) {
    var model = getMixerModel(mixerModel);
    return model === 'x32' ? 'X32/M32' : model === 'soundcraft' ? 'Soundcraft' : 'WING';
}

function requireMixerMethod(library, name, label) {
    if (!library) throw 'Biblioteca ' + label + ' nao carregada';
    if (typeof library[name] !== 'function') {
        throw label + '.' + name + ' indisponivel (tipo=' + typeof library[name] + ')';
    }
}

function requireWingMethod(name) {
    if (!jsc.wing) throw 'Biblioteca jsc.wing não carregada';
    if (typeof jsc.wing[name] !== 'function') {
        throw 'jsc.wing.' + name + ' indisponível (tipo=' + typeof jsc.wing[name] + ')';
    }
}

function clampMixerVolume(value) {
    value = parseFloat(value);
    if (isNaN(value)) value = 0;
    if (value < 0) return 0;
    if (value > 1) return 1;
    return value;
}

function getWingMixerTarget(receiverID, channel, channelType) {
    if (!receiverID) return null;
    var targetType = getMixerTargetType(channelType);
    if (!targetType) {
        throw 'Tipo de canal inválido: ' + channelType;
    }

    channel = parseInt(channel, 10);
    if (isNaN(channel) || channel < 1) {
        throw 'Número de canal inválido: ' + channel;
    }

    var action = targetType === 'channel' ? 'Channel' : targetType === 'aux' ? 'Aux' : 'Dca';
    return {
        mute: function() {
            requireWingMethod('set' + action + 'Mute');
            return jsc.wing['set' + action + 'Mute'](receiverID, channel, true);
        },
        unmute: function() {
            requireWingMethod('set' + action + 'Mute');
            return jsc.wing['set' + action + 'Mute'](receiverID, channel, false);
        },
        setVolume: function(volume) {
            requireWingMethod('set' + action + 'Volume');
            return jsc.wing['set' + action + 'Volume'](receiverID, channel, clampMixerVolume(volume));
        },
        setSmoothVolume: function(volume, step) {
            requireWingMethod('setSmooth' + action + 'Volume');
            return jsc.wing['setSmooth' + action + 'Volume'](receiverID, channel, clampMixerVolume(volume), step);
        },
        isMute: function() {
            requireWingMethod('is' + action + 'Mute');
            return jsc.wing['is' + action + 'Mute'](receiverID, channel);
        },
        getVolume: function() {
            requireWingMethod('get' + action + 'Volume');
            return jsc.wing['get' + action + 'Volume'](receiverID, channel);
        },
        toggleMute: function() {
            requireWingMethod('toggle' + action + 'Mute');
            return jsc.wing['toggle' + action + 'Mute'](receiverID, channel);
        },
        smoothDelayMs: 30
    };
}

function normalizeMixerVolumeFadeSeconds(value, fallback) {
    var seconds = parseFloat(String(value).replace(',', '.'));
    var fallbackSeconds = parseFloat(String(fallback).replace(',', '.'));

    if (isNaN(fallbackSeconds)) fallbackSeconds = MIXER_VOLUME_FADE_DEFAULT_SECONDS;
    if (isNaN(seconds)) seconds = fallbackSeconds;
    if (seconds < 0.1) seconds = 0.1;
    if (seconds > 60) seconds = 60;
    return Math.round(seconds * 10) / 10;
}

function validateMixerReceiver(receiverID, mixerModel) {
    var info = h.getReceiverInfo(receiverID);
    if (!info) {
        throw 'Receptor nao encontrado: ' + receiverID;
    }

    var receiverType = String(info.type || '').toLowerCase();
    if (mixerModel === 'soundcraft' && receiverType !== 'soundcraft') {
        throw 'Soundcraft exige receptor do tipo soundcraft; atual=' + (receiverType || 'desconhecido');
    }
    if (mixerModel === 'wing' && receiverType !== 'wing' && receiverType !== 'osc') {
        throw 'WING exige receptor WING ou OSC/UDP; atual=' + (receiverType || 'desconhecido');
    }
    if (mixerModel === 'x32' && receiverType !== 'osc') {
        throw 'X32/M32 exige receptor OSC/UDP; atual=' + (receiverType || 'desconhecido');
    }
    return info;
}

function getX32Target(receiverID, channel, targetType) {
    if (targetType !== 'channel' && targetType !== 'aux') {
        throw 'X32/M32 aceita somente Input Channel ou Aux Channel neste modulo.';
    }

    var action = targetType === 'channel' ? 'Channel' : 'Aux';
    return {
        mute: function() {
            requireMixerMethod(jsc.x32, 'set' + action + 'Mute', 'jsc.x32');
            return jsc.x32['set' + action + 'Mute'](receiverID, channel, true);
        },
        unmute: function() {
            requireMixerMethod(jsc.x32, 'set' + action + 'Mute', 'jsc.x32');
            return jsc.x32['set' + action + 'Mute'](receiverID, channel, false);
        },
        setVolume: function(volume) {
            requireMixerMethod(jsc.x32, 'set' + action + 'Volume', 'jsc.x32');
            return jsc.x32['set' + action + 'Volume'](receiverID, channel, volume);
        },
        setSmoothVolume: function(volume, step) {
            requireMixerMethod(jsc.x32, 'setSmooth' + action + 'Volume', 'jsc.x32');
            return jsc.x32['setSmooth' + action + 'Volume'](receiverID, channel, volume, step);
        },
        isMute: function() {
            requireMixerMethod(jsc.x32, 'is' + action + 'Mute', 'jsc.x32');
            return jsc.x32['is' + action + 'Mute'](receiverID, channel);
        },
        getVolume: function() {
            requireMixerMethod(jsc.x32, 'get' + action + 'Volume', 'jsc.x32');
            return jsc.x32['get' + action + 'Volume'](receiverID, channel);
        },
        toggleMute: function() {
            requireMixerMethod(jsc.x32, 'toggle' + action + 'Mute', 'jsc.x32');
            return jsc.x32['toggle' + action + 'Mute'](receiverID, channel);
        },
        smoothDelayMs: 10
    };
}

function getSoundcraftTarget(receiverID, channel, targetType) {
    var action = targetType === 'channel' ? 'input' : targetType === 'aux' ? 'aux' : targetType === 'line' ? 'line' : null;
    if (!action) {
        throw 'Soundcraft aceita somente Input Channel, Aux Channel ou Line Channel neste modulo.';
    }

    function connection() {
        requireMixerMethod(jsc.soundcraft, 'conn', 'jsc.soundcraft');
        var root = jsc.soundcraft.conn(receiverID);
        requireMixerMethod(root, action, 'jsc.soundcraft.conn');
        return root[action](channel);
    }

    return {
        mute: function() {
            var target = connection();
            requireMixerMethod(target, 'mute', 'jsc.soundcraft.target');
            return target.mute();
        },
        unmute: function() {
            var target = connection();
            requireMixerMethod(target, 'unmute', 'jsc.soundcraft.target');
            return target.unmute();
        },
        setVolume: function(volume) {
            var target = connection();
            requireMixerMethod(target, 'setVolume', 'jsc.soundcraft.target');
            return target.setVolume(volume);
        },
        setSmoothVolume: function(volume, step) {
            var target = connection();
            requireMixerMethod(target, 'setSmoothVolume', 'jsc.soundcraft.target');
            return target.setSmoothVolume(volume, step);
        },
        isMute: function() {
            var target = connection();
            requireMixerMethod(target, 'isMute', 'jsc.soundcraft.target');
            return target.isMute();
        },
        getVolume: function() {
            var target = connection();
            requireMixerMethod(target, 'getVolume', 'jsc.soundcraft.target');
            return target.getVolume();
        },
        toggleMute: function() {
            var target = connection();
            requireMixerMethod(target, 'isMute', 'jsc.soundcraft.target');
            if (target.isMute()) {
                requireMixerMethod(target, 'unmute', 'jsc.soundcraft.target');
                return target.unmute();
            }
            requireMixerMethod(target, 'mute', 'jsc.soundcraft.target');
            return target.mute();
        },
        smoothDelayMs: 10
    };
}

function getMixerTarget(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) return null;

    var receiverInfo = h.getReceiverInfo(receiverID);
    var receiverType = receiverInfo ? String(receiverInfo.type || '').toLowerCase() : '';
    var model = receiverType === 'wing' ? 'wing' :
        receiverType === 'soundcraft' ? 'soundcraft' : getMixerModel(mixerModel);
    var targetType = getMixerTargetType(channelType);
    var parsedChannel = parseInt(channel, 10);

    if (!targetType) throw 'Tipo de canal invalido: ' + channelType;
    if (isNaN(parsedChannel) || parsedChannel < 1) throw 'Numero de canal invalido: ' + channel;

    validateMixerReceiver(receiverID, model);

    if (model === 'x32') return getX32Target(receiverID, parsedChannel, targetType);
    if (model === 'soundcraft') return getSoundcraftTarget(receiverID, parsedChannel, targetType);
    if (targetType === 'line') throw 'WING aceita Input Channel, Aux Channel ou DCA neste modulo.';

    return getWingMixerTarget(receiverID, parsedChannel, targetType);
}

function logMixerError(action, error) {
    var message = mixerErrorText(error);
    if (mixerLastErrors[action] === message) return;
    mixerLastErrors[action] = message;
    h.log(mUID, 'PC unMute v' + moduleVersion + ' | ' + jsc.i18n('Erro no mixer') + ' [' + action + ']: {}', [message]);
}

function clearMixerError(action) {
    mixerLastErrors[action] = null;
}

function unMute(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) {
        return false;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        if (!target) {
            return false;
        }
        try {
            var result = target.unmute();
            if (result === false) throw 'A mesa nao confirmou o unmute.';
        } catch (e1) {
            throw mixerStageError('unMute:target.unmute', e1);
        }
        clearMixerError('unmute');
        return true;
    } catch (e) {
        logMixerError('unmute', e);
        return false;
    }
}

function muteMixer(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) {
        return false;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        if (!target) {
            return false;
        }
        try {
            var result = target.mute();
            if (result === false) throw 'A mesa nao confirmou o mute.';
        } catch (e1) {
            throw mixerStageError('muteMixer:target.mute', e1);
        }
        clearMixerError('mute');
        return true;
    } catch (e) {
        logMixerError('mute', e);
        return false;
    }
}

function setVolume(receiverID, channel, volume, channelType, mixerModel) {
    if (!receiverID) {
        return false;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        if (!target) {
            return false;
        }
        var normalized = clampMixerVolume(volume);
        try {
            var result = target.setVolume(normalized);
            if (result === false) throw 'A mesa nao confirmou o novo volume.';
        } catch (e2) {
            throw mixerStageError('setVolume:target.setVolume', e2);
        }
        clearMixerError('setVolume');
        return true;
    } catch (e) {
        logMixerError('setVolume', e);
        return false;
    }
}

function getMute(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) {
        return null;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        var result = null;
        if (target) {
            try {
                result = target.isMute();
            } catch (e1) {
                throw mixerStageError('getMute:target.isMute', e1);
            }
        }
        clearMixerError('getMute');
        return result;
    } catch (e) {
        logMixerError('getMute', e);
        return null;
    }
}

function getVolume(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) {
        return null;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        var result = null;
        if (target) {
            try {
                result = target.getVolume();
            } catch (e1) {
                throw mixerStageError('getVolume:target.getVolume', e1);
            }
        }
        clearMixerError('getVolume');
        return result;
    } catch (e) {
        logMixerError('getVolume', e);
        return null;
    }
}

function toggleMute(receiverID, channel, channelType, mixerModel) {
    if (!receiverID) {
        h.notificationError(jsc.i18n('Configure o mixer digital antes de usar esta ação.'));
        return false;
    }

    try {
        var target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        if (!target) {
            return false;
        }
        try {
            target.toggleMute();
        } catch (e1) {
            throw mixerStageError('toggleMute:target.toggleMute', e1);
        }
        clearMixerError('toggleMute');
        return true;
    } catch (e) {
        logMixerError('toggleMute', e);
        h.notificationError(jsc.i18n('Não foi possível alternar o mute. Verifique o receptor e o canal.'));
        return false;
    }
}

function SetPluginSettings(module) {
    var s = module.settings;

    if (s.vlc_volume_unmute) {
        h.hly('MediaPlayerAction', {
            mute: false,
            volume: s.vlc_volume_level
        });
    }

    h.setTimeout(function() {
        var player = h.getPlayer();
        var pMute = player.isMute();
        var pRepeat = player.isRepeat();
        var pVolume = player.getVolume();
        var message = '<html><img src="icon,warning"/> <b><u>' + jsc.i18n('Atenção') + ':</u></b><br>';

        if (pRepeat) {
            message += '<br><img src="icon,repeat"/> O modo <b>Repeat</b> está ativado.';
        }
        if (pVolume < 30) {
            message += '<br><img src="icon,volume_down"/> O <b>volume</b> está abaixo de 30%.';
        }
        if (pMute) {
            message += '<br><img src="icon,volume_off"/> O <b>mute</b> está ativado.';
        }
        if (pRepeat || pVolume < 30 || pMute) {
            h.notification(message, 5);
        }
    }, 500);
}

function cancelMixerVolumeFade() {
    if (typeof mixerActiveSmoothCancel === 'function') {
        try {
            mixerActiveSmoothCancel();
        } catch (e) {
            logMixerError('cancelSmoothVolume', e);
        }
    }
    mixerActiveSmoothCancel = null;
    mixerVolumeFadeSerial++;
}

function setVolumeGradually(module, receiverID, channel, targetVolume, channelType, mixerModel, durationSeconds, onFirstStep, onComplete) {
    var finalVolume = clampMixerVolume(targetVolume);
    var fadeSeconds = normalizeMixerVolumeFadeSeconds(durationSeconds, MIXER_VOLUME_FADE_DEFAULT_SECONDS);
    var durationMs = Math.round(fadeSeconds * 1000);
    var firstStepApplied = false;

    function notifyFirstStep() {
        if (firstStepApplied) return;
        firstStepApplied = true;
        if (typeof onFirstStep === 'function') onFirstStep();
    }

    function notifyComplete() {
        if (typeof onComplete === 'function') onComplete();
    }

    cancelMixerVolumeFade();
    var fadeSerial = mixerVolumeFadeSerial;
    var target;
    var initialVolume;
    try {
        target = getMixerTarget(receiverID, channel, channelType, mixerModel);
        initialVolume = target ? target.getVolume() : null;
    } catch (targetError) {
        logMixerError('setSmoothVolume', targetError);
        target = null;
        initialVolume = null;
    }

    // Se a biblioteca não permitir leitura ou transição suave, aplica diretamente.
    if (initialVolume == null || isNaN(initialVolume)) {
        var directResult = setVolume(receiverID, channel, finalVolume, channelType, mixerModel);
        if (directResult) {
            notifyFirstStep();
            notifyComplete();
        }
        return directResult;
    }

    initialVolume = clampMixerVolume(initialVolume);
    if (Math.abs(finalVolume - initialVolume) < 0.001) {
        var sameResult = setVolume(receiverID, channel, finalVolume, channelType, mixerModel);
        if (sameResult) {
            notifyFirstStep();
            notifyComplete();
        }
        return sameResult;
    }

    if (!target || typeof target.setSmoothVolume !== 'function') {
        var fallbackResult = setVolume(receiverID, channel, finalVolume, channelType, mixerModel);
        if (fallbackResult) {
            notifyFirstStep();
            notifyComplete();
        }
        return fallbackResult;
    }

    var smoothDelayMs = target.smoothDelayMs || MIXER_VOLUME_FADE_STEP_MS;
    var distance = Math.abs(finalVolume - initialVolume);
    var requestedSteps = Math.max(1, Math.round(durationMs / smoothDelayMs));
    var smoothStep = Math.max(0.001, Math.min(0.1, distance / requestedSteps));
    var firstVolume = initialVolume + (finalVolume > initialVolume ? smoothStep : -smoothStep);
    if (finalVolume > initialVolume && firstVolume > finalVolume) firstVolume = finalVolume;
    if (finalVolume < initialVolume && firstVolume < finalVolume) firstVolume = finalVolume;
    var remainingDistance = Math.abs(finalVolume - firstVolume);
    var expectedDurationMs = Math.ceil(remainingDistance / smoothStep) * smoothDelayMs + smoothDelayMs;

    moduleLog('Mudança gradual pela biblioteca da mesa: de={}%, para={}%, duração={}ms, passo={}', [
        Math.round(initialVolume * 100),
        Math.round(finalVolume * 100),
        expectedDurationMs,
        smoothStep
    ]);

    try {
        // Mantém a proteção histórica: o primeiro movimento do fader ocorre antes do unmute.
        var firstResult = target.setVolume(firstVolume);
        if (firstResult === false) throw 'A mesa não confirmou a primeira etapa da mudança gradual.';
        notifyFirstStep();
        if (remainingDistance < 0.001) {
            notifyComplete();
            return true;
        }
        var smoothResult = target.setSmoothVolume(finalVolume, smoothStep);
        if (smoothResult === false) throw 'A biblioteca da mesa não iniciou a mudança gradual.';
    } catch (smoothError) {
        logMixerError('setSmoothVolume', smoothError);
        var failedSmoothFallback = setVolume(receiverID, channel, finalVolume, channelType, mixerModel);
        if (failedSmoothFallback) {
            notifyFirstStep();
            notifyComplete();
        }
        return failedSmoothFallback;
    }

    mixerActiveSmoothCancel = function() {
        var currentVolume = target.getVolume();
        if (currentVolume != null && !isNaN(currentVolume)) {
            target.setSmoothVolume(clampMixerVolume(currentVolume), 0.1);
        }
    };

    module.setTimeout(function() {
        if (fadeSerial !== mixerVolumeFadeSerial) return;
        mixerActiveSmoothCancel = null;
        // Garante o valor final exato antes de callbacks como o mute em 0%.
        if (!setVolume(receiverID, channel, finalVolume, channelType, mixerModel)) return;
        moduleLog('Mudança gradual concluída: volume={}%.', [Math.round(finalVolume * 100)]);
        notifyComplete();
    }, expectedDurationMs);
    return true;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226c6f6f7073227d
// v2.8.0 | 2026-08-11
// Leitura temporária para calibrar a curva do fader diretamente na WING.
function loops(module) {
    return [
        {
            name: 'wing_fader_calibration_10s',
            delay: 10000,
            action: function(evt) {
                var s = module.settings || {};
                if (s.log !== true || !s.digital_mixer_id || getMixerModel(s.mixer_model) !== 'wing') return;

                var targetType = getMixerTargetType(s.channel_type);
                var channel = parseInt(s.mixer_channel, 10);
                var rawValue;

                try {
                    if (targetType === 'channel') {
                        requireWingMethod('getChannelVolume');
                        rawValue = jsc.wing.getChannelVolume(s.digital_mixer_id, channel);
                    } else if (targetType === 'aux') {
                        requireWingMethod('getAuxVolume');
                        rawValue = jsc.wing.getAuxVolume(s.digital_mixer_id, channel);
                    } else if (targetType === 'dca') {
                        requireWingMethod('getDcaVolume');
                        rawValue = jsc.wing.getDcaVolume(s.digital_mixer_id, channel);
                    } else {
                        throw 'Tipo de target inválido: ' + targetType;
                    }

                    h.log(mUID, '[calibração WING 10s] target={}, channel={}, raw_fdr={}, gauge_calculado={}%', [
                        targetType,
                        channel,
                        rawValue,
                        Math.round(wingDbToGauge(rawValue) * 10000) / 100
                    ]);
                } catch (e) {
                    h.log(mUID, '[calibração WING 10s] target={}, channel={}, ERRO={}', [
                        targetType,
                        channel,
                        mixerErrorText(e)
                    ]);
                }
            }
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e73227d
// v2.12.1 | 2026-08-30
// Volume individual do canal da mesa por vídeo, áudio ou apresentação automática.

function mediaVolumeStorageKey() {
    return mID + '#media_volume_map_v1';
}

function normalizeMediaType(type) {
    type = type == null ? '' : String(type).toLowerCase();
    if (type === 'automatic_presentation' || type === 'ap') {
        return 'automatic_presentation';
    }
    if (type === 'audio') {
        return 'audio';
    }
    return 'video';
}

function normalizeMediaIdentity(value) {
    if (value == null) {
        return '';
    }
    return String(value)
        .replace(/\\/g, '/')
        .replace(/\/+/g, '/')
        .replace(/^\s+|\s+$/g, '')
        .toLowerCase();
}

function firstMediaIdentity(item, fields) {
    item = item || {};
    for (var i = 0; i < fields.length; i++) {
        var value = item[fields[i]];
        if (value !== null && value !== undefined && String(value) !== '') {
            return normalizeMediaIdentity(value);
        }
    }
    return '';
}

function getMediaItemKey(type, item) {
    type = normalizeMediaType(type);
    var identity;

    if (type === 'automatic_presentation') {
        identity = firstMediaIdentity(item, [
            'name', 'file_name', 'title', 'id',
            'file_fullname', 'file_relative_path', 'file_path', 'path', 'file'
        ]);
    } else {
        identity = firstMediaIdentity(item, [
            'file_fullname', 'file_relative_path', 'file_path', 'path', 'file',
            'file_name', 'name', 'id', 'title'
        ]);
    }

    return identity ? type + '|' + identity : null;
}

function getMediaItemLabel(item) {
    item = item || {};
    var label = item.name || item.file_name || item.title || item.file_fullname ||
        item.file_relative_path || item.file_path || item.path || item.id;

    if (label == null || String(label) === '') {
        return jsc.i18n('Item sem nome');
    }

    label = String(label).replace(/\\/g, '/');
    var slash = label.lastIndexOf('/');
    return slash >= 0 ? label.substring(slash + 1) : label;
}

function getMediaVolumeMap() {
    var map = h.restore(mediaVolumeStorageKey(), {});
    return map && typeof map === 'object' ? map : {};
}

function getSavedMediaVolumeData(type, item) {
    var key = getMediaItemKey(type, item);
    if (!key) {
        return null;
    }

    var map = getMediaVolumeMap();
    var value = map[key];

    // Compatibilidade com os registros antigos, que armazenavam somente o número.
    if (typeof value === 'number' && value >= 0 && value <= 100) {
        return {volume: value, end_volume: 0, gradual: false, fade_seconds: null};
    }
    if (value && typeof value === 'object' &&
        typeof value.volume === 'number' && value.volume >= 0 && value.volume <= 100) {
        return {
            volume: value.volume,
            end_volume: typeof value.end_volume === 'number' &&
                value.end_volume >= 0 && value.end_volume <= 100 ? value.end_volume : 0,
            gradual: value.gradual === true,
            fade_seconds: typeof value.fade_seconds === 'number' ? value.fade_seconds : null
        };
    }
    return null;
}

function getSavedMediaVolume(type, item) {
    var data = getSavedMediaVolumeData(type, item);
    return data ? data.volume : null;
}

function saveMediaVolume(type, item, volume, endVolume, gradual, fadeSeconds) {
    var key = getMediaItemKey(type, item);
    volume = parseInt(volume, 10);
    endVolume = parseInt(endVolume, 10);
    fadeSeconds = parseFloat(String(fadeSeconds).replace(',', '.'));

    if (!key) {
        throw jsc.i18n('Não foi possível identificar esta mídia.');
    }
    if (isNaN(volume) || volume < 0 || volume > 100) {
        throw jsc.i18n('O volume deve estar entre 0 e 100%.');
    }
    if (isNaN(endVolume) || endVolume < 0 || endVolume > 100) {
        throw jsc.i18n('O volume final deve estar entre 0 e 100%.');
    }
    if (isNaN(fadeSeconds) || fadeSeconds < 0.1 || fadeSeconds > 60) {
        throw jsc.i18n('O tempo da mudança gradual deve estar entre 0,1 e 60 segundos.');
    }
    fadeSeconds = Math.round(fadeSeconds * 10) / 10;

    var map = getMediaVolumeMap();
    map[key] = {
        volume: volume,
        end_volume: endVolume,
        gradual: gradual === true,
        fade_seconds: fadeSeconds
    };
    h.store(mediaVolumeStorageKey(), map);
    return key;
}

function removeMediaVolume(type, item) {
    var key = getMediaItemKey(type, item);
    if (!key) {
        return false;
    }

    var map = getMediaVolumeMap();
    if (typeof map[key] !== 'number' && (!map[key] || typeof map[key] !== 'object')) {
        return false;
    }

    delete map[key];
    h.store(mediaVolumeStorageKey(), map);
    return true;
}

function getContextVolumeDefault(module, type, item) {
    var s = module.settings;
    var currentMixerVolume = getVolume(
        s.digital_mixer_id,
        s.mixer_channel,
        s.channel_type,
        s.mixer_model
    );

    // O encerramento configurado pode deixar o fader em zero. Nesse caso,
    // reabrir o diálogo deve preservar o volume inicial salvo do item em vez
    // de substituir visualmente o campo por 0%.
    if (currentMixerVolume != null && !isNaN(currentMixerVolume) && currentMixerVolume > 0) {
        return Math.round(currentMixerVolume * 100);
    }

    var saved = getSavedMediaVolume(type, item);
    if (saved != null) {
        return saved;
    }

    var defaultVolume = parseInt(s.mixer_volume, 10);
    return isNaN(defaultVolume) ? 100 : defaultVolume;
}

function createSetMediaVolumeContextAction(module, type) {
    return {
        name: jsc.i18n('Definir volume deste item na mesa') + ' (' + mID + ')',
        types: [type],
        action: function(evt) {
            var item = evt.item || {};
            var label = getMediaItemLabel(item);
            var savedData = getSavedMediaVolumeData(type, item);
            var saved = savedData ? savedData.volume : null;
            var savedEndVolume = savedData ? savedData.end_volume : 0;
            var defaultVolume = getContextVolumeDefault(module, type, item);
            var defaultFadeSeconds = normalizeMixerVolumeFadeSeconds(
                savedData ? savedData.fade_seconds : null,
                module.settings.mixer_volume_fade_seconds
            );
            var description = jsc.i18n('Volumes aplicados ao canal da mesa ao iniciar e ao terminar este item.');

            if (saved != null) {
                description += '<br>' + jsc.i18n('Volume salvo atualmente') + ': <b>' + saved + '%</b>.';
                description += '<br>' + jsc.i18n('Volume final') + ': <b>' + savedEndVolume + '%</b>' +
                    (savedEndVolume === 0 ? ' + <b>mute</b>' : '') + '.';
                description += '<br>' + jsc.i18n('Mudança gradual') + ': <b>' +
                    (savedData.gradual ? jsc.i18n('ativada') : jsc.i18n('desativada')) + '</b>.';
                if (savedData.gradual) {
                    description += '<br>' + jsc.i18n('Tempo da transição') + ': <b>' + defaultFadeSeconds + ' s</b>.';
                }
            } else {
                description += '<br>' + jsc.i18n('Sem volume individual: está usando o volume padrão do módulo.');
            }

            var result = h.input([
                {
                    id: 'volume',
                    name: '<html><b>' + label + '</b><br>' + jsc.i18n('Volume ao iniciar'),
                    description: description,
                    type: 'number',
                    component: 'slider',
                    min: 0,
                    max: 100,
                    unit: '%',
                    default_value: defaultVolume
                },
                {
                    id: 'end_volume',
                    name: jsc.i18n('Volume ao terminar'),
                    description: jsc.i18n('Aplicado quando o item for fechado. Em 0%, o módulo também ativa o mute depois de posicionar o fader.'),
                    type: 'number',
                    component: 'slider',
                    min: 0,
                    max: 100,
                    unit: '%',
                    default_value: savedEndVolume
                },
                {
                    id: 'gradual',
                    name: jsc.i18n('Alterar o volume gradualmente'),
                    description: jsc.i18n('Ao iniciar e ao terminar este item, faz uma transição suave a partir do volume atual da mesa.'),
                    type: 'boolean',
                    default_value: savedData ? savedData.gradual : false
                },
                {
                    id: 'fade_seconds',
                    name: jsc.i18n('Tempo da mudança gradual'),
                    description: jsc.i18n('Tempo exclusivo deste item, reutilizado na entrada e na saída quando a mudança gradual estiver ativada.'),
                    type: 'number',
                    min: 0.1,
                    max: 60,
                    default_value: defaultFadeSeconds,
                    unit: 's'
                }
            ]);

            if (result == null) {
                return;
            }

            var volume = typeof result === 'object' ? result.volume : result;
            var endVolume = typeof result === 'object' ? result.end_volume : 0;
            var gradual = typeof result === 'object' && result.gradual === true;
            var fadeSeconds = typeof result === 'object' ? result.fade_seconds : defaultFadeSeconds;

            try {
                var key = saveMediaVolume(type, item, volume, endVolume, gradual, fadeSeconds);
                h.notification(
                    jsc.i18n('Volumes individuais salvos') + ': ' + parseInt(volume, 10) + '% → ' +
                        parseInt(endVolume, 10) + '% (' + jsc.i18n('final') + ') → ' + label,
                    4
                );
                moduleLog('Volume individual salvo: key={} inicial={}% final={}% mute_final={} gradual={} tempo={}s label={}', [
                    key,
                    parseInt(volume, 10),
                    parseInt(endVolume, 10),
                    parseInt(endVolume, 10) === 0,
                    gradual,
                    normalizeMixerVolumeFadeSeconds(fadeSeconds, defaultFadeSeconds),
                    label
                ]);
            } catch (e) {
                h.notificationError(String(e), 4);
            }
        }
    };
}

function createRemoveMediaVolumeContextAction(type) {
    return {
        name: jsc.i18n('Remover volume individual deste item') + ' (' + mID + ')',
        types: [type],
        action: function(evt) {
            var item = evt.item || {};
            var label = getMediaItemLabel(item);

            if (removeMediaVolume(type, item)) {
                h.notification(
                    jsc.i18n('Volume individual removido; o item voltará a usar o volume padrão.') + '<br>' + label,
                    4
                );
                h.log(mUID, 'Volume individual removido: type={} label={}', [type, label]);
            } else {
                h.notification(
                    jsc.i18n('Este item ainda não possui volume individual.') + '<br>' + label,
                    3
                );
            }
        }
    };
}

function getMediaVolumeData(type, item, defaultVolume, defaultFadeSeconds) {
    var savedData = getSavedMediaVolumeData(type, item);
    var saved = savedData ? savedData.volume : null;
    var fallback = parseInt(defaultVolume, 10);

    if (isNaN(fallback)) {
        fallback = 100;
    }
    fallback = Math.max(0, Math.min(100, fallback));

    return {
        key: getMediaItemKey(type, item),
        label: getMediaItemLabel(item),
        personalized: saved != null,
        volume: saved != null ? saved : fallback,
        end_volume: savedData ? savedData.end_volume : null,
        gradual: savedData ? savedData.gradual : false,
        fade_seconds: normalizeMixerVolumeFadeSeconds(
            savedData ? savedData.fade_seconds : null,
            defaultFadeSeconds
        )
    };
}

function contextActions(module) {
    var arr = [];
    var types = ['video', 'audio', 'automatic_presentation'];

    for (var i = 0; i < types.length; i++) {
        arr.push(createSetMediaVolumeContextAction(module, types[i]));
        arr.push(createRemoveMediaVolumeContextAction(types[i]));
    }

    return arr;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
// v2.12.0 | 2026-08-30
// Controla entrada e saída do canal para vídeo, áudio e apresentação automática.
var mixerMediaPlaybackSerial = 0;
var mixerMediaCloseSerial = 0;
var activeMixerMediaPlayback = null;

function markMixerMediaDisplaying(type, obj) {
    mixerMediaPlaybackSerial++;
    mixerMediaCloseSerial++;
    activeMixerMediaPlayback = {
        serial: mixerMediaPlaybackSerial,
        key: getMediaItemKey(type, obj),
        type: normalizeMediaType(type)
    };
}

function applyConfiguredMediaEnd(module, type, obj) {
    if (isModuleSuspended()) return;

    var key = getMediaItemKey(type, obj);
    var savedData = getSavedMediaVolumeData(type, obj);
    if (!savedData) return;

    // Se outra mídia já iniciou, o fechamento anterior não pode derrubar seu volume.
    if (activeMixerMediaPlayback &&
        (activeMixerMediaPlayback.key !== key || activeMixerMediaPlayback.type !== normalizeMediaType(type))) {
        moduleLog('Saída ignorada: outra mídia já está ativa. fechando={} ativa={}', [
            key,
            activeMixerMediaPlayback.key
        ]);
        return;
    }

    var playbackSerial = mixerMediaPlaybackSerial;
    var closeSerial = ++mixerMediaCloseSerial;
    activeMixerMediaPlayback = null;

    // Pequeno atraso permite que o gatilho de início da próxima mídia invalide esta saída.
    module.setTimeout(function() {
        if (closeSerial !== mixerMediaCloseSerial || playbackSerial !== mixerMediaPlaybackSerial) {
            moduleLog('Saída cancelada porque uma nova mídia iniciou: key={}', [key]);
            return;
        }

        var s = module.settings;
        var receiverID = s.digital_mixer_id;
        var channel = s.mixer_channel;
        var endVolumePercent = savedData.end_volume;
        var endVolume = endVolumePercent / 100;
        var shouldMute = endVolumePercent === 0;

        moduleLog('Encerrando mídia configurada: model={} receiver={} target={} channel={} volume_final={}% mute_final={} gradual={} tempo={}s media={} key={}', [
            getMixerModelLabel(s.mixer_model),
            receiverID,
            getMixerTargetType(s.channel_type),
            channel,
            endVolumePercent,
            shouldMute,
            savedData.gradual,
            normalizeMixerVolumeFadeSeconds(savedData.fade_seconds, s.mixer_volume_fade_seconds),
            getMediaItemLabel(obj),
            key
        ]);

        function completeEnd() {
            if (shouldMute) {
                if (muteMixer(receiverID, channel, s.channel_type, s.mixer_model)) {
                    moduleLog('Saída concluída: fader em 0% e mute ativado, key={}', [key]);
                } else {
                    moduleLog('Saída incompleta: fader em 0%, mas não foi possível ativar o mute, key={}', [key]);
                }
            } else {
                moduleLog('Saída concluída: volume final={}%, mute preservado, key={}', [endVolumePercent, key]);
            }
            module.updatePanel();
        }

        if (savedData.gradual) {
            if (!setVolumeGradually(
                module,
                receiverID,
                channel,
                endVolume,
                s.channel_type,
                s.mixer_model,
                savedData.fade_seconds,
                null,
                completeEnd
            )) {
                moduleLog('Não foi possível iniciar a mudança gradual de saída: key={}', [key]);
            }
        } else {
            cancelMixerVolumeFade();
            if (setVolume(receiverID, channel, endVolume, s.channel_type, s.mixer_model)) {
                completeEnd();
            } else {
                moduleLog('Não foi possível aplicar o volume final da mídia: key={}', [key]);
            }
        }
    }, 100);
}
function triggers(module) {
    var arr = [];
    var types = ['video', 'audio', 'automatic_presentation'];

    for (var i = 0; i < types.length; i++) {
        var type = types[i];

        arr.push({
            id: 'mixer_volume_' + type + mUID,
            when: 'displaying',
            item: 'any_' + type,
            action: (function(currentType) {
                return function(obj) {
                    if (isModuleSuspended()) {
                        return;
                    }

                    markMixerMediaDisplaying(currentType, obj);

                    var s = module.settings;
                    var receiverID = s.digital_mixer_id;
                    var channel = s.mixer_channel;
                    var volumeData = getMediaVolumeData(
                        currentType,
                        obj,
                        s.mixer_volume,
                        s.mixer_volume_fade_seconds
                    );

                    if (currentType === 'video' &&
                        !volumeData.personalized &&
                        s.preserve_mixer_on_unconfigured_video !== false) {
                        h.log(mUID, 'Vídeo sem volume individual: mesa preservada (fader e mute inalterados), media: {}, key: {}', [
                            volumeData.label,
                            volumeData.key
                        ]);
                        SetPluginSettings(module);
                        module.updatePanel();
                        return;
                    }

                    var volume = volumeData.volume / 100;

                    h.log(mUID, jsc.i18n('Liberando mixer') + ', model: {}, receiver: {}, target: {}, channel: {}, volume: {}%, gradual: {}, tempo: {}s, source: {}, media: {}, key: {}', [
                        getMixerModelLabel(s.mixer_model),
                        receiverID,
                        getMixerTargetType(s.channel_type),
                        channel,
                        volumeData.volume,
                        volumeData.gradual,
                        volumeData.fade_seconds,
                        volumeData.personalized ? 'individual' : 'padrão',
                        volumeData.label,
                        volumeData.key
                    ]);

                    SetPluginSettings(module);
                    if (volumeData.gradual) {
                        // A primeira etapa é aplicada antes do unmute. Uma nova mídia
                        // cancela automaticamente a transição ainda em andamento.
                        if (!setVolumeGradually(module, receiverID, channel, volume, s.channel_type, s.mixer_model, volumeData.fade_seconds, function() {
                            unMute(receiverID, channel, s.channel_type, s.mixer_model);
                        })) {
                            h.log(mUID, 'Canal mantido em mute: não foi possível iniciar a mudança gradual.');
                        }
                    } else {
                        cancelMixerVolumeFade();
                        // Segurança: posiciona o fader antes de liberar o canal para
                        // evitar um pico breve no volume anterior da mesa.
                        if (setVolume(receiverID, channel, volume, s.channel_type, s.mixer_model)) {
                            unMute(receiverID, channel, s.channel_type, s.mixer_model);
                        } else {
                            h.log(mUID, 'Canal mantido em mute: não foi possível aplicar o volume da mídia.');
                        }
                    }
                    module.updatePanel();
                };
            })(type)
        });

        arr.push({
            id: 'mixer_volume_close_' + type + mUID,
            when: 'closing',
            item: 'any_' + type,
            action: (function(currentType) {
                return function(obj) {
                    applyConfiguredMediaEnd(module, currentType, obj || {});
                };
            })(type)
        });
    }

    return arr;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// v2.10.0 | 2026-08-21
function actions(module) {
    return [
        actionStatusChannel(module),
        actionVolumeChannel(module)
    ];
}

function actionVolumeChannel(module) {
    return {
        id: 'changeVolume',
        label: '',
        icon: 'tune',
        hint: jsc.i18n('Alterar Volume'),
        action: function(evt) {
            var s = module.settings;
            var volume = getVolume(s.digital_mixer_id, s.mixer_channel, s.channel_type, s.mixer_model);
            var fallback = parseFloat(s.mixer_volume) / 100;

            if (volume == null || isNaN(volume)) {
                volume = isNaN(fallback) ? 0 : fallback;
            }

            var inputs = [{
                id: 'mixer_volume',
                name: jsc.i18n('Volume'),
                type: 'number',
                component: 'slider',
                min: 0,
                max: 100,
                default_value: (volume * 100).toFixed(0),
                unit: '%',
                onchange: function(obj) {
                    var current = module.settings;
                    cancelMixerVolumeFade();
                    setVolume(
                        current.digital_mixer_id,
                        current.mixer_channel,
                        obj.input.mixer_volume / 100,
                        current.channel_type,
                        current.mixer_model
                    );
                }
            }];

            h.setTimeout(function() {
                h.input(inputs);
            }, 0);
        }
    };
}

function actionStatusChannel(module) {
    return {
        id: 'toggleMute',
        hint: jsc.i18n('Alternar Mute'),
        icon: 'volume_up',
        action: function(evt) {
            var s = module.settings;
            toggleMute(s.digital_mixer_id, s.mixer_channel, s.channel_type, s.mixer_model);
        },
        status: function(evt) {
            if (!module.isEnabled()) {
                return;
            }

            var s = module.settings;
            var mute = getMute(s.digital_mixer_id, s.mixer_channel, s.channel_type, s.mixer_model);
            var result = {
                icon: mute === true ? 'volume_off' : 'volume_up',
                hint: mute === true ? jsc.i18n('Desativar Mute') : jsc.i18n('Ativar Mute')
            };

            if (mute === true) {
                result.background = '790903';
            }
            return result;
        }
    };
}
