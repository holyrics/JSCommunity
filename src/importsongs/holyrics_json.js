function info() {
    return {
        id: 'holyrics_json',
        name: 'Holyrics JSON File',
        description: 'Holyrics JSON File',
        file_filter: {
            description: 'Holyrics JSON File',
            extensions: ['json']
        },
        minVersion: '2.23.0'
    };
}

function extract(files) {
    var songs = [];
    files.forEach(function(f) {
        var json = f.readString();
        var obj = JSON.parse(json);
        if (Array.isArray(obj)) {
            obj.forEach(function(o) {
                songs.push(objToSong(o));
            });
            return;
        }
        songs.push(objToSong(obj));
    });
    return {
        songs: songs
    };
}

function objToSong(obj) {
    obj.paragraphs = obj.lyrics.paragraphs;
    obj.paragraphs.forEach(function (p) {
        if (p.text_with_comment) {
            p.text = p.text_with_comment;
        }
    });
    obj.lyrics = "";
    return obj;
}
