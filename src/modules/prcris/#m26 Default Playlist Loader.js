var mID = '@prcris#m26';
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) { 
   mUID = mID + module.id;
   h.setTimeout( function (evt) { 
       if (module.isEnabled()) { 
              onPlaylistChange()
       }
    }
  , 200);
}

function info() {
    return {
        id: mID,
        name: 'Automatic Playlist Loader',
        description: 'Automate your preparation! This module automatically loads the playlist that has the same name as the selected event in Holyrics.<br>' +
                     'Perfect for media teams seeking agility, organization, and excellence in worship services and events.<br>' +
                     'Eliminate repetitive tasks and gain time to focus on what truly matters: ministering with quality and purpose.<br>' +
                     infoVDDMM,
        i18n: {
            name: {
                en: 'Automatic Playlist Loader',
                pt: 'Carregador Automático de Playlist',
                es: 'Cargador Automático de Lista de Reproducción',
                ru: 'Автоматическая загрузка плейлиста'
            },
            description: {
                pt: 'Automatize a sua preparação! Este módulo carrega automaticamente a playlist que tiver o mesmo nome do evento selecionado no Holyrics.<br>' +
                    'Ideal para equipes de mídia que desejam agilidade, organização e excelência nos cultos e eventos.<br>' +
                    'Elimine tarefas repetitivas e ganhe tempo para o que realmente importa: ministrar com qualidade e foco no Reino.<br>' +
                    infoVDDMM,
                es: '¡Automatiza tu preparación! Este módulo carga automáticamente la lista de reproducción que tenga el mismo nombre que el evento seleccionado en Holyrics.<br>' +
                    'Perfecto para equipos de medios que buscan agilidad, organización y excelencia en cultos y eventos.<br>' +
                    'Elimina tareas repetitivas y gana tiempo para enfocarte en lo que realmente importa: ministrar con calidad y propósito.<br>' +
                    infoVDDMM,
                ru: 'Автоматизируйте подготовку! Этот модуль автоматически загружает плейлист с таким же названием, как и выбранное событие в Holyrics.<br>' +
                    'Идеально подходит для медиа-команд, стремящихся к оперативности, организованности и качеству на служениях и мероприятиях.<br>' +
                    'Избавьтесь от повторяющихся задач и сосредоточьтесь на самом важном: служении с качеством и целеустремлённостью.<br>' +
                    infoVDDMM
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
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
            id: 'changeWallpaper',
            name: jsc.i18n('Alterar o Papel de Parede?'),
            description: jsc.i18n('Define se o papel de parede com o nome do evento deverá ser configurado.'),
            type: 'boolean',
            default_value: true
        }, {
            id: 'wallpaperPathPrefix',
            name: jsc.i18n('Pasta - papel de parede'),
            description: jsc.i18n('Define a pasta padrão onde estão as imagens de papel de parede. Se estiver vazio, as imagens serão procuradas na pasta raiz.'),
            type: 'image',
            accept_folder: true,
            accept_file: false
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2274726967676572227d
function triggers(module) {
    var arr = [];    
    arr.push({
         when: "change",
         item: "playlist",
         action: function(obj) {
            onPlaylistChange();
         }
    });
    return arr;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function onPlaylistChange() {
    var key = 'saved_playlist_running';
    if (h.getGlobal(key) == 'ok') {
        // Block to prevent creating 2 loops
        return;
    }
    h.setGlobal(key, 'ok');
    var id = h.setInterval(function () {
        var syncStatus = h.hly('GetSyncStatus').data;
        if (syncStatus.enabled && syncStatus.progress < 100) {
            // Synchronization in progress
            return;
        }
        h.clearInterval(id); // Cancel the loop execution
        h.setGlobal(key, false);
        jsc.playlist.loadSavedPlaylistByEventName();
         if (module.settings.changeWallpaper) {
            jsc.playlist.setupWallpaperByEventName(module.settings.wallpaperPathPrefix.name || '');
         }
    }, 1000);
}