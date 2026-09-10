// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
// v1.5.3 | 2026-09-09
var mID = '@prcris#m30';
var mUID = mID + '';
var currentModule = null;

//#import modules_generic_functions

function startup(module) {
    currentModule = module;
    mUID = mID + module.id;
    logState(module.settings.log, mUID,'startup '+ mID);

    if (isDev() && module.settings.log && module.isEnabled()) {
        h.openWindow('js_monitor');
    }
}

function info() {
    return {
        id: mID,
        name: 'Video Wallpaper Auto',
        description: '<html>' +
                     '<div style="text-align: left;">' +
                     '<b>Módulo de Wallpaper Automático para Vídeos</b><br><br>' +
                     'Este módulo automatiza a troca de wallpapers durante a reprodução de vídeos no Holyrics:<br><br>' +
                     '<b>• Troca automática de wallpaper:</b> Ao iniciar um vídeo, aplica o fundo associado ao arquivo ou o configurado para o evento.<br>' +
                     '<b>• Associação por vídeo:</b> Pelo menu de contexto, permite escolher fundos START e END específicos para qualquer vídeo da playlist.<br>' +
                     '<b>• Indicador na lista (Holyrics 2.30+):</b> Exibe um ícone nos vídeos que possuem fundo START ou END individual.<br>' +
                     '<b>• Wallpapers por evento:</b> Permite configurar fundos diferentes para cada evento do calendário.<br>' +
                     '<b>• Padrões gerais:</b> Se o evento não tiver um fundo definido, usa o respectivo padrão geral.<br>' +
                     '<b>• Fundo de retorno:</b> Quando o vídeo termina, aplica o fundo de retorno do evento ou o padrão geral.<br>' +
                     '<b>• Compatibilidade total:</b> Funciona com qualquer tipo de vídeo reproduzido no Holyrics.<br><br>' +
                     'Ideal para criar experiências visuais personalizadas durante apresentações de vídeo.<br><br>' +
                     infoVDDMM +
                     '</div>',
        i18n: {
            name: {
                en: 'Video Wallpaper Auto',
                pt: 'Video Wallpaper Auto',
                es: 'Video Wallpaper Auto',
                ru: 'Авто Обои для Видео',
                it: 'Sfondo Video Automatico'
            },
            description: {
                en: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Automatic Wallpaper Module for Videos</b><br><br>' +
                    'This module automates wallpaper switching during video playback in Holyrics:<br><br>' +
                    '<b>• Automatic wallpaper switching:</b> When a video starts, applies the wallpaper associated with the file or configured for the event.<br>' +
                    '<b>• Per-video association:</b> From the context menu, choose specific START and END wallpapers for any video in the playlist.<br>' +
                    '<b>• List indicator (Holyrics 2.30+):</b> Shows an icon on videos with an individual START or END wallpaper.<br>' +
                    '<b>• Event wallpapers:</b> Allows different wallpapers to be configured for each calendar event.<br>' +
                    '<b>• General defaults:</b> If the event has no wallpaper defined, uses the corresponding general default.<br>' +
                    '<b>• Return wallpaper:</b> When the video ends, applies the event return wallpaper or the general default.<br>' +
                    '<b>• Full compatibility:</b> Works with any type of video played in Holyrics.<br><br>' +
                    'Perfect for creating personalized visual experiences during video presentations.<br><br>' +
                    infoVDDMM +
                    '</div>',
                pt: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Wallpaper Automático para Vídeos</b><br><br>' +
                    'Este módulo automatiza a troca de wallpapers durante a reprodução de vídeos no Holyrics:<br><br>' +
                    '<b>• Troca automática de wallpaper:</b> Ao iniciar um vídeo, aplica o fundo associado ao arquivo ou o configurado para o evento.<br>' +
                    '<b>• Associação por vídeo:</b> Pelo menu de contexto, permite escolher fundos START e END específicos para qualquer vídeo da playlist.<br>' +
                    '<b>• Indicador na lista (Holyrics 2.30+):</b> Exibe um ícone nos vídeos que possuem fundo START ou END individual.<br>' +
                    '<b>• Wallpapers por evento:</b> Permite configurar fundos diferentes para cada evento do calendário.<br>' +
                    '<b>• Padrões gerais:</b> Se o evento não tiver um fundo definido, usa o respectivo padrão geral.<br>' +
                    '<b>• Fundo de retorno:</b> Quando o vídeo termina, aplica o fundo de retorno do evento ou o padrão geral.<br>' +
                    '<b>• Compatibilidade total:</b> Funciona com qualquer tipo de vídeo reproduzido no Holyrics.<br><br>' +
                    'Ideal para criar experiências visuais personalizadas durante apresentações de vídeo.<br><br>' +
                    infoVDDMM +
                    '</div>',
                es: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Wallpaper Automático para Videos</b><br><br>' +
                    'Este módulo automatiza el cambio de wallpapers durante la reproducción de videos en Holyrics:<br><br>' +
                    '<b>• Cambio automático de wallpaper:</b> Al iniciar un video, aplica el fondo asociado al archivo o configurado para el evento.<br>' +
                    '<b>• Asociación por video:</b> Desde el menú contextual, permite elegir fondos START y END específicos para cualquier video de la lista.<br>' +
                    '<b>• Indicador en la lista (Holyrics 2.30+):</b> Muestra un icono en los videos con fondo START o END individual.<br>' +
                    '<b>• Wallpapers por evento:</b> Permite configurar fondos diferentes para cada evento del calendario.<br>' +
                    '<b>• Valores generales:</b> Si el evento no tiene un fondo definido, usa el valor general correspondiente.<br>' +
                    '<b>• Fondo de retorno:</b> Cuando el video termina, aplica el fondo de retorno del evento o el valor general.<br>' +
                    '<b>• Compatibilidad total:</b> Funciona con cualquier tipo de video reproducido en Holyrics.<br><br>' +
                    'Perfecto para crear experiencias visuales personalizadas durante presentaciones de video.<br><br>' +
                    infoVDDMM +
                    '</div>',
                ru: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Модуль Автоматических Обоев для Видео</b><br><br>' +
                    'Этот модуль автоматизирует смену обоев во время воспроизведения видео в Holyrics:<br><br>' +
                    '<b>• Автоматическая смена обоев:</b> При запуске видео применяются обои, связанные с файлом или настроенные для события.<br>' +
                    '<b>• Привязка к видео:</b> Через контекстное меню можно выбрать отдельные обои START и END для любого видео в плейлисте.<br>' +
                    '<b>• Индикатор в списке (Holyrics 2.30+):</b> Показывает значок у видео с индивидуальными обоями START или END.<br>' +
                    '<b>• Обои для событий:</b> Позволяет настраивать разные обои для каждого события календаря.<br>' +
                    '<b>• Общие значения:</b> Если для события обои не заданы, используется соответствующее общее значение.<br>' +
                    '<b>• Обои возврата:</b> После завершения видео применяются обои возврата события или общее значение.<br>' +
                    '<b>• Полная совместимость:</b> Работает с любым типом видео, воспроизводимым в Holyrics.<br><br>' +
                    'Идеально для создания персонализированного визуального опыта во время видеопрезентаций.<br><br>' +
                    infoVDDMM +
                    '</div>',
                it: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Modulo di sfondo automatico per i video</b><br><br>' +
                    'Questo modulo automatizza il cambio dello sfondo durante la riproduzione dei video in Holyrics:<br><br>' +
                    '<b>• Cambio automatico dello sfondo:</b> All’avvio di un video, applica lo sfondo associato al file o configurato per l’evento.<br>' +
                    '<b>• Associazione per video:</b> Dal menu contestuale, consente di scegliere sfondi START e END specifici per qualsiasi video della playlist.<br>' +
                    '<b>• Indicatore nell’elenco (Holyrics 2.30+):</b> Mostra un’icona sui video con uno sfondo START o END individuale.<br>' +
                    '<b>• Sfondi per evento:</b> Consente di configurare sfondi diversi per ogni evento del calendario.<br>' +
                    '<b>• Valori generali:</b> Se l’evento non ha uno sfondo definito, utilizza il valore generale corrispondente.<br>' +
                    '<b>• Sfondo di ritorno:</b> Al termine del video, applica lo sfondo di ritorno dell’evento o il valore generale.<br>' +
                    '<b>• Compatibilità completa:</b> Funziona con qualsiasi tipo di video riprodotto in Holyrics.<br><br>' +
                    'Ideale per creare esperienze visive personalizzate durante le presentazioni video.<br><br>' +
                    infoVDDMM +
                    '</div>'
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
// v1.4.2 | 2026-08-30
function logVideoWallpaperTriggerError(message) {
    var text = String(message || 'Erro desconhecido');
    try {
        h.log(mUID, '{%t} ERRO NO TRIGGER DE WALLPAPER: ' + text);
    } catch (e1) {}
    try {
        if (currentModule && typeof currentModule.log === 'function') {
            currentModule.log('ERRO NO TRIGGER DE WALLPAPER: ' + text);
        }
    } catch (e2) {}
}

function getVideoFileFromWallpaperTrigger(obj) {
    obj = obj || {};
    return obj.file_fullname || obj.file_relative_path || obj.file_path ||
        obj.path || obj.file || obj.file_name || obj.name || '';
}

function triggers(module) {
    startup(module);
    var arr = [];

    // Trigger 1: Ao exibir qualquer vídeo
    arr.push({
        id: "video_wallpaper_show_" + mUID,
        when: "displaying",
        item: "any_video",
        action: function(obj) {
            if (isModuleSuspended()) {
                return;
            }
            try {
                var videoFile = getVideoFileFromWallpaperTrigger(obj);
                trocarWallpaperVideo(module, videoFile);
            } catch (e) {
                logVideoWallpaperTriggerError(e && e.message ? e.message : e);
            }
        }
    });

    // Trigger 2: Ao encerrar qualquer vídeo
    arr.push({
        id: "video_wallpaper_hide_" + mUID,
        when: "closing",
        item: "any_video",
        action: function(obj) {
            if (isModuleSuspended()) {
                return;
            }
            try {
                restaurarWallpaperPadrao(module, getVideoFileFromWallpaperTrigger(obj));
            } catch (e) {
                logVideoWallpaperTriggerError(e && e.message ? e.message : e);
            }
        }
    });

    return arr;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
// v1.5.3 | 2026-09-09
function settings() {
    return [
        {
            name: jsc.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'title',
            label: jsc.i18n('Padrões gerais START / END')
        },
        {
            id: 'wallpaper_default_video',
            name: jsc.i18n('START — fundo durante o vídeo (geral)'),
            description: jsc.i18n('Aplicado ao começar o vídeo quando não houver associação individual nem START definido para o evento'),
            type: 'image'
        },
        {
            id: 'wallpaper_padrao',
            name: jsc.i18n('END — fundo após o vídeo (geral)'),
            description: jsc.i18n('Aplicado ao terminar o vídeo quando o evento atual não tiver um END definido'),
            type: 'image'
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            description: jsc.i18n('Opção para habilitar o log de atividades'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onchange ' + mID);
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// v1.4.2 | 2026-08-30

var WALLPAPER_EVENT_SETTINGS_PREFIX = 'wallpaper_evento_';

/**
 * Chave do armazenamento persistente das associações entre vídeos e wallpapers.
 */
function videoWallpaperAssociationStorageKey() {
    return mID + '#video_wallpaper_associations_v1';
}

/**
 * Normaliza caminhos para que o contexto e o trigger encontrem a mesma associação.
 */
function normalizeVideoWallpaperIdentity(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return String(value)
        .replace(/\\/g, '/')
        .replace(/\/+/g, '/')
        .replace(/^\s+|\s+$/g, '')
        .toLowerCase();
}

/**
 * Obtém a melhor identidade disponível para um vídeo.
 */
function getVideoWallpaperIdentity(video) {
    if (typeof video === 'string' || typeof video === 'number') {
        return normalizeVideoWallpaperIdentity(video);
    }

    video = video || {};
    var fields = [
        'file_fullname', 'file_relative_path', 'file_path', 'path', 'file',
        'file_name', 'name', 'id', 'title'
    ];
    for (var i = 0; i < fields.length; i++) {
        var value = video[fields[i]];
        if (value !== null && value !== undefined && String(value) !== '') {
            return normalizeVideoWallpaperIdentity(value);
        }
    }
    return '';
}

function getVideoWallpaperItemKey(video) {
    var identity = getVideoWallpaperIdentity(video);
    return identity ? 'video|' + identity : '';
}

function getVideoWallpaperItemLabel(video) {
    var label = '';
    if (typeof video === 'string' || typeof video === 'number') {
        label = String(video);
    } else {
        video = video || {};
        label = video.name || video.file_name || video.title || video.file_fullname ||
            video.file_relative_path || video.file_path || video.path || video.file || video.id || '';
    }
    if (!label) {
        return jsc.i18n('Vídeo sem nome');
    }
    label = String(label).replace(/\\/g, '/');
    var slash = label.lastIndexOf('/');
    return slash >= 0 ? label.substring(slash + 1) : label;
}

function getVideoWallpaperKeyBasename(key) {
    var identity = String(key || '').replace(/^video\|/, '');
    var slash = identity.lastIndexOf('/');
    return slash >= 0 ? identity.substring(slash + 1) : identity;
}

function getVideoWallpaperAssociationMap() {
    try {
        if (typeof h.restore !== 'function') {
            return {};
        }
        var map = h.restore(videoWallpaperAssociationStorageKey());
        return map && typeof map === 'object' ? map : {};
    } catch (e) {
        h.log(mUID, '{%t} Associação individual indisponível; seguindo com a troca automática: ' + e);
        return {};
    }
}

/**
 * Busca primeiro pelo caminho completo e, se necessário, por um nome de arquivo único.
 */
function getVideoWallpaperAssociationFile(association, phase) {
    if (!association) {
        return '';
    }
    if (phase === 'end') {
        return getWallpaperFile(association.end_file || association.end_wallpaper);
    }
    return getWallpaperFile(association.start_file || association.file || association.wallpaper || association);
}

function getAssociatedVideoWallpaper(video, phase) {
    try {
        var key = getVideoWallpaperItemKey(video);
        if (!key) {
            return null;
        }

        var map = getVideoWallpaperAssociationMap();
        var direct = map[key];
        if (direct && getVideoWallpaperAssociationFile(direct, phase)) {
            return direct;
        }

        var basename = getVideoWallpaperKeyBasename(key);
        var matched = null;
        for (var savedKey in map) {
            if (!Object.prototype.hasOwnProperty.call(map, savedKey) ||
                getVideoWallpaperKeyBasename(savedKey) !== basename) {
                continue;
            }
            var candidate = map[savedKey];
            if (!candidate || !getVideoWallpaperAssociationFile(candidate, phase)) {
                continue;
            }
            if (matched) {
                h.log(mUID, '{%t} Associação por nome ignorada porque há vídeos homônimos: ' + basename);
                return null;
            }
            matched = candidate;
        }
        return matched;
    } catch (e) {
        h.log(mUID, '{%t} Erro não bloqueante ao consultar wallpaper associado: ' + e);
        return null;
    }
}

function saveVideoWallpaperAssociation(video, imageSetting, phase) {
    var key = getVideoWallpaperItemKey(video);
    var file = getWallpaperFile(imageSetting);
    if (!key) {
        throw jsc.i18n('Não foi possível identificar este vídeo.');
    }
    if (!file) {
        throw jsc.i18n('Selecione uma imagem para associar ao vídeo.');
    }

    var map = getVideoWallpaperAssociationMap();
    var association = map[key] && typeof map[key] === 'object' ? map[key] : {};
    if (phase === 'end') {
        association.end_file = file;
    } else {
        association.start_file = file;
        association.file = file;
    }
    association.video_label = getVideoWallpaperItemLabel(video);
    map[key] = association;
    if (typeof h.store !== 'function') {
        throw jsc.i18n('O armazenamento persistente não está disponível nesta versão do Holyrics.');
    }
    h.store(videoWallpaperAssociationStorageKey(), map);
    return map[key];
}

/**
 * Salva START e END de uma vez. Campos vazios removem apenas a respectiva fase.
 */
function saveVideoWallpaperAssociations(video, startSetting, endSetting) {
    var key = getVideoWallpaperItemKey(video);
    if (!key) {
        throw jsc.i18n('Não foi possível identificar este vídeo.');
    }
    if (typeof h.store !== 'function') {
        throw jsc.i18n('O armazenamento persistente não está disponível nesta versão do Holyrics.');
    }

    var startFile = getWallpaperFile(startSetting);
    var endFile = getWallpaperFile(endSetting);
    var map = getVideoWallpaperAssociationMap();
    var association = map[key] && typeof map[key] === 'object' ? map[key] : {};

    delete association.start_file;
    delete association.file;
    delete association.wallpaper;
    delete association.end_file;
    delete association.end_wallpaper;

    if (startFile) {
        association.start_file = startFile;
        association.file = startFile;
    }
    if (endFile) {
        association.end_file = endFile;
    }

    if (startFile || endFile) {
        association.video_label = getVideoWallpaperItemLabel(video);
        map[key] = association;
    } else {
        delete map[key];
    }
    h.store(videoWallpaperAssociationStorageKey(), map);
    return {
        start_file: startFile,
        end_file: endFile
    };
}

function removeVideoWallpaperAssociation(video, phase) {
    var key = getVideoWallpaperItemKey(video);
    if (!key) {
        return false;
    }

    var map = getVideoWallpaperAssociationMap();
    if (!map[key]) {
        return false;
    }
    if (phase === 'end' && !getVideoWallpaperAssociationFile(map[key], 'end')) {
        return false;
    }
    if (phase === 'start' && !getVideoWallpaperAssociationFile(map[key], 'start')) {
        return false;
    }
    if (phase === 'end') {
        delete map[key].end_file;
        delete map[key].end_wallpaper;
    } else if (phase === 'start') {
        delete map[key].start_file;
        delete map[key].file;
        delete map[key].wallpaper;
    } else {
        delete map[key];
    }
    if (map[key] && !getVideoWallpaperAssociationFile(map[key], 'start') &&
        !getVideoWallpaperAssociationFile(map[key], 'end')) {
        delete map[key];
    }
    if (typeof h.store !== 'function') {
        return false;
    }
    h.store(videoWallpaperAssociationStorageKey(), map);
    return true;
}

/**
 * Retorna o nome do evento atual do calendário.
 */
function getCurrentWallpaperEventName() {
    try {
        var result = h.hly('GetCurrentSchedule');
        if (result && result.data && result.data.length > 0 && result.data[0] && result.data[0].name) {
            return String(result.data[0].name);
        }
    } catch (e) {
        h.log(mUID, '{%t} Erro ao obter o evento atual: ' + e.message);
    }
    return '';
}

/**
 * Monta a chave persistente usada pelo inputSettings do evento.
 */
function getWallpaperEventSettingsKey(eventName) {
    return WALLPAPER_EVENT_SETTINGS_PREFIX + eventName;
}

/**
 * Obtém as configurações salvas para o evento atual.
 */
function getCurrentWallpaperEventSettings(module) {
    var eventName = getCurrentWallpaperEventName();
    if (!eventName || !module || !module.settings) {
        return null;
    }
    return module.settings[getWallpaperEventSettingsKey(eventName)] || null;
}

/**
 * Extrai o nome do arquivo retornado por um input do tipo image.
 */
function getWallpaperFile(imageSetting, depth) {
    depth = depth || 0;
    if (depth > 5) {
        return '';
    }
    if (!imageSetting) {
        return '';
    }
    if (typeof imageSetting === 'string') {
        return imageSetting;
    }
    if (typeof imageSetting === 'number' || typeof imageSetting === 'boolean') {
        return '';
    }

    // Alguns seletores retornam uma lista mesmo quando apenas uma imagem é permitida.
    if (Object.prototype.toString.call(imageSetting) === '[object Array]') {
        for (var a = 0; a < imageSetting.length; a++) {
            var arrayFile = getWallpaperFile(imageSetting[a], depth + 1);
            if (arrayFile) {
                return arrayFile;
            }
        }
        return '';
    }

    // Campos diretos observados nos inputs de arquivo/imagem do Holyrics.
    var directFields = [
        'file_fullname', 'file_relative_path', 'file_path', 'path',
        'fullname', 'filename', 'name'
    ];
    for (var i = 0; i < directFields.length; i++) {
        var directValue = imageSetting[directFields[i]];
        if (typeof directValue === 'string' && directValue !== '') {
            return directValue;
        }
    }

    // Wrappers usados por diferentes versões de h.input e module.inputSettings.
    var nestedFields = [
        'wallpaper', 'input', 'value', 'selected', 'selection',
        'data', 'item', 'items', 'file', 'image'
    ];
    for (var j = 0; j < nestedFields.length; j++) {
        var nestedValue = imageSetting[nestedFields[j]];
        if (nestedValue !== null && nestedValue !== undefined) {
            var nestedFile = getWallpaperFile(nestedValue, depth + 1);
            if (nestedFile) {
                return nestedFile;
            }
        }
    }

    // Objetos Java de arquivo podem expor apenas uma representação textual.
    try {
        var textValue = String(imageSetting);
        if (textValue && textValue !== '[object Object]' &&
            /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(textValue)) {
            return textValue;
        }
    } catch (e) {}
    return '';
}

/**
 * Obtém um campo START/END sem confundir wrappers retornados pelos inputs.
 */
function getWallpaperSettingValue(container, settingId, depth) {
    depth = depth || 0;
    if (!container || typeof container !== 'object' || depth > 5) {
        return null;
    }
    if (container[settingId] !== null && container[settingId] !== undefined) {
        return container[settingId];
    }

    var wrappers = ['input', 'value', 'data', 'settings', 'selected', 'selection'];
    for (var i = 0; i < wrappers.length; i++) {
        var wrapped = container[wrappers[i]];
        if (wrapped !== null && wrapped !== undefined) {
            var found = getWallpaperSettingValue(wrapped, settingId, depth + 1);
            if (found !== null && found !== undefined) {
                return found;
            }
        }
    }
    return null;
}

/**
 * Resolve um wallpaper por evento e aplica o padrão geral como fallback.
 */
function resolveWallpaperSetting(module, settingId) {
    var eventName = getCurrentWallpaperEventName();
    var eventSettings = getCurrentWallpaperEventSettings(module);
    var eventValue = eventSettings ? getWallpaperSettingValue(eventSettings, settingId) : null;
    var eventFile = getWallpaperFile(eventValue);
    var defaultFile = module && module.settings ? getWallpaperFile(module.settings[settingId]) : '';

    if (eventFile) {
        return {
            file: eventFile,
            source: 'evento',
            eventName: eventName
        };
    }
    if (defaultFile) {
        return {
            file: defaultFile,
            source: 'padrão geral',
            eventName: eventName
        };
    }
    return {
        file: '',
        source: '',
        eventName: eventName
    };
}

/**
 * Abre a configuração de wallpapers do evento atual.
 */
function configurarWallpaperEvento(module) {
    var eventName = getCurrentWallpaperEventName();
    if (!eventName) {
        h.notificationError(jsc.i18n('Nenhum evento atual foi encontrado'), 5);
        h.log(mUID, '{%t} Configuração por evento cancelada: nenhum evento atual');
        return;
    }

    var inputs = [
        {
            type: 'title',
            name: '<html><b>' + jsc.i18n('Wallpapers do evento') + ': ' + eventName + '</b></html>'
        },
        {
            type: 'label',
            name: jsc.i18n('Campos vazios usam automaticamente o respectivo padrão geral do módulo.')
        },
        {
            id: 'wallpaper_default_video',
            name: jsc.i18n('START — fundo durante o vídeo'),
            description: jsc.i18n('Aplicado no displaying/início. A associação individual do vídeo tem prioridade sobre este campo.'),
            type: 'image'
        },
        {
            id: 'wallpaper_padrao',
            name: jsc.i18n('END — fundo após o vídeo'),
            description: jsc.i18n('Aplicado no closing/fim quando o vídeo não possui um END individual.'),
            type: 'image'
        }
    ];
    var settingsKey = getWallpaperEventSettingsKey(eventName);
    var selected = module.inputSettings(settingsKey, inputs);

    if (selected !== null) {
        var startValue = getWallpaperSettingValue(selected, 'wallpaper_default_video');
        var endValue = getWallpaperSettingValue(selected, 'wallpaper_padrao');
        module.settings[settingsKey] = {
            wallpaper_default_video: startValue,
            wallpaper_padrao: endValue
        };
        h.notification(jsc.i18n('Wallpapers configurados para o evento') + ': ' + eventName, 4);
        h.log(mUID, '{%t} [CONFIG] evento=' + eventName +
            ' | START=' + (getWallpaperFile(startValue) || '(padrão geral)') +
            ' | END=' + (getWallpaperFile(endValue) || '(padrão geral)'));
    }
}
/**
 * Troca o wallpaper quando um vídeo começar
 */
function trocarWallpaperVideo(module, nomeArquivoVideo) {
    nomeArquivoVideo = nomeArquivoVideo === null || nomeArquivoVideo === undefined ? '' : String(nomeArquivoVideo);

    var wallpaperEncontrado = null;
    var association = null;
    var source = '';

    try {
        association = nomeArquivoVideo ? getAssociatedVideoWallpaper(nomeArquivoVideo) : null;
    } catch (associationError) {
        h.log(mUID, '{%t} Associação individual ignorada por erro: ' + associationError);
    }

    // Uma associação explícita feita pelo menu de contexto sempre tem prioridade.
    if (association) {
        wallpaperEncontrado = getVideoWallpaperAssociationFile(association, 'start');
        source = 'associação individual';
    }

    // Sem associação individual, usa diretamente o wallpaper do evento ou o padrão geral.
    if (!wallpaperEncontrado) {
        var videoWallpaper = resolveWallpaperSetting(module, 'wallpaper_default_video');
        wallpaperEncontrado = videoWallpaper.file;
        source = videoWallpaper.source;
    }

    // Aplica o wallpaper encontrado
    if (wallpaperEncontrado) {
        var startResult = aplicarWallpaper(wallpaperEncontrado);
        h.log(mUID, '{%t} [START/displaying] vídeo=' + nomeArquivoVideo +
            ' | origem=' + source + ' | fundo=' + wallpaperEncontrado +
            ' | status=' + (startResult.ok ? 'aplicado' : 'erro: ' + startResult.error));
    } else {
        h.log(mUID, '{%t} [START/displaying] vídeo=' + nomeArquivoVideo +
            ' | origem=nenhuma | fundo=(não configurado) | status=ignorado');
    }
}

/**
 * Restaura o wallpaper padrão quando o vídeo terminar
 */
function restaurarWallpaperPadrao(module, nomeArquivoVideo) {
    nomeArquivoVideo = nomeArquivoVideo === null || nomeArquivoVideo === undefined ? '' : String(nomeArquivoVideo);
    var association = nomeArquivoVideo ? getAssociatedVideoWallpaper(nomeArquivoVideo, 'end') : null;
    var associatedEndFile = getVideoWallpaperAssociationFile(association, 'end');
    var endWallpaper = associatedEndFile ? {
        file: associatedEndFile,
        source: 'associação individual'
    } : resolveWallpaperSetting(module, 'wallpaper_padrao');
    if (endWallpaper.file) {
        var endResult = aplicarWallpaper(endWallpaper.file);
        h.log(mUID, '{%t} [END/closing] vídeo=' + (nomeArquivoVideo || '(ação manual)') +
            ' | origem=' + endWallpaper.source + ' | fundo=' + endWallpaper.file +
            ' | status=' + (endResult.ok ? 'aplicado' : 'erro: ' + endResult.error));
    } else {
        // Sem fundo de retorno no evento ou no padrão geral, desabilita o wallpaper.
        try {
            h.hly('SetWallpaperSettings', {enabled: false});
            h.log(mUID, '{%t} [END/closing] vídeo=' + (nomeArquivoVideo || '(ação manual)') +
                ' | origem=nenhuma | fundo=(não configurado) | status=wallpaper desabilitado');
        } catch (disableError) {
            h.log(mUID, '{%t} [END/closing] vídeo=' + (nomeArquivoVideo || '(ação manual)') +
                ' | origem=nenhuma | fundo=(não configurado) | status=erro: ' + disableError);
        }
    }
}

/**
 * Aplica um wallpaper específico
 */
function aplicarWallpaper(arquivo) {
    try {
        var response = h.hly('SetWallpaperSettings', {
            file: arquivo,
            enabled: true,
            fill_color: '000000'
        });
        if (response && response.error) {
            return {ok: false, error: String(response.error)};
        }
        return {ok: true, error: ''};
    } catch (e) {
        return {ok: false, error: e && e.message ? e.message : String(e)};
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// v1.4.2 | 2026-08-30
function actions(module) {
    return [
        {
            id: 'menu_wallpaper',
            label: '',
            icon: 'system:menu',
            hint: jsc.i18n('Configurar e testar os fundos START e END'),
            action: [
                actionConfigurarEvento(module),
                actionTestarWallpaper(module),
                actionRestaurarPadrao(module)
            ]
        }
    ];
}

function actionTestarWallpaper(module) {
    return {
        id: 'testar_wallpaper',
        label: jsc.i18n('Testar START — durante o vídeo'),
        icon: 'image',
        hint: jsc.i18n('Aplica agora o fundo START que deve permanecer durante o vídeo'),
        action: function(evt) {
            var player = h.getPlayer();
            if (player.isVideo()) {
                var arquivoAtual = player.getMediaName();
                trocarWallpaperVideo(module, arquivoAtual);
                h.notification(jsc.i18n('START testado para: ') + arquivoAtual, 3);
            } else {
                h.notification(jsc.i18n('Nenhum vídeo em reprodução'), 3);
            }
        }
    };
}

function actionRestaurarPadrao(module) {
    return {
        id: 'restaurar_padrao',
        label: jsc.i18n('Testar END — após o vídeo'),
        icon: 'restore',
        hint: jsc.i18n('Aplica agora o fundo END que deve aparecer após o vídeo'),
        action: function(evt) {
            restaurarWallpaperPadrao(module);
            h.notification(jsc.i18n('Fundo END aplicado'), 3);
        }
    };
}

function actionConfigurarEvento(module) {
    return {
        id: 'configurar_wallpaper_evento',
        label: jsc.i18n('Configurar START / END'),
        icon: 'event',
        hint: jsc.i18n('Configura separadamente o fundo durante e após o vídeo no evento atual'),
        action: function(evt) {
            configurarWallpaperEvento(module);
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e73227d
// v1.5.2 | 2026-09-09

function contextActions(module) {
    return [
        createConfigureVideoWallpapersContextAction()
    ];
}

// Badge opcional do Holyrics 2.30+: identifica vídeos que possuem uma
// associação individual START, END ou ambas.
function renderVideoWallpaperBadge(evt) {
    var video = evt && evt.source ? evt.source : {};
    var hasStart = !!getAssociatedVideoWallpaper(video, 'start');
    var hasEnd = !!getAssociatedVideoWallpaper(video, 'end');
    if (!hasStart && !hasEnd) {
        return null;
    }

    var badge = {
        type: 'icon',
        value: 'wallpaper',
        position: 'left'
    };
    try {
        badge.icon_color = jsc.data.style.colors.primary;
    } catch (e) {}
    return badge;
}

function listCellRendererBadges() {
    return {
        video_library: renderVideoWallpaperBadge,
        media_playlist: renderVideoWallpaperBadge
    };
}

function createConfigureVideoWallpapersContextAction() {
    return {
        name: jsc.i18n('Configurar fundos START / END deste vídeo'),
        hint: jsc.i18n('Define na mesma tela os fundos durante e após este vídeo'),
        icon: 'wallpaper',
        types: ['video'],
        action: function(evt) {
            var video = evt && evt.item ? evt.item : {};
            var label = getVideoWallpaperItemLabel(video);
            var savedStart = getAssociatedVideoWallpaper(video, 'start');
            var savedEnd = getAssociatedVideoWallpaper(video, 'end');
            var startFile = getVideoWallpaperAssociationFile(savedStart, 'start');
            var endFile = getVideoWallpaperAssociationFile(savedEnd, 'end');

            var result = h.input([
                {
                    type: 'title',
                    name: '<html><b>' + label + '</b></html>'
                },
                {
                    type: 'label',
                    name: jsc.i18n('Campos vazios usam o respectivo fundo do evento ou o padrão geral.')
                },
                {
                    id: 'wallpaper_start',
                    name: jsc.i18n('START — fundo durante o vídeo'),
                    description: jsc.i18n('Aplicado quando este vídeo começar.'),
                    type: 'image',
                    default_value: startFile ? {name: startFile} : null
                },
                {
                    id: 'remove_start',
                    label: jsc.i18n('Remover associação START'),
                    description: jsc.i18n('Ao confirmar, o vídeo voltará a usar o START do evento ou o padrão geral.'),
                    type: 'boolean',
                    default_value: false
                },
                {
                    id: 'wallpaper_end',
                    name: jsc.i18n('END — fundo após o vídeo'),
                    description: jsc.i18n('Aplicado quando este vídeo terminar.'),
                    type: 'image',
                    default_value: endFile ? {name: endFile} : null
                },
                {
                    id: 'remove_end',
                    label: jsc.i18n('Remover associação END'),
                    description: jsc.i18n('Ao confirmar, o vídeo voltará a usar o END do evento ou o padrão geral.'),
                    type: 'boolean',
                    default_value: false
                }
            ]);
            if (result === null) {
                return;
            }

            try {
                var startValue = getWallpaperSettingValue(result, 'wallpaper_start');
                var endValue = getWallpaperSettingValue(result, 'wallpaper_end');
                var removeStart = getWallpaperSettingValue(result, 'remove_start') === true;
                var removeEnd = getWallpaperSettingValue(result, 'remove_end') === true;
                if (removeStart) {
                    startValue = null;
                }
                if (removeEnd) {
                    endValue = null;
                }
                var saved = saveVideoWallpaperAssociations(video, startValue, endValue);
                h.notification(
                    jsc.i18n('Fundos do vídeo atualizados') + ': ' + label + '<br>' +
                    'START: ' + (saved.start_file || jsc.i18n('automático')) + '<br>' +
                    'END: ' + (saved.end_file || jsc.i18n('automático')),
                    5
                );
                h.log(mUID, '{%t} Fundos do vídeo atualizados: ' + label +
                    ' | START=' + (saved.start_file || '(automático)') +
                    ' | END=' + (saved.end_file || '(automático)'));
            } catch (e) {
                h.notificationError(String(e), 5);
                h.log(mUID, '{%t} Erro ao configurar fundos do vídeo: ' + e);
            }
        }
    };
}

function createAssociateVideoWallpaperContextAction() {
    return {
        name: jsc.i18n('Associar fundo START a este vídeo'),
        hint: jsc.i18n('Define um fundo exclusivo para a fase START, enquanto este vídeo estiver em reprodução'),
        icon: 'wallpaper',
        types: ['video'],
        action: function(evt) {
            var video = evt && evt.item ? evt.item : {};
            var label = getVideoWallpaperItemLabel(video);
            var saved = getAssociatedVideoWallpaper(video);
            var savedFile = getVideoWallpaperAssociationFile(saved, 'start');
            var description = jsc.i18n('Este fundo terá prioridade sobre o fundo configurado para o evento.');

            if (savedFile) {
                description += '<br>' + jsc.i18n('Fundo associado atualmente') + ': <b>' + savedFile + '</b>';
            }

            var result = h.input([
                {
                    id: 'wallpaper',
                    name: '<html><b>' + label + '</b><br>' + jsc.i18n('Fundo associado'),
                    description: description,
                    type: 'image',
                    default_value: savedFile ? {name: savedFile} : null
                }
            ]);

            if (result === null) {
                return;
            }

            try {
                // O formato retornado pelo h.input varia entre versões do Holyrics.
                // getWallpaperFile percorre o retorno completo e resolve os wrappers.
                var association = saveVideoWallpaperAssociation(video, result, 'start');
                h.notification(
                    jsc.i18n('Fundo START associado ao vídeo') + ': ' + label + '<br>' + getVideoWallpaperAssociationFile(association, 'start'),
                    5
                );
                h.log(mUID, '{%t} Wallpaper START associado ao vídeo: ' + label + ' -> ' + getVideoWallpaperAssociationFile(association, 'start'));
            } catch (e) {
                h.notificationError(String(e), 5);
                h.log(mUID, '{%t} Erro ao associar wallpaper ao vídeo: ' + e);
            }
        }
    };
}

function createRemoveVideoWallpaperContextAction() {
    return {
        name: jsc.i18n('Remover fundo START associado deste vídeo'),
        hint: jsc.i18n('Remove o fundo START exclusivo e volta a usar o START do evento ou o padrão geral'),
        icon: 'link_off',
        types: ['video'],
        action: function(evt) {
            var video = evt && evt.item ? evt.item : {};
            var label = getVideoWallpaperItemLabel(video);

            if (removeVideoWallpaperAssociation(video, 'start')) {
                h.notification(
                    jsc.i18n('Fundo associado removido; o vídeo voltará a usar a configuração automática.') + '<br>' + label,
                    5
                );
                h.log(mUID, '{%t} Associação de wallpaper removida do vídeo: ' + label);
            } else {
                h.notification(
                    jsc.i18n('Este vídeo ainda não possui um fundo associado.') + '<br>' + label,
                    4
                );
            }
        }
    };
}

function createAssociateVideoEndWallpaperContextAction() {
    return {
        name: jsc.i18n('Associar fundo END (pós-vídeo)'),
        hint: jsc.i18n('Define um fundo exclusivo para ser aplicado quando este vídeo terminar'),
        icon: 'restore',
        types: ['video'],
        action: function(evt) {
            var video = evt && evt.item ? evt.item : {};
            var label = getVideoWallpaperItemLabel(video);
            var saved = getAssociatedVideoWallpaper(video, 'end');
            var savedFile = getVideoWallpaperAssociationFile(saved, 'end');
            var description = jsc.i18n('Se não for definido, será usado o END do evento ou o padrão geral.');
            if (savedFile) {
                description += '<br>' + jsc.i18n('Fundo pós-vídeo atual') + ': <b>' + savedFile + '</b>';
            }

            var result = h.input([{
                id: 'wallpaper',
                name: '<html><b>' + label + '</b><br>' + jsc.i18n('Fundo END (pós-vídeo)'),
                description: description,
                type: 'image',
                default_value: savedFile ? {name: savedFile} : null
            }]);
            if (result === null) {
                return;
            }
            try {
                var association = saveVideoWallpaperAssociation(video, result, 'end');
                var file = getVideoWallpaperAssociationFile(association, 'end');
                h.notification(jsc.i18n('Fundo pós-vídeo associado') + ': ' + label + '<br>' + file, 5);
                h.log(mUID, '{%t} Wallpaper END associado ao vídeo: ' + label + ' -> ' + file);
            } catch (e) {
                h.notificationError(String(e), 5);
                h.log(mUID, '{%t} Erro ao associar wallpaper END ao vídeo: ' + e);
            }
        }
    };
}

function createRemoveVideoEndWallpaperContextAction() {
    return {
        name: jsc.i18n('Remover fundo END (pós-vídeo)'),
        hint: jsc.i18n('Volta a usar o END do evento ou o padrão geral quando este vídeo terminar'),
        icon: 'link_off',
        types: ['video'],
        action: function(evt) {
            var video = evt && evt.item ? evt.item : {};
            var label = getVideoWallpaperItemLabel(video);
            if (removeVideoWallpaperAssociation(video, 'end')) {
                h.notification(jsc.i18n('Fundo pós-vídeo removido; será usada a configuração automática.') + '<br>' + label, 5);
                h.log(mUID, '{%t} Associação END removida do vídeo: ' + label);
            } else {
                h.notification(jsc.i18n('Este vídeo ainda não possui um fundo pós-vídeo associado.') + '<br>' + label, 4);
            }
        }
    };
}
