function info() {
    return {
        id: 'open_song',
        name: 'OpenSong File',
        description: 'OpenSong File',
        file_filter: {
            description: 'OpenSong File',
            extensions: ['xml', '']
        },
        minVersion: '2.23.0'
    };
}

function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var xml = f.readXml();
        var song = xml.song;
        var s = {};
        s.title = song.title[0].content;
        s.artist = song.author[0].content;
        s.copyright = song.copyright[0].content;
        s.paragraphs = [];
        var lyrics = song.lyrics[0].content;
        lyrics = h.strReplace("\n.", "\n//", lyrics);
        while (lyrics.contains(" \n[")) {
          lyrics = h.strReplace(" \n[", "\n[", lyrics);
        }
        var mapDescIndex = {};
        var index = 1;
        lyrics.split("\n\n").forEach(function(p) {
            p = h.trim(p, " \n");
            var rows = p.split("\n");
            var description = '';
            if (rows[0].startsWith("[")) {
              description = h.trim(rows[0], "[]");
              rows.shift();
            }
            p = h.stream(rows)
                    .map(s => s.trim())
                    .filter(s => !s.isEmpty())
                    .collect(h.stream.joining("\n"));
            s.paragraphs.push({
                text: p,
                description: description
            });
            mapDescIndex[description] = index++;
        });
        s.order = extractOrder(song, mapDescIndex);
        songs.push(s);
    });
    return {
        songs: songs
    };
}

function extractOrder(song, mapDescIndex) {
    var order = [];
    if (!song.presentation) {
        return order;
    }
    var arr = song.presentation[0].content.trim().split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (!mapDescIndex[arr[i]]) {
            return [];
        }
        order.push(mapDescIndex[arr[i]]);
    }
    return order;
}