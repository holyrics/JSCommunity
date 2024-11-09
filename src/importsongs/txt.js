function info() {
    return {
        id: 'txt',
        name: 'TXT File',
        description: 'TXT File',
        file_filter: {
            description: 'TXT File',
            extensions: ['txt']
        },
        minVersion: '2.23.0'
    };
}

function settings() {
    return [
        {
            id: 'charset',
            label: 'Charset',
            allowed_values: ['UTF-8', 'ISO-8859-1', 'ASCII', 'Windows-1252']
        }  
    ];
}

function extract(files, settings) {
    var songs = [];
    files.forEach(function(f) {
        var arr = f.getTitleAndArtistFromName();
        var text = f.readString(settings.charset);
        var s = {};
        s.title = arr[0];
        s.artist = arr[1];
        s.lyrics = text;
        songs.push(s);
    });
    return {
        songs: songs
    };
}