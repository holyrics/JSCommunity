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
        name: 'Animated Lyrics',  // Nome em inglês
        description: '<html>' +
                     '• Allows using video animations as background automatically <br><br>' +
                     '   Create a folder inside the videos folder named <u>backmusic</u><br>' +
                     'and create animation folders with a nickname and insert this nickname in an extra field of the song<br>' +
                     'called <u>alias_background</u> and use the same name for the folder and the song<br>' +
                     'The module removes any text that would normally appear on the main screen, replacing it with the video.<br>' +
                     'the return screen continues to display the lyrics of the song from holyrics.<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Animated Lyrics',  // Tradução para inglês
                pt: 'Letras Animadas',  // Tradução para português
                es: 'Letras Animadas',  // Tradução para espanhol
                ru: 'Анимированные Тексты'  // Tradução para russo
            },
            description: {
                en: '<html>' +
                    '• Allows using video animations as background automatically <br><br>' +
                    '   Create a folder inside the videos folder named <u>backmusic</u><br>' +
                    'and create animation folders with a nickname and insert this nickname in an extra field of the song<br>' +
                    'called <u>alias_background</u> and use the same name for the folder and the song<br>' +
                    'The module removes any text that would normally appear on the main screen, replacing it with the video.<br>' +
                    'the return screen continues to display the lyrics of the song from holyrics.<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Permite utilizar animações em vídeo como fundo de maneira automática <br><br>' +
                    '   Crie uma pasta dentro da pasta vídeos com o nome <u>backmusic</u><br>' +
                    'e crie as pastas das animações com um apelido e insira esse apelido em um campo extra da música<br>' +
                    'chamado <u>alias_background</u> e coloque o mesmo nome da pasta apelido para a música<br>' +
                    'O Módulo remove qualquer texto que seria exibido na tela principal, substituindo-o pelo vídeo.<br>' +
                    'a tela de retorno permanece exibindo a letra da música do holyrics.<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Permite usar animaciones en video como fondo de manera automática <br><br>' +
                    '   Crea una carpeta dentro de la carpeta de videos con el nombre <u>backmusic</u><br>' +
                    'y crea las carpetas de animación con un apodo e inserta este apodo en un campo extra de la canción<br>' +
                    'llamado <u>alias_background</u> y coloca el mismo nombre de la carpeta y la canción<br>' +
                    'El módulo elimina cualquier texto que normalmente aparecería en la pantalla principal, reemplazándolo con el video.<br>' +
                    'la pantalla de retorno sigue mostrando la letra de la canción de holyrics.<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• Разрешает использовать видео-анимции в качестве фона автоматически <br><br>' +
                    '   Создайте папку внутри папки видео с названием <u>backmusic</u><br>' +
                    'и создайте папки анимаций с псевдонимом и вставьте этот псевдоним в дополнительное поле песни<br>' +
                    'под названием <u>alias_background</u> и используйте одно и то же имя для папки и песни<br>' +
                    'Модуль удаляет любой текст, который обычно отображается на главном экране, заменяя его на видео.<br>' +
                    'экран возврата продолжает показывать текст песни из holyrics.<br>' +
                    infoVDDMM
            }
        }
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
            label: jsc.i18n('Habilitar log'),
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
                  h.log(mID, jsc.i18n('Campo extra alias_background não configurado'));
               }
              return null;
           }
           var path = 'backmusic/' + t + '/' + obj.slide_show_index + '.mp4';
           if (h.videoExists(path)) {
             if (obj.slide_show_index == 1) { 
                 h.log(mID, jsc.i18n("Vídeo configurado") + " {} ",path);
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
               h.log(mID, jsc.i18n("Vídeo não encontrado") + ": {}", path);
            }
          }
        }
    };
}