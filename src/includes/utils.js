function fixBibleReferences(references) {
    var booksAliases = jsc.data.booksAliases;
    var lang = h.getLanguage();
    if (booksAliases[lang] === undefined) {
        return references;
    }

    for (var book in booksAliases[lang]) {
        for (var i in booksAliases[lang][book]) {
            var alias = booksAliases[lang][book][i];
            // regex group 1: line start or space or punctuation marks
            // regex group 2: alternative alias itself
            // regex group 3 space or dot or digits
            var regex = '(^|\\s|[,;])(' + alias + ')(\\s|\\.|\\d)(?i)';
            // leave group 1 and 3, but replace 2nd group with canonical name.
            references = references.replaceAll(regex, '\u00241' + book + '\u00243');
        }
    }
    return references;
}

//
function format(msg, arr) {
    try {
        if (arr == null || arr.length == null || arr.length == 0 || typeof arr === 'string') {
            return msg;
        }
        var placeHolder = "{}";
        var r = "";
        for (var current = 0, argIndex = 0; current < msg.length(); ) {
            var token = msg.indexOf(placeHolder, current);
            if (token > -1) {
                r += msg.substring(current, token);
                r += arr[argIndex++];
                current = token + placeHolder.length();
            } else {
                r += msg.substring(current);
                break;
            }
        }
        return r;
    } catch (e) {
        return msg;
    }
}

function isSlideDescription(key, val) {
    var data = jsc.data.slideDescriptionMap[key];
    if (data === undefined) {
        return false;
    }
    if (val.slide_description !== undefined) {
        val = val.slide_description;
    }
    val = h.normalize(val).toLowerCase();
    for (i in data) {
        if (val.startsWith(data[i])) return true;
    }
    return false;
}

//
function isVerse(val) {
    return isSlideDescription('verse', val);
}

//
function isChorus(val) {
    return isSlideDescription('chorus', val);
}

//
function isInstrumental(val) {
    return isSlideDescription('instrumental', val);
}
