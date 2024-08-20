function info() {
    return {
        id: 'video_psalm',
        name: 'VideoPsalm File',
        description: 'VideoPsalm File',
        file_filter: {
            description: 'VideoPsalm File',
            extensions: ['json']
        },
        minVersion: '2.23.0'
    };
}

function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var json = f.readJson();
        json.Songs.forEach(function (song) {
            var s = {};
            s.title = song.Text;
            s.artist = json.Text;
            s.author = h.stream([song.Author, song.Composer])
                        .filter(o => o)
                        .collect(h.stream.joining(", "));
            s.lyrics = song.Verses.stream()
                         .map(v => h.htmlExtractText(v.Text, true))
                         .collect(h.stream.joining("\n\n"));
            songs.push(s);
        });
    });
    return {
        songs: songs
    };
}