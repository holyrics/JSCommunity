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
        obj.paragraphs = obj.lyrics.paragraphs;
        obj.paragraphs.forEach(function (p) {
            if (p.text_with_comment) {
                p.text = p.text_with_comment;
            }
        });
        obj.lyrics = "";
        songs.push(obj);
    });
    return {
        songs: songs
    };
}
