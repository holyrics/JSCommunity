function info() {
    return {
        id: 'datasoul',
        name: 'Datasoul Song File',
        description: 'Datasoul Song File',
        file_filter: {
            description: 'Datasoul Song File',
            extensions: ['song']
        },
        minVersion: '2.23.0'
    };
}

function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var xml = f.readXml();
        var song = xml.Song;
        var s = {};
        s.title = song.Title0;
        //s.artist = ""; ???
        s.copyright = song.Copyright0;
        s.author = song.SongAuthor0;
        s.lyrics = song.Text0;
        s.lyrics = h.strReplace('===', '\n', s.lyrics);
        s.lyrics = h.strReplace('==', '\n', s.lyrics);
        songs.push(s);
    });
    return {
        songs: songs
    };
}