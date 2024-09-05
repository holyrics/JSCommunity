// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m8'

function info() {
    return {
        id: mID,
        name: 'Jukebox Mode',
        description: '<html>'+
                     '• Ao finalizar a música atual, inicia a próxima automaticamente, dentro do mesmo título da aba Mídia<br>'+
                     '<hr>Para mais informações sobre automações no holyrics, acesse <br>'+"<a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2274726967676572227d

function triggers(module) {
    var arr = [];    
    arr.push({
        id: "troca_musica_" + mID,
        when: "displaying",
        item: "any_song_slide",
        action: function(obj) {
            if (obj.slide_show_index == obj.slide_show_total && obj.slide_show_index > 1000) {
                var playlist = h.hly('GetMediaPlaylist');
                var currentTitle = h.getGlobal('currentTitle');
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
                        h.notification("Música "+playlist.data[i].name+' inciada pelo módulo ' + mID, 5);
                        break;
                    }
                }
            }
        }
    });
    arr.push({
        id: "salva_titulo_" + mID,
        when: "displaying",
        item: "any_title_subitem",
        action: function(obj) {
            h.setGlobal('currentTitle', obj.title);
        }
    });
    return arr;
}