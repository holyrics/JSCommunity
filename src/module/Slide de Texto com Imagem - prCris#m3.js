// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
// @prcris_#m3_

function info() {
    return {
        id: '@prcris#m3',
        name: 'Slide de Imagem em Apresntações de texto',
        description: '<html>'+
                     '• Permite inserir uma imagem em uma apresentação de texto. <br><br>'+
                     '   Crie um slide de texto em branco na posição desejada da sua apresentação e '+
                     'insira a tag de imagem do holyrics desta forma:<br><br><b>img=nome da imagem.jpg</b><br><br>'+
                     'Ao montar a exibição da apresentação, o holyrics irá exibir a imagem neste slide automaticamente.<br>'+
                     'O Módulo carrega apartir da pasta de imagens do holyrics e remove qualquer texto do slide em questão.<br><hr>'+
                     '@ Para mais informações acesse '+"<a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>"
    };
}







// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
//@prcris#m3_

function settings() {
    
    return [
        {
            name: 'Sobre @prcris#m3',
            description: "<html><hr>Para mais informações acesse <a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
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
//@prcris#m3_
function customTheme(module) {
    return {
        text: function(obj) {
            var t = obj.text;
            if (t.toUpperCase().indexOf("IMG=") === 0) {
                var path = t.substring(4);
                h.log("@prcris#m3", "Imagem encontrada " + path);
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

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273746172745570227d
function actions(module) {
    logState(module.settings.log); //habilita ou desabilita o log de acordo com a configuração
    return null;
}

function logState(log){ 
    h.log.setEnabled('@prcris#m3', log);
}