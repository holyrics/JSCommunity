function getInfoVDDMM() { 
    var translations = {
        pt: "<hr><br>@ Para dicas sobre automação com Holyrics, visite meu canal no YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Em caso de dúvidas, fale comigo no tópico 'Automatização & JavaScript' no grupo de suporte do Telegram <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, marque @prcris que terei prazer em ajudar - #juntos pelo Rei e pelo Reino!<br></p>",
        en: "<hr><br>@ For automation tips with Holyrics, visit my YouTube channel:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>For questions, contact me in the 'Automation & JavaScript' topic in the Telegram support group <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, mention @prcris and I'll be happy to help - #together for the King and the Kingdom!<br></p>",
        ru: "<hr><br>@ Для советов по автоматизации с Holyrics посетите мой канал на YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiавerdadebalneario</a></p><br><p style='padding-left: 20px;'>По вопросам обращайтесь ко мне в теме 'Автоматизация и JavaScript' в группе поддержки Telegram <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, упомяните @prcris, и я буду рад помочь - #вместе для Короля и Королевства!<br></p>",
        es: "<hr><br>@ Para consejos de automatización con Holyrics, visita mi canal de YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Para preguntas, contáctame en el tema 'Automatización & JavaScript' en el grupo de soporte de Telegram <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, menciona @prcris y estaré encantado de ayudar - #juntos por el Rey y el Reino!<br></p>",
        it: "<hr><br>@ Per consigli sull'automazione con Holyrics, visita il mio canale YouTube:<br><p style='padding-left: 20px;'><a href='https://youtube.com/@multimidiaverdadebalneario'>@multimidiaverdadebalneario</a></p><br><p style='padding-left: 20px;'>Per domande, contattami nel topic 'Automatizzazione e JavaScript' nel gruppo di supporto Telegram <a href='https://t.me/HolyricsBR/97904'>HolyricsBR</a>, menziona @prcris e sarò felice di aiutarti - #insieme per il Re e il Regno!<br></p>"
    };
    
    var lang = h.getLanguage();
    return translations[lang] || translations['en']; // padrão para inglês caso o idioma não esteja definido
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

function actSeparator() {
    return {icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="940" zoomAndPan="magnify" viewBox="0 0 705 591.000005" height="788" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="e4f0dd6e04"><path d="M 331.507812 0 L 373.492188 0 L 373.492188 590 L 331.507812 590 Z M 331.507812 0 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#e4f0dd6e04)"><path fill="#ffffff" d="M 331.507812 0 L 373.492188 0 L 373.492188 590.070312 L 331.507812 590.070312 Z M 331.507812 0 " fill-opacity="1" fill-rule="nonzero"/></g></svg>',
            hint : 'separator'
            };
}