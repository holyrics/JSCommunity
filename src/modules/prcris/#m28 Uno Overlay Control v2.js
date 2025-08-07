// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22496e666f227d
var mUID = '@prcris#m28';
var mUID = mUID+''; 

//#import modules_generic_functions 

function startup(module) { 
    
    genericStartup();
    refreshTitleOverlayDatabase();
    module.store('unoOn', false);   
    if (!module.global.activeOverlays) {
       module.global.activeOverlays = {}; // { token_overlayId: {timeoutId, expiresAt} }
    }
}

function info() { 
    
    return {
        id: mUID,
        name: 'UNO Overlay Control 2.0',
        min_version : '2.26.0',
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
    
    var settingsArray = [];
    settingsArray.push(
        settingsAbout(),
        { type: 'separator' },
        settingsOverlaysObjectModel(), 
        configureAutomatedOverlayAction(),
        { type: 'separator' },
        settingsLogger()
    );
    return settingsArray;
}



// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2253657474696e67734578747261227d
function settingsOverlaysObjectModel() {
    return {
        id: 'overlays',
        type: 'object_model_manage_list',
        model: 'uno_overlay',
        name: jsc.i18n('Tokens UNO'),
        description: jsc.i18n('Cadastre, edite ou remova os tokens UNO. Use o botão "Configurar" de cada item para gerenciar campos/overlays.')
    };
}


function configureOverlayForToken(obj, callback) {
    // obj: objeto do modelo uno_overlay ({name, token, ...})
    // callback: função para fechar o editor (chame callback() se quiser fechar após salvar)

    var token = obj.token;
    var name = obj.name || jsc.i18n('Overlay');

    if (!token) {
        showMessage(
            jsc.i18n('Erro'),
            jsc.i18n('Informe o Token UNO antes de configurar os overlays.')
        );
        return;
    }

    // Identifica o tipo do overlay
    var tipo = detectOverlayType(token);
    module.store('overlayType_' + token, tipo);

    // Blacklist e timer
    if (tipo === 'blacklisted') {
        showMessage(
            jsc.i18n('Overlay não suportado'),
            '<html>' +
            jsc.i18n('O token inserido está vinculado a um overlay do tipo "Countdown" que não é compatível com este módulo.') + '<br>' +
            jsc.i18n('Estes overlays personalizados não possuem suporte aos comandos de contagem regressiva.') + '<br>' +
            jsc.i18n('Por favor, utilize um overlay do tipo Timer oficial.') +
            '</html>'
        );
        return;
    }

    if (tipo === 'timer') {
        module.inputSettings('cfg_overlay_timer_defaults_' + token, [
            { type: 'title', name: jsc.i18n('Configuração do Timer para o Token ') + name },
            { type: 'separator' },
            {
                id: 'defaultDurations_timer_' + token,
                name: jsc.i18n('Tempos padrão (min)'),
                description: jsc.i18n('Coloque os tempos separados por vírgula'),
                type: 'string',
                default_value: '5, 10'
            }
        ]);
        module.updatePanel();
        if (typeof callback === 'function') callback();
        return;
    }

    // Carrega overlays já armazenados para esse token
    var overlays = [];
    for (var j = 0; ; j++) {
        var ov   = module.restore('overlay_' + token + '_' + j);
        var data = module.restore('overlayData_' + token + '_' + j);
        if (!ov || !data) break;
        if (ov.hasSlots) continue;
        overlays.push({ overlay: ov, content: data, j: j });
    }

    // Se não houver overlays salvos, busca da API UNO e armazena
    if (overlays.length === 0) {
        var apiList = jsc.uno.getOverlays(token);
        for (var j2 = 0; j2 < apiList.length; j2++) {
            var ov2      = apiList[j2];
            if (ov2.hasSlots) continue;
            var content2 = jsc.uno.getOverlayContent(token, ov2.id);

            if (ov2.hasSlots) {
                ov2.type = 'pack';
            } else if (ov2.slots && ov2.slots.length > 0) {
                ov2.type = 'slot';
            } else {
                ov2.type = 'simples';
            }
            if (!content2) continue;
            module.store('overlay_' + token + '_' + j2, ov2);
            module.store('overlayData_' + token + '_' + j2, content2);
            overlays.push({ overlay: ov2, content: content2, j: j2 });
        }
    }

    // Fluxo para 1 overlay (abre config direta), múltiplos overlays (lista), nenhum overlay (erro)
    if (overlays.length === 1) {
        var single = overlays[0];
        var label  = name + ' → ' + single.overlay.name;
        configureSingleOverlayForToken(token, single.j, name, label, single.overlay, obj, callback);
    } else if (overlays.length > 1) {
        var list = [
            { type: 'title', name: jsc.i18n('Overlays do Token ') + name },
            { type: 'separator' }
        ];
        overlays.forEach(function(item) {
            var ov   = item.overlay;
            var keyA = 'alias_overlay_' + ov.id;
            var valA = obj[keyA] || ov.name;
            var lbl  = name + ' → ' + ov.name;
            list.push({ type: 'title', name: 'Overlay: ' + ov.name });
            list.push({
                id: keyA,
                type: 'string',
                name: jsc.i18n('Apelido'),
                default_value: valA
            });
            list.push({
                id: 'btn_cfg_' + ov.id,
                type: 'button',
                name: jsc.i18n('Configurar tempo e campos'),
                button_label: jsc.i18n('Configurar'),
                action: (function(tokenRef, jRef, n, lbl2, ovRef) {
                    return function(o2) {
                        configureSingleOverlayForToken(tokenRef, jRef, n, lbl2, ovRef, o2, callback);
                    };
                })(token, item.j, name, lbl, ov)
            });
            list.push({ type: 'separator' });
        });
        module.inputSettings('cfg_overlay_pack_' + token, list);
        module.updatePanel();
        if (typeof callback === 'function') callback();
    } else {
        showMessage(
            jsc.i18n('Nenhum overlay disponível'),
            jsc.i18n('Não foi possível localizar nenhum overlay válido/compatível para o token informado.')
        );
    }
}

/**
 * Abre tela de configuração individual de overlay UNO para um token.
 * @param {string} token   Token UNO do cadastro (campo .token do objeto)
 * @param {number} j       Índice do overlay (0, 1, ...)
 * @param {string} name    Nome do token (campo .name do objeto)
 * @param {string} label   Rótulo para exibir na tela
 * @param {object} overlay Objeto overlay retornado da UNO API
 * @param {object} obj     Objeto de entrada, pode ser usado para passar dados extras
 * @param {function} callback Função callback para fechar editor se desejar
 */
function configureSingleOverlayForToken(token, j, name, label, overlay, obj, callback) {
    // Recupera conteúdo salvo para este overlay
    var content = module.restore('overlayData_' + token + '_' + j);

    if (!token) {
        showMessage(
            jsc.i18n('Erro'),
            jsc.i18n('Token UNO não informado. Digite o token antes de configurar.')
        );
        return;
    }
    if (!content) {
        showMessage(
            jsc.i18n('Erro'),
            jsc.i18n('Dados do overlay não encontrados.') + '<br><br>' +
            jsc.i18n('Clique em "Configurar" apenas após digitar o token.')
        );
        return;
    }

    // Prepara inputs para configurar timeout e campos ativáveis
    var inputs = [
        { type: 'title', name: jsc.i18n('Overlay:') + ' ' + name + ' → ' + overlay.name },
        { type: 'separator' },
        {
            id: 'timeout_' + token + '_' + j,
            name: jsc.i18n('Tempo de Exibição (s)'),
            type: 'number',
            min: 0,
            max: 500,
            default_value: 15,
            component: 'combobox',
            decimal: false
        },
        { type: 'separator' },
        { type: 'title', name: jsc.i18n('Itens a personalizar ao ativar') }
    ];

    // Monta inputs booleanos para ativar/desativar campos do overlay
    for (var key in content) {
        if (!content.hasOwnProperty(key)) continue;
        var preview = '' + content[key];
        inputs.push({
            id: token + '_' + key,
            label: key + ' (' + preview.substring(0, 20) + (preview.length > 20 ? '...' : '') + ')',
            type: 'boolean',
            default_value: false
        });
    }

    // Abre tela de configuração
    var r = module.inputSettings('cfg_uno_overlay', inputs);
    module.updatePanel();
    // Fecha o editor (caso callback tenha sido informado)
    if (typeof callback === 'function') {
        callback();
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2253657474696e6773204175746f6d61746564227d
// Funções para configurar overlays automatizados baseadas no padrão de actionSelectOverlay
// Abre tela de configuração detalhada para cada tipo de overlay automatizado
function getOverlaySelectionData() {
    var result = {
        overlays: [],
        fields_by_overlay: {}
    };
    var ctrl = module.getObjectModelCtrl('uno_overlay');
    var overlayList = ctrl.getAll() || [];

    for (var i = 0; i < overlayList.length; i++) {
        var token = overlayList[i].token;
        var name = overlayList[i].name || jsc.i18n('Overlay');
        var tokenType = module.restore('overlayType_' + token);

        if (tokenType === 'timer' || tokenType === 'blacklisted' || tokenType === 'unknown') continue;

        for (var j = 0; ; j++) {
            var overlay = module.restore('overlay_' + token + '_' + j);
            if (!overlay) break;

            // Flat para packs
            if (overlay.type === 'pack' && Array.isArray(overlay.items)) {
                for (var z = 0; z < overlay.items.length; z++) {
                    var itemOv = overlay.items[z];
                    var ovLabel = name + ' → ' + overlay.name + ' → ' + (itemOv.name || ('Item ' + (z + 1)));
                    var valueKey = token + '|' + itemOv.id;

                    result.overlays.push({ value: valueKey, label: ovLabel });

                    // Coleta campos válidos
                    var validFields = [];
                    var cfg = module.settings.cfg_uno_overlay || {};
                    var prefix = token + '_';
                    for (var key in cfg) {
                        if (key.indexOf(prefix) === 0 && cfg[key] === true) {
                            validFields.push(key.substring(prefix.length));
                        }
                    }

                    var itemContent = jsc.uno.getOverlayContent(token, itemOv.id) || {};
                    var overlayValidFields = [];
                    for (var key2 in itemContent) {
                        if (validFields.indexOf(key2) !== -1) {
                            overlayValidFields.push(key2);
                        }
                    }
                    result.fields_by_overlay[valueKey] = overlayValidFields;
                }
                continue;
            }

            // Slots (preset)
            if (overlay.slots && overlay.slots.length > 0) {
                var slotList = module.restore('overlayPresets_' + token + '_' + j) || overlay.slots || [];
                for (var k = 0; k < slotList.length; k++) {
                    var slotName = slotList[k].name;
                    var slotData = slotList[k].payload || {};
                    var slotKey  = token + '|' + overlay.id + '_' + h.sha256Str(JSON.stringify(slotData));
                    var ovLabel = name + ' → ' + overlay.name + ' [' + slotName + ']';

                    result.overlays.push({ value: slotKey, label: ovLabel });

                    // Coleta campos válidos
                    var validFields = [];
                    var cfg = module.settings.cfg_uno_overlay || {};
                    var prefix = token + '_';
                    for (var key in cfg) {
                        if (key.indexOf(prefix) === 0 && cfg[key] === true) {
                            validFields.push(key.substring(prefix.length));
                        }
                    }

                    var overlayValidFields = [];
                    for (var key2 in slotData) {
                        if (validFields.indexOf(key2) !== -1) {
                            overlayValidFields.push(key2);
                        }
                    }
                    result.fields_by_overlay[slotKey] = overlayValidFields;
                }
                continue;
            }

            // Overlay simples
            var valueKey = token + '|' + overlay.id;
            var ovLabel = name + ' → ' + overlay.name;
            result.overlays.push({ value: valueKey, label: ovLabel });

            // Coleta campos válidos
            var validFields = [];
            var cfg = module.settings.cfg_uno_overlay || {};
            var prefix = token + '_';
            for (var key in cfg) {
                if (key.indexOf(prefix) === 0 && cfg[key] === true) {
                    validFields.push(key.substring(prefix.length));
                }
            }

            var overlayData = module.restore('overlayData_' + token + '_' + j) || {};
            var overlayValidFields = [];
            for (var key2 in overlayData) {
                if (validFields.indexOf(key2) !== -1) {
                    overlayValidFields.push(key2);
                }
            }
            result.fields_by_overlay[valueKey] = overlayValidFields;
        }
    }
    return result;
}




function getOverlaySelectionData_old() {
    var result = {
        overlays: [],
        fields_by_overlay: {}
    };
    var cfg = module.settings.cfg_uno_overlay || {};
    var max = parseInt(module.settings.overlayQuantity, 10) || 0;
    var i, j;

    for (i = 0; i < max; i++) {
        var token = cfg['api' + i];
        var nickname = cfg['nickname' + i] || 'Overlay';
        if (!token) continue;

        // Pega o tipo salvo para o token (timer, pack, slot, simples, blacklisted, unknown)
        var tokenType = module.restore('overlayType_' + i);

        // Ignora tokens indesejados na automação
        if (tokenType === 'timer' || tokenType === 'blacklisted' || tokenType === 'unknown') {
            continue;
        }

        for (j = 0; ; j++) {
            var overlay = module.restore('overlay_' + i + '_' + j);
            if (!overlay) break;

            // Adiciona o overlay principal (simples, pack, slot)
            var valueKey = token + '|' + overlay.id;
            var label = nickname + ' → ' + overlay.name;
            result.overlays.push({ value: valueKey, label: label });

            // Campos válidos (marcados como true)
            var validFields = [];
            var prefix = token;
            for (var key in cfg) {
                if (key.indexOf(prefix) === 0 && cfg[key] === true) {
                    validFields.push(key.substring(prefix.length));
                }
            }

            // Busca campos do overlay principal
            var overlayData = module.restore('overlayData_' + i + '_' + j) || {};
            var overlayValidFields = [];
            for (var key2 in overlayData) {
                if (validFields.indexOf(key2) !== -1) {
                    overlayValidFields.push(key2);
                }
            }
            result.fields_by_overlay[valueKey] = overlayValidFields;
        }
    }
    return result;
}

function openFieldAssociationDialog(overlayKey, overlayData, itemKey) {
    h.log(mUID,'{%t} overlayKey {}', overlayKey);   
    
    if (!overlayKey) {
        showMessage(jsc.i18n('Selecione primeiro um overlay!'));
        return;
    }
    var fields = overlayData.fields_by_overlay[overlayKey] || [];
    if (!fields.length) {
        showMessage(jsc.i18n('Nenhum campo disponível para associação neste overlay.'));
        return;
    }

    var associationInputs = [
        { type: 'title', name: jsc.i18n('Associe os campos do overlay') },
        { type: 'separator' }
    ];

    // Define os roles conforme o tipo de item
    var roles = [];
    if (itemKey === 'song') {
        roles = [
            { id: 'fieldSongTitle', label: jsc.i18n('Nome da Música') },
            { id: 'fieldArtist',    label: jsc.i18n('Artista') }
        ];
    } else if (itemKey === 'scheduled') {
        roles = [
            { id: 'fieldPersonName', label: jsc.i18n('Nome da Pessoa') },
            { id: 'fieldRole',       label: jsc.i18n('Função') }
        ];
    } else if (itemKey === 'title') {
        roles = [
            { id: 'fieldTitle', label: jsc.i18n('Título de Mídia') }
        ];
        // Se houver mais de um campo, permite escolher campo extra para zerar
        if (fields.length > 1) {
            roles.push({
                id: 'fieldToReset',
                label: jsc.i18n('Campo extra a zerar (opcional)')
            });
        }
    }

    // Monta allowed_values para cada campo
    var allowedFields = [{ value: '', label: '' }];
    for (var i = 0; i < fields.length; i++) {
        allowedFields.push({ value: fields[i], label: fields[i] });
    }

    for (var r = 0; r < roles.length; r++) {
        associationInputs.push({
            id: roles[r].id,
            type: 'string',
            name: roles[r].label,
            allowed_values: allowedFields
        });
    }
    
    // Exibe o input e salva na module.settings
    module.inputSettings('cfg_uno_auto_overlay_' + itemKey, associationInputs);
}


function openAutomatedOverlayConfig(itemKey, parentObj) {
    var settings = module.settings;
    var cfg      = settings.cfg_uno_overlay || {};

    // Monta lista de overlays disponíveis com slots e packs
    var overlayData = getOverlaySelectionData();
    var allowedOverlays = overlayData.overlays;

    // Inputs comuns: overlay padrão, atraso e intervalo
    var inputs = [
        { type: 'title', name: parentObj['label_' + itemKey] },
        { type: 'separator' },
        { id: 'defaultOverlay', type: 'string', name: jsc.i18n('Overlay Padrão'), allowed_values: allowedOverlays },
        { id: 'delay',    type: 'number', name: jsc.i18n('Atraso de exibição') + ' (s)',   default_value: parentObj['delay_' + itemKey]   || 5 },
        { id: 'interval', type: 'number', name: jsc.i18n('Intervalo entre exibições') + ' (s)', default_value: parentObj['interval_' + itemKey] || 1 }
    ];

    // Adiciona botão para associação dos campos
    inputs.push({ type: 'separator' });
    inputs.push({
        id: 'btnAssociateFields',
        type: 'button',
        name: jsc.i18n('Associar Campos'),
        button_label: jsc.i18n('Associar Campos'),
        action: function(fn) {
            h.logp(mUID,'{%t} fn {}',fn);
            openFieldAssociationDialog(fn.defaultOverlay, overlayData, itemKey);
        }
    });

    module.inputSettings('cfg_uno_auto_overlay_' + itemKey, inputs);
    module.updatePanel();
}



// Função principal: adiciona botões para cada tipo de overlay automatizado
function configureAutomatedOverlayAction() {
    return {
        id: 'btnConfigAutomatedOverlays',
        type: 'button', button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Overlays Automatizados'),
        description: jsc.i18n('Configure overlays para título de mídia, música e escalados'),
        action: function(obj) {
            obj.label_title     = jsc.i18n('Título de Mídia');
            obj.label_song      = jsc.i18n('Título de Música');
            obj.label_scheduled = jsc.i18n('Nome da pessoa escalada');

            var inputs = [
                { type: 'title', name: jsc.i18n('Configuração de Overlays Automatizados') },
                { type: 'separator' },
                { type: 'button', id: 'btn_title',     button_label: jsc.i18n('Configurar'), name: obj.label_title,     action: function() { openAutomatedOverlayConfig('title',     obj); } },
                { type: 'separator' },
                { type: 'button', id: 'btn_song',      button_label: jsc.i18n('Configurar'), name: obj.label_song,      action: function() { openAutomatedOverlayConfig('song',      obj); } },
                { type: 'separator' },
                { type: 'button', id: 'btn_scheduled', button_label: jsc.i18n('Configurar'), name: obj.label_scheduled, action: function() { openAutomatedOverlayConfig('scheduled', obj); } },
                { type: 'separator' }
            ];

            module.inputSettings('cfg_uno_auto_overlay', inputs);
        }
    };
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22416374696f6e73227d
function actions(module) {
    
    
    var log = module.settings.log;
    
    var act = [
        actionSelectOverlay(),
        actionAutoOverlayMenu()
    ];
     
    if (isDev() && log) {
        act.push(actionAnalyzeUNOOverlays());
    }

    return act;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a224d656e7520496e70757473227d
/**
 * Menu principal de seleção de Overlays (novo padrão object model).
 */
function actionSelectOverlay() {
    
    var log = module.settings.log;
    
    var ctrl = module.getObjectModelCtrl('uno_overlay');
    var overlayList = ctrl.getAll() || [];

    var menu = {
        id: 'mnuOverlays',
        icon: 'input',
        hint: jsc.i18n('Overlays disponíveis'),
        action: []
    };

    for (var i = 0; i < overlayList.length; i++) {
        var token = overlayList[i].token;
        var name  = overlayList[i].name || jsc.i18n('Overlay');
        var tipo  = module.restore('overlayType_' + token);

        //h.log(mUID, '{%t} → Token {}: token={} tipo={}', i, token, tipo);

        if (tipo === 'timer') {
            var timerMenu = buildTimerMenu(token, name);
            if (timerMenu) menu.action.push(timerMenu);
        } else {
            var overlayMenu = buildOverlayMenu(token, name);
            if (overlayMenu) menu.action.push(overlayMenu);
        }
    }

    return menu;
}

/**
 * Monta o submenu de overlays (itens e packs) para um token específico (token, não índice!).
 * Agora repassa o atributo status corretamente para overlays sem presets/slots.
 */
function buildOverlayMenu(token, name) {
   // h.log(mUID, '{%t} → buildOverlayMenu(token={}, name={})', token, name);

    var packCfg = module.settings['cfg_overlay_pack_' + token] || {};
    var items   = [];

    for (var j = 0; ; j++) {
        var overlay = module.restore('overlay_' + token + '_' + j);
        var data    = module.restore('overlayData_' + token + '_' + j);

        if (!overlay || !data) break;

        var aliasKey = 'alias_overlay_' + overlay.id;
        var aliasVal = packCfg[aliasKey] || module.settings.cfg_uno_overlay[aliasKey] || overlay.name;

        var presets = module.restore('overlayPresets_' + token + '_' + j);
        if ((!presets || presets.length === 0) && Array.isArray(overlay.slots) && overlay.slots.length > 0) {
            presets = overlay.slots;
        }

        var built = buildOverlayItem(token, j, overlay, aliasVal, presets);
        built.label = aliasVal; // mantém prioridade do nome customizado
        items.push(built);
    }

    //h.log(mUID, '{%t} ← buildOverlayMenuNew retorna itemsCount={}', items.length);

    if (items.length === 1) {
        // Repasse o status do item único (overlay normal)
        var item = items[0];
        var out = {
            label: name,
            icon: item.icon,
            action: item.action
        };
        if (typeof item.status === 'function') {
            out.status = item.status;
        }
        return out;
    }
    if (items.length > 1) {
        return {
            label: name + ' (' + items.length + ')',
            icon: 'folder',
            action: items
        };
    }
    return null;
}


/**
 * Cria um item de preset para o submenu de um overlay específico (token, não índice!).
 * Agora, se não houver campos editáveis, envia sempre o preset.payload completo.
 * Inclui status visual (ativo/cancelar).
 */
function buildPresetItem(token, j, overlay, preset, config) {
    // Certifique-se de padronizar os tipos
    token = String(token);
    var overlayId = String(overlay.id);

    return {
        label: preset.name,
        icon: 'input',
        status: function () {
            if (isOverlayActive(token, overlayId)) {
                return jsc.utils.ui.item_status.warning({
                    icon: 'input',
                    hint: 'Ativo!'
                });
            }
            return null;
        },
        action: function () {
            // Se estiver ativo, vira cancelar
            if (isOverlayActive(token, overlayId)) {
                if (h.yesNo(
                    jsc.i18n('Cancelar Exibição?'),
                    jsc.i18n('Deseja ocultar este overlay agora e cancelar a exibição?')
                )) {
                    jsc.uno.hideOverlay(token, overlayId);
                    deactivateOverlayStatus(token, overlayId);
                }
                return;
            }

            // Fluxo normal: exibir o preset
            var inputs = getIncludedInputsFrom(preset.payload, config, token, overlay.id);
            var timeout = getTimeoutValue(token, j, overlay.id);

            var data;
            if (inputs.length > 0) {
                var q = h.inputV2(inputs);
                if (q) {
                    data = {};
                    for (var k = 0; k < inputs.length; k++) {
                        data[inputs[k].id] = q[inputs[k].id];
                    }
                    h.log(mUID,
                        '{%t} showOverlay enviado com preset customizado. token={} overlayId={} dataKeys={}',
                        token, overlay.id, Object.keys(data).join(','));
                } else {
                    h.log(mUID, '{%t} Cancelado pelo usuário, não enviou overlay.', token);
                    return;
                }
            } else {
                // ⚠️ Aqui precisa garantir que estamos enviando o payload COMPLETO do slot!
                data = preset.payload || {};
                h.log(mUID,
                    '{%t} showOverlay enviado com payload do slot. token={} overlayId={} data={}',
                    token, overlay.id, JSON.stringify(data));
            }
            showOverlay(token, overlay.id, data, timeout);
        }
    };
}


/**
 * Cria o submenu de opções de timer para um token específico (token, não índice!).
 */
function buildTimerMenu(token, name) {
    var config = module.settings['cfg_overlay_timer_defaults_' + token] || {};
    var times  = config['defaultDurations_timer_' + token] || '5, 10, 15, 20';

    var options = times.split(',')
        .map(function (s) { return parseInt(s.trim(), 10); })
        .filter(function (n) { return !isNaN(n); });

    var menu = [];

    // Opções de timer fixo
    for (var k = 0; k < options.length; k++) {
        (function (minutes) {
            menu.push({
                label: minutes + ' min',
                icon:  'timer',
                action: function () {
                    var seconds = minutes * 60;
                    jsc.uno.setTimer(token, seconds);
                    jsc.uno.playTimer(token);
                    jsc.uno.showOverlay(token);

                    clearTimeoutForToken(token);
                    var timeoutId = module.setTimeout(function () {
                        jsc.uno.hideOverlay(token);
                    }, seconds * 1000);
                    module.global.timerTimeouts[token] = timeoutId;
                }
            });
        })(options[k]);
    }

    // Tempo personalizado (input hh:mm)
    menu.push({
        label: jsc.i18n('Tempo personalizado'),
        icon:  'edit',
        action: function () {
            var lastValue = module.restore('lastCustomTime_' + token) || '00:20';
            var q = h.inputV2([{
                id: 'time',
                label: jsc.i18n('Tempo (hh:mm)'),
                type: 'time',
                default_value: lastValue
            }]);
            if (q && q.time) {
                module.store('lastCustomTime_' + token, q.time);
                var parts = q.time.split(':');
                var total = (parseInt(parts[0], 10) || 0) * 3600
                          + (parseInt(parts[1], 10) || 0) * 60;
                if (total > 0) {
                    jsc.uno.setTimer(token, total);
                    jsc.uno.playTimer(token);
                    jsc.uno.showOverlay(token);
                    clearTimeoutForToken(token);
                    var timeoutId = module.setTimeout(function () {
                        jsc.uno.hideOverlay(token);
                    }, total * 1000);
                    module.global.timerTimeouts[token] = timeoutId;
                }
            }
        }
    });

    // Hora exata (agenda para horário futuro)
    menu.push({
        label: jsc.i18n('Hora exata'),
        icon:  'schedule',
        action: function () {
            var now = new Date();
            now.setMinutes(now.getMinutes() + 10);
            function zeroPad(n) { return (n < 10 ? '0' : '') + n; }
            var hh = zeroPad(now.getHours()), mm = zeroPad(now.getMinutes());
            var suggestedTime = hh + ':' + mm;

            var q = h.inputV2([{
                id: 'hora',
                label: jsc.i18n('Hora (hh:mm)'),
                type: 'time',
                default_value: suggestedTime
            }]);
            if (q && q.hora) {
                var hp = q.hora.split(':');
                if (hp.length === 2) {
                    var current = new Date(),
                        target  = new Date(current);
                    target.setHours(parseInt(hp[0], 10));
                    target.setMinutes(parseInt(hp[1], 10));
                    target.setSeconds(0);
                    if (target <= current) {
                        target.setTime(target.getTime() + 86400000);
                    }
                    var diffSeconds = Math.floor((target.getTime() - current.getTime()) / 1000);

                    jsc.uno.setTimer(token, diffSeconds);
                    jsc.uno.playTimer(token);
                    jsc.uno.showOverlay(token);
                    clearTimeoutForToken(token);
                    var timeoutId = module.setTimeout(function () {
                        jsc.uno.hideOverlay(token);
                    }, diffSeconds * 1000);
                    module.global.timerTimeouts[token] = timeoutId;
                }
            }
        }
    });

    // Adicionar 1 min
    menu.push({
        label: '+1 min',
        icon:  'add_box',
        action: function () {
            clearTimeoutForToken(token);
            var atual = jsc.uno.getTimer(token).payload;
            var novo  = atual + 60;
            h.log(mUID, '{%t} atual {} novo {}', atual, novo);
            jsc.uno.setTimer(token, novo);
            var timeoutId = module.setTimeout(function () {
                jsc.uno.hideOverlay(token);
            }, novo * 1000);
            module.global.timerTimeouts[token] = timeoutId;
        }
    });

    // Remover 1 min
    menu.push({
        label: '-1 min',
        icon:  'indeterminate_check_box',
        action: function () {
            clearTimeoutForToken(token);
            var atual = jsc.uno.getTimer(token).payload;
            var novo  = Math.max(0, atual - 60);
            h.log(mUID, '{%t} atual {} novo {}', atual, novo);
            jsc.uno.setTimer(token, novo);
            var timeoutId = module.setTimeout(function () {
                jsc.uno.hideOverlay(token);
            }, novo * 1000);
            module.global.timerTimeouts[token] = timeoutId;
        }
    });

    // Cancelar timer
    menu.push({
        label: jsc.i18n('Cancelar'),
        icon:  'close',
        action: function () {
            handleCancelTimer(token);
        }
    });

    return {
        label:  name,
        icon:   'timelapse',
        action: menu
    };
}

/**
 * Monta o item de menu (ou submenu) para um overlay específico (token, não índice!).
 * Suporta presets/slots, status visual ativo/cancelar, e edição manual.
 */
function buildOverlayItem(token, j, overlay, aliasVal, presets) {
    token = String(token);
    var overlayId = String(overlay.id);
    var config = module.settings.cfg_uno_overlay || {};
    var labelOverlay = aliasVal || config['alias_overlay_' + overlayId] || overlay.name;

    // Se houver presets (slots), monta submenu
    if (Array.isArray(presets) && presets.length > 0) {
        var submenu = presets.map(function (preset) {
            return buildPresetItem(token, j, overlay, preset, config);
        });
        
        submenu.unshift({
            label: jsc.i18n('Editar manualmente'),
            icon: 'edit',
            action: function () {
                var content = jsc.uno.getOverlayContent(token, overlayId);
                var inputs = getIncludedInputsFrom(content, config, token, overlayId);

                // Se não há inputs marcados, força todos os campos do payload!
                if (inputs.length === 0 && content) {
                    for (var key in content) {
                        if (!content.hasOwnProperty(key)) continue;
                        var value = content[key];
                        var fieldType;
                        if (typeof value === 'string') {
                            fieldType = 'textarea';
                        } else if (typeof value === 'boolean') {
                            fieldType = 'boolean';
                        } else {
                            fieldType = 'string';
                        }

                        var input = {
                            id: key,
                            label: key,
                            default_value: value,
                            type: fieldType
                        };

                        // Aplica rows para textarea
                        if (fieldType === 'textarea') {
                            var lineCount = ('' + value).split('\n').length;
                            input.rows = lineCount + 1;
                            h.log(mUID,
                                '{%t} getIncludedInputsFrom → campo {}: linhas={} rows={}',
                                key, lineCount, input.rows);
                        }

                        inputs.push(input);
                    }
                }

                var timeout = getTimeoutValue(token, j, overlayId);
                if (inputs.length > 0) {
                    var q = h.inputV2(inputs);
                    if (q) {
                        var data = {};
                        for (var k = 0; k < inputs.length; k++) {
                            data[inputs[k].id] = q[inputs[k].id];
                        }
                        showOverlay(token, overlayId, data, timeout);
                    }
                } else {
                    showOverlay(token, overlayId, {}, timeout);
                }
            }
        });

        submenu.push({
            label: jsc.i18n('Recarregar slots'),
            icon: 'refresh',
            action: function () {
                h.popupWorker({
                    title: jsc.i18n('Recarregando dados dos slots...'),
                    action: function () {
                        try {
                            var all = jsc.uno.getOverlays(token);
                            for (var z = 0; z < all.length; z++) {
                                if (String(all[z].id) === overlayId && Array.isArray(all[z].slots)) {
                                    var updated = [];
                                    for (var s = 0; s < all[z].slots.length; s++) {
                                        var slot = all[z].slots[s];
                                        var slotName = slot.name || ('Slot ' + (s + 1));
                                        updated.push({
                                            name: slotName,
                                            payload: slot.payload || {}
                                        });
                                    }
                                    module.store('overlayPresets_' + token + '_' + j, updated);
                                    module.updatePanel();
                                    showMessage(
                                        jsc.i18n('Slots atualizados com sucesso'),
                                        jsc.i18n('Reabra o menu para ver as alterações.'),
                                        true
                                    );
                                    return;
                                }
                            }
                            showMessage(
                                jsc.i18n('Nenhum slot encontrado'),
                                jsc.i18n('O overlay atual não possui slots válidos.'),
                                true
                            );
                        } catch (err) {
                            h.log(mUID, '❌ Erro ao recarregar slots: {}', err);
                            showMessage(
                                jsc.i18n('Erro ao recarregar slots'),
                                jsc.i18n('Ocorreu um erro durante a atualização.'),
                                true
                            );
                        }
                    }
                });
            }
        });
        return {
            label: labelOverlay,
            icon: 'input',
            action: submenu
        };
    }

    // Item de overlay normal, sem presets
    return {
        label: 'teste',//labelOverlay,
        icon: 'input',
        status: function () {
            if (isOverlayActive(token, overlayId)) {
                return jsc.utils.ui.item_status.warning({
                    icon: 'input',
                });
            }
            return null;
        },
        action: function () {
            if (isOverlayActive(token, overlayId)) {
                if (h.yesNo(
                    jsc.i18n('Cancelar Exibição?'), 
                    jsc.i18n('Deseja ocultar este overlay agora e cancelar a exibição?')
                )) {
                    jsc.uno.hideOverlay(token, overlayId);
                    deactivateOverlayStatus(token, overlayId);
                }
                return;
            }
            var content = jsc.uno.getOverlayContent(token, overlayId);
            var inputs = content ? getIncludedInputsFrom(content, config, token, overlayId) : [];
            var timeout = getTimeoutValue(token, j, overlayId);

            if (inputs.length > 0) {
                var q = h.inputV2(inputs);
                if (q) {
                    var data = {};
                    for (var k = 0; k < inputs.length; k++) {
                        data[inputs[k].id] = q[inputs[k].id];
                    }
                    showOverlay(token, overlayId, data, timeout);
                }
            } else {
                showOverlay(token, overlayId, {}, timeout);
            }
        }
    };
}



function getTimeoutValue(token, j, overlayId) {
    var cfg = module.settings.cfg_uno_overlay || {};
    var keyById    = 'timeout_' + overlayId;
    var keyByIndex = 'timeout_' + token + '_' + j;

    var timeout = parseInt(cfg[keyById], 10);
    if (!isNaN(timeout)) {
        // Se for zero, retorna valor "infinito"
        return timeout === 0 ? 10000000 : timeout;
    }

    timeout = parseInt(cfg[keyByIndex], 10);
    if (!isNaN(timeout)) {
        return timeout === 0 ? 10000000 : timeout;
    }

    h.log(mUID, '{%t} Timeout NÃO encontrado para cfgID={} → Usando padrão 15s.', overlayId);
    return 15;
}


/**
 * shouldIncludeField (já refatorada)
 */
function shouldIncludeField(config, token, overlayId, fieldKey) {
    var val1 = config[token + '_' + fieldKey];
    var val2 = config[overlayId + '_' + fieldKey];
    return val1 === true || val1 === 'true' ||
           val2 === true || val2 === 'true';
}

/**
 * getIncludedInputsFrom (já refatorada)
 */
function getIncludedInputsFrom(content, config, token, overlayId) {
    var inputs = [];
    for (var key in content) {
        if (!content.hasOwnProperty(key)) continue;
        if (!shouldIncludeField(config, token, overlayId, key)) {
            continue;
        }
        var value = content[key];
        var fieldType;
        if (typeof value === 'string') {
            fieldType = 'textarea';
        } else if (typeof value === 'boolean') {
            fieldType = 'boolean';
        } else {
            fieldType = 'string';
        }

        var input = {
            id:            key,
            label:         key,
            default_value: value,
            type:          fieldType
        };

        if (fieldType === 'textarea') {
            var lineCount = ('' + value).split('\n').length;
            input.rows = lineCount + 1;
            h.log(mUID,
                  '{%t} getIncludedInputsFrom → campo {}: linhas={} rows={}',
                  key, lineCount, input.rows);
        }
        inputs.push(input);
    }
    return inputs;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a224d616e75616c2048696465227d
function isOverlayActive(token, overlayId) {
    var chave = String(token) + '_' + String(overlayId);
    //h.log(mUID, "------------------[STATUS] Verificando chave={} (token={}, overlayId={}) => existe? {}", 
    //chave, token, overlayId, !!module.global.activeOverlays[chave]);
    return !!module.global.activeOverlays[chave];
}

function activateOverlayStatus(token, overlayId, timeoutId, expiresAt) {
    var chave = String(token) + '_' + String(overlayId);
    //h.log(mUID, "-----------------[ATIVA] Gravando chave={} (token={}, overlayId={})", chave, token, overlayId);

    module.global.activeOverlays[chave] = {
        timeoutId: timeoutId,
        expiresAt: expiresAt
    };
    module.updatePanel();
}

function deactivateOverlayStatus(token, overlayId) {
    var key = token + '_' + overlayId;
    var entry = module.global.activeOverlays[key];
    if (entry && entry.timeoutId) {
        module.clearTimeout(entry.timeoutId);
    }
    delete module.global.activeOverlays[key];
    module.updatePanel();
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273687574646f776e227d
function shutdown(module) {
    h.log(mUID, '[shutdown] Desativando todos os overlays ativos...');
    var active = module.global.activeOverlays || {};
    var count = 0;

    for (var key in active) {
        if (!active.hasOwnProperty(key)) continue;
        // A chave é do tipo: "token_overlayId"
        var parts = key.split('_');
        var token = parts[0];
        var overlayId = parts.slice(1).join('_'); // preserva overlayId mesmo se tiver underline

        h.log(mUID, '[shutdown] Ocultando overlay ativo: token={} overlayId={}', token, overlayId);
        try {
            jsc.uno.hideOverlay(token, overlayId);
            count++;
        } catch (err) {
            h.log(mUID, '[shutdown] Erro ao ocultar overlay token={} overlayId={}: {}', token, overlayId, err);
        }
    }

    h.log(mUID, '[shutdown] Finalizado, overlays desativados: {}', count);
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a224d656e7520496e74657276616c227d
/**
 * Gera o menu lateral de agendamento automático de overlays UNO.
 * Listagem baseada em object model, slots individuais e status ativo.
 */
function actionAutoOverlayMenu() {
    var menu = {
        id: 'autoOverlayMenu',
        icon: 'timer',
        hint: jsc.i18n('Agendamentos Periódicos'),
        status: function() {
            var ctrl = module.global.autoOverlayManager || {};
            for (var key in ctrl) {
                if (ctrl[key] && ctrl[key].active) {
                    return jsc.utils.ui.item_status.warning({ icon: 'timer' });
                }
            }
        },
        action: [
            {
                id: 'stopAllOverlaySchedules',
                label: jsc.i18n('Parar Todos os Agendamentos'),
                icon: 'cancel_schedule_send',
                status: function() {
                    var ctrl = module.global.autoOverlayManager || {};
                    for (var key in ctrl) {
                        if (ctrl[key] && ctrl[key].active) {
                            return jsc.utils.ui.item_status.warning({ icon: 'cancel_schedule_send' });
                        }
                    }
                },
                action: function() {
                    var ctrl = module.global.autoOverlayManager || {};
                    var hasActive = false;
                    for (var key in ctrl) {
                        if (ctrl[key] && ctrl[key].active) {
                            hasActive = true;
                            break;
                        }
                    }
                    if (hasActive) {
                        if (h.yesNo(
                            jsc.i18n('Existem overlays agendados. Deseja realmente cancelar todos?'),
                            jsc.i18n('Parar Todos os Agendamentos?')
                        )) {
                            stopAllAutoOverlayIntervals();
                        }
                    }
                }
            }
        ]
    };
    
    // === Listagem baseada em object model ===
    var ctrl = module.getObjectModelCtrl('uno_overlay');
    var overlayTokens = ctrl.getAll() || [];

    for (var i = 0; i < overlayTokens.length; i++) {
        var token = overlayTokens[i].token;
        var name = overlayTokens[i].name || jsc.i18n('Overlay');
        var overlayType = module.restore('overlayType_' + token);

        if (overlayType === 'timer' || overlayType === 'blacklisted' || overlayType === 'unknown') continue;

        for (var j = 0; ; j++) {
            var overlay = module.restore('overlay_' + token + '_' + j);
            if (!overlay) break;

            var overlayName = overlay.name || '';
            var label = name + ' → ' + overlayName;

            // === PACKS ===
            if (overlay.type === 'pack' && Array.isArray(overlay.items)) {
                for (var z = 0; z < overlay.items.length; z++) {
                    var itemOv = overlay.items[z];
                    var itemLabel = label + ' → ' + (itemOv.name || ('Item ' + (z + 1)));
                    var itemContent = jsc.uno.getOverlayContent(token, itemOv.id) || {};
                    var timeout = getTimeoutValue(token, j, itemOv.id);
                    if (timeout === 10000000) {
                        h.log(mUID, '[menuinterval] Ignorado (timeout=infinito): {}', itemLabel);
                        continue;
                    }
                    menu.action.push(
                        actionAutoOverlay(token, itemOv, itemLabel, itemContent, itemOv.id, j)
                    );
                }
            }
            // === SLOTS ===
            else if (overlayType === 'slot' || (overlay.slots && overlay.slots.length > 0)) {
                var slotList = module.restore('overlayPresets_' + token + '_' + j) || overlay.slots || [];
                var timeout = getTimeoutValue(token, j, overlay.id);
                for (var k = 0; k < slotList.length; k++) {
                    var slotName = slotList[k].name;
                    var slotData = slotList[k].payload || {};
                    var slotKey = buildSlotOverlayKey(overlay.id, slotData);
                    if (timeout === 10000000) {
                        h.log(mUID, '[menuinterval] Ignorado (timeout=infinito): {} [{}]', label, slotName);
                        continue;
                    }
                    menu.action.push(
                        actionAutoOverlay(token, overlay, label + ' [' + slotName + ']', slotData, slotKey, j)
                    );
                }
            }
            // === OVERLAY SIMPLES ===
            else {
                var content = module.restore('overlayData_' + token + '_' + j) || {};
                var timeout = getTimeoutValue(token, j, overlay.id);
                if (timeout === 10000000) {
                    h.log(mUID, '[menuinterval] Ignorado (timeout=infinito): {}', label);
                    continue;
                }
                menu.action.push(actionAutoOverlay(token, overlay, label, content, overlay.id, j));
            }
        }
    }

    return menu;
}

/**
 * Gera o item de menu para agendamento automático do overlay ou slot.
 * Se não houver campos editáveis marcados, envia todo o payload salvo do slot.
 * Agora carrega sempre os dados ATUAIS do overlay ao abrir a janela!
 */
function actionAutoOverlay(token, overlay, label, presetData, overlayKey, j) {
    return {
        id: 'autoOverlay_' + overlayKey,
        label: label,
        icon: 'timer',
        status: function () {
            var status = isOverlayIntervalActive(overlayKey);
            if (status) {
                return jsc.utils.ui.item_status.warning({ icon: 'schedule' });
            }
        },
        action: function () {
            var config = module.settings.cfg_uno_overlay || {};

            var active = isOverlayIntervalActive(overlayKey);
            h.log(mUID, '{%t} Active overlayKey:{} status:{}', overlayKey, active);
            if (active) {
                if (h.yesNo(
                    '<html>' + jsc.i18n('Deseja interromper a exibição automática deste overlay?') + '<br><br>' + label,
                    jsc.i18n('Parar Exibição Automática?')
                )) {
                    manageOverlayInterval(overlayKey, null, 0, false);
                    h.notification(jsc.i18n('Exibição automática interrompida'), 3);
                    module.updatePanel();
                }
                return;
            }

            // ATIVAR novo agendamento
            // Busca sempre os dados ATUAIS do overlay para exibir na janela!
            var contentAtual = jsc.uno.getOverlayContent(token, overlay.id) || presetData || {};

            var lastIntervalKey = 'autoOverlay_lastInterval_' + overlayKey;
            var lastInterval = module.restore(lastIntervalKey, 5);
            h.log(mUID,'{%t} Restaurando dados do tempo de repetição para {} = {}', lastIntervalKey, lastInterval);

            var inputs = [
                { type: 'title', name: jsc.i18n('Agendar Overlay') },
                { type: 'title', name: label },
                { type: 'separator' },
                {
                    id: 'interval_minutes',
                    name: jsc.i18n('Intervalo entre exibições (minutos)'),
                    type: 'number',
                    min: 1,
                    max: 60,
                    default_value: lastInterval
                },
                { type: 'separator' }
            ];

            var dynamicInputs = [];
            try {
                dynamicInputs = getIncludedInputsFrom(contentAtual, config, token, overlay.id);
            } catch (err) {
                showMessage('Erro ao gerar campos de input', String(err));
                return;
            }

            if (dynamicInputs.length > 0) {
                inputs.push({ type: 'title', name: jsc.i18n('Conteúdo a exibir') });
                inputs = inputs.concat(dynamicInputs);
            }

            var result;
            try {
                result = h.inputV2(inputs);
            } catch (err) {
                showMessage('Erro ao exibir janela de agendamento', String(err));
                return;
            }

            if (result === null) {
                return;
            }

            var minutes = parseInt(result.interval_minutes, 10) || 5;
            h.log(mUID,'{%t} Salvando dados do tempo de repetição para {} = {}', lastIntervalKey, minutes);
            module.store(lastIntervalKey, minutes);

            var payload;
            if (dynamicInputs.length > 0) {
                payload = {};
                for (var k = 0; k < dynamicInputs.length; k++) {
                    var key = dynamicInputs[k].id;
                    payload[key] = result[key];
                }
            } else {
                payload = typeof presetData === 'object' && presetData !== null ? presetData : {};
            }

            var timeout = getTimeoutValue(token, j, overlay.id);

            // Exibir imediatamente
            showOverlay(token, overlay.id, payload, timeout);

            // Função para agendamento periódico
            var intervalFn = function () {
                showOverlay(token, overlay.id, payload, timeout);
            };

            // Agendar usando função central
            manageOverlayInterval(overlayKey, intervalFn, minutes * 60000, true);

            h.notification(jsc.i18n('Exibição automática iniciada'), 3);
            module.updatePanel();
        }
    };
}


/**
 * Gerencia o agendamento ou cancelamento de execução automática de overlays.
 * @param {string} overlayKey  - Chave única: overlay.id + hash do preset/slot
 * @param {function|null} fn   - Função para executar no setInterval (null para cancelar)
 * @param {number} intervalMs  - Tempo em milissegundos
 * @param {boolean} ativar     - true para ativar/agendar, false para cancelar
 */
function manageOverlayInterval(overlayKey, fn, intervalMs, ativar) {
    var ctrl = module.global.autoOverlayManager || {};
    if (ativar) {
        if (ctrl[overlayKey] && ctrl[overlayKey].intervalId) {
            module.clearInterval(ctrl[overlayKey].intervalId);
        }
        var intervalId = module.setInterval(fn, intervalMs, 'uno_auto_' + overlayKey);
        ctrl[overlayKey] = {
            overlayId: overlayKey,
            intervalId: intervalId,
            active: true
        };
    } else {
        if (ctrl[overlayKey] && ctrl[overlayKey].intervalId) {
            module.clearInterval(ctrl[overlayKey].intervalId);
        }
        ctrl[overlayKey] = {
            overlayId: overlayKey,
            intervalId: null,
            active: false
        };
    }
    module.global.autoOverlayManager = ctrl;
    return !!ativar;
}

/**
 * Consulta se o overlay/preset/slot está agendado.
 * @param {string} overlayKey - overlay.id + hash do slot (ou apenas overlay.id)
 * @returns {boolean}
 */
function isOverlayIntervalActive(overlayKey) {
    var ctrl = module.global.autoOverlayManager || {};
    return !!(ctrl[overlayKey] && ctrl[overlayKey].active);
}

/**
 * Cancela todos os agendamentos ativos de overlays automáticos.
 */
function stopAllAutoOverlayIntervals() {
    var ctrl = module.global.autoOverlayManager || {};
    var count = 0;
    for (var key in ctrl) {
        if (ctrl[key] && ctrl[key].active) {
            manageOverlayInterval(key, null, 0, false);
            count++;
        }
    }
    h.notification(jsc.i18n('{} agendamentos interrompidos.', count), 3);
    module.updatePanel();
}

function buildSlotOverlayKey(overlayId, slotData) {
    // Normaliza campos em ordem alfabética para garantir hash idêntico!
    var keys = Object.keys(slotData).sort();
    var normalized = {};
    for (var i = 0; i < keys.length; i++) {
        normalized[keys[i]] = slotData[keys[i]];
    }
    return overlayId + '_' + h.sha256Str(JSON.stringify(normalized));
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22556e6f54696d657273227d
module.global.timerTimeouts = module.global.timerTimeouts || {};


/**
 * Cancela e reseta overlay de timer UNO.
 * @param {string} token Chave de API UNO (Token)
 */
function handleCancelTimer(token) {
    if (!token) {
        h.log(mUID, 'handleCancelTimer chamado sem token!');
        return;
    }
    clearTimeoutForToken(token);
    jsc.uno.hideOverlay(token);
    jsc.uno.resetTimer(token);
    jsc.uno.setTimer(token, 0);
    h.log(mUID, '{%t} Timer cancelado e resetado para zero. token={}', token);
}


function clearTimeoutForToken(token) {
    if (!module.global.timerTimeouts) {
        module.global.timerTimeouts = {};
    }

    if (module.global.timerTimeouts[token]) {
        module.clearTimeout(module.global.timerTimeouts[token]);
        delete module.global.timerTimeouts[token];
        h.log(mUID, 'Timeout limpo para token: {}', token);
    }
}

function startTimerOverlay(token, durationInSeconds) {
    jsc.uno.setTimer(token, durationInSeconds);
    jsc.uno.playTimer(token);
    jsc.uno.showOverlay(token);

    clearTimeoutForToken(token);

    module.global.timerTimeouts[token] = module.setTimeout(function () {
        jsc.uno.hideOverlay(token);
        h.log(mUID, '⏱️ Overlay ocultado após {}s (startTimerOverlay)', durationInSeconds);
    }, durationInSeconds * 1000);
}

function adjustTimerOverlay(token, deltaSeconds) {
    clearTimeoutForToken(token);

    var currentTime = jsc.uno.getTimer(token).payload;
    if (typeof currentTime !== 'number') {
        h.log(mUID, '⛔ Timer inválido para API {}', token);
        return;
    }

    var newTime = currentTime + deltaSeconds;
    if (newTime < 1) newTime = 1;

    jsc.uno.setTimer(token, newTime);
    jsc.uno.playTimer(token);

    module.global.timerTimeouts[token] = module.setTimeout(function () {
        jsc.uno.hideOverlay(token);
        h.log(mUID, '⏱️ Overlay ocultado após ajuste ({}s)', newTime);
    }, newTime * 1000);
}




// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226175746f4f7665726c617973227d
/**
 * Marca e verifica se um título já foi exibido, evitando repetição.
 * Se clear for true, limpa o histórico de títulos usados.
 * Retorna true se o título é novo, false se já foi usado neste ciclo.
 * Usa armazenamento global para persistência temporária.
 */
function isNewTitle(title, clear) {
    var key = mUID + '_used_titles';
    var used = h.getGlobal(key) || [];

    if (clear) {
        h.log(mUID, 'isNewTitle: limpando títulos usados.');
        h.setGlobal(key, []);
        h.log(mUID, '{%t} Lista de títulos reiniciada.');
        return true;
    }
    if (used.indexOf(title) !== -1) {
        h.log(mUID, 'isNewTitle: título repetido: {}', title);
        h.log(mUID, '{%t} Título repetido ignorado: {}', title);
        return false;
    }
    used.push(title);
    h.setGlobal(key, used);
    h.log(mUID, 'isNewTitle: título novo registrado: {}', title);
    h.log(mUID, '{%t} Título novo registrado: {}', title);
    return true;
}

/**
 * Parser do valor salvo na configuração defaultOverlay.
 * Extrai token, overlayId puro e hash de slot, se existir.
 * Retorna { token, overlayId, slotHash }, onde slotHash é null para overlays simples.
 */
function parseDefaultOverlayKey(defaultOverlay) {
    h.log(mUID, 'parseDefaultOverlayKey: recebendo defaultOverlay: "{}"', defaultOverlay);
    var token = '', overlayId = '', slotHash = null;
    if (!defaultOverlay) {
        h.log(mUID, 'parseDefaultOverlayKey: defaultOverlay vazio!');
        return { token: '', overlayId: '', slotHash: null };
    }
    var parts = defaultOverlay.split('|');
    token = parts[0] || '';
    overlayId = parts[1] || '';
    h.log(mUID, 'parseDefaultOverlayKey: token={}, overlayId={}', token, overlayId);
    var hashIndex = overlayId.indexOf('_');
    if (hashIndex !== -1) {
        slotHash = overlayId.substring(hashIndex + 1);
        var originalId = overlayId;
        overlayId = overlayId.substring(0, hashIndex);
        h.log(mUID, 'parseDefaultOverlayKey: overlayId tinha hash: original="{}", overlayId="{}", slotHash="{}"', originalId, overlayId, slotHash);
    }
    return { token: token, overlayId: overlayId, slotHash: slotHash };
}

/**
 * Monta e exibe o overlay UNO automatizado para título de mídia.
 * Suporta overlays simples ou slots, extraindo parâmetros corretamente do valor configurado.
 * Monta o payload conforme campos mapeados pelo usuário.
 * Respeita timeout e delay configurados na settings.
 */
function showOverlayTitle(data) {
    var cfg = module.settings['cfg_uno_auto_overlay_title'] || {};
    h.log(mUID, 'showOverlayTitle: config = {}', JSON.stringify(cfg));
    var defaultOverlay = cfg.defaultOverlay || '';
    var delay = parseInt(cfg.delay, 10) || 0;
    var fieldTitle = cfg.fieldTitle;
    var fieldToReset = cfg.fieldToReset;
    h.log(mUID, 'showOverlayTitle: defaultOverlay="{}", fieldTitle="{}", fieldToReset="{}", delay={}', defaultOverlay, fieldTitle, fieldToReset, delay);
    if (!defaultOverlay || !fieldTitle) {
        h.log(mUID, 'showOverlayTitle: Sem overlay ou campo mapeado!');
        return;
    }

    var overlayInfo = parseDefaultOverlayKey(defaultOverlay);
    var token = overlayInfo.token, overlayId = overlayInfo.overlayId, slotHash = overlayInfo.slotHash;
    h.log(mUID, 'showOverlayTitle: token="{}", overlayId="{}", slotHash="{}"', token, overlayId, slotHash);

    var globalCfg = module.settings.cfg_uno_overlay || {};
    var timeout = globalCfg['timeout_' + overlayId] ? parseInt(globalCfg['timeout_' + overlayId], 10) : 15;
    h.log(mUID, 'showOverlayTitle: timeout para overlayId="{}": {}', overlayId, timeout);

    var dataToSend = {};
    dataToSend[fieldTitle] = data.name || '';
    h.log(mUID, 'showOverlayTitle: dataToSend inicial: {}', JSON.stringify(dataToSend));
    if (fieldToReset && fieldToReset !== fieldTitle) {
        dataToSend[fieldToReset] = '';
        h.log(mUID, 'showOverlayTitle: fieldToReset diferente de fieldTitle, zerando fieldToReset.');
    }

    h.log(mUID, 'showOverlayTitle: CHAMANDO showOverlay: token={}, overlayId={}, data={}, timeout={}, delay={}, slotName={}', token, overlayId, JSON.stringify(dataToSend), timeout, delay, slotHash);

    showOverlay(token, overlayId, dataToSend, timeout, delay, slotHash);
}

/**
 * Monta e exibe o overlay UNO automatizado para pessoa escalada.
 * Suporta overlays simples e slots, extraindo token, overlayId e slotHash do valor configurado.
 * Junta nome e função caso os campos estejam mapeados para o mesmo campo.
 * Sempre envia slotHash como slotName se houver.
 */
function showOverlayScheduled(data) {
    var cfg = module.settings['cfg_uno_auto_overlay_scheduled'] || {};
    h.log(mUID, 'showOverlayScheduled: config = {}', JSON.stringify(cfg));
    var defaultOverlay = cfg.defaultOverlay || '';
    var delay = parseInt(cfg.delay, 10) || 0;
    var fieldPersonName = cfg.fieldPersonName;
    var fieldRole = cfg.fieldRole;
    h.log(mUID, 'showOverlayScheduled: defaultOverlay="{}", fieldPersonName="{}", fieldRole="{}", delay={}', defaultOverlay, fieldPersonName, fieldRole, delay);
    if (!defaultOverlay || !fieldPersonName) {
        h.log(mUID, 'showOverlayScheduled: Sem overlay ou campo mapeado!');
        return;
    }

    var overlayInfo = parseDefaultOverlayKey(defaultOverlay);
    var token = overlayInfo.token, overlayId = overlayInfo.overlayId, slotHash = overlayInfo.slotHash;
    h.log(mUID, 'showOverlayScheduled: token="{}", overlayId="{}", slotHash="{}"', token, overlayId, slotHash);

    var globalCfg = module.settings.cfg_uno_overlay || {};
    var timeout = globalCfg['timeout_' + overlayId] ? parseInt(globalCfg['timeout_' + overlayId], 10) : 15;
    h.log(mUID, 'showOverlayScheduled: timeout para overlayId="{}": {}', overlayId, timeout);

    var dataToSend = {};
    if (fieldPersonName === fieldRole) {
        var nome = data.name || '';
        var funcao = data.role || '';
        var campoFinal = nome;
        if (funcao) {
            campoFinal += '\n' + funcao;
        }
        dataToSend[fieldPersonName] = campoFinal;
    } else {
        if (fieldPersonName && data.name) {
            dataToSend[fieldPersonName] = data.name;
        }
        if (fieldRole && data.role) {
            dataToSend[fieldRole] = data.role;
        }
    }
    h.log(mUID, 'showOverlayScheduled: CHAMANDO showOverlay: token={}, overlayId={}, data={}, timeout={}, delay={}, slotName={}', token, overlayId, JSON.stringify(dataToSend), timeout, delay, slotHash);

    showOverlay(token, overlayId, dataToSend, timeout, delay, slotHash);
}

/**
 * Monta e exibe o overlay UNO automatizado para música (título e artista).
 * Compatível com overlays simples e slots; faz parser dos parâmetros e monta payload conforme mapeamento.
 * Junta título e artista se os campos forem iguais; envia slotHash como slotName se existir.
 */
function showOverlaySong(data) {
    var cfg = module.settings['cfg_uno_auto_overlay_song'] || {};
    h.log(mUID, 'showOverlaySong: config = {}', JSON.stringify(cfg));
    var defaultOverlay = cfg.defaultOverlay || '';
    var delay = parseInt(cfg.delay, 10) || 0;
    var fieldSongTitle = cfg.fieldSongTitle;
    var fieldArtist = cfg.fieldArtist;
    h.log(mUID, 'showOverlaySong: defaultOverlay="{}", fieldSongTitle="{}", fieldArtist="{}", delay={}', defaultOverlay, fieldSongTitle, fieldArtist, delay);
    if (!defaultOverlay || !fieldSongTitle) {
        h.log(mUID, 'showOverlaySong: Sem overlay ou campo mapeado!');
        return;
    }

    var overlayInfo = parseDefaultOverlayKey(defaultOverlay);
    var token = overlayInfo.token, overlayId = overlayInfo.overlayId, slotHash = overlayInfo.slotHash;
    h.log(mUID, 'showOverlaySong: token="{}", overlayId="{}", slotHash="{}"', token, overlayId, slotHash);

    var globalCfg = module.settings.cfg_uno_overlay || {};
    var timeout = globalCfg['timeout_' + overlayId] ? parseInt(globalCfg['timeout_' + overlayId], 10) : 15;
    h.log(mUID, 'showOverlaySong: timeout para overlayId="{}": {}', overlayId, timeout);

    var dataToSend = {};
    if (fieldSongTitle === fieldArtist) {
        var titulo = data.title || '';
        var artista = data.artist || '';
        var campoFinal = titulo;
        if (artista) {
            campoFinal += '\n' + artista;
        }
        dataToSend[fieldSongTitle] = campoFinal;
    } else {
        if (fieldSongTitle && data.title) {
            dataToSend[fieldSongTitle] = data.title;
        }
        if (fieldArtist && data.artist) {
            dataToSend[fieldArtist] = data.artist;
        }
    }
    h.log(mUID, 'showOverlaySong: CHAMANDO showOverlay: token={}, overlayId={}, data={}, timeout={}, delay={}, slotName={}', token, overlayId, JSON.stringify(dataToSend), timeout, delay, slotHash);

    showOverlay(token, overlayId, dataToSend, timeout, delay, slotHash);
}

/**
 * Busca pessoa escalada para um determinado título/função na escala do dia.
 * Faz integração com GetCurrentSchedule e GetMembers do Holyrics.
 * Retorna objeto com nome e skills se encontrado, ou null se não houver pessoa.
 * Usa logs para depuração detalhada do processo.
 */
function getPersonForTitle(title) {
    var titleToFind = (title || '').trim();
    h.log(mUID, '{%t} Buscando pessoa escalada para o título: "{}"', titleToFind);

    var schedResp = h.hly('GetCurrentSchedule');
    h.logp(mUID, '{%t} Retorno GetCurrentSchedule:', schedResp);

    if (!schedResp || !schedResp.data || !schedResp.data.length) {
        h.log(mUID, '{%t} GetCurrentSchedule não retornou dados válidos.');
        return null;
    }

    var r = schedResp.data[0];

    if (!r.roles || !r.roles.length) {
        h.log(mUID, '{%t} Nenhum role/função encontrada na escala.');
        return null;
    }

    var role = null;
    for (var i = 0; i < r.roles.length; i++) {
        var roleName = (r.roles[i].name || '').trim();
        h.log(mUID, '{%t} Checando role: "{}"', roleName);
        if (roleName === titleToFind) {
            role = r.roles[i];
            h.log(mUID, '{%t} Role correspondente encontrado: "{}"', roleName);
            break;
        }
    }

    if (!role) {
        h.logp(mUID, '{%t} Nenhuma pessoa escalada para o título: "{}"', titleToFind);
        h.log(mUID, '{%t} Títulos disponíveis na escala:', r.roles.map(function(x) { return (x.name || '').trim(); }).join(', '));
        return null;
    }

    if (role.member && role.member.id) {
        var memberId = role.member.id;
        h.log(mUID, '{%t} ID do membro atribuído à função "{}": {}', titleToFind, memberId);

        var membersResp = h.hly('GetMembers');
        h.logp(mUID, '{%t} Retorno GetMembers:', membersResp);

        var members = (membersResp && membersResp.data) ? membersResp.data : [];
        for (var j = 0; j < members.length; j++) {
            if (members[j].id === memberId) {
                var person = {
                    name: members[j].name,
                    role: members[j].skills
                };
                h.log(mUID, '{%t} Pessoa escalada para "{}": {} (skills: {})', titleToFind, person.name, person.role);
                return person;
            }
        }

        h.log(mUID, '{%t} Membro com ID "{}" não encontrado em GetMembers.', memberId);
        return null;
    } else {
        h.log(mUID, '{%t} A função "{}" não possui ninguém escalado.', titleToFind);
        return null;
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a225472696767657273227d
function triggers(module) {
    var arr = [];

    arr.push({
        id: "overlay_titulo_item_mUIDia_" + mUID,
        when: "displaying",
        item: "any_title_subitem",
        action: function(obj) {
            var title = obj.title;

            // Overlay de mesmo nome do título (QRCODE, etc)
            showOverlayByTitle(title);

            // Overlay de Título de Mídia (exclui se tiver '+')
            if (isNewTitle(title) && title.indexOf('+') < 0) {
                showOverlayTitle({ name: title });
            } else if (title.indexOf('+') >= 0) {
                h.log(mUID, '{%t} Título ignorado por possuir "+" {}', title);
            }

            // Overlay de pessoa escalada
            var person = getPersonForTitle(title);
            if (person && person.name && isNewTitle(title + person.name)) {
                showOverlayScheduled(person);
            }

            // Status do UNO (se não iniciado)
            if (!module.restore('unoOn')) {
                h.log(mUID, '{%t} Não iniciou evento, registro de título ignorado {}', title);
                isNewTitle(null, true);
            }
        }
    });

    arr.push({
        id: 'log_musica' + mUID,
        when: 'displaying',
        item: 'any_song',
        action: function(obj) {
            showOverlaySong(obj);
        }
    });

    arr.push({
        id: mUID + "_reload_schedule",
        when: "change",
        item: "playlist",
        action: function(obj) {
            refreshTitleOverlayDatabase();
        }
    });

    return arr;
}






// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a226f626a6563744d6f64656c73227d
function objectModels() {
    var arr = [];
    arr.push({
        id: 'uno_overlay',
        name: jsc.i18n('Token UNO'),
        onchange: () => { 
          module.updatePanel();
        }, 
        struct: [
            { id: 'name', name: jsc.i18n('Apelido'), type: 'string' },
            { id: 'token',    name: jsc.i18n('Token UNO'), type: 'string' },
            {
                id: 'btn_configure_overlay_pack',
                type: 'button',
                button_label: jsc.i18n('Configurar'),
                name: jsc.i18n('Conteúdo do Overlay'),
                action: function(obj, callback) {
                     configureOverlayForToken(obj, callback);
                     module.repaintPanel();
                }
            }
        ]
    });
    return arr;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2246756e6374696f6e73227d
function detectOverlayType(token) {
    var blacklist = ['Countdown']; // adicione mais nomes conforme necessário

    // 1. Testa se é timer UNO (responde número em getTimer)
    var timerResponse = jsc.uno.getTimer(token).payload;
    h.log(mUID, '{%t} timerResponse {}', timerResponse);
    if (typeof timerResponse === 'number') {
        h.log(mUID, 'detectOverlayType → Tipo identificado: timer');
        return 'timer';
    }

    // 2. Se não for timer, tenta recuperar os overlays
    var overlays = jsc.uno.getOverlays(token);
    h.logp(mUID, '{%t} overlays {}', overlays);
    if (overlays && overlays.length > 0) {
        // Blacklist: se algum overlay do token está na lista negra
        for (var i = 0; i < overlays.length; i++) {
            var name = overlays[i].name;
            if (blacklist.indexOf(name) !== -1) {
                h.log(mUID, 'detectOverlayType → Overlay "{}" está na blacklist.', name);
                return 'blacklisted';
            }
        }
        // Se tem mais de um overlay, considera como pack
        if (overlays.length > 1) {
            h.log(mUID, 'detectOverlayType → Tipo identificado: pack.');
            return 'pack';
        }
        // Se algum overlay tem slots, é slot
        for (var i = 0; i < overlays.length; i++) {
            if (overlays[i].slots && overlays[i].slots.length > 0) {
                h.log(mUID, 'detectOverlayType → Overlay "{}" possui slots.', overlays[i].name);
                return 'slot';
            }
        }
        // Caso comum
        h.log(mUID, 'detectOverlayType → Tipo identificado: simples.');
        return 'simples';
    }

    // 3. Resposta vazia ou erro
    h.log(mUID, 'detectOverlayType → Não foi possível identificar o tipo. Tipo: unknown.');
    return 'unknown';
}


function getOverlayAliasFromSettings(module, overlayID) {
    var key = 'alias_overlay_' + overlayID;

    // 1. Prioriza cfg_overlay_pack_X
    for (var j = 0; j < 10; j++) {
        var pack = module.settings['cfg_overlay_pack_' + j];
        if (pack && pack[key]) return pack[key];
    }

    // 2. Depois cfg_uno_overlay_alias_X
    for (var i = 0; i < 10; i++) {
        var group = module.settings['cfg_uno_overlay_alias_' + i];
        if (group && group[key]) return group[key];
    }

    // 3. Depois: procura diretamente em cfg_uno_overlay (melhoria aplicada)
    var direct = module.settings.cfg_uno_overlay;
    if (direct && direct[key]) return direct[key];

    // 4. Se nada for encontrado, retorna null
    return null;
}

function runOverlay(item) {
    h.log(mUID, '▶️ Iniciando execução do overlay');
    h.log(mUID, '🧾 Dados recebidos para envio: {}', JSON.stringify(item.data));
    h.log(mUID, '🧷 Slot a ser usado: {}', item.slotName);

    // ⚠️ Ativa status global
    deactivateOverlayStatus(item.token, item.overlayId); // Sempre limpa antes
    // 👇 Ativa o status visual
    var duration = item.end - item.start;
    var expiresAt = Date.now() + duration;
    var timeoutId = h.setTimeout(function () {
        jsc.uno.hideOverlay(item.token, item.overlayId);
        deactivateOverlayStatus(item.token, item.overlayId);

        var queueKey = 'overlayQueue_' + item.token + '_' + item.overlayId;
        var overlayQueue = module.getGlobal(queueKey) || [];
        if (overlayQueue.length > 0 && overlayQueue[0].start === item.start) {
            overlayQueue.shift();
            module.setGlobal(queueKey, overlayQueue);
            h.log(mUID, '🧹 Overlay removido da fila: {}', item.overlayId);
        }
    }, duration);

    activateOverlayStatus(item.token, item.overlayId, timeoutId, expiresAt);

    jsc.uno.setOverlayContent(item.token, item.overlayId, item.data);

    if (item.slotName) {
        h.log(mUID, '🔄 Ativando slot via UNO: {}', item.slotName);

        jsc.uno.takeOverlaySlotName(item.token, item.overlayId, item.slotName);
        jsc.uno.showOverlay(item.token, item.overlayId);
        
        h.log(mUID, '{%t} Slot ativado: {}', item.slotName);
    } else {
        h.log(mUID, '🔼 Enviando showOverlay');
        jsc.uno.showOverlay(item.token, item.overlayId);
        h.log(mUID, '{%t} Overlay ativado com payload');
    }

    h.log(mUID, '⏱️ Duração programada do overlay: {}ms', duration);
}

/**
 * Exibe um overlay UNO 
 * @param {string} token     Token do UNO (API Key)
 * @param {string} overlayId ID do overlay UNO
 * @param {object} data      Payload do overlay
 * @param {number} timeout   Tempo de exibição em segundos (opcional, padrão 15)
 * @param {number} delay     Delay em segundos antes de exibir (opcional, padrão 0)
 * @param {string} slotName  (opcional) Slot do overlay, se houver
 */
function showOverlay(token, overlayId, data, timeout, delay, slotName) {
    h.log(mUID, '==> showOverlay CHAMADA');
    h.log(mUID, '>> token: {}', token);
    h.log(mUID, '>> overlayId: {}', overlayId);
    h.log(mUID, '>> data: {}', JSON.stringify(data));
    h.log(mUID, '>> timeout: {}', timeout);
    h.log(mUID, '>> delay: {}', delay);
    h.log(mUID, '>> slotName: {}', slotName);

    var s = module.settings;
    var o = s.cfg_uno_overlay;

    if (typeof token !== 'string' || !token) {
        h.log(mUID, '⚠️ [showOverlay] TOKEN inválido: {}', token);
    }
    if (typeof overlayId !== 'string' || !overlayId) {
        h.log(mUID, '⚠️ [showOverlay] OVERLAY ID inválido: {}', overlayId);
    }
    if (typeof timeout !== 'number') {
        h.log(mUID, '[{}] Tempo de exibição não informado. Usando padrão 15s.', token);
        timeout = 15;
    }
    if (typeof delay !== 'number') {
        delay = 0;
    }

    var interval = 1;
    var durationMs = timeout * 1000;
    var intervalMs = interval * 1000;
    var now = Date.now();

    var effectiveSlotName = slotName || (o && o['slot_' + token]) || null;
    h.log(mUID, '>> effectiveSlotName: {}', effectiveSlotName);

    var overlayQueue = module.getGlobal('overlayQueue_' + token + '_' + overlayId) || [];

    var execTime = now;
    if (overlayQueue.length > 0) {
        var last = overlayQueue[overlayQueue.length - 1];
        execTime = Math.max(execTime, last.end + intervalMs);
    }
    if (delay > 0) {
        execTime += delay * 1000;
    }
    var endTime = execTime + durationMs;

    var item = {
        token: token,
        overlayId: overlayId,
        data: data,
        slotName: effectiveSlotName,
        start: execTime,
        end: endTime
    };

    overlayQueue.push(item);
    module.setGlobal('overlayQueue_' + token + '_' + overlayId, overlayQueue);

    h.log(mUID, 'Fila: {} -> Overlay: {}, Slot: {}, Delay: {}s, Timeout: {}s, Interval: {}s',
        token, overlayId, effectiveSlotName, delay, timeout, interval);

    // Cancela overlay ativo anterior, se houver (limpa visual)
    deactivateOverlayStatus(token, overlayId);

    if (execTime <= now) {
        h.log(mUID, '>> Executando runOverlay(item) imediatamente.');
        runOverlay(item); // <<--- CHAME DIRETO SUA VERSÃO COMPLETA!
    } else {
        try {
            var id = h.runAt({
                name: mUID + '_RunOverlay',
                datetime: formatDateTime(execTime),
                action: function () {
                    h.log(mUID, '>> Executando runOverlay(item) AGENDADO (runAt).');
                    runOverlay(item); // <<--- CHAME DIRETO SUA VERSÃO COMPLETA!
                }
            });
            h.log(mUID, '{%t} Agendado com runAt id: {}', id);
        } catch (err) {
            h.log(mUID, 'Erro ao agendar overlay: {}', err);
        }
    }
}
                      

function formatDateTime(ms) {
    var d = new Date(ms);
    function pad(n) { return n < 10 ? '0' + n : n; }

    return pad(d.getHours()) + ':' +
           pad(d.getMinutes()) + ':' +
           pad(d.getSeconds());
}

function truncateLabelValue(value, maxLength) {
    if (typeof value !== 'string') value = String(value);
    return value.length > maxLength ? value.substring(0, maxLength) + '…' : value;
}


/**
 * refreshTitleOverlayDatabase
 * 
 * Agenda (ou reprograma) a execução automática para iniciar o controle de repetições de overlay de título UNO em um horário específico.
 * Cancela qualquer agendamento anterior, verifica se deve agendar hoje, e programa a rotina principal para rodar no horário certo.
 */
function refreshTitleOverlayDatabase() {
 
  h.log(mUID,'{%t} Executando refreshTitleOverlayDatabase {}');  
  
  var runAt = module.restore('runAt')
  if (runAt) {
     module.cancelRunAt(runAt);
     h.log(mUID,'{%t} Execução do evento cancelada {}', runAt); 
     module.store('runAt', null);
     module.store('unoOn',false);
  }
 
 
  if (isTodaySchedule()) {
    var rAT = getScheduleTime();
    h.log(mUID,'{%t} Evento agendado para {}', rAT); 
    module.store('unoOn', false);
    var id = module.runAt({
       name: mUID,
       datetime: rAT,
       action: function() {
            isNewTitle(null, true);
            h.log(mUID,'{%t} Registro de repetição de títulos inicializado.');
            module.store('unoOn',true);
            module.store('runAt',null);
       }
    });
    module.store('runAt',id);
  }
}


function getScheduleTime() {
    var r = h.hly('GetCurrentSchedule');
    var s = r.data[0];   
    h.log(mUID,'{%t} GetCurrentSchedule.datetime:{} ', s.datetime);
    return s.datetime;
}


function isTodaySchedule() {
      
    var scheduleDateTimer = getScheduleTime();
    
    var scheduleDate = new Date(scheduleDateTimer);
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

/**
 * Exibe overlay pelo título (apelido) salvo, ocultando o anterior se for diferente.
 * Compatível com o novo sistema de configuração UNO (object model).
 * Salva no global o último overlay ativado para poder ocultar se trocar.
 * Adiciona logs para cada etapa do processo.
 */
function showOverlayByTitle(title) {
    var s = module.settings;
    var ctrl = module.getObjectModelCtrl && module.getObjectModelCtrl('uno_overlay');
    var overlayList = (ctrl && ctrl.getAll && ctrl.getAll()) || [];
    var oldTitleInfo = module.getGlobal('showOverlayByTitle');

    // Oculta overlay anterior se for diferente
    if (oldTitleInfo && oldTitleInfo.title !== title) {
        h.log(mUID, 'showOverlayByTitle: ocultando overlay anterior token={}, id={}', oldTitleInfo.token, oldTitleInfo.id);
        jsc.uno.hideOverlay(oldTitleInfo.token, oldTitleInfo.id);
        module.setGlobal('showOverlayByTitle', null);
    }

    h.log(mUID, 'showOverlayByTitle: buscando title "{}" na lista.', title);

    // Busca o overlay pelo nome
    var found = false;
    for (var i = 0; i < overlayList.length; i++) {
        var nickname = overlayList[i].name || '';
        var token = overlayList[i].token || '';
        h.log(mUID, 'showOverlayByTitle: verificando index={}, nickname="{}"', i, nickname);

        if (nickname === title) {
            h.log(mUID, 'showOverlayByTitle: encontrado index={}, nickname="{}"', i, nickname);

            // Procura o overlay correspondente (apenas o primeiro overlay do token, pode ser adaptado)
            var overlay = module.restore('overlay_' + token + '_0');
            if (overlay && overlay.id) {
                h.log(mUID, 'showOverlayByTitle: exibindo overlay token={}, id={}', token, overlay.id);
                jsc.uno.showOverlay(token, overlay.id);
                module.setGlobal('showOverlayByTitle', { title: title, id: overlay.id, token: token });
                found = true;
                break;
            } else {
                h.log(mUID, 'showOverlayByTitle: overlay não encontrado para token={} (procure overlay_{}_0)', token, token);
            }
        }
    }

    if (!found) {
        h.log(mUID, 'showOverlayByTitle: título "{}" não encontrado em nenhum overlay.', title);
    }
}

     
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22646961676e6f737469636f227d
function actionAnalyzeUNOOverlays() {
    return {
        hint: jsc.i18n('Diagnosticar overlays UNO'),
        icon: 'hourglass_bottom',
        action: function() {
            
            testUnoShowOverlay()
            return;
 
            h.logp(mUID, "ACTIVE? {} | {}", module.global.activeOverlays, isOverlayActive('0TmN4EyM0S7UOgWxdpBS0r','-NDrs33sSgLrqXCDcRLM'));            
            
            return;
            var token = h.getClipboard(); // pode ser substituído por um campo configurável
            jsc.uno.setTimer(token, 300);
            jsc.uno.showOverlay(token); 
            
        }
    };
}

/**
 * Função de teste para ativar overlay UNO com payload manual.
 * 
 * Chama diretamente o showOverlay (e opcionalmente hideOverlay) para testes rápidos,
 * usando o token, overlayId e payload do slot de exemplo.
 * 
 * Use nos seus scripts ou em uma action temporária do módulo!
 */
function testUnoShowOverlay() {
    var token = "4wCoBsIKDnxLbMwNpJSjQj"; // token do overlay UNO
    var overlayId = "09172f33-d6fe-43b8-8a56-ebb231701f8b"; // id do overlay
    var timeout = 15; // segundos (ajuste conforme necessário)
    
    // Exemplo de payload do slot (ajuste conforme seu template!)
    var payload = {
        "Logo": "https://overlays.uno/images/UnoLogoMedium.png",
        "Logo Fit": "contain",
        "Title": "Pr. Cristiano Techio\n@cristianotechio"
    };

    h.log(mUID, "=== TESTE: Enviando showOverlay UNO ===");
    h.log(mUID, "Token: {}", token);
    h.log(mUID, "OverlayId: {}", overlayId);
    h.log(mUID, "Payload: {}", JSON.stringify(payload));
    h.log(mUID, "Timeout: {}", timeout);

    // Envia para o UNO (ajuste se usa seu próprio showOverlay wrapper)
    jsc.uno.showOverlay(token, overlayId, payload, timeout);

    // (Opcional) Oculta o overlay após X segundos para testar hideOverlay também
    h.setTimeout(function () {
        h.log(mUID, "=== TESTE: Ocultando overlay UNO ===");
        jsc.uno.hideOverlay(token, overlayId);
    }, timeout * 1000);
}


function printSavedOverlays() {
    var cfg = module.settings.cfg_uno_overlay || {};
    var max = parseInt(module.settings.overlayQuantity, 10) || 0;
    var i, j;

    for (i = 0; i < max; i++) {
        var token = cfg['api' + i];
        var nickname = cfg['nickname' + i] || 'Overlay';
        if (!token) continue;

        // Carrega o tipo do token salvo anteriormente
        var tokenType = module.restore('overlayType_' + i) || '-';
        h.log(mUID, '--- TOKEN {} ({}) --- Tipo: {}', i + 1, nickname, tokenType);

        for (j = 0; ; j++) {
            var overlay = module.restore('overlay_' + i + '_' + j);
            if (!overlay) break;

            var typeText = overlay.type ? overlay.type : 'simple';
            var slotsText = (overlay.slots && overlay.slots.length > 0) ? overlay.slots.length + ' slot(s)' : '-';

            h.log(mUID,
                '[i={}, j={}] Name: {} | ID: {} | Type: {} | Slots: {}',
                i, j, overlay.name, overlay.id, typeText, slotsText
            );

            // Se quiser ver campos extras:
            if (overlay.model && overlay.model.model) {
                var campos = [];
                for (var k = 0; k < overlay.model.model.length; k++) {
                    campos.push(overlay.model.model[k].id + ' (' + overlay.model.model[k].type + ')');
                }
                h.log(mUID, '    Campos: {}', campos.join(', '));
            }
        }
    }
}





function testarTokensTimer() {
    var tokens = [
        '3m0c25nUe1ix9k3YR3fpTS',
        '5oGYb8qtxyFCB3ryVY4lSo',
        '3VTEXGh7FVTFXGFR49Tb2w',
        '3s7BYVw5AqG6dWKTQizpil',
        '6nEWYv1BMMRTcnlRD0plyl',
        
    ];

    for (var i = 0; i < tokens.length; i++) {
        (function (token) {
            try {
                h.log(mUID, '🔍 Testando token: {}', token);
                var model = jsc.uno.getBeginTime(token);
                h.log(mUID,'{%t} model {}', model);
            } catch (e) {
                h.log(mUID, '❌ Erro ao testar token {}: {}', token, e);
            }
        })(tokens[i]);
    }
}

function testUNOCommands() {
    var timerToken = '7p7KDOGJGIt1i5POpj5dTj';
    var overlayToken = '3m0c25nUe1ix9k3YR3fpTS';

    var commandsToTest = [
        { name: 'GetOverlays', data: { command: 'GetOverlays' } },
        { name: 'GetOverlayContent', data: { command: 'GetOverlayContent' } },
        { name: 'GetOverlayVisibility', data: { command: 'GetOverlayVisibility' } },
        { name: 'GetCustomization', data: { command: 'GetCustomization' } },
        { name: 'GetCustomizationModel', data: { command: 'GetCustomizationModel' } },
        { name: 'GetTimer', data: { command: 'GetTimer' } },
        { name: 'GetBeginTime', data: { command: 'GetBeginTime' } },
        { name: 'GetUseMessage', data: { command: 'GetUseMessage' } },
        { name: 'GetMessage', data: { command: 'GetMessage' } }
    ];

    function runTests(token, label) {
        h.log(mUID, '🔍 Iniciando testes em token: {} [{}]', token, label);

        for (var i = 0; i < commandsToTest.length; i++) {
            (function (cmd) {
                try {
                    var result = jsc.uno.request(token, cmd.data, true);
                    h.log(mUID, '✅ {} ({}) OK: {} {} {}', label, cmd.name, JSON.stringify(result));
                } catch (e) {
                    h.log(mUID, '❌ {} ({}) ERRO: {} {} {}', label, cmd.name, e);
                }
            })(commandsToTest[i]);
        }
    }

    runTests(overlayToken, 'Overlay Comum');
    runTests(timerToken, 'Overlay Timer');
}


function analyzeUnoTimer(token) {
    h.log(mUID, '{%t} 🔍 Iniciando análise do Timer da API key: {}', token);

    var timer = jsc.uno.getTimer(token).payload;
    var begin = jsc.uno.getBeginTime(token);
    var msgEnabled = jsc.uno.getUseMessage(token);
    var msg = jsc.uno.getTimerMessage(token);
    var customModel = jsc.uno.request(token, { command: 'GetCustomizationModel' }, true);
    var customValues = jsc.uno.request(token, { command: 'GetCustomization' }, true);

    h.log(mUID, '{%t} ⏱ Tempo atual: {} segundos', timer);
    h.log(mUID, '{%t} ⏳ Tempo inicial configurado: {} segundos', begin);
    h.log(mUID, '{%t} 💬 Mensagem habilitada: {}', msgEnabled);
    h.log(mUID, '{%t} 📝 Conteúdo da mensagem: {}', msg);

    if (customModel && customModel.payload) {
      h.log(mUID, '{%t} 🧩 Modelo de customização:', '');
      h.logp(mUID, JSON.stringify(customModel.payload, null, 2));
    }

    if (customValues && customValues.payload) {
      h.log(mUID, '{%t} 🎨 Valores atuais de customização:', '');
      h.logp(mUID, JSON.stringify(customValues.payload, null, 2));
    }

    return {
      timer: timer,
      beginTime: begin,
      useMessage: msgEnabled,
      message: msg,
      customizationModel: customModel.payload,
      customizationValues: customValues.payload
    };
}
    

function testUnoSlotOverlay() {
    return {
        id: 'testUnoSlotOverlay',
        label: 'Teste Slot',
        icon: 'bug_report',
        action: function () {
                h.logp(mUID, 'module.settings: {}', module.settings);
        }
    };
}

function actionAnalyzeUNOOverlays2() {
    return {
        id: 'btnDebugUNOOverlayLogs2',
        label: '🔍 Analisar configurações UNO (v2)',
        icon: 'bug_report',
        action: function () {
            try {
                var s = module.settings;
                var o = s && s.cfg_uno_overlay;
                h.log(mUID, '=== DEBUG UNO SETTINGS ===');
                h.log(mUID, 'qtdOverlays = {}', s ? s.qtdOverlays : 'undefined');
                h.log(mUID, 'cfg_uno_overlay = {}', JSON.stringify(o));

                if (o && typeof o === 'object') {
                    for (var k in o) {
                        // ignora propriedades herdadas de protótipos JavaBridge
                        if (typeof o[k] !== 'function') {
                            h.log(mUID, '[{}] = {}', k, o[k]);
                        }
                    }
                } else {
                    h.log(mUID, '⚠️ cfg_uno_overlay não é um objeto válido:', o);
                }

                h.log(mUID, '=== FIM ===');
            } catch (err) {
                h.log(mUID, '❌ Erro ao executar actionAnalyzeUNOOverlays2: {}', err);
            }
        }
    };
} // fim da actionAnalyzeUNOOverlays2


function analyzeUNOOverlays(token) {
  h.log(mUID, '{%t} Iniciando análise dos overlays para a API key: {}', token);

  var overlays = jsc.uno.getOverlays(token);
  if (!overlays || overlays.length === 0) {
    h.log(mUID, '{%t} Nenhum overlay retornado para a API key: {}', token);
    return;
  }

  h.log(mUID, '{%t} Total de overlays encontrados: {}', overlays.length);
  var summary = [];

  for (var i = 0; i < overlays.length; i++) {
    var overlay = overlays[i];
    h.log(mUID, '{%t} Analisando overlay "{}" (ID: {})', overlay.name, overlay.id);

    var modelResponse = jsc.uno.getOverlayModel(token, overlay.id);
    if (!modelResponse || !modelResponse.payload || !modelResponse.payload.model) {
      h.log(mUID, '{%t} Modelo não encontrado para o overlay ID: {}', overlay.id);
      continue;
    }

    var model = modelResponse.payload;
    var fields = [];
    var fieldList = model.model || [];
    var hasSlots = !!model.hasSlots;

    h.log(mUID, '{%t} Número de campos encontrados: {}', fieldList.length);
    if (hasSlots) {
      h.log(mUID, '{%t} Overlay possui slots configurados.', '');
    }

    for (var j = 0; j < fieldList.length; j++) {
      var field = fieldList[j];
      h.log(mUID, '{%t} Campo {} - ID: {}, Tipo: {}, Título: {}', j + 1, field.id, field.type, field.title);
      if (fields.indexOf(field.type) === -1) {
        fields.push(field.type);
      }
    }

    var data = {
      name: overlay.name,
      id: overlay.id,
      fields: fields,
      hasSlots: hasSlots
    };

    summary.push(data);
    h.log(mUID, '{%t} Resumo do overlay "{}": {}', overlay.name, data);
  }

  h.log(mUID, '{%t} Diagnóstico completo dos overlays:', '');
  h.log(mUID, JSON.stringify(summary, null, 2));
  return summary;
}