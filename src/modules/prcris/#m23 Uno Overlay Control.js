// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22496e666f227d
var mID = '@prcris#m23';
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;

refreshTitleOverlayDatabase();

logState(module.settings.log, mUID, 'startup '+ mID);

}

function info() {
    return {
        id: mID,
        name: 'UNO Overlay Control',
        description: '<html>' +
                     '<div style="text-align: left;">' +
                     '<b>UNO Overlay Control Module for Holyrics</b><br><br>' +
                     'This module integrates Holyrics with the UNO platform, enabling dynamic and automated control of overlays during services and events. Its main features include:<br><br>' +
                     '<b>• Activation of overlays with preset display time:</b> Automatically display content with precise duration control.<br>' +
                     '<b>• Registration of multiple overlay keys:</b> Create menus and dynamic input windows, allowing you to edit content directly in Holyrics without accessing the UNO interface.<br>' +
                     '<b>• Individual display time configuration:</b> Each overlay can have a personalized display duration.<br>' +
                     '<b>• Media list integration:</b> Automatically send the current media title to a predefined overlay.<br>' +
                     '<b>• Schedule-based interaction:</b> Automatically show the names of scheduled people according to the moment (e.g., opening, message, worship), linking each media title to its assigned person.<br><br>' +
                     'This integration brings agility and organization to the visual presentation of information, reducing errors and simplifying operation during the service.<br><br>' +
                     infoVDDMM +
                     '</div>',
        i18n: {
            name: {
                en: 'UNO Overlay Control',
                pt: 'Controle de Overlay UNO',
                es: 'Control de Overlays UNO',
                ru: 'Управление Overlays UNO'
            },
            description: {
                en: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>UNO Overlay Control Module for Holyrics</b><br><br>' +
                    'This module integrates Holyrics with the UNO platform, enabling dynamic and automated control of overlays during services and events. Its main features include:<br><br>' +
                    '<b>• Activation of overlays with preset display time:</b> Automatically display content with precise duration control.<br>' +
                    '<b>• Registration of multiple overlay keys:</b> Create menus and dynamic input windows, allowing you to edit content directly in Holyrics without accessing the UNO interface.<br>' +
                    '<b>• Individual display time configuration:</b> Each overlay can have a personalized display duration.<br>' +
                    '<b>• Media list integration:</b> Automatically send the current media title to a predefined overlay.<br>' +
                    '<b>• Schedule-based interaction:</b> Automatically show the names of scheduled people according to the moment (e.g., opening, message, worship), linking each media title to its assigned person.<br><br>' +
                    'This integration brings agility and organization to the visual presentation of information, reducing errors and simplifying operation during the service.<br><br>' +
                    infoVDDMM +
                    '</div>',
                pt: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Controle de Overlays UNO para Holyrics</b><br><br>' +
                    'Este módulo integra o Holyrics à plataforma UNO, permitindo o controle dinâmico e automatizado de overlays durante os cultos e eventos. Suas principais funcionalidades incluem:<br><br>' +
                    '<b>• Ativação de overlays com tempo pré-determinado:</b> Exibição automática de conteúdos com controle preciso de duração.<br>' +
                    '<b>• Cadastro de múltiplas chaves de overlay:</b> Criação de menus e janelas de entrada de dados dinâmicas, permitindo editar conteúdos diretamente pelo Holyrics sem necessidade de acessar a interface do UNO.<br>' +
                    '<b>• Configuração individual do tempo de exibição:</b> Cada overlay pode ter um tempo personalizado de apresentação.<br>' +
                    '<b>• Integração com a lista de mídia:</b> Envio automático dos títulos em exibição para um overlay predeterminado.<br>' +
                    '<b>• Interação com a escala do culto:</b> Exibição automática dos nomes das pessoas escaladas conforme o momento (ex: abertura, mensagem, louvor), vinculando cada título da mídia ao responsável programado.<br><br>' +
                    'Essa integração proporciona mais agilidade e organização na apresentação visual das informações, reduzindo erros e facilitando a operação durante o culto.<br><br>' +
                    infoVDDMM +
                    '</div>',
                es: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Control de Overlays UNO para Holyrics</b><br><br>' +
                    'Este módulo integra Holyrics con la plataforma UNO, permitiendo el control dinámico y automatizado de overlays durante los cultos y eventos. Sus principales funciones incluyen:<br><br>' +
                    '<b>• Activación de overlays con tiempo predefinido:</b> Muestra automáticamente el contenido con un control preciso de duración.<br>' +
                    '<b>• Registro de múltiples claves de overlay:</b> Creación de menús y ventanas de entrada dinámicas, permitiendo editar el contenido directamente desde Holyrics sin necesidad de acceder a la interfaz de UNO.<br>' +
                    '<b>• Configuración individual del tiempo de visualización:</b> Cada overlay puede tener un tiempo personalizado.<br>' +
                    '<b>• Integración con la lista de medios:</b> Envío automático del título mostrado a un overlay predeterminado.<br>' +
                    '<b>• Interacción con el cronograma del culto:</b> Muestra automática de los nombres de las personas programadas según el momento (por ejemplo, apertura, mensaje, alabanza), vinculando cada título con su responsable.<br><br>' +
                    'Esta integración proporciona mayor agilidad y organización en la presentación visual de la información, reduciendo errores y facilitando la operación durante el culto.<br><br>' +
                    infoVDDMM +
                    '</div>',
                ru: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Модуль управления Overlays UNO для Holyrics</b><br><br>' +
                    'Этот модуль интегрирует Holyrics с платформой UNO, обеспечивая динамическое и автоматическое управление наложениями во время служений и мероприятий. Основные функции включают:<br><br>' +
                    '<b>• Активация наложений с заданным временем показа:</b> Автоматическое отображение контента с точным контролем продолжительности.<br>' +
                    '<b>• Регистрация нескольких ключей наложений:</b> Создание меню и окон ввода данных, позволяющее редактировать контент напрямую через Holyrics без доступа к интерфейсу UNO.<br>' +
                    '<b>• Индивидуальная настройка времени показа:</b> Для каждого наложения можно задать собственное время отображения.<br>' +
                    '<b>• Интеграция со списком медиа:</b> Автоматическая отправка текущего заголовка медиа на предустановленное наложение.<br>' +
                    '<b>• Взаимодействие с расписанием служения:</b> Автоматическое отображение имен назначенных участников в зависимости от момента (например, вступление, проповедь, прославление), связывая каждый заголовок с его ответственным.<br><br>' +
                    'Эта интеграция обеспечивает оперативность и организованность в визуальной подаче информации, снижает количество ошибок и упрощает управление служением.<br><br>' +
                    infoVDDMM +
                    '</div>'
            }
        }
    };
}
                     
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2253657474696e6773227d
function settings() {
    var sv = [];

    sv.push(
        {
            name: jsc.i18n('About') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            id: 'qtdOverlays',
            type: 'number',
            name: jsc.i18n('Quantidade de overlays a controlar:'),
            min: 1,
            max: 10,
            default_value: 1,
            component: 'combobox',
            decimal: false
        },
        {
            id: 'btnConfigurarOverlays',
            type: 'button',
            button_label: jsc.i18n('Configurar'),
            name: jsc.i18n('Chaves API / Tempo Exibição'),
            action: function(obj) {
                var s = module.settings;
                var qtd = parseInt(s.qtdOverlays, 10);
                if (isNaN(qtd) || qtd < 1) qtd = 1;

                var inputs = [
                    {
                        type: 'title',
                        name: 'Preencha as chaves e tempo de exibição de API'
                    }
                ];

                for (var i = 0; i < qtd; i++) {
                    inputs.push({ type: 'separator' });

                    inputs.push({
                        id: 'nickname' + i,
                        name: jsc.i18n('Apelido') + ' ' + (i + 1),
                        type: 'string'
                    });
                    inputs.push({
                        id: 'api' + i,
                        name: jsc.i18n('Chave API') + ' ' + (i + 1),
                        type: 'string'
                    });
                    /*
                    inputs.push({
                        id: 'url' + i,
                        name: jsc.i18n('Output URL') + ' ' + (i + 1),
                        type: 'string'
                    });
                    */
                    inputs.push({
                        id: 'timeOut' + i,
                        name: jsc.i18n('Tempo de Exibição (s)') + ' ' + (i + 1),
                        type: 'number',
                        min: 1,
                        max: 500,
                        default_value: 15,
                        component: 'combobox',
                        decimal: false
                    });
                }

                var q = module.inputSettings('cfg_uno_overlay', inputs);
                h.popupWorker({
                    title: 'Carregando dados dos overlays do site uno...',
                    action: function(evt) {
                        if (q !== null) {
                            var s = module.settings;
                            var o = s.cfg_uno_overlay;
                            for (var i = 0; i < s.qtdOverlays; i++) {
                                var apiKey = o['api' + i];
                                if (apiKey) {
                                    try {
                                    var overlayInfo = jsc.uno.getOverlays(apiKey)[0];
                                    var overlayData = jsc.uno.getOverlayContent(apiKey, overlayInfo.id);
                                    } catch (err) { h.log("",'Erro {}',[err]) };
                                    h.logp(mUID, '{%t} overlayInfo {} {}', i, overlayInfo);
                                    h.logp(mUID, '{%t} overlayData {} {}', i, overlayData);
                                    module.store('overlay' + i, overlayInfo);
                                    module.store('overlayData' + i, overlayData);
                                }
                            }
                         module.updatePanel(); 
                        }
                    }
                });
            }
        },
        {
            id: 'btnConfigurarItens',
            type: 'button',
            button_label: jsc.i18n('Configurar'),
            name: jsc.i18n('Itens a alterar'),
            action: function(obj) {
                var s = module.settings;
                var qtd = parseInt(s.qtdOverlays, 10);
                var o = s.cfg_uno_overlay;
                if (isNaN(qtd) || qtd < 1) qtd = 1;

                var inputs = [
                    {
                        type: 'title',
                        name: jsc.i18n('Selecione os itens de interesse')
                    },
                    {
                        type: 'separator'
                    }
                ];

                for (var i = 0; i < qtd; i++) {
                    var overlay = module.restore('overlay' + i);
                    var apiKey = o['api' + i];
                    var content = module.restore('overlayData'+i);
                   
                    inputs.push({
                        type: 'title',
                        name: o['nickname' + i] + ' (' + overlay.name + ')'
                    });

                    if (!content) {
                        h.log('', '{%t} ');
                        inputs.push({
                            type: 'title',
                            name: jsc.i18n('Conteúdo do overlay vazio ou nulo')
                        });
                        return;
                    }

                    for (var key in content) {
                        if (content.hasOwnProperty(key)) {
                            inputs.push({
                                id: apiKey + key,
                                label: key + ' (' + content[key] + ')',
                                type: 'boolean',
                                default_value: false
                            });
                        }
                    }
                    inputs.push({ type: 'separator' });
                }

                var q = module.inputSettings('cfg_uno_overlay', inputs);
                if (q !== null) {
                    module.updatePanel(); 
                }
            }
        },
        {
            id: 'btnOverlayTitleSchedule',
            type: 'button',
            button_label: jsc.i18n('Configurar'),
            name: jsc.i18n('Overlay automatizado com a escala'),
            description: jsc.i18n('No primeiro item exibido de cada título da programação, ativa o Overlay padrão com os dados encontrados na escala do evento que corresponderem ao título.'),
            action: function(obj) {
                var s = module.settings;
                var qtd = parseInt(s.qtdOverlays, 10);
                var o = s.cfg_uno_overlay;
                if (isNaN(qtd) || qtd < 1) qtd = 1;

                var inputs = [];

                var allowedValues = [{ value: '', label: '' }];
                for (var i = 0; i < qtd; i++) {
                    var label = o['nickname' + i] || module.restore('overlay' + i).name;
                    var item = i;
                    allowedValues.push({ value: item, label: label });
                }

                inputs.push({
                    id: 'defaultOverlay',
                    type: 'string',
                    name: 'Selecione o Overlay Padrão',
                    allowed_values: allowedValues
                });


                inputs.push({
                    id: 'title',
                    type: 'boolean',
                    name: jsc.i18n('Exibir "lower third" para título de mídia ("+" inibe)')
                });

                inputs.push({
                    id: 'song',
                    type: 'boolean',
                    name: jsc.i18n('Exibir "lower third" para música apresentada (Título/Artista)')
                });
                
                inputs.push({
                    id: 'title',
                    type: 'boolean',
                    name: jsc.i18n('Exibir "lower third" para escalados por título de mídia')
                });
                
                inputs.push({
                    id: 'delay',
                    type: 'number',
                    name: jsc.i18n('Atrasar exibição do nome')+' (s)',
                    default_value : 5
                });
                
                inputs.push({
                    id: 'interval',
                    type: 'number',
                    name: jsc.i18n('Intervalo entre exibições')+' (s)',
                    default_value : 1
                });

                inputs.push({
                    id: 'btnConfigureOverlayAuto',
                    type: 'button',
                    button_label: jsc.i18n('Configurar'),
                    name: jsc.i18n('Preenchimento automático'),
                    action: function(obj) {
                        h.logp(mUID,'{%t} obj {}',obj);
                        var defaultOverlayID = parseInt(obj.defaultOverlay, 10)
                        var defaultOverlay = module.restore('overlayData'+defaultOverlayID);
                        //h.logp(mUID,'{%t} defaultOverlay {} : {}',defaultOverlayID, defaultOverlay);
                        var s = module.settings;
                        
                        if (!defaultOverlay) {
                           h.logp(mUID,'{%t} Overlay não encontrado {} : {}',defaultOverlayID, defaultOverlay);
                           h.notification(jsc.i18n('Overlay não encontrado'), 3);
                           return;
                        }
                        var validFields = module.settings.cfg_uno_overlay || {};
                        var prefix = module.settings.cfg_uno_overlay['api'+defaultOverlayID];
                        var validKeys = [];
                        
                        h.logp(mUID,'{%t} prefix {}', prefix);
                        
                        for (var fullKey in validFields) {
                            if (
                                fullKey.indexOf(prefix) === 0 && 
                                validFields[fullKey] === true
                            ) {
                                h.log(mUID,'{%t} Valid fullKey {}',fullKey);
                                var validKey = fullKey.substring(prefix.length);
                                validKeys.push(validKey);
                            }
                        }

                        var allowedKeys = [{value:'',label:''}];
                        for (var key in defaultOverlay) {
                            if (defaultOverlay.hasOwnProperty(key) && validKeys.indexOf(key) !== -1) {
                                var val = defaultOverlay[key];
                                var label = key + ' (' + (typeof val === 'string' ? val : JSON.stringify(val)) + ')';
                                allowedKeys.push({ value: key, label: label });
                            }
                        }
                                              
                        var innerInputs = [
                            {
                                type: 'title',
                                name: jsc.i18n('Associe o item aos dados do Holyrics')
                            },
                            {
                                type: 'separator'
                            },
                            {
                                id: 'name',
                                name: jsc.i18n('Nome'),
                                type: 'string',
                                allowed_values : allowedKeys
                            },
                            {
                                id: 'skill',
                                name: jsc.i18n('Habilidades/Artista'),
                                type: 'string',
                                allowed_values : allowedKeys
                            }
                        ];

                        module.inputSettings('cfg_uno_overlay', innerInputs);
                    }
                });

                var q = module.inputSettings('cfg_uno_auto_overlay', inputs);
                if (q !== null) {
                    module.updatePanel(); 
                }
            }
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onChange ' + mID);
            }
        }
    );

    return sv;
}




// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22416374696f6e73227d
function actions(module) {
    var act = [
        actionSelectOverlay()
     ]
     
     if (isDev()) {
       act.push({
            hint: jsc.i18n('action name on hint'),
            icon: 'hourglass_bottom',
            action: function() {
                 var s = module.settings;
                 var o = s.cfg_uno_overlay;
                 var qtd = s.qtdOverlays;
                 h.logp(mUID,'{%t} s.cfg_uno_overlay: {} ',o);
                 for (var i = 0; i < qtd; i++) {
                        var h_apiKey = o['api'+i];
                        var h_overlayid = module.restore('overlay' + i).id;                   
                        h.logp(mUID, '{%t} {} {} {}', h_apiKey, h_overlayid, jsc.uno.getOverlayVisibility(h_apiKey, h_overlayid));      
                 }
            }
       });
     }

    return act;
}

function actionSelectOverlay() {
    var s = module.settings;
    var o = s.cfg_uno_overlay;

    h.log(mUID, '{%t} Carregando actionSelectOverlay...');
    h.log(mUID, '{%t} qtdOverlays: {}', s.qtdOverlays);
    h.log(mUID, '{%t} cfg_uno_overlay: {}', JSON.stringify(o));

    var menu = {
        id: 'menu',
        label: 'Overlays',
        icon: 'system:menu',
        status: function(evt) {
            return {
                hint: jsc.i18n('Overlays disponíveis')
            };
        },
        action: []
    };

    var max = parseInt(s.qtdOverlays, 10) || 0;

    for (var i = 0; i < max; i++) {
        h.log(mUID, '{%t} --- Iteração {} ---', i);

        var overlayList = module.restore('overlay' + i) || [];
        h.log(mUID, '{%t} overlay{}: {}', i, JSON.stringify(overlayList));

        var overlay = overlayList;
        var apiKey = o['api' + i];
        var timeOut = o['timeOut' + i];

        h.log(mUID, '{%t} api{}: {}', i, apiKey);

        if (!overlay || !apiKey) {
             h.log(mUID, '{%t} Dados incompletos para overlay{} — Ignorado', i);
             continue
        }
        
        (function(overlay, apiKey, timeOut, i) {
                h.log(mUID, '{%t} Adicionando item de menu para overlay{}: {}', i, overlay.name);
                menu.action.push({
                    label: o['nickname' + i] || overlay.name || ('Overlay ' + i),
                    icon: 'photo_album',
                    action: function() {

                        var content = jsc.uno.getOverlayContent(apiKey, overlay.id);

                        var inputs = [];
                        for (var key in content) {
                            if (content.hasOwnProperty(key)) {
                                var configKey = apiKey + key;
                                if (o[configKey] === true) {
                                    inputs.push({
                                        id: key,
                                        label: key,
                                        type: typeof content[key] === 'boolean' ? 'boolean' : 'string',
                                        default_value: content[key]
                                    });
                                }
                            }
                        }
                        
                        if (inputs.length > 0) {
                            var q = h.input(inputs);
                        } 
                        if ( q  || inputs.length === 0 ) {
                            showOverlay(i, apiKey, overlay.id, q);
                        } else {
                            h.log(mUID, '{%t} Nenhum valor foi atualizado (q está vazio ou null)');
                        }
                    }
                });
       })(overlay, apiKey, timeOut, i);
    }

    h.logp(mUID, '{%t} Menu final: {}', menu);
    return menu;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a225472696767657273227d
function triggers(module) {
    var arr = [];    

    arr.push({
      id: "overlay_titulo_item_midia_"+ mUID,
      when: "displaying",
      item: "any_title_subitem",
      action: function(obj) {
          var title = obj.title;
         
          // exibe um overlay que possuir o mesmo nome do título (eu uso pro qrcode do dizimo)
          showOverlayByTitle(obj.title); 
          
          // exibe overlay com o Título de Mídia que não possuir "+" no nome
          if (module.settings.cfg_uno_auto_overlay.title) {
              if (isNewTitle(title) && title.indexOf('+') < 0) { 
                  var data = {name : obj.title, info : ''}
                  showOverlayTitle( data ); 
              }
              if (title.indexOf('+')) {  
                  h.log(mUID, '{%t} Título ignorado por possuir "+" {}', title);
              }
          }

          // exibe overlay com o nome da pessoa escalada para aquele título
          var data = getPersonForTitle(title);
          h.logp(mUID,'{%t} getPersonForTitle(title) {}', data);
          if (data && data.name) {
            if (isNewTitle(title+data.name)) {   
               h.logp(mUID,'{%t} Persona recebida: {}', data);
               showOverlayTitle(data, parseInt(module.settings.cfg_uno_auto_overlay.delay) * 1000);
            } 
          }
          
          if (!module.restore('unoOn')) {
             h.log(mUID,'{%t} Não iniciou evento, registro de título ignorado {}');
             isNewTitle(null, true);
          }

      }
    });
    
    arr.push({ 
        id: 'log_musica' + mUID,
        when: 'displaying',
        item: 'any_song',
        action: function (obj) {    
          if (module.settings.cfg_uno_auto_overlay.song) {
              showOverlayBySong(obj);
          }
        }
    });        

    
    arr.push({
     id: mUID + "_rel"+"oad_schedule",
     when: "change",
     item: "playlist",
     action: function(obj) {
         refreshTitleOverlayDatabase();
     }
    });
   
    return arr;
}





// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2246756e6374696f6e73227d
function refreshTitleOverlayDatabase() {
 
  h.log(mUID,'{%t} Executando refreshTitleOverlayDatabase {}');  
  
  var runAT = module.restore('runAT')
  if (runAT) {
     h.cancelRunAt(runAT);
     h.log(mUID,'{%t} Execução do evento cancelada {}', runAT); 
     module.store('runAT',null);
     module.store('unoOn',false);
  }
 
 
  if (isTodaySchedule()) {
    var rAT = getScheduleTime();
    h.log(mUID,'{%t} Evento agendado para {}', rAT); 
    var id = h.runAt({
       name: mUID,
       datetime: rAT,
       action: function() {
            isNewTitle(null, true);
            h.log(mUID,'{%t} Registro de repetição de títulos inicializado.');
            module.store('unoOn',true);
            module.store('runAT',null);
       }
    });
    module.store('runAT',id);
  }
}


function getScheduleTime() {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];   
    h.log(mUID,'{%t} GetCurrentSchedule.datetime:{} ',s.datetime);
    return s.datetime;
}


function isTodaySchedule() {
      
    var scheduleDateTime = getScheduleTime();
    
    var scheduleDate = new Date(scheduleDateTime);
    var today = new Date();
    
    var isToday = (
        scheduleDate.getFullYear() === today.getFullYear() &&
        scheduleDate.getMonth() === today.getMonth() &&
        scheduleDate.getDate() === today.getDate()
    );
    
    h.log(mUID,'{%t} scheduleDate:{} isToday:{}',scheduleDate, isToday);
    
    return isToday;
}

function showOverlayBySong(obj) {
   var data = {name : '🎶'+obj.title, 
               info: obj.artist
   };
   h.logp(mUID,'{%t} showOverlayBySong {}', data);
   showOverlayTitle(data);
}

function showOverlayByTitle(title) {
    var s = module.settings;
    var o = s.cfg_uno_overlay;
    var qtd = parseInt(s.qtdOverlays, 10);
    var oldTitle = module.getGlobal('showOverlayByTitle');
    if (oldTitle && oldTitle.title != title){
        jsc.uno.hideOverlay(oldTitle.apiKey, oldTitle.id);
        module.setGlobal('showOverlayByTitle',null);
    }
    
    h.log(mUID,'{%t} title {}',title);
    for (var i = 0; i < qtd; i++) {
        var nicknameKey = "nickname" + i;
        h.log(mUID,'{%t} nicknameKey {}:{}',nicknameKey, o[nicknameKey]);
        if (o[nicknameKey] === title) {
            h.log(mUID,'{%t} Encontrado {}',i);   
            var apiKey = o['api' + i];
            var overlay = module.restore('overlay' + i) || [];
            jsc.uno.showOverlay(apiKey, overlay.id);
            module.setGlobal('showOverlayByTitle',{title: title, id : overlay.id, apiKey : apiKey});
            break; 
        }
    }
}
     
function showOverlay(cfgID, apiKey, overlayid, data, timeToWait) {
    var s = module.settings;
    var o = s.cfg_uno_overlay;
    var timeOut = parseInt(o['timeOut' + cfgID], 10) * 1000; // ms
    var interval = parseInt(module.settings.cfg_uno_auto_overlay.interval, 10) * 1000; // ms
    var now = Date.now();

    var overlayQueue = module.getGlobal('overlayQueue' + apiKey) || [];
    var execTime = now;

    if (overlayQueue.length > 0) {
        var last = overlayQueue[overlayQueue.length - 1];
        execTime = Math.max(execTime, last.end + interval);
    }

    // Aplica o tempo adicional de espera, se fornecido
    if (timeToWait && typeof timeToWait === 'number') {
        execTime += timeToWait;
    }

    var endTime = execTime + timeOut;

    var item = {
        runAtID: null,
        cfgID: cfgID,
        apiKey: apiKey,
        overlayid: overlayid,
        data: data,
        start: execTime,
        end: endTime
    };

    overlayQueue.push(item);
    module.setGlobal('overlayQueue' + apiKey, overlayQueue);

    // Logs detalhados
    h.log(mUID, '==== OverlayFila Novo item adicionado à fila');
    h.log(mUID, 'Fila atual ({} itens):', overlayQueue.length);
    h.log(mUID, 'Overlay ID: {}', overlayid);
    h.log(mUID, 'Início: {}, Fim: {}, Agora: {}',
       formatDateTime(execTime),
       formatDateTime(endTime),
       formatDateTime(now)
    );
    h.logp(mUID,'Conteúdo: {}', data);

    for (var i = 0; i < overlayQueue.length; i++) {
        h.logp(mUID, '-> [{}] {} até {} ({})', 
            i, formatDateTime(overlayQueue[i].start), formatDateTime(overlayQueue[i].end), overlayQueue[i].overlayid);
    }

    if (execTime <= now) {
        runOverlay(item);
    } else {
        try {
            var id = h.runAt({
                name: mUID + '_RunOverlay',
                datetime: formatDateTime(execTime),
                action: function () {
                    runOverlay(item);
                }
            });
        } catch (err) {
            h.log("", 'Erro {}', [err]);
        }
        h.log(mUID, '{%t} id RunAT {}', id);
    }
}


function runOverlay(item) {
    jsc.uno.setOverlayContent(item.apiKey, item.overlayid, item.data);
    jsc.uno.showOverlay(item.apiKey, item.overlayid);

    h.log(mUID, '{%t} Overlay Ativado {}: {}', item.overlayid, item.data);

    var duration = item.end - item.start;

    h.setTimeout(function () {
        jsc.uno.hideOverlay(item.apiKey, item.overlayid);
        h.log(mUID, '{%t} Overlay desativado {}: {}', item.overlayid, item.data);

        var overlayQueue = module.getGlobal('overlayQueue' + apiKey) || [];
        if (overlayQueue.length > 0 && overlayQueue[0].start === item.start && overlayQueue[0].overlayid === item.overlayid) {
            overlayQueue.shift();
            module.setGlobal('overlayQueue'  + apiKey, overlayQueue);

            h.logp(mUID, 'OverlayFila', 'Overlay removido da fila: {}', item.overlayid);
            h.logp(mUID, 'OverlayFila', 'Fila após remoção ({} itens):', overlayQueue.length);
            for (var i = 0; i < overlayQueue.length; i++) {
                h.logp(mUID, 'OverlayFila', '- [{}] {} até {} ({})', 
                    i, overlayQueue[i].start, overlayQueue[i].end, overlayQueue[i].overlayid);
            }
        }
    }, duration);
}


    
                       
function isNewTitle(title, clear) {
    var key = mUID + '_used_titles';
    var used = h.getGlobal(key) || [];

    // Se clear for true, limpa o registro
    if (clear) {
        h.setGlobal(key, []);
        h.log(mUID, '{%t} Lista de títulos reiniciada.');
        return true;
    }

    // Se já existe, retorna false
    if (used.indexOf(title) !== -1) {
        h.log(mUID, '{%t} Título repetido ignorado: {}', title);
        return false;
    }

    // Se for novo, adiciona e salva
    used.push(title);
    h.setGlobal(key, used);
    h.log(mUID, '{%t} Título novo registrado: {}', title);
    return true;
}

function showOverlayTitle(data, timeToWait) {
    if (!data || !data.name) {
        h.log(mUID, '{%t} Dados inválidos fornecidos ao overlay.');
        return;
    }

    var defaultOverlay = parseInt(module.settings.cfg_uno_auto_overlay.defaultOverlay, 10);
    var nameField = module.settings.cfg_uno_overlay.name
    var skillField = module.settings.cfg_uno_overlay.skill
    var o = module.settings.cfg_uno_overlay;
    var overlay = module.restore('overlay' + defaultOverlay) || [];
    var apiKey = o['api' + defaultOverlay];
    var timeOut = parseInt(o['timeOut' + defaultOverlay],10);

    h.logp(mUID,'{%t} apiKey {} overlay.id {} defaultOverlay {}, data {}, timeout {}', 
       apiKey, overlay.id, defaultOverlay, data, timeOut);

    var dataToSend = {};

    dataToSend[nameField] = data.name;
    dataToSend[skillField] = data.info;

    h.logp(mUID,'{%t} datatosend {}', dataToSend);
    showOverlay(defaultOverlay, apiKey, overlay.id, dataToSend, timeToWait);
}



function getPersonForTitle(title) {
    var r = h.hly('GetCurrentSchedule').data[0];

    // Procurar a função correspondente ao título
    var role = null;
    for (var i = 0; i < r.roles.length; i++) {
        if (r.roles[i].name === title) {
            role = r.roles[i];
            break;
        }
    }

    if (!role) {
        h.logp(mUID, '{%t} Nenhum pessoa escalada para o título: {}', title);
        return null;
    }

    // Se a função tiver um membro atribuído
    if (role.member && role.member.id) {
        var memberId = role.member.id;

        // Buscar detalhes do membro pelo ID
        var members = h.hly('GetMembers').data;
        for (var j = 0; j < members.length; j++) {
            if (members[j].id === memberId) {
                var person = {
                    name: members[j].name,
                    info: members[j].skills
                };
                h.log(mUID, '{%t} Pessoa escalada para "{}": {} (função: {})', title, person.name, person.skills);
                return person;
            }
        }

        h.log(mUID, '{%t} Membro com ID "{}" não encontrado em GetMembers.', memberId);
        return null;
    } else {
        h.log(mUID, '{%t} A função "{}" não possui ninguém escalado.', title);
        return null;
    }
}


function formatDateTime(ms) {
    var d = new Date(ms);
    function pad(n) { return n < 10 ? '0' + n : n; }

    return pad(d.getHours()) + ':' +
           pad(d.getMinutes()) + ':' +
           pad(d.getSeconds());
}