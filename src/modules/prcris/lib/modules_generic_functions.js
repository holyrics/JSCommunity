var infoVDDMM = "<html><hr><br>@ Para mais informações sobre automação com holyrics, visite <br><a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"

function isDev() {
  return false
}

function logState(log, id, caller){ 
    h.log.setEnabled(id, log); 
}

function spanIcon(iconCodePoint){
    return '<html><span style="font-family: Material Icons;">' + iconCodePoint + ' </span>';
}

function showMessage(title, message) {
    var content = [{ type: 'title', label: title }, { type: 'separator' }];

    if (typeof message === 'string') {
        content.push({ type: 'title', label: message });
    } else if (Array.isArray(message)) {
        for (var i = 0; i < message.length; i++) {
            content.push({ type: 'title', label: message[i] });
        }
    }

    h.input(content);
}