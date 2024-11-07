var infoVDDMM = "<hr><br>@ Para dicas sobre automação com holyrics, visite meu canal no youtube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Em caso de dúvidas fale comigo no tópico 'Automatização & Ja"+"vaScript' no grupo de suporte do telegram <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, marque @prcris que terei prazer em ajudar - #juntos pelo Rei e pelo Reino!<br></p>";
var allowedPrcrisModuleRequests =  ['https://www.youtube.com','https://t.me'];

function isDev() {
  return false;
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


function suspendConflictingModules(status, conflictModules) {
    if (!status) {
       conflictModules = h.getGlobal(mID+'ConflictModules') || [];
    }
    else
    {
      h.setGlobal(mID+'ConflictModules', conflictModules);
    }

    for (var i = 0; i < conflictModules.length; i++) {
      var moduleName = '@prcris#m' + conflictModules[i];
      h.setGlobal('suspendConflictingModules' + moduleName, status);    
      h.log(mUID,'{%t} Módulo {}{}', moduleName , status ? ' temporariamente suspenso.' : ' reativado.');
    }   
}

function isModuleSuspended() {
    
    var status = h.getGlobal('suspendConflictingModules' + mID) == true;
    if (status) {
       h.log(mUID,'{%t} Módulo {} temporariamente suspenso por outro processo.', mID);
    }  
    return status ;
}