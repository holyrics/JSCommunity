// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m12';
var mUID = mID + ''; 

//#import modules_generic_functions

function startup(module) { 
mUID = mID + module.id;
//logState(module.settings.log, mUID, 'startup '+ mID);
}




function info() {   
    return {  
        id: mID,
        name: 'Standardize Highlight Color in Texts',  // tradução para inglês
        description: '• Creates a system variable with the color to be used for highlighting text, having the color per event, making it easier to choose the color according to the general theme of the event. <br>' + 
                     '<b><u>How to use:</u></b> use the tag <span style="color: red; background-color: yellow;">&lt;color:@js{txtC}&gt;text to color&lt;/color&gt;</span> in your styled texts ' +
                     'and the text will appear in the color chosen in the module configuration for that event.<br><hr>' +                     
                     'For example, in a text-based presentation, create dynamic color highlights: <br><br> ' + 
                     '"When the human word deteriorates to the point that, under certain circumstances, yes can mean no, and no yes, the community is destroyed."<br>' + 
                     '&lt;size:80&gt;&lt;color:@js{txtC}&gt;Schweitzer&lt;/color&gt;&lt;/size&gt<br>' + 
                     infoVDDMM,  // mantendo infoVDDMM

        i18n: {
            name: {
                en: 'Standardize Highlight Color in Texts',  // tradução para inglês
                pt: 'Padronize cor de destaque em textos',  // tradução para português
                es: 'Estandarizar el color de resaltado en textos',  // tradução para espanhol
                ru: 'Стандартизировать цвет выделения в тексте'  // tradução para russo
            },
            description: {
                en: '• Creates a system variable with the color to be used for highlighting text, having the color per event, making it easier to choose the color according to the general theme of the event. <br>' + 
                    '<b><u>How to use:</u></b> use the tag <span style="color: red; background-color: yellow;">&lt;color:@js{txtC}&gt;text to color&lt;/color&gt;</span> in your styled texts ' +
                    'and the text will appear in the color chosen in the module configuration for that event.<br><hr>' +                     
                    'For example, in a text-based presentation, create dynamic color highlights: <br><br> ' + 
                    '"When the human word deteriorates to the point that, under certain circumstances, yes can mean no, and no yes, the community is destroyed."<br>' + 
                    '&lt;size:80&gt;&lt;color:@js{txtC}&gt;Schweitzer&lt;/color&gt;&lt;/size&gt<br>' + 
                    infoVDDMM,  // mantendo infoVDDMM
                pt: '• Cria uma variável de sistema com a cor para ser usada nos realces de textos, tendo a cor por evento, facilitando escolher a cor de acordo com o tema geral do evento. <br>' + 
                    '<b><u>Modo de uso:</u></b> utilize em seus textos estilizados a tag <span style="color: red; background-color: yellow;">&lt;color:@js{txtC}&gt;texto a colorir&lt;/color&gt;</span> ' +
                    'e o texto sairá na cor escolhida na configuração do módulo para aquele evento.<br><hr>' +                     
                    'Exemplo, em uma apresentação do tipo texto crie destaques de cor dinâmica: <br><br> ' + 
                    '"Quando a palavra humana se deteriora de tal modo que, sob certas circunstâncias, sim pode significar não, e não sim, a comunidade está destruída."<br>' + 
                    '&lt;size:80&gt;&lt;color:@js{txtC}&gt;Schweitzer&lt;/color&gt;&lt;/size&gt<br>' + 
                    infoVDDMM,  // mantendo infoVDDMM
                es: '• Crea una variable del sistema con el color que se utilizará para resaltar los textos, teniendo el color por evento, facilitando elegir el color de acuerdo con el tema general del evento. <br>' + 
                    '<b><u>Cómo usar:</u></b> use la etiqueta <span style="color: red; background-color: yellow;">&lt;color:@js{txtC}&gt;texto a colorear&lt;/color&gt;</span> en sus textos estilizados ' +
                    'y el texto aparecerá en el color elegido en la configuración del módulo para ese evento.<br><hr>' +                     
                    'Por ejemplo, en una presentación basada en texto, cree resaltes de color dinámico: <br><br> ' + 
                    '"Cuando la palabra humana se deteriora de tal manera que, bajo ciertas circunstancias, sí puede significar no, y no sí, la comunidad está destruida."<br>' + 
                    '&lt;size:80&gt;&lt;color:@js{txtC}&gt;Schweitzer&lt;/color&gt;&lt;/size&gt<br>' + 
                    infoVDDMM,  // mantendo infoVDDMM
                ru: '• Создает системную переменную с цветом, который будет использоваться для выделения текста, задавая цвет для каждого события, что облегчает выбор цвета в соответствии с общим темой события. <br>' + 
                    '<b><u>Как использовать:</u></b> используйте тег <span style="color: red; background-color: yellow;">&lt;color:@js{txtC}&gt;текст для окраски&lt;/color&gt;</span> в ваших стилизованных текстах ' +
                    'и текст будет отображаться в выбранном цвете в настройках модуля для этого события.<br><hr>' +                     
                    'Например, в текстовой презентации создайте динамические цветовые выделения: <br><br> ' + 
                    '"Когда человеческое слово ухудшается до такой степени, что при определенных обстоятельствах да может означать нет, а нет да, сообщество разрушено."<br>' + 
                    '&lt;size:80&gt;&lt;color:@js{txtC}&gt;Швейцер&lt;/color&gt;&lt;/size&gt<br>' + 
                    infoVDDMM  // mantendo infoVDDMM
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273797374656d56617273227d
function systemVariables(module) {
  return {
    txtC: function() {
       return module.settings['highlightTextColor_' + sn()]; 
    }
  }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    //mesma sintaxe de function input
    return [
        {
            name: jsc.i18n('Sobre')+' '+ mID,
            description: infoVDDMM,
            type: 'label'
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function sn () {
  var scheduleName = h.hly('GetCurrentSchedule').data[0].name;

  return scheduleName;
}

function removeAccentsAndSpaces(str) {
    var accents = "áàãâäéèêëíìîïóòõôöúùûüçñÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇÑ";
    var withoutAccents = "aaaaaeeeeiiiiooooouuuucnAAAAAEEEEIIIIOOOOOUUUUCN";

    // Substitui acentos pelos equivalentes não acentuados
    str = str.replace(/[^A-Za-z0-9]/g, function(char) {
        var index = accents.indexOf(char);
        return index !== -1 ? withoutAccents[index] : '';
    });

    return str;
}


function inputColor(module) {

    var inputs = [{
           id: 'highlightTextColor_' + sn(),
           name: 'Cor para "'+sn()+'":',
           type: 'color',
           default_value : module.settings['highlightTextColor_' + sn()]
           }]
                   
    var q = h.input(inputs);
     if (q !== null) {
           module.settings['highlightTextColor_' + sn()] = q;
           }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {

 return [
    actionColor(module)
    ]
}

function actionColor(module) { // cancela a execução de um vídeo no OBS
    return {
        id: 'changeColor',
        label: sn(),
        icon: 'color_lens',
        hint: jsc.i18n('Altera a cor do destaque para apresentações de texto quando encontra a tag')+'&lt;color:@js{txtC}&gt;',
        action: function(evt) {
            inputColor(module);
        },
        status: function(evt) {
            return {
                background: module.settings['highlightTextColor_' + sn()]
            }
        }
     };
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
function triggers(module) {
  var arr = [];

  arr.push({
    id: mUID + "_rel"+"oad_schedule",
    when: "change",
    item: "playlist",
    action: function(obj) {
     module.restart();
     module.repaintPanel();
     module.updatePanel();
    }
  });

return arr;
}