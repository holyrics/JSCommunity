// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m10'
var mUID = mID + ''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID, 'startup '+ mID);
 
}
function info() {
    return {
        id: mID,
        name: 'Letras Animadas',
        description: '<html>'+
                     '• Permite utilizar animações em vídeo como fundo de maneira automática <br><br>'+
                     '   Crie uma pasta dentro da pasta vídeos com o nome <u>backmusic</u><br>'+
                     'e crie as pastas das animações com um apelido e insira esse apelido em um campo extra da música<br>'+
                     'chamado <u>alias_background</u> e coloque o mesmo nome da pasta apelido para a música<br>'+
                     'O Módulo remove qualquer texto que seria exibido na tela principal, substituindo-o pelo vídeo.<br>'+
                     'a tela de retorno permanece exibindo a letra da música do holyrics.<br>'+
                     infoVDDMM,
         allowed_requests: [
                     allowedPrcrisModuleRequests
         ]
    };
}








// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    
    return [
        {
            name: 'Sobre ' + mID,
            description: infoVDDMM,
            type: 'label'
        }, {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log, mUID,'onchange '+ mID);
              }
        }
    ];

}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22637573746f6d5468656d65227d
function customTheme(module) {
    return {
        
        song: function(obj) {
           var t = obj.alias_background;
           var loop_disabled = !!t;  

           if (obj.slide_show_index == 1) { 
              h.log(mID, 'disable_background_loop? {}', loop_disabled);
              h.setRuntimeSettings('disable_background_loop', loop_disabled);
              h.setRuntimeSettings('disable_extend_single_video', loop_disabled);
              h.log(mID, 'alias_background: {}', t);
           }
           
           if (!t) {
               if (obj.slide_show_index == 1) { 
                  h.log(mID, 'Campo extra alias_background não configurado');
               }
              return null;
           }
           var path = 'backmusic/' + t + '/' + obj.slide_show_index + '.mp4';
           if (h.videoExists(path)) {
             if (obj.slide_show_index == 1) { 
                 h.log(mID, "Vídeo configurado {} ",path);
                }
             return {
               custom_theme: {
                   background: {
                       type: 'video_file',
                       id: path
                   },
                   font: {
                       size: 0
                   }
               }
             };
          }
          else {
            if (obj.slide_show_index < 1000) {
               h.log(mID, "Vídeo não encontrado: {}", path);
            }
          }
        }
    };
}