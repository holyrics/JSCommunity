var map;
var defaultLang = 'pt';

function i18n(candidate, arr) {
    try {
        var i18n_map = i18n_getMap();
        var str = i18n_map[candidate];
        var msg = (str != null ? str : candidate);
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
        return candidate;
    }
}

function i18n_getMap() {
    if (map) {
        return map;
    }
    map = {};
    var lang = h.getLanguage();
    i18n_getAllItems().forEach(function (o) {
        var k = o[defaultLang];
        map[k] = o[lang] ? o[lang] : k;
    });
    return map;
}

function i18n_getAllItems() {
    arr = [];
    arr.push({
        pt: 'Nome',
        en: 'Name'
    });
    arr.push({
        pt: 'Ação Simples',
        en: 'Simple Action'
    });
    arr.push({
        pt: 'Exibir Mensagem Rápida',
        en: 'Show Quick Message'
    });
    arr.push({
        pt: 'Duração',
        en: 'Duration'
    });
    arr.push({
        pt: 'Pasta',
        en: 'Folder'
    });
    arr.push({
        pt: 'Ação Pressionar/Soltar',
        en: 'Action Press/Release'
    });
    arr.push({
        pt: 'Começar do Coro',
        en: 'Start at Chorus'
    });
    arr.push({
        pt: 'Item não encontrado: {}',
        en: 'Item not found: {}'
    });
    arr.push({
        pt: 'Exibir por {} segundos',
        en: 'Display for {} seconds'
    });
    arr.push({
        pt: 'Mensagem Personalizada no App',
        en: 'Custom Message in App'
    });
    arr.push({
        pt: 'Descrição',
        en: 'Description'
    });
    arr.push({
        pt: 'Mensagem recebida do app',
        en: 'Message received from app'
    });
    return arr;
}