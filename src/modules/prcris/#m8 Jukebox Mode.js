// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m8';
var mUID = mID + ''; 

//#import modules_generic_functions 

function startup(module) { 
  mUID = mID + module.id;
  logState(module.settings.log, mUID, 'startup '+ mID);
}
function info() {
    return {
        id: mID,
        name: 'Jukebox Mode',
        description: '<html>' +
                     '• When the current song finishes, the next one starts automatically within the same Media tab title<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Jukebox Mode',
                pt: 'Modo Jukebox',
                es: 'Modo Jukebox',
                ru: 'Режим Jukebox'
            },
            description: {
                en: '<html>' +
                    '• When the current song finishes, the next one starts automatically within the same Media tab title<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Ao finalizar a música atual, inicia a próxima automaticamente, dentro do mesmo título da aba Mídia<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Al finalizar la canción actual, comienza la siguiente automáticamente, dentro del mismo título de la pestaña de Medios<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• При завершении текущей песни следующая начинается автоматически, в рамках той же вкладки Медиа<br>' +
                    infoVDDMM
            }
        }
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2274726967676572227d

function triggers(module) {
    var arr = [];    
    arr.push({
        id: "troca_musica_" + mUID,
        when: "displaying",
        item: "any_song_slide",
        action: function(obj) {
            if (obj.slide_show_index == obj.slide_show_total && obj.slide_show_index > 1000) {
                var playlist = h.hly('GetMediaPlaylist');
                var currentTitle = h.getGlobal(mUID + 'currentTitle');
                var titleFound = false;
                var actualSongFound = false;

                for (var i = 0; i < playlist.data.length; i++) {
                    if (playlist.data[i].type === "title" && playlist.data[i].name === currentTitle) {
                        titleFound = true;
                        continue;
                    }

                    if (playlist.data[i].type === "title" && playlist.data[i].name != currentTitle && titleFound) {
                        break;
                    }

                    if (playlist.data[i].type === "song" && titleFound && !actualSongFound && playlist.data[i].song_id == obj.id) {
                        actualSongFound = true;
                        continue;
                    }

                    if (playlist.data[i].type === "song" && titleFound && actualSongFound) {
                        h.showSong(playlist.data[i].song_id);
                        h.notification(jsc.i18n("Música")+" "+playlist.data[i].name+" "+jsc.i18n("inciada pelo módulo") + " " + mUID , 5);
                        break;
                    }
                }
            }
        }
    });
    arr.push({
        id: "salva_titulo_" + mUID,
        when: "displaying",
        item: "any_title_subitem",
        action: function(obj) {
            h.setGlobal(mUID + 'currentTitle', obj.title);
        }
    });
    return arr;
}