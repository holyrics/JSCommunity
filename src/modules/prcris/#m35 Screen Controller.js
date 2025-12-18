var mID = '@prcris#m35';  
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID); 
}

function info() {
    return {
        id: mID,
        name: 'Screen Controller',
        description: 
            '<p>' +
            'Este módulo permite controlar as saídas de tela do Holyrics através de publicActions na lista de mídias.' +
            '</p>' +
            '<hr>' +
            '<h4>Funcionalidades principais:</h4>' +
            '<ul>' +
            '<li><strong>Toggle de telas</strong> - ativar/desativar telas específicas do Holyrics.</li>' +
            '<li><strong>Status visual</strong> - mostra o estado atual da tela na lista de mídias.</li>' +
            '<li><strong>Integração completa</strong> - funciona diretamente na lista de mídias do Holyrics.</li>' +
            '<li><strong>Seleção de telas</strong> - permite escolher qual tela controlar através de dropdown.</li>' +
            '</ul>' +
            '<hr>' +
            '<p><em>*Compatível com todas as saídas de tela configuradas no Holyrics.</em></p>' +
            infoVDDMM,
        i18n: {
            name: {
                pt: 'Controlador de Telas',
                es: 'Controlador de Pantallas', 
                ru: 'Контроллер экранов'
            },
            description: {
                pt:
                    '<p>' +
                    'Este módulo permite controlar as saídas de tela do Holyrics através de publicActions na lista de mídias.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Funcionalidades principais:</h4>' +
                    '<ul>' +
                    '<li><strong>Toggle de telas</strong> - ativar/desativar telas específicas do Holyrics.</li>' +
                    '<li><strong>Status visual</strong> - mostra o estado atual da tela na lista de mídias.</li>' +
                    '<li><strong>Integração completa</strong> - funciona diretamente na lista de mídias do Holyrics.</li>' +
                    '<li><strong>Seleção de telas</strong> - permite escolher qual tela controlar através de dropdown.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Compatível com todas as saídas de tela configuradas no Holyrics.</em></p>' +
                    infoVDDMM,
                es:
                    '<p>' +
                    'Este módulo permite controlar las salidas de pantalla de Holyrics a través de publicActions en la lista de medios.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Funciones principales:</h4>' +
                    '<ul>' +
                    '<li><strong>Toggle de pantallas</strong> - activar/desactivar pantallas específicas de Holyrics.</li>' +
                    '<li><strong>Estado visual</strong> - muestra el estado actual de la pantalla en la lista de medios.</li>' +
                    '<li><strong>Integración completa</strong> - funciona directamente en la lista de medios de Holyrics.</li>' +
                    '<li><strong>Selección de pantallas</strong> - permite elegir qué pantalla controlar a través de dropdown.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Compatible con todas las salidas de pantalla configuradas en Holyrics.</em></p>' +
                    infoVDDMM,
                ru:
                    '<p>' +
                    'Этот модуль позволяет управлять выходами экрана Holyrics через publicActions в списке медиа.' +
                    '</p>' +
                    '<hr>' +
                    '<h4>Основные функции:</h4>' +
                    '<ul>' +
                    '<li><strong>Переключение экранов</strong> - активация/деактивация определённых экранов Holyrics.</li>' +
                    '<li><strong>Визуальный статус</strong> - показывает текущее состояние экрана в списке медиа.</li>' +
                    '<li><strong>Полная интеграция</strong> - работает напрямую в списке медиа Holyrics.</li>' +
                    '<li><strong>Выбор экранов</strong> - позволяет выбрать, какой экран контролировать через выпадающий список.</li>' +
                    '</ul>' +
                    '<hr>' +
                    '<p><em>*Совместим со всеми выходами экрана, настроенными в Holyrics.</em></p>' +
                    infoVDDMM
            }
        }
    };
}

function settings() {
    return [
        {
            name: jsc.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
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

/**
 * Função para debug - mostra conteúdo da lista de mídias no log
 */
function logMediaPlaylistContent() {
    try {
        var playlist = h.hly('GetMediaPlaylist');
        h.log(mUID, '{%t} === CONTEÚDO COMPLETO DA LISTA DE MÍDIAS ===');
        h.log(mUID, '{%t} Total de itens: {}', playlist.data ? playlist.data.length : 0);
        
        if (playlist && playlist.data) {
            for (var i = 0; i < playlist.data.length; i++) {
                var item = playlist.data[i];
                h.log(mUID, '{%t} [{}] Tipo: "{}" | Nome: "{}" | ID: "{}"', 
                    i, 
                    item.type || 'undefined', 
                    item.name || item.title || 'sem nome', 
                    item.id || item.song_id || 'sem id'
                );
                
                // Log das propriedades completas do item
                h.logp(mUID, 'Propriedades completas do item [' + i + ']:');
                h.logp(mUID, item);
            }
        }
        h.log(mUID, '{%t} === FIM DO CONTEÚDO DA LISTA ===');
        
    } catch (err) {
        h.log(mUID, 'Erro ao obter lista de mídias: {}', err);
    }
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
    
    // Ação DEBUG: Mostrar conteúdo da lista de mídias
    actions.push({
        id: 'debug_media_playlist',
        name: jsc.i18n('🔍 DEBUG: Lista de Mídias'),
        icon: 'system:bug_report',
        description: jsc.i18n('Mostra no log o conteúdo completo da lista de mídias atual'),
        available_for: '',
        unavailable_for: '',
        filter_available_for_trigger: function(evt) {
            return true;
        },
        action: function(evt) {
            logMediaPlaylistContent();
            h.notification(jsc.i18n('Conteúdo da lista de mídias enviado para o log'), 4);
        },
        status: function(evt) {
            return { 
                description: jsc.i18n('Clique para ver lista no log')
            };
        }
    });
    
    return actions;
}