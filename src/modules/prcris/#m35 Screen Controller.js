// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22496e666f227d
var mID = '@prcris#m35';  
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID); 
    // Aplica estado inicial das telas, se configurado, com pequeno atraso (como no #m27)
    try {
        h.log(mUID, '{%t} Agendando aplicação do estado inicial das telas para 5s...');
        h.setTimeout(function () {
            try {
                h.log(mUID, '{%t} Disparando aplicação do estado inicial (deferred)');
                scheduleInitialScreensApply(module, 1);
            } catch (e) {
                h.log(mUID, '{%t} Erro ao aplicar estado inicial das telas (deferred): {}', e.message || e);
            }
        }, 5000);
    } catch (e) {
        h.log(mUID, '{%t} Erro ao agendar estado inicial das telas: {}', e.message || e);
    }
}

function info() {
    return {
        id: mID,
        name: 'Screen Controller',
        description: 
            '<p>' +
            'Quickly control Holyrics display outputs from the module panel or by adding actions as media items.' +
            '</p>' +
            '<hr>' +
            '<h4>Main Features:</h4>' +
            '<ul>' +
            '<li><strong>Click toggle</strong> — on the module panel, click the screen button (e.g. "Audience", "Screen 2") to show/hide.</li>' +
            '<li><strong>Visual status</strong> — when inactive the screen button turns red; the icon switches visible/hidden.</li>' +
            '<li><strong>Media list actions</strong> — add Toggle/Activate/Deactivate as a media item.</li>' +
            '<li><strong>Initial state on startup</strong> — configure which screens start active or hidden when Holyrics opens.</li>' +
            '</ul>' +
            '<hr>' +
            '<h4>How to use</h4>' +
            '<p><strong>Module panel:</strong> open the panel "#35 Screen Control" and <em>click</em> the screen button to toggle its state. Button hint: "Click to activate/deactivate".</p>' +
            '<p><strong>Add as media item:</strong> menu <em>Add → Misc → Module actions → #35 Screen Control →</em> choose <em>Toggle Screen</em>, <em>Activate Screen</em> or <em>Deactivate Screen</em>; then select the screen.</p>' +
            '<p><strong>On startup:</strong> use the setting "Initial state of screens".</p>' +
            '<hr>' +
            '<p><em>*Compatible with all configured Holyrics display outputs.</em></p>' +
            infoVDDMM,
        i18n: {
            name: {
                en: 'Screen Controller',
                pt: 'Controlador de Telas',
                es: 'Controlador de Pantallas', 
                ru: 'Контроллер экранов',
                it: 'Controllo Schermi'
            },
            description: {
                en:
                    '<p>' +
                    'Quickly control Holyrics display outputs from the module panel or by adding actions as media items.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Main Features:</h4>' +
                    '<ul>' +
                    '<li><strong>Click toggle</strong> — on the module panel, click the screen button (e.g. "Audience", "Screen 2") to show/hide.</li>' +
                    '<li><strong>Visual status</strong> — when inactive the screen button turns red; the icon switches visible/hidden.</li>' +
                    '<li><strong>Media list actions</strong> — add Toggle/Activate/Deactivate as a media item.</li>' +
                    '<li><strong>Initial state on startup</strong> — configure which screens start active or hidden when Holyrics opens.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h4>How to use</h4>' +
                    '<p><strong>Module panel:</strong> open the panel "#35 Screen Control" and <em>click</em> the screen button to toggle its state. Button hint: "Click to activate/deactivate".</p>' +
                    '<p><strong>Add as media item:</strong> menu <em>Add → Misc → Module actions → #35 Screen Control →</em> choose <em>Toggle Screen</em>, <em>Activate Screen</em> or <em>Deactivate Screen</em>; then select the screen.</p>' +
                    '<p><strong>On startup:</strong> use the setting "Initial state of screens".</p>' +
                    '<hr>' +
                    '<p><em>*Compatible with all configured Holyrics display outputs.</em></p>' +
                    infoVDDMM,
                pt:
                    '<p>' +
                    'Controle rapidamente as saídas de tela do Holyrics pelo painel do módulo ou adicionando ações como itens de mídia.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Funcionalidades principais:</h4>' +
                    '<ul>' +
                    '<li><strong>Toggle por clique</strong> — no painel do módulo, clique no botão da tela (ex.: "Público", "Tela 2") para ativar/desativar.</li>' +
                    '<li><strong>Status visual</strong> — quando inativa, a tela aparece em vermelho; o ícone alterna entre visível/oculto.</li>' +
                    '<li><strong>Ações na lista de mídias</strong> — adicione Toggle/Ativar/Desativar como item de mídia.</li>' +
                    '<li><strong>Estado ao iniciar</strong> — configure quais telas devem ficar ativas/inativas ao abrir o Holyrics.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h4>Como usar</h4>' +
                    '<p><strong>Painel do módulo:</strong> abra o painel "#35 Controle Telas" e <em>clique</em> no botão da tela para alternar o estado.</p>' +
                    '<p><strong>Adicionar como item de mídia:</strong> <em>Adicionar → Diversos → Ações do módulo → #35 Controle Telas →</em> selecione <em>Toggle Tela</em>, <em>Ativar Tela</em> ou <em>Desativar Tela</em>; e escolha a tela.</p>' +
                    '<p><strong>Ao abrir:</strong> use a configuração "Estado inicial das telas".</p>' +
                    '<hr>' +
                    '<p><em>*Compatível com todas as saídas de tela configuradas no Holyrics.</em></p>' +
                    infoVDDMM,
                es:
                    '<p>' +
                    'Controle rápidamente las salidas de pantalla de Holyrics desde el panel del módulo o agregando acciones como ítems de medios.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Funciones principales:</h4>' +
                    '<ul>' +
                    '<li><strong>Toggle por clic</strong> — en el panel del módulo, haga clic en el botón de la pantalla (p. ej., "Público", "Pantalla 2") para activar/desactivar.</li>' +
                    '<li><strong>Estado visual</strong> — cuando está inactiva, la pantalla se muestra en rojo; el ícono alterna entre visible/oculto.</li>' +
                    '<li><strong>Acciones en la lista de medios</strong> — agregue Toggle/Activar/Desactivar como ítem de medios.</li>' +
                    '<li><strong>Estado al iniciar</strong> — configure qué pantallas deben quedar activas/inactivas al abrir Holyrics.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h4>Cómo usar</h4>' +
                    '<p><strong>Panel del módulo:</strong> abra el panel "#35 Control de Pantallas" y haga <em>clic</em> en el botón de la pantalla para alternar el estado.</p>' +
                    '<p><strong>Agregar como ítem de medios:</strong> <em>Agregar → Varios → Acciones del módulo → #35 Control de Pantallas →</em> elija <em>Toggle Pantalla</em>, <em>Activar Pantalla</em> o <em>Desactivar Pantalla</em>; y seleccione la pantalla.</p>' +
                    '<p><strong>Al abrir:</strong> use la configuración "Estado inicial de pantallas".</p>' +
                    '<hr>' +
                    '<p><em>*Compatible con todas las salidas de pantalla configuradas en Holyrics.</em></p>' +
                    infoVDDMM,
                ru:
                    '<p>' +
                    'Быстро управляйте выходами экранов Holyrics через панель модуля или добавляя действия как элементы медиа.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Основные функции:</h4>' +
                    '<ul>' +
                    '<li><strong>Переключение по клику</strong> — в панели модуля нажмите на кнопку экрана (напр., "Публичный", "Экран 2"), чтобы включить/выключить.</li>' +
                    '<li><strong>Визуальный статус</strong> — при выключении кнопка подсвечивается красным; иконка меняется видимый/скрытый.</li>' +
                    '<li><strong>Действия в списке медиа</strong> — добавьте Toggle/Включить/Выключить как элемент медиа.</li>' +
                    '<li><strong>Состояние при запуске</strong> — настройте какие экраны должны быть включены/выключены при открытии Holyrics.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h4>Как использовать</h4>' +
                    '<p><strong>Панель модуля:</strong> откройте панель "#35 Контроль экранов" и <em>кликните</em> по кнопке экрана для переключения состояния.</p>' +
                    '<p><strong>Добавить как элемент медиа:</strong> <em>Добавить → Разное → Действия модуля → #35 Контроль экранов →</em> выберите <em>Toggle</em>, <em>Включить</em> или <em>Выключить</em>; затем выберите экран.</p>' +
                    '<p><strong>При запуске:</strong> используйте настройку "Начальное состояние экранов".</p>' +
                    '<hr>' +
                    '<p><em>*Совместим со всеми настроенными выходами экранов Holyrics.</em></p>' +
                    infoVDDMM,
                it:
                    '<p>' +
                    'Controlla rapidamente le uscite schermo di Holyrics dal pannello del modulo oppure aggiungendo azioni come elementi multimediali.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Funzionalità principali:</h4>' +
                    '<ul>' +
                    '<li><strong>Toggle con clic</strong> — nel pannello del modulo, fai clic sul pulsante dello schermo (es. "Pubblico", "Schermo 2") per mostrare/nascondere.</li>' +
                    '<li><strong>Stato visivo</strong> — quando inattivo, il pulsante dello schermo diventa rosso; l\'icona alterna visibile/nascosto.</li>' +
                    '<li><strong>Azioni nella lista media</strong> — aggiungi Toggle/Attiva/Disattiva come elemento multimediale.</li>' +
                    '<li><strong>Stato iniziale all\'avvio</strong> — configura quali schermi devono iniziare attivi o nascosti all\'apertura di Holyrics.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h4>Come si usa</h4>' +
                    '<p><strong>Pannello del modulo:</strong> apri il pannello "#35 Controllo Schermi" e <em>clicca</em> il pulsante dello schermo per alternarne lo stato. Suggerimento: "Clicca per attivare/disattivare".</p>' +
                    '<p><strong>Aggiungi come elemento multimediale:</strong> menu <em>Aggiungi → Varie → Azioni del modulo → #35 Controllo Schermi →</em> scegli <em>Toggle Schermo</em>, <em>Attiva Schermo</em> o <em>Disattiva Schermo</em>; quindi seleziona lo schermo.</p>' +
                    '<p><strong>All\'avvio:</strong> utilizza l\'impostazione "Stato iniziale degli schermi".</p>' +
                    '<hr>' +
                    '<p><em>*Compatibile con tutte le uscite schermo configurate in Holyrics.</em></p>' +
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
        btnConfigureInitialScreensState(),
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

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// == functions ==

// Pequeno wrapper para i18n seguro em pontos críticos do ciclo de vida
function _i18nSafe(s) {
    try {
        if (typeof jsc !== 'undefined' && jsc && typeof jsc.i18n === 'function') {
            return jsc.i18n(s);
        }
    } catch (e) {}
    return s;
}

// Converte valores variados em booleano real (true/false)
function _toBoolean(v) {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string') {
        var s = v.trim().toLowerCase();
        if (s === 'true' || s === '1' || s === 'on' || s === 'yes' || s === 'sim') return true;
        if (s === 'false' || s === '0' || s === 'off' || s === 'no' || s === 'não' || s === 'nao') return false;
        // Qualquer outra string não vazia é considerada true por padrão
        return s.length > 0;
    }
    // Objetos/arrays/null/undefined: apenas truthy/falsy padrão
    return !!v;
}

/**
 * Obtém a lista de todas as telas configuradas no Holyrics
 */
function getAvailableScreens() {
    try {
        var response = h.hly('GetDisplaySettings');
        var screens = [];
        
        if (response && response.data) {
            for (var i = 0; i < response.data.length; i++) {
                var screen = response.data[i];
                if (screen.area) { // Apenas telas com área definida
                    screens.push({
                        id: screen.id,
                        name: screen.name,
                        hide: !!screen.hide
                    });
                }
            }
        }
        
        return screens;
    } catch (err) {
        h.log(mUID, 'Erro ao obter telas: {}', err);
        return [];
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// == actions (panel) ==
function actions(module) {
    var act = [];
    act.push.apply(act, createScreenButtons(module));
    return act;
}

function createScreenButtons(module) {
    var buttons = [];
    var screens = [];
    try {
        screens = getAvailableScreens();
    } catch (err) {
        h.notification('<html>' + jsc.i18n('Erro ao carregar telas do Holyrics.') + '<br>  ' + err );
    }

    if (!screens || screens.length === 0) {
        buttons.push({
            id: 'btnRefreshScreens',
            label: jsc.i18n('Atualizar'),
            icon: 'refresh',
            hint: jsc.i18n('Nenhuma tela encontrada. Clique para atualizar.'),
            action: function () { module.updatePanel(); }
        });
        return buttons;
    }

    for (var i = 0; i < screens.length; i++) {
        var screen = screens[i];
        var screenId = screen.id;
        var isActive = isScreenActive(screenId);

        buttons.push({
            id: 'scr_' + screenId,
            label: screen.name,
            icon: isActive ? 'visibility' : 'visibility_off',
            hint: jsc.i18n('Tela') + ': "' + screen.name + '"\n' + jsc.i18n('Clique para ativar/desativar'),
            action: (function (sid) {
                return function () {
                    var result = toggleScreen(sid);
                    h.notification(result ? jsc.i18n('Tela ativada') : jsc.i18n('Tela desativada'), 2);
                    module.updatePanel();
                };
            })(screenId),
            status: (function (sid) {
                return function () {
                    var activeNow = isScreenActive(sid);
                    if (!activeNow) {
                        return jsc.utils.ui.item_status.danger();
                    }
                    return null;
                };
            })(screenId)
        });
    }

    return buttons;
}

/**
 * Verifica se uma tela específica está ativa (visível)
 */
function isScreenActive(screenId) {
    try {
        var response = h.hly('GetDisplaySettings');
        if (response && response.data) {
            for (var i = 0; i < response.data.length; i++) {
                var screen = response.data[i];
                if (screen.id === screenId) {
                    return !screen.hide; // true se não está oculta
                }
            }
        }
        return false;
    } catch (err) {
        h.log(mUID, 'Erro ao verificar status da tela {}: {}', screenId, err);
        return false;
    }
}

/**
 * Alterna o estado de uma tela (ativa/inativa)
 */
function toggleScreen(screenId) {
    try {
        var currentState = isScreenActive(screenId);
        var newState = !currentState;
        
        h.hly('SetDisplaySettings', { 
            id: screenId, 
            hide: !newState 
        });
        
        h.log(mUID, 'Tela "{}" alterada: {} → {}', screenId, currentState ? 'ativa' : 'inativa', newState ? 'ativa' : 'inativa');
        
        return newState;
    } catch (err) {
        h.log(mUID, 'Erro ao alternar tela {}: {}', screenId, err);
        return false;
    }
}

/**
 * Define o estado de uma tela (true = ativa, false = inativa)
 */
function setScreenState(screenId, active) {
    try {
        h.hly('SetDisplaySettings', { 
            id: screenId, 
            hide: !active 
        });
        
        h.log(mUID, 'Tela "{}" definida como: {}', screenId, active ? 'ativa' : 'inativa');
        
        return true;
    } catch (err) {
        h.log(mUID, 'Erro ao definir estado da tela {}: {}', screenId, err);
        return false;
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227075626c69635f616374696f6e73227d
// == public_actions ==
function publicActions() {
    var actions = [];
    
    // Ação principal: Toggle de tela
    actions.push({
        id: 'toggle_screen',
        name: jsc.i18n('Toggle Tela'),
        icon: 'system:tv',
        description: jsc.i18n('Ativa/desativa uma tela específica do Holyrics'),
        available_for: '',
        unavailable_for: '',
        filter_available_for_trigger: function(evt) {
            return true;
        },
        action: function(evt) {
            var screenId = evt.input.screenId;
            
            if (!screenId) {
                h.notification(jsc.i18n('Erro'), jsc.i18n('Selecione uma tela para controlar!'));
                return;
            }
            
            var result = toggleScreen(screenId);
            h.log(mUID, 'Toggle da tela "{}" executado. Resultado: {}', screenId, result ? 'ativa' : 'inativa');
        },
        status: function(evt) {
            var screenId = evt.input.screenId;
            if (!screenId) {
                return { 
                    description: jsc.i18n('Nenhuma tela selecionada')
                };
            }
            
            var screens = getAvailableScreens();
            var screenName = '';
            for (var i = 0; i < screens.length; i++) {
                if (screens[i].id === screenId) {
                    screenName = screens[i].name;
                    break;
                }
            }
            
            var isActive = isScreenActive(screenId);
            var status = isActive ? jsc.i18n('Ativa') : jsc.i18n('Inativa');
            
            return { 
                description: screenName + ': ' + status
            };
        },
        input: [
            {
                id: 'screenId',
                type: 'string',
                name: jsc.i18n('Selecione a tela'),
                description: jsc.i18n('Escolha qual tela deve ser controlada'),
                allowed_values: function(obj) {
                    var screens = getAvailableScreens();
                    var values = [];
                    
                    for (var i = 0; i < screens.length; i++) {
                        values.push({
                            value: screens[i].id,
                            label: screens[i].name
                        });
                    }
                    
                    return values;
                }
            }
        ]
    });
    
    // Ação secundária: Ativar tela
    actions.push({
        id: 'activate_screen',
        name: jsc.i18n('Ativar Tela'),
        icon: 'system:visibility',
        description: jsc.i18n('Ativa uma tela específica do Holyrics'),
        available_for: '',
        unavailable_for: '',
        filter_available_for_trigger: function(evt) {
            return true;
        },
        action: function(evt) {
            var screenId = evt.input.screenId;
            
            if (!screenId) {
                h.notification(jsc.i18n('Erro'), jsc.i18n('Selecione uma tela para ativar!'));
                return;
            }
            
            setScreenState(screenId, true);
            h.log(mUID, 'Tela "{}" ativada', screenId);
        },
        status: function(evt) {
            var screenId = evt.input.screenId;
            if (!screenId) {
                return { 
                    description: jsc.i18n('Nenhuma tela selecionada')
                };
            }
            
            var screens = getAvailableScreens();
            var screenName = '';
            for (var i = 0; i < screens.length; i++) {
                if (screens[i].id === screenId) {
                    screenName = screens[i].name;
                    break;
                }
            }
            
            var isActive = isScreenActive(screenId);
            if (isActive) {
                return { 
                    description: screenName + ': ' + jsc.i18n('Ativa')
                };
            } else {
                return { 
                    description: screenName + ': ' + jsc.i18n('Inativa')
                };
            }
        },
        input: [
            {
                id: 'screenId',
                type: 'string',
                name: jsc.i18n('Selecione a tela'),
                description: jsc.i18n('Escolha qual tela deve ser ativada'),
                allowed_values: function(obj) {
                    var screens = getAvailableScreens();
                    var values = [];
                    
                    for (var i = 0; i < screens.length; i++) {
                        values.push({
                            value: screens[i].id,
                            label: screens[i].name
                        });
                    }
                    
                    return values;
                }
            }
        ]
    });
    
    // Ação terciária: Desativar tela
    actions.push({
        id: 'deactivate_screen',
        name: jsc.i18n('Desativar Tela'),
        icon: 'system:visibility_off',
        description: jsc.i18n('Desativa uma tela específica do Holyrics'),
        available_for: '',
        unavailable_for: '',
        filter_available_for_trigger: function(evt) {
            return true;
        },
        action: function(evt) {
            var screenId = evt.input.screenId;
            
            if (!screenId) {
                h.notification(jsc.i18n('Erro'), jsc.i18n('Selecione uma tela para desativar!'));
                return;
            }
            
            setScreenState(screenId, false);
            h.log(mUID, 'Tela "{}" desativada', screenId);
        },
        status: function(evt) {
            var screenId = evt.input.screenId;
            if (!screenId) {
                return { 
                    description: jsc.i18n('Nenhuma tela selecionada')
                };
            }
            
            var screens = getAvailableScreens();
            var screenName = '';
            for (var i = 0; i < screens.length; i++) {
                if (screens[i].id === screenId) {
                    screenName = screens[i].name;
                    break;
                }
            }
            
            var isActive = isScreenActive(screenId);
            if (!isActive) {
                return { 
                    description: screenName + ': ' + jsc.i18n('Inativa')
                };
            } else {
                return { 
                    description: screenName + ': ' + jsc.i18n('Ativa')
                };
            }
        },
        input: [
            {
                id: 'screenId',
                type: 'string',
                name: jsc.i18n('Selecione a tela'),
                description: jsc.i18n('Escolha qual tela deve ser desativada'),
                allowed_values: function(obj) {
                    var screens = getAvailableScreens();
                    var values = [];
                    
                    for (var i = 0; i < screens.length; i++) {
                        values.push({
                            value: screens[i].id,
                            label: screens[i].name
                        });
                    }
                    
                    return values;
                }
            }
        ]
    });
    
    return actions;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e67735f6578747261227d
// == settings_extras ==
function btnConfigureInitialScreensState() {
    return {
        id: 'btnConfigureInitialScreensState',
        type: 'button',
        button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Estado inicial das telas'),
        description: jsc.i18n('Define quais telas devem iniciar ativas ou inativas ao abrir o Holyrics.'),
        action: function () {
            var ds = h.hly('GetDisplaySettings').data;
            var inputs = [{ type: 'title', name: jsc.i18n('Selecione o estado inicial por tela') }, { type: 'separator' }];
            for (var i = 0; i < ds.length; i++) {
                var screen = ds[i];
                if (!screen.area) continue;
                (function (id, name, visible) {
                    inputs.push({
                        id: 'initialstate_' + id,
                        name: name,
                        type: 'boolean',
                        default_value: visible
                    });
                })(screen.id, screen.name, !screen.hide);
            }
            module.inputSettings('cfg_initial_screens', inputs);
        }
    };
}

function btnConfigureFinalScreensState() {
    return {
        id: 'btnConfigureFinalScreensState',
        type: 'button',
        button_label: jsc.i18n('Configurar'),
        name: jsc.i18n('Estado final das telas'),
        description: jsc.i18n('Define quais telas devem permanecer ativas/inativas ao fechar o Holyrics.'),
        action: function () {
            var ds = h.hly('GetDisplaySettings').data;
            var inputs = [{ type: 'title', name: jsc.i18n('Selecione o estado final por tela') }, { type: 'separator' }];
            for (var i = 0; i < ds.length; i++) {
                var screen = ds[i];
                if (!screen.area) continue;
                (function (id, name, visible) {
                    inputs.push({
                        id: 'finalstate_' + id,
                        name: name,
                        type: 'boolean',
                        default_value: visible
                    });
                })(screen.id, screen.name, !screen.hide);
            }
            module.inputSettings('cfg_final_screens', inputs);
        }
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705f6578747261227d
// == apply states ==
function applyInitialScreensState(module) {
    try {
        h.logp(mUID, '%t  module.settings = {}',module.settings);
        h.log(mUID, '{%t} [init] applyInitialScreensState() iniciado');
        var settings = module.settings || {};
        var settingsKeys = [];
        try { settingsKeys = Object.keys(settings || {}); } catch (e) {}
        h.log(mUID, '{%t} [init] settings presentes: {}, chaves: {}', settings ? 'sim' : 'não', (settingsKeys && settingsKeys.length ? settingsKeys.join(', ') : '(nenhuma)'));

    // Ler diretamente do container utilizado pelo módulo (#m35)
    var initialConfig = settings && settings.cfg_initial_screens;
    var initialSource = initialConfig ? 'cfg_initial_screens' : '(nenhum)';
    h.log(mUID, '{%t} [init] fonte={}, tipo={}', initialSource, (typeof initialConfig));

        var resp = h.hly('GetDisplaySettings') || {};
        var ds = resp.data || [];
        h.log(mUID, '{%t} [init] GetDisplaySettings ok? {}, total telas: {}', (resp && resp.data ? 'sim' : 'não'), (ds ? ds.length : 0));

        var changes = 0;
        var foundConfigs = 0;
        for (var i = 0; i < ds.length; i++) {
            var s = ds[i];
            if (!s.area) {
                h.log(mUID, '{%t} [init] Ignorando saída sem área: id={}, name={}', s.id, s.name);
                continue;
            }
            var key = 'initialstate_' + s.id;
            // Checagem simples e direta para compatibilidade com o interpretador JS do Holyrics
            var hasKey = !!(initialConfig && (typeof initialConfig[key] !== 'undefined'));
            h.log(mUID, '{%t} [init] Tela: id={}, name="{}", hide={}, key="{}", possui_config? {}', s.id, s.name, s.hide, key, hasKey ? 'sim' : 'não');
            if (hasKey) {
                foundConfigs++;
                var rawVal = initialConfig[key];
                var active = _toBoolean(rawVal);
                h.log(mUID, '{%t} [init] Aplicando estado: {} -> {}, valor bruto: {}', s.name, active ? 'ativo' : 'inativo', rawVal);
                try {
                    var setResp = h.hly('SetDisplaySettings', { id: s.id, hide: !active });
                    changes++;
                    h.log(mUID, '{%t} [init] SetDisplaySettings retornou: {}', (setResp && typeof setResp === 'object') ? (setResp.status || JSON.stringify(setResp)) : ('' + setResp));
                } catch (inner) {
                    h.log(mUID, '{%t} [init] ERRO ao definir estado da tela {} (id={}): {}', s.name, s.id, inner && (inner.message || inner));
                }
            } else {
                h.log(mUID, '{%t} [init] Sem configuração definida para esta tela (não alterado).');
            }
        }
        if (changes > 0) {
            h.log(mUID, '{%t} {}', _i18nSafe('Estado inicial das telas aplicado.'));
        } else {
            h.log(mUID, '{%t} [init] Nenhuma tela alterada. Configs detectadas em cfg_initial_screens: {}', foundConfigs);
        }
    } catch (e) {
        h.log(mUID, '{%t} Erro ao aplicar estado inicial: {}', e.message || e);
    }
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273687574646f776e227d
// == shutdown ==
function shutdown(module) {
    // Sem ações de estado final — controle apenas no início, conforme configuração do módulo
    h.log(mUID, '{%t} {}', jsc.i18n('Encerrando #35 Controle Telas (nenhuma ação de final)'));
}

// Agenda tentativas para aplicar o estado inicial aguardando a hidratação dos settings
function scheduleInitialScreensApply(module, attempt) {
    try {
        attempt = attempt || 1;
        var MAX_ATTEMPTS = 5;
        var RETRY_DELAY_MS = 2000;

        var settings = module.settings || {};
        var ic = settings && settings.cfg_initial_screens;
        // Verifica se ao menos uma das telas possui chave definida no cfg
        var resp = h.hly('GetDisplaySettings') || {};
        var ds = resp.data || [];
        var hasAny = false;
        for (var i = 0; i < ds.length; i++) {
            var s = ds[i];
            if (!s || !s.area) continue;
            var key = 'initialstate_' + s.id;
            if (ic && typeof ic[key] !== 'undefined') {
                hasAny = true;
                break;
            }
        }

        if (hasAny) {
            h.log(mUID, '{%t} [init] Config detectada em cfg_initial_screens. Aplicando agora.');
            applyInitialScreensState(module);
            return;
        }

        if (attempt >= MAX_ATTEMPTS) {
            h.log(mUID, '{%t} [init] Config não disponível após {} tentativas. Aplicando mesmo assim.', MAX_ATTEMPTS);
            applyInitialScreensState(module);
            return;
        }

    h.log(mUID, '{%t} [init] Config ainda não disponível (nenhuma chave esperada encontrada). Tentativa {}/{} em {}ms...', attempt, MAX_ATTEMPTS, RETRY_DELAY_MS);
        h.setTimeout(function () { scheduleInitialScreensApply(module, attempt + 1); }, RETRY_DELAY_MS);
    } catch (e) {
        h.log(mUID, '{%t} [init] Erro no scheduler de aplicação inicial: {}', e.message || e);
        try { applyInitialScreensState(module); } catch (_) {}
    }
}