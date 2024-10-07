// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m3';
var mUID = '@prcris#m3';

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID, 'startup '+ mID);
 
}

function info() {
    return {
        id: mID,
        name: 'Imagem no Slide',
        description: '<html>'+
                     '• Permite inserir uma imagem em uma apresentação do tipo texto. <br><br>'+
                     '   Crie um slide de texto em branco na posição desejada da sua apresentação e '+
                     'insira a tag de imagem do holyrics desta forma:<br><br><b>img=nome da imagem.jpg</b><br><br>'+
                     'Ao montar a exibição da apresentação, o holyrics irá exibir a imagem neste slide automaticamente.<br>'+
                     'O Módulo carrega apartir da pasta de imagens do holyrics e remove qualquer texto do slide em questão.<br>'+
                     '==Todo texto extra será exibido apenas na tela de retorno.<br>'+
                     infoVDDMM
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
        text: function(obj) {
            var t = obj.text;
            if (t.toUpperCase().indexOf("IMG=") === 0) {
                var path = t.substring(4);
                h.log(mID, "Imagem encontrada " + path);
                return {
                    custom_theme: {
                        background: {
                            type: 'image_file',
                            id: path
                        },
                        font: {
                            size: 0
                        }
                    }
                };
            }
            return null;
        }
    };
}