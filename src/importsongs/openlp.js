function info() {
    return {
        id: 'openlp',
        name: 'OpenLP File',
        description: 'OpenLP File',
        file_filter: {
            description: 'OpenLP File',
            extensions: ['xml']
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
        var prop = song.properties[0];
        s.title = prop.titles[0].title[0].content;
        s.artist = prop.songbooks[0].songbook[0].name;
        s.author = h.stream(prop.authors[0].author)
                           .map(a => a.content)
                           .collect(h.stream.joining(", "));
        s.paragraphs = [];
        var mapDescIndex = {};
        var index = 1;
        song.lyrics[0].verse.forEach(function(v) {
            var text = h.stream(v.lines)
                    .map(s => s.content)
                    .collect(h.stream.joining("\n"));
            var description = verseTagToSlideLabel(v.name);
            s.paragraphs.push({
                text: text,
                description: description
            });
            mapDescIndex[v.name] = index++;
        });
        s.order = extractOrder(song, mapDescIndex);
        songs.push(s);
    });
    return {
        songs: songs
    };
}

function verseTagToSlideLabel(tag) {
    try {
        if (tag == null || tag.isEmpty() || tag.startsWith("ex")) {
            return "";
        }
        var name = tagToName(tag.charAt(0));
        if (name.isEmpty()) {
            return "";
        }
        return name + " " + parseInt(tag.substring(1)).toFixed(0);
    } catch (e) {
        return "";
    }
}

function tagToName(tag) {
    switch (tag.toLowerCase()) {
        case 'v':
            return "Verse";
        case 'c':
            return "Chorus";
        case 'b':
            return "Bridge";
        case 'p':
            return "Pre-Chorus";
        case 'i':
            return "Intro";
        case 'e':
            return "Ending";
        case 'o':
            return "Other";
        default:
            return "";
    }
}

function extractOrder(song, mapDescIndex) {
    var order = [];
    if (!song.properties || !song.properties[0].verseOrder) {
        return order;
    }    
    var arr = song.properties[0].verseOrder[0].content.trim().split(" ");
    for (var i = 0; i < arr.length; i++) {
        if (!mapDescIndex[arr[i]]) {
            return [];
        }
        order.push(mapDescIndex[arr[i]]);
    }
    return order;
}