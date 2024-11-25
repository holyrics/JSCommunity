// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m3';
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID, 'startup '+ mID);
 
}


function info() {
    return {
        id: mID,
        name: 'Image on Slide',  
        description: '<html>' + 
                     '• Allows inserting an image into a text-type presentation slide. <br><br>' + 
                     '   Create a blank text slide at the desired position in your presentation and ' +
                     'insert the holyrics image tag like this:<br><br><b>img=image name.jpg</b><br><br>' +
                     'When assembling the presentation display, holyrics will automatically display the image on this slide.<br>' +
                     'The module loads from the holyrics image folder and removes any text from the slide in question.<br>' +
                     '==Any extra text will be displayed only on the return screen.<br>' +
                     infoVDDMM,
        allowed_requests: [
                     allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Image on Slide',
                pt: 'Imagem no Slide',
                es: 'Imagen en el Slide',
                ru: 'Изображение на слайде'
            },
            description: {
                en: '<html>' +
                    '• Allows inserting an image into a text-type presentation slide. <br><br>' +
                    '   Create a blank text slide at the desired position in your presentation and ' +
                    'insert the holyrics image tag like this:<br><br><b>img=image name.jpg</b><br><br>' +
                    'When assembling the presentation display, holyrics will automatically display the image on this slide.<br>' +
                    'The module loads from the holyrics image folder and removes any text from the slide in question.<br>' +
                    '==Any extra text will be displayed only on the return screen.<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Permite inserir uma imagem em uma apresentação do tipo texto. <br><br>' +
                    '   Crie um slide de texto em branco na posição desejada da sua apresentação e ' +
                    'insira a tag de imagem do holyrics desta forma:<br><br><b>img=nome da imagem.jpg</b><br><br>' +
                    'Ao montar a exibição da apresentação, o holyrics irá exibir a imagem neste slide automaticamente.<br>' +
                    'O Módulo carrega a partir da pasta de imagens do holyrics e remove qualquer texto do slide em questão.<br>' +
                    '==Todo texto extra será exibido apenas na tela de retorno.<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Permite insertar una imagen en una diapositiva de presentación tipo texto. <br><br>' +
                    '   Cree una diapositiva de texto en blanco en la posición deseada de su presentación y ' +
                    'inserte la etiqueta de imagen de holyrics de esta manera:<br><br><b>img=nombre de la imagen.jpg</b><br><br>' +
                    'Al montar la exhibición de la presentación, holyrics mostrará automáticamente la imagen en esta diapositiva.<br>' +
                    'El módulo carga desde la carpeta de imágenes de holyrics y elimina cualquier texto de la diapositiva en cuestión.<br>' +
                    '==Cualquier texto extra solo se mostrará en la pantalla de retorno.<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• Позволяет вставить изображение в текстовую слайд-презентацию. <br><br>' +
                    '   Создайте пустой текстовый слайд в нужной позиции вашей презентации и ' +
                    'вставьте тег изображения holyrics следующим образом:<br><br><b>img=название изображения.jpg</b><br><br>' +
                    'При сборке показа презентации holyrics автоматически отобразит изображение на этом слайде.<br>' +
                    'Модуль загружается из папки изображений holyrics и удаляет любой текст с данного слайда.<br>' +
                    '==Любой дополнительный текст будет отображаться только на экране возврата.<br>' +
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
        text: function(obj) {
            var t = obj.text;
            var i = t.toUpperCase().indexOf("IMG=");
            h.log(mUID, "obj.text = '{}' " + jsc.i18n("posição") +" img={}", t, i);
            if (i === 0) {
                var path = t.substring(4);
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
           else
            return null;
        }
    };
}