// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22496e666f227d
var mID = '@prcris#m27';  
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID); 

    h.setTimeout(initializeMappedMonitors, 5000);
 
}

function info() {
    return {
        id: mID,
        name: 'OBS MultiView Controller',
        permissions: [
            {
                type: 'advanced',
                key: 'allowed_files'
            }
        ],
        os_required : 'windows',
        min_version : '2.26.0',
        description: 
            '<p> ' +
            'This module provides full control over fullscreen output windows in OBS Studio, ' +
            'allowing you to create, toggle, and hide multiple projections with seamless Holyrics integration.' +
            '</p>' +
            '<p><strong>Important:</strong> OBS Studio must be running on the <strong>same computer</strong> where Holyrics is running.</p>' +
            '<hr>' +
            '<h4>Main Features:</h4>' +
            '<ul>' +
            '<li><strong>Dynamic creation</strong> of fullscreen output windows (program, scene or preview).</li>' +
            '<li><strong>Automatic monitor detection</strong> and link with Holyrics IDs.</li>' +
            '<li><strong>Configurable buttons</strong> based on OBS hotkeys.</li>' +
            '<li>Intuitive interface to configure each button with specific scenes and outputs.</li>' +
            '<li><strong>Direct Holyrics integration</strong> to show or hide screens as needed.</li>' +
            '<li><strong>Optional display</strong> of screen names on panel buttons.</li>' +
            '</ul>' +
            '<hr>' +
            '<p><em>*Compatible with OBS Studio 29+ with WebSocket v5 support. Requires specific Lua script in OBS for full integration.</em></p>' +
            infoVDDMM,
        i18n: {
            name: {
                pt: 'OBS MultiView Controller',
                es: 'Controlador de Pantallas OBS',
                ru: 'Контроллер окон OBS'
            },
            description: {
                pt:
                    '<p>' +
                    'Este módulo permite controle completo sobre as saídas em tela cheia do OBS Studio, ' +
                    'possibilitando criar, alternar e ocultar múltiplas projeções com integração total ao Holyrics.' +
                    '</p>' +
                    '<p><strong>Importante:</strong> o OBS Studio precisa estar sendo executado no <strong>mesmo computador</strong> onde o Holyrics está rodando.</p>' +
                    '<hr>' +
                    '<h4>Funcionalidades principais:</h4>' +
                    '<ul>' +
                    '<li><strong>Criação dinâmica</strong> de janelas de saída em tela cheia (programa, cena ou preview).</li>' +
                    '<li><strong>Detecção automática</strong> de monitores e vinculação com IDs do Holyrics.</li>' +
                    '<li><strong>Botões configuráveis</strong> com base em hotkeys do OBS.</li>' +
                    '<li>Interface intuitiva para configurar cada botão com cenas e saídas específicas.</li>' +
                    '<li><strong>Integração direta</strong> com o Holyrics para ocultar ou exibir telas conforme necessário.</li>' +
                    '<li><strong>Exibição opcional</strong> do nome da tela nos botões do painel.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Compatível com OBS Studio 29+ com suporte a WebSocket v5. Requer script Lua específico no OBS para vinculação completa.</em></p>' +
                    infoVDDMM,
                es:
                    '<p>' +
                    'Este módulo permite el control completo de las salidas en pantalla completa del OBS Studio, ' +
                    'permitiendo crear, alternar y ocultar múltiples proyecciones con integración total con Holyrics.' +
                    '</p>' +
                    '<p><strong>Importante:</strong> OBS Studio debe ejecutarse en la <strong>misma computadora</strong> donde se ejecuta Holyrics.</p>' +
                    '<hr>' +
                    '<h4>Funciones principales:</h4>' +
                    '<ul>' +
                    '<li><strong>Creación dinámica</strong> de ventanas de salida en pantalla completa (programa, escena o vista previa).</li>' +
                    '<li><strong>Detección automática</strong> de monitores y vinculación con IDs de Holyrics.</li>' +
                    '<li><strong>Botones configurables</strong> basados en teclas rápidas del OBS.</li>' +
                    '<li>Interfaz intuitiva para configurar cada botón con escenas y salidas específicas.</li>' +
                    '<li><strong>Integración directa</strong> con Holyrics para mostrar u ocultar pantallas según sea necesario.</li>' +
                    '<li><strong>Visualización opcional</strong> del nombre de la pantalla en los botones del panel.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Compatible con OBS Studio 29+ con soporte para WebSocket v5. Requiere un script Lua específico en OBS para integración completa.</em></p>' +
                    infoVDDMM,
                ru:
                    '<p>' +
                    'Этот модуль предоставляет полный контроль над полноэкранными окнами вывода OBS Studio, ' +
                    'позволяя создавать, переключать и скрывать несколько проекций с полной интеграцией с Holyrics.' +
                    '</p>' +
                    '<p><strong>Важно:</strong> OBS Studio должен работать на <strong>том же компьютере</strong>, что и Holyrics.</p>' +
                    '<hr>' +
                    '<h4>Основные функции:</h4>' +
                    '<ul>' +
                    '<li><strong>Динамическое создание</strong> окон полноэкранного вывода (программа, сцена или предпросмотр).</li>' +
                    '<li><strong>Автоматическое определение</strong> мониторов и привязка к ID Holyrics.</li>' +
                    '<li><strong>Настраиваемые кнопки</strong> на основе горячих клавиш OBS.</li>' +
                    '<li>Интуитивно понятный интерфейс для настройки каждой кнопки с определёнными сценами и выводами.</li>' +
                    '<li><strong>Прямая интеграция</strong> с Holyrics для отображения или скрытия экранов при необходимости.</li>' +
                    '<li><strong>Необязательное отображение</strong> имени экрана на кнопках панели.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Совместим с OBS Studio 29+ с поддержкой WebSocket v5. Требуется специфический Lua-скрипт в OBS для полной интеграции.</em></p>' +
                    infoVDDMM
            }
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
// == settings ==
function settings() {
    return [
        {
            name: jsc.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        { type: 'separator' },
        {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: '',
            type: 'receiver',
            receiver: 'obs_v5'
        },
        { type: 'separator' },
        btnConfigureFinalScreenState(),
        btnConfigureInitialScreenState(),
        btnGenerateLUAScriptConfig(),
        btnConfigureScenesPerScreen(),
        {
            id: 'showLabel',
            label: jsc.i18n('Exibir o nome da tela no botão'),
            type: 'boolean'
        },
        { type: 'separator' },
        {
            id: 'log',
            label: jsc.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function (obj) {
                logState(obj.input.log, mUID, 'onChange ' + mID);
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e67735f6578747261227d
// == settings_extras ==
function btnConfigureFinalScreenState() {
    return {
        id: 'btnConfigureFinalScreenState',
        type: 'button',
        button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Estado final das telas') + '*',
        description: jsc.i18n('Quando fechar o Holyrics, marque as telas que devem ser salvas como ativas para o próximo início.'),
        action: function (obj) {
            var monitors = h.hly('GetDisplaySettings').data;
            var inputs = [];

            inputs = buildInputBlock(jsc.i18n('Configurar estado final das telas'), inputs);

            for (var i = 0; i < monitors.length; i++) {
                var screen = monitors[i];
                if (!screen.area) continue;

                (function (id, name, visible) {
                    inputs.push({
                        id: 'initialstate_' + id,
                        name: name,
                        type: 'boolean',
                        default_value: visible,
                        onchange: function (obj) {
                            var active = obj.input['initialstate_' + id];
                            h.hly('SetDisplaySettings', { id: id, hide: !active });
                            h.log(mUID, '{%t} Tela \"{}\" alterada para {} pelo usuário', name, active ? 'ativa' : 'oculta');
                        }
                    });
                })(screen.id, screen.name, !screen.hide);
            }

            module.inputSettings('cfg_initial_state', inputs);
        }
    };
}

function btnConfigureInitialScreenState() {
    return {
        id: 'btnConfigureInitialScreenState',
        type: 'button',
        button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Estado inicial das telas'),
        description: jsc.i18n('Define qual ação será ativada ao iniciar o Holyrics.'),
        action: function (obj) {
            var screenList = getMatchedMonitors(obj.receiver_id);
            var hotkeyList = getAvailableProjectorHotkeys();
            var inputs = [];

            inputs = buildInputBlock(jsc.i18n('Selecione uma ação inicial para cada tela'), inputs);

            for (var i = 0; i < screenList.length; i++) {
                var screen = screenList[i];
                var screenId = screen.holyrics_id;
                var screenName = screen.holyrics_name;
                var capitalized = screenName.charAt(0).toUpperCase() + screenName.slice(1);
                var hotkeyValues = getMonitorHotkeys(hotkeyList, screenId);

                var allowedValues = [
                    { value: 'holyrics', label: jsc.i18n('Holyrics') },
                    { value: 'inactive', label: jsc.i18n('Inativo') }
                ];

                for (var j = 0; j < hotkeyValues.length; j++) {
                    var typeLabel = hotkeyValues[j].id.indexOf('hk_projector_scene') === 0 ? jsc.i18n('Scene') : jsc.i18n('Output');
                    var name = hotkeyValues[j].label.split(': ')[1];
                    var label = name.charAt(0).toUpperCase() + name.slice(1);
                    allowedValues.push({ value: hotkeyValues[j].id, label: typeLabel + ': ' + label });
                }

                inputs.push({
                    id: 'initialaction_' + screenId,
                    name: capitalized,
                    type: 'string',
                    allowed_values: allowedValues
                });
            }

            module.inputSettings('cfg_initial_action', inputs);
        }
    };
}

function btnGenerateLUAScriptConfig() {
    return {
        id: 'btnGenerateLUAScriptConfig',
        name: jsc.i18n('Configuração script LUA do OBS') + '*',
        description: jsc.i18n('Gera os dados que o script lua precisa para gerar as telas para o Holyrics controlar. Copie e cole na configuração do script no OBS.'),
        type: 'button',
        button_label: jsc.i18n('Gerar Configuração'),
        action: function (obj) {
            var monitors = getMatchedMonitors(obj.receiver_id);
            var str = monitors.map(function (m) {
                return m.obs_index + ',' + m.holyrics_id;
            }).join('|');
            h.log(str);
            module.store('monitorsList', monitors);
        }
    };
}

function btnConfigureScenesPerScreen() {
    return {
        id: 'btnConfigureScenesPerScreen',
        type: 'button',
        button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Cenas nos botões de tela'),
        action: function (obj) {
            var monitorList = getMatchedMonitors(obj.receiver_id);
            var hotkeysList = getAvailableProjectorHotkeys();
            var inputs = buildMonitorInputs(monitorList, hotkeysList);
            module.inputSettings('cfg_projectors', inputs);
            module.updatePanel();
        }
    };
}

function buildMonitorInputs(monitorList, hotkeysList) {
    var inputs = buildInputBlock(jsc.i18n('Selecione as cenas em menus para cada tela'));

    for (var i = 0; i < monitorList.length; i++) {
        var monitor = monitorList[i];
        var monitorId = monitor.holyrics_id;
        var values = getMonitorHotkeys(hotkeysList, monitorId);
        var name = monitor.holyrics_name;

        inputs.push({
            id: monitorId,
            name: name,
            button_label: jsc.i18n('Selecionar cenas'),
            type: 'button',
            action: buildSceneSelectionAction(monitorId, name, values)
        });
    }

    return inputs;
}

function buildSceneSelectionAction(monitorId, monitorName, values) {
    return function () {
        var scenes = [];
        var outputs = [];

        for (var i = 0; i < values.length; i++) {
            if (!values[i].id) continue;

            var parts = values[i].label.split(': ');
            var type = parts[0];
            var name = parts[1];
            var input = {
                id: values[i].id,
                type: 'boolean',
                name: name
            };

            if (type === jsc.i18n('Scene')) {
                scenes.push(input);
            } else {
                outputs.push(input);
            }
        }

        var booleanInputs = buildInputBlock(jsc.i18n('Selecione os itens para a tela:') + ' ' + monitorName)
            .concat([{ type: 'title', name: jsc.i18n('Cenas:') }])
            .concat(scenes)
            .concat([{ type: 'separator' }, { type: 'title', name: jsc.i18n('Saídas:') }])
            .concat(outputs);

        module.inputSettings('cfg_monitor_' + monitorId, booleanInputs);
        module.updatePanel();
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// == actions ==
function actions(module) {
    var act = [];
    var s = module.settings;
    
    act.push.apply(act, createMonitorButtons());

    return act;
}
                     
function createMonitorButtons() {
    var s = module.settings;
    try {
        var mappedScreens = getMatchedMonitors(s.receiver_id);
    } catch (err) { 
        h.notification('<html>' + jsc.i18n('Erro ao carregar telas do OBS. Verifique se o mesmo encontra-se aberto.') + '<br>  ' + err ); 
    };
        
       
    var buttons = [];

    if (!module.global.monitors) {
        module.global.monitors = {};
    }

    // Se não há monitores mapeados, exibe botão de atualizar
    if (!mappedScreens || mappedScreens.length === 0) {
        buttons.push({
            id: 'btnRefreshMonitors',
            label: jsc.i18n('Atualizar'),
            icon: 'refresh',
            hint: jsc.i18n('OBS não encontrado. Clique para atualizar.'),
            action: function () {
                module.updatePanel();
            }
        });
        return buttons;
    }

    for (var i = 0; i < mappedScreens.length; i++) {
        var monitor = mappedScreens[i];
        var screenId = monitor.holyrics_id;
        var buttonKey = 'button' + (i + 1);
        var state = getOrCreateMonitorState(buttonKey, monitor);
        var menu = buildMonitorMenuActions(screenId, buttonKey, state, s);

        if (menu.length <= 1) continue; // só botão "Voltar"

        buttons.push({
            id: buttonKey,
            label: s.showLabel ? state.holyrics_name : '',
            icon: 'filter_' + state.obs_index,
            hint: 'Tela OBS: "' + state.holyrics_name + '"',
            action: menu,
            status: (function (buttonKey) {
                return function () {
                    var status = module.global.monitors[buttonKey];
                    if (status && status.state === 'obs') {
                        return jsc.utils.ui.item_status.danger();
                    }
                    if (status && status.state === 'inactive') {
                        return jsc.utils.ui.item_status.warning();
                    }
                    return null;
                };
            })(buttonKey)
        });
    }

    return buttons;
}


function buildMonitorMenuActions(screenId, buttonKey, data, settings) {
    var hotkeysList = getAvailableProjectorHotkeys();
    var cfg = settings['cfg_monitor_' + screenId] || {};
    var menu = [];
    var state = module.global.monitors[buttonKey];
    var holyricsData = h.hly('GetDisplaySettings');
    var holyricsVisible = true;

    for (var i = 0; i < holyricsData.data.length; i++) {
        if (holyricsData.data[i].id === screenId) {
            holyricsVisible = !holyricsData.data[i].hide;
            break;
        }
    }

    // --- Holyrics ---
    var isHolyrics = (state && state.state === 'holyrics');
    menu.push({
        label: (isHolyrics ? ' > ' : '') + jsc.i18n('Holyrics') + (isHolyrics ? ' < ' : ''),
        icon: isHolyrics ? 'radio_button_checked' : 'radio_button_unchecked',
        action: function () {
            setMonitorState(screenId, 'holyrics');
        }
    });

    // --- Inativo ---
    var isInactive = (state && state.state === 'inactive');
    menu.push({
        label: (isInactive ? ' > ' : '') + jsc.i18n('Inativo') + (isInactive ? ' < ' : ''),
        icon: isInactive ? 'radio_button_checked' : 'radio_button_unchecked',
        action: function () {
            setMonitorState(screenId, 'inactive');
        }
    });

    var hasScenes = false;
    var hasOutputs = false;
    var actives = getActiveHotkeysForMonitor(hotkeysList, screenId, cfg);

    for (var i = 0; i < actives.length; i++) {
        (function (hotkey, name, type) {
            var isActive = state && state.state && state.hotkey === hotkey;
            var label = name.charAt(0).toUpperCase() + name.slice(1);

            if (type === 'Scene' && !hasScenes) {
                menu.push(mnuSeparatorLabel(jsc.i18n('Cenas')));
                hasScenes = true;
            }

            if (type === 'Output' && !hasOutputs) {
                menu.push(mnuSeparatorLabel(jsc.i18n('Saídas')));
                hasOutputs = true;
            }

            menu.push({
                label: (isActive ? ' > ' : '') + label + (isActive ? ' < ' : ''),
                icon: isActive ? 'radio_button_checked' : 'radio_button_unchecked',
                action: function () {
                    var data = module.global.monitors[buttonKey];
                    setMonitorState(screenId, hotkey);
                }
            });
        })(actives[i].hotkey, actives[i].name, actives[i].type);
    }

    return menu;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function refreshProjectorWindow() {
    var settings = module.settings;
    var hasActive = false;
    for (var key in module.global.monitors) {
        if (module.global.monitors[key].state === "obs") {
            hasActive = true;
            break;
        }
    }

    h.log(mUID, '{%t} Fechando janelas de projetores');
    module.executeCmdAndWait('.modules/obsprojector/closeobsprojector.exe');
    
    if (!hasActive) {
        h.log(mUID, '{%t} Nenhum monitor ativo — cancelando reabertura de projetores.');
        return;
    }

    h.setTimeout(function () {
        for (var key in module.global.monitors) {
            var monitor = module.global.monitors[key];
            if (monitor.state === "obs") {
                // Se existe hotkey e ela é de projector padrão, extrai os parâmetros e chama openMixProjector direto
                if (monitor.hotkey && monitor.hotkey.indexOf("hk_projector_fixed|") === 0) {
                    var parts = monitor.hotkey.split("|");
                    var type = parts[1]; // program, preview, multiview
                    var screen_id = parts[2];
                    h.log(mUID, '{%t} [by hotkey] Abrindo projector {} monitor {} (screen_id {})', type, monitor.obs_index, screen_id);
                    jsc.obs_v5.openMixProjector(settings.receiver_id, type, monitor.obs_index);
                }
                // Se não for projector padrão mas tem hotkey, chama triggerHotkeyByName
                else if (monitor.hotkey) {
                    jsc.obs_v5.triggerHotkeyByName(settings.receiver_id, monitor.hotkey);
                    h.log(mUID, '{%t} Ativando "{}" com hotkey "{}"', monitor.holyrics_name, monitor.hotkey);
                }
                // Para compatibilidade, se não tem hotkey mas é um tipo fixo, chama openMixProjector
                else if (
                    monitor.holyrics_id === "public" ||
                    monitor.holyrics_id === "preview" ||
                    monitor.holyrics_id === "multiview"
                ) {
                    var typeFixed = monitor.holyrics_id === "public" ? "program" : monitor.holyrics_id;
                    h.log(mUID, '{%t} [by holyrics_id] Abrindo projector {} monitor {}', typeFixed, monitor.obs_index);
                    jsc.obs_v5.openMixProjector(settings.receiver_id, typeFixed, monitor.obs_index);
                }
            }
        }
        module.repaintPanel();
    }, 200);
}


function setMonitorState(screenId, hotkey) {
    var monitors = module.global.monitors;
    var foundKey = null;
    var oldState = null;
    var state = null;

    // Determina o novo state baseado no parâmetro hotkey
    if (hotkey === 'holyrics') {
        state = 'holyrics';
        hotkey = null;
    } else if (hotkey === 'inactive') {
        state = 'inactive';
        hotkey = null;
    } else {
        state = 'obs';
    }


    for (var key in monitors) {
        h.log(mUID, '{%t} key: {}', key);
        if (monitors.hasOwnProperty(key) && monitors[key].holyrics_id === screenId) {
            h.log(mUID, '{%t} key encontrada: {}', key);
            foundKey = key;
            oldState = monitors[key].state;
            monitors[key].state = state;
            monitors[key].hotkey = hotkey;
            h.log(mUID, 'Monitor "{}" alterado: state {} → {}, hotkey {}', key, oldState, state, hotkey);
            break;
        }
    }

    h.logp(mUID, '{%t} global.monitors: {}', monitors);
    
    h.hly('SetDisplaySettings', { id: screenId, hide: (state !== 'holyrics') });

    h.log(mUID, 'Enviando para SetDisplaySettings: id={}, hide={}', screenId, (state !== 'holyrics'));

    // chama o refresh de telas (que abre a tela atual e outras que forem necessárias.
    refreshProjectorWindow();

    module.updatePanel();
}


function initializeMappedMonitors() {
    var moduleEnabled = module.isEnabled();
    h.log(mUID,'{%t} módulo habilitado? {}',moduleEnabled); 
    
    if (moduleEnabled) {
        var initialActions = module.settings['cfg_initial_action'] || {};
        var mappedScreens = getMatchedMonitors(module.settings.receiver_id);

        if (!module.global.monitors) {
            module.global.monitors = {};
        }

        for (var i = 0; i < mappedScreens.length; i++) {
            var screen = mappedScreens[i];
            var screenId = screen.holyrics_id;
            var buttonKey = 'button' + (i + 1);
            var action = initialActions['initialaction_' + screenId];
            if (!action) continue;

            var state = getOrCreateMonitorState(buttonKey, screen);
            
            setMonitorState(screenId, action);
            
            h.log(mUID, '{%t} Screen "{}" started in action {}', screen.holyrics_name, action);
        }
    }
}


function getOrCreateMonitorState(buttonKey, monitor) {
    if (!module.global.monitors) {
        module.global.monitors = {};
    }

    if (!module.global.monitors[buttonKey]) {
       module.global.monitors[buttonKey] = createMonitorObject(monitor);
    }

    return module.global.monitors[buttonKey];
}

function createMonitorObject(monitor) {
    return {
        holyrics_id: monitor.holyrics_id,
        holyrics_name: monitor.holyrics_name,
        obs_index: monitor.obs_index,
        state: 'holyrics',        
        hotkey: null
    };
}


function isMonitorActive(screenId) {
    var monitors = module.global.monitors;
    for (var key in monitors) {
        if (monitors[key].holyrics_id === screenId) {
            return monitors[key].state === true;
        }
    }
    return false;
}


function getMatchedMonitors(receiverID) {
    var obsMonitors = getMonitorList(receiverID);
    var holyricsMonitors = h.hly('GetDisplaySettings');
    var mapped = [];

    for (var i = 0; i < holyricsMonitors.data.length; i++) {
        var hMonitor = holyricsMonitors.data[i];
        if (!hMonitor.area) continue;

        for (var j = 0; j < obsMonitors.length; j++) {
            var oMonitor = obsMonitors[j];
            if (hMonitor.area.x === oMonitor.monitorPositionX && hMonitor.area.y === oMonitor.monitorPositionY) {
                mapped.push({
                    obs_index: oMonitor.monitorIndex,
                    holyrics_id: hMonitor.id,
                    holyrics_name: hMonitor.name,
                    obs_name: oMonitor.monitorName,
                    hide: !!hMonitor.hide
                });
                break;
            }
        }
    }

    return mapped;
}

function getAvailableProjectorHotkeys() {
    var hotkeyList = jsc.obs_v5.getHotkeyList(module.settings.receiver_id);
    var filtered = [];
    for (var i = 0; i < hotkeyList.length; i++) {
        var hk = hotkeyList[i];
        if (hk.indexOf('hk_projector_') === 0 && filtered.indexOf(hk) === -1) {
            filtered.push(hk);
        }
    }
    return filtered;
}

function getMonitorHotkeys(hotkeysList, monitorId) {
    var result = [];
    for (var i = 0; i < hotkeysList.length; i++) {
        var parts = hotkeysList[i].split('|');
        if (parts.length === 3 && parts[2] === monitorId) {
            var label = (parts[0] === 'hk_projector_scene' ? jsc.i18n('Scene') : jsc.i18n('Output')) + ': ' + parts[1];
            result.push({
                id: hotkeysList[i],
                output: monitorId,
                label: label
            });
        }
    }
    return result;
}

function getActiveHotkeysForMonitor(hotkeysList, screenId, cfg) {
    var active = [];
    for (var j = 0; j < hotkeysList.length; j++) {
        var parts = hotkeysList[j].split('|');
        if (parts.length !== 3 || parts[2] !== screenId) continue;
        if (!cfg[hotkeysList[j]]) continue;

        var type = parts[0] === 'hk_projector_scene' ? 'Scene' : 'Output';
        var name = parts[1];

        active.push({
            hotkey: hotkeysList[j],
            type: type,
            name: name
        });
    }
    return active;
}

function getMonitorList(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetMonitorList', null);
    h.logp('jsc.obs_v5', 'getMonitorList response: {}', response);
    return response.monitors;
}

function buildInputBlock(title, children) {
    return [{ type: 'title', name: title }, { type: 'separator' }].concat(children || []);
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227075626c69635f616374696f6e73227d
function publicActions() {
    var arr = [];
    arr.push({
        id: 'ativar_tela',
        name: jsc.i18n('Ativar Tela'),
        icon: 'system:tv',
        description: jsc.i18n('Ativa uma determinada tela do OBS/Holyrics em uma saída especificada'),
        available_for: '',
        unavailable_for: '',
        filter_available_for_trigger: function(evt) {
            return true;
        },
        action: function(evt) {
            var receiverID = module.settings.receiver_id;
            var monitorID = evt.input.monitorID;
            var actionType = evt.input.actionType;

            h.log(mUID, 'publicActions/ativar_tela: monitorID={}, actionType={}', monitorID, actionType);

            if (!receiverID || !monitorID || !actionType) {
                showMessage(jsc.i18n('Erro ao ativar tela'), jsc.i18n('Preencha todos os campos obrigatórios!'));
                return;
            }

            // Se já está ativo, ao clicar de novo volta pra Holyrics (toggle)
            if (isButtonActiveForAction(monitorID, actionType)) {
                h.log(mUID, 'Toggling: já está ativo, voltando para Holyrics.');
                setMonitorState(monitorID, 'holyrics');
                return;
            }
            setMonitorState(monitorID, actionType);
        },
        status: function(evt) {
            if (isButtonActiveForAction(evt.input.monitorID, evt.input.actionType)) {
                return jsc.utils.ui.item_status.danger();
            }
        },
        input: [
            {
                id: 'monitorID',
                type: 'string',
                name: jsc.i18n('Selecione a tela de saída'),
                allowed_values: function(obj) {
                    var receiverID = module.settings.receiver_id;
                    var arr = [];
                    var mapped = getMatchedMonitors(receiverID);
                    for (var i = 0; i < mapped.length; i++) {
                        var mon = mapped[i];
                        arr.push({
                            value: mon.holyrics_id,
                            label: mon.holyrics_name
                        });
                    }
                    return arr;
                }
            },
            {
                id: 'actionType',
                type: 'string',
                name: jsc.i18n('Modo de exibição'),
                allowed_values: function(obj) {
                    var arr = [];
                    arr.push({ value: 'holyrics', label: jsc.i18n('Holyrics') });
                    arr.push({ value: 'inactive', label: jsc.i18n('Inativo') });
                    // Cenas e saídas disponíveis para o monitor
                    var monitorID = obj.input && obj.input.monitorID;
                    if (monitorID) {
                        var hotkeysList = getAvailableProjectorHotkeys();
                        var monitorHotkeys = getMonitorHotkeys(hotkeysList, monitorID);
                        var hasScenes = false, hasOutputs = false;
                        for (var i = 0; i < monitorHotkeys.length; i++) {
                            var hk = monitorHotkeys[i];
                            if (hk.label.indexOf(jsc.i18n('Scene')) === 0 && !hasScenes) {
                                arr.push({ value: '', label: '--- ' + jsc.i18n('Cenas') + ' ---' });
                                hasScenes = true;
                            }
                            if (hk.label.indexOf(jsc.i18n('Output')) === 0 && !hasOutputs) {
                                arr.push({ value: '', label: '--- ' + jsc.i18n('Saídas') + ' ---' });
                                hasOutputs = true;
                            }
                            arr.push({
                                value: hk.id,
                                label: hk.label
                            });
                        }
                    }
                    return arr;
                }
            }
        ]
    });
    return arr;
}


function isButtonActiveForAction(monitorID, actionType) {
    if (!monitorID || !actionType || !module.global.monitors) return false;
    var monitors = module.global.monitors;
    for (var key in monitors) {
        if (!monitors.hasOwnProperty(key)) continue;
        var mon = monitors[key];
        if (mon.holyrics_id === monitorID) {
            if (actionType === '__holyrics__' && mon.state === 'holyrics') return true;
            if (actionType === '__inactive__' && mon.state === 'inactive') return true;
            if (actionType !== '__holyrics__' && actionType !== '__inactive__' &&
                mon.state === 'obs' && mon.hotkey === actionType) return true;
        }
    }
    return false;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273687574646f776e227d
// == shutdown ==
function shutdown(module) {
    var settings = module.settings;

    h.log(mUID, '{%t} Iniciando shutdown dos projetores OBS');

    // 1. Restaurar as telas do Holyrics (SetDisplaySettings hide: false)
    var initialConfig = settings['cfg_initial_state'] || {};
    var screens = h.hly('GetDisplaySettings').data;

    for (var i = 0; i < screens.length; i++) {
        var screen = screens[i];
        if (!screen.area) continue;

        var id = screen.id;
        var value = initialConfig['initialstate_' + id];
        if (typeof value === 'boolean') {
            h.hly('SetDisplaySettings', { id: id, hide: !value });
            h.log(mUID, '{%t} Tela \"{}\" restaurada para {} no shutdown', screen.name, value ? 'ativa' : 'oculta');
        }
    }

    // 2. Fechar janelas de projetores OBS
    h.log(mUID, '{%t} Fechando janelas de projetores OBS');
    module.executeCmdAndWait('.modules/obsprojector/closeobsprojector.exe');
}