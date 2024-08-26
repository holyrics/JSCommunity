// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
// @prcris_#m10_

function info() {
    return {
        name: '@prcris#m10 Añade un vídeo de fondo en el tema de cada diapositiva',
        description: '<html>'+
                     '• Permite utilizar animaciones en vídeo como fondo de manera automática <br><br>'+
                     '   Cree una carpeta dentro de la carpeta videos con el nombre <u>backmusic</u><br>'+
                     'y cree las carpetas de las animaciones con un apodo e inserte este apodo en un campo extra de la música<br>'+
                     'llamado <u>alias_background</u> y coloque el mismo nombre de la carpeta apodo para la música<br>'+
                     'El Módulo elimina cualquier texto que se mostraría en la pantalla principal, reemplazándolo por el vídeo.<br><hr>'+
                     '@ Para más información, visite '+"<a href='https://youtube.com/@BecuadroMusic'>youtube.com/@BecuadroMusic</a></html>"
    };
}







// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
//@prcris#m10_

function settings() {
    
    return [
        {
            name: 'Sobre @prcris#m10',
            description: "<html><hr>Para mais informações acesse <a href='https://youtube.com/@BecuadroMusic'>youtube.com/@BecuadroMusic</a></html>",
            type: 'label'
        }, {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange :  function(obj) {
                logState(obj.input.log); //habilita ou desabilita o log de acordo com a configuração  
              }
        }
    ];

}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22637573746f6d5468656d65227d
//@prcris#m10_
function customTheme(module) {
    return {
        
        song: function(obj) {
           var t = obj.alias_background;
           var loop_disabled = !!t;  

           if (obj.slide_show_index == 1) { 
              h.log("@prcris#m10", 'disable_background_loop? {}', loop_disabled);
              h.setRuntimeSettings('disable_background_loop', loop_disabled);
              h.setRuntimeSettings('disable_extend_single_video', loop_disabled);
              h.log("@prcris#m10", 'alias_background: {}', t);
           }
           
           if (!t) {
               if (obj.slide_show_index == 1) { 
                  h.log("@prcris#m10", 'Campo extra alias_background não configurado');
               }
              return null;
           }
           var path = 'backmusic/' + t + '/' + obj.slide_show_index + '.mp4';
           if (h.videoExists(path)) {
             if (obj.slide_show_index == 1) { 
                 h.log("@prcris#m10", "Vídeo configurado {} ",path);
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
               h.log("@prcris#m10", "Vídeo não encontrado: {}", path);
            }
          }
        }
    };
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273746172745570227d
function actions(module) {
    
    logState(module.settings.log); //habilita ou desabilita o log de acordo com a configuração
    return null;
}

function logState(log){ 
    h.log.setEnabled('@prcris#m10', log);
}