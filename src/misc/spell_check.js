function spellCheck(obj) {
    switch (obj.language) {
        case "ru":
        case "uk":
            return spellerYandexImpl(obj);

        default:
            return [];
    }
}

function spellerYandexImpl(obj) {
    var opts = {
        type: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        url_suffix: 'checkText',
        data: {
            text: obj.text,
            lang: obj.language
        },
        timeout: 3000
    };
    var r = h.httpRequest('https://speller.yandex.net/services/spellservice.json/', opts);
    var json = JSON.parse(r);
    var arrRowOffset = [];
    var rows = obj.text.split("\n");
    var offset = 0;
    rows.forEach(function(o) {
        arrRowOffset.push(offset);
        offset += o.length() + 1;
    });
    var arr = [];
    json.forEach(function(o) {
        arr.push({
            word: o.word,
            index: (arrRowOffset[o.row] + o.col),
            suggestions: o.s
        });
    });
    return arr;
}
