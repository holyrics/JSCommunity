function getInfoVDDMM() { 
    var translations = {
        pt: "<hr><br>@ Para dicas sobre automação com Holyrics, visite meu canal no YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Em caso de dúvidas, fale comigo no grupo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, marque @prcris que terei prazer em ajudar - #juntos pelo Rei e pelo Reino!<br></p>",
        en: "<hr><br>@ For automation tips with Holyrics, visit my YouTube channel:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>For questions, contact me in the group <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, mention @prcris and I'll be happy to help - #together for the King and the Kingdom!<br></p>",
        ru: "<hr><br>@ Для советов по автоматизации с Holyrics посетите мой канал на YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiавerdadebalneario</a></p><br><p style='padding-left: 20px;'>По вопросам пишите мне в группе <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, упомяните @prcris, и я буду рад помочь - #вместе для Короля и Королевства!<br></p>",
        es: "<hr><br>@ Para consejos de automatización con Holyrics, visita mi canal de YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Para preguntas, háblame en el grupo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, menciona @prcris y estaré encantado de ayudar - #juntos por el Rey y el Reino!<br></p>",
        it: "<hr><br>@ Per consigli sull'automazione con Holyrics, visita il mio canale YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Per domande, scrivimi nel gruppo <a href='https://t.me/HolyriCris'>t.me/HolyriCris</a>, menziona @prcris e sarò felice di aiutarti - #insieme per il Re e il Regno!<br></p>"
    };
    
    var lang = h.getLanguage();
    return translations[lang] || translations['en'];
}


var infoVDDMM = getInfoVDDMM();

var allowedPrcrisModuleRequests = [];

function isDev() {
  return false;
}

function logState(log, id, caller){ 
    h.log.setEnabled(id, log); 
}

function spanIcon(iconCodePoint){
    return '<html><span style="font-family: Material Icons;">' + iconCodePoint + ' </span>';
}

function showMessage(title, message, useTimeout) {
    function show() {
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

    if (useTimeout) {
        h.setTimeout(show, 200);
    } else {
        show();
    }
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

function checkOS() {
   var gVersion = h.hly('GetVersion').data.platform;
   if (gVersion != 'win') {
      showMessage(i18n('This module was designed to run only on the "Windows" operating system'));
      return false
   }
return true
}

function convertBars(path, back) {
  if (typeof path !== 'string') return '';
  
  if (back) {
     return path.replace(/\//g, '\\');
     }
  else {
     return path.replace(/\\/g, '/');
  } 
}

function mediaPath(path) {
   return convertBars(h.hly('GetVersion').data.baseDir + '/Holyrics/files/media/' + (path ? path + '/' : ''));
}

//Cria um botão no formato de uma linha vertical para separar conjuntos de botões em um mesmo módulo
function actSeparator() {
    return {icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="940" zoomAndPan="magnify" viewBox="0 0 705 591.000005" height="788" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="e4f0dd6e04"><path d="M 331.507812 0 L 373.492188 0 L 373.492188 590 L 331.507812 590 Z M 331.507812 0 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#e4f0dd6e04)"><path fill="#ffffff" d="M 331.507812 0 L 373.492188 0 L 373.492188 590.070312 L 331.507812 590.070312 Z M 331.507812 0 " fill-opacity="1" fill-rule="nonzero"/></g></svg>',
            hint : 'separator'
            };
}

/**
 * Cria um item de separador visual com texto centralizado entre traços e ícone SVG de linha.
 * @param {string} labelText - Texto centralizado no separador.
 * @param {number} width - Largura total em caracteres (padrão: 12).
 * @returns {object} Objeto pronto para menu.push()
 */
function mnuSeparatorLabel(labelText, width) {
    width = width || 12;
    labelText = labelText || '';

    var text = labelText.trim();
    var totalPadding = width - text.length;
    var left = Math.floor(totalPadding / 2);
    var right = totalPadding - left;
    var formattedLabel = Array(left + 1).join('─') + text + Array(right + 1).join('─');

    return {
        label: formattedLabel,
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
              '<line x1="2" y1="12" x2="22" y2="12" stroke="gray" stroke-width="1" />' +
              '</svg>'
    };
}


function settingsAbout() {
    var id;
    if (typeof module === 'object' && module && typeof module.id === 'string') {
        id = mUID.split(module.id).join('');
    } else {
        id = mUID;
    }
    return {
        name: jsc.i18n('About') + ' ' + id,
        description: infoVDDMM,
        type: 'label'
    };
}

function settingsLogger() {
    return {
        id: 'log',
        label: jsc.i18n('Habilitar log'),
        type: 'boolean',
        onchange: function(obj) {
            logState(obj.input.log, mUID, 'onChange ' + mUID);
        }
    };
}

function genericStartup() {
    if (mUID.indexOf(module.id) == -1) {
       mUID = mUID + module.id;
    }

    logState(module.settings.log, mUID, 'startup '+ mUID); 
}
