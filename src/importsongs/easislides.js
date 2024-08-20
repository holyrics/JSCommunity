function info() {
    return {
        id: 'easislides',
        name: 'EasiSlides File',
        description: 'EasiSlides File',
        file_filter: {
            description: 'EasiSlides File',
            extensions: ['xml']
        },
        minVersion: '2.23.0'
    };
}

function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var xml = f.readXml();
        xml.EasiSlides.Item.forEach(function(song) {
            var s = {};
            s.title = song.Title1[0].content;
            s.artist = song.Folder[0].content;
            s.lyrics = song.Contents[0].content;
            s.lyrics = s.lyrics.replaceAll("\\[(chorus|\\d|prechorus)\\]", "");
            songs.push(s);
        });
    });
    return {
        songs: songs
    };
}