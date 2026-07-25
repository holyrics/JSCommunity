function info() {
    return {
        id: 'chordpro',
        name: 'ChordPro Native Compiler',
        description: 'ChordPro Native Compiler',
        file_filter: {
            description: 'ChordPro Files',
            extensions: ['cho', 'crd', 'chopro', 'txt']
        },
        minVersion: '2.24.0'
    };
}

function settings() {
    return [{ id: 'charset', label: 'Charset', allowed_values: ['UTF-8', 'Windows-1251'] }];
}

function extract(files, settings) {
    var songs = [];
    
    files.forEach(function(f) {
        var rawText = f.readString(settings.charset);
        var lines = rawText.split(/\r?\n/);
        
        var title = "";
        var artist = "";
        var outLines = [];

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (!line) { outLines.push(""); continue; }

            // 1. Метаданные
            var m;
            if (m = line.match(/^\{t(?:itle)?:\s*(.*?)\}$/i)) { title = m[1]; continue; }
            if (m = line.match(/^\{a(?:rtist)?:\s*(.*?)\}$/i)) { artist = m[1]; continue; }

            // 2. Конвертация структурных блоков в формат Holyrics ##(Блок)
            if (m = line.match(/^\{(?:start_of_verse|sov)(?::\s*(.*?))?\}$/i)) {
                outLines.push("##(" + (m[1] || "Verse") + ")"); continue;
            }
            if (m = line.match(/^\{(?:start_of_chorus|soc)(?::\s*(.*?))?\}$/i)) {
                outLines.push("##(" + (m[1] || "Chorus") + ")"); continue;
            }
            if (m = line.match(/^\{(?:start_of_bridge|sob)(?::\s*(.*?))?\}$/i)) {
                outLines.push("##(" + (m[1] || "Bridge") + ")"); continue;
            }

            // 3. Уничтожение закрывающих тегов (Holyrics они не нужны)
            if (line.match(/^\{(?:end_of_verse|eov|end_of_chorus|eoc|end_of_bridge|eob)\}$/i)) {
                continue;
            }

            // Игнор прочих директив
            if (line.match(/^\{.*\}$/)) continue;

            // 4. Custom Inline Parser (решает проблему с [H] и позиционированием)
            if (line.indexOf('[') !== -1) {
                var chordLine = "";
                var textLine = "";
                var parts = line.split(/(\[[^\]]+\])/);

                for (var j = 0; j < parts.length; j++) {
                    var p = parts[j];
                    if (p.indexOf('[') === 0 && p.indexOf(']') === p.length - 1) {
                        var chord = p.substring(1, p.length - 1);
                        chordLine += chord;
                    } else {
                        textLine += p;
                        // Выравнивание аккордов пробелами
                        while (chordLine.length < textLine.length) {
                            chordLine += " ";
                        }
                    }
                }

                // Инъекция флага // для перевода строки в Chord Mode
                if (chordLine.trim().length > 0) {
                    outLines.push("//" + chordLine);
                }
                if (textLine.length > 0) {
                    outLines.push(textLine);
                }
            } else {
                outLines.push(line);
            }
        }
        
        var fallbackMeta = f.getTitleAndArtistFromName();
        songs.push({
            title: title || fallbackMeta[0] || "Unknown",
            artist: artist || fallbackMeta[1] || "",
            lyrics: outLines.join('\n')
        });
    });
    
    return { songs: songs };
}