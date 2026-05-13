var mID = '@prcris#m42';
var mUID = mID + '';

//#import modules_generic_functions

// =====================================================================
// Startup
// =====================================================================
function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID);
}

// =====================================================================
// Info
// =====================================================================
function info() {
    return {
        id: mID,
        name: 'Automatic Presentation Volume',
        description: '<html>' +
            '<div style="text-align: left;">' +
            '<b>Automatic Presentation Volume</b><br><br>' +
            'Saves a custom volume percentage per Automatic Presentation file.<br>' +
            'Right-click any Automatic Presentation in the list to set its volume. When the Automatic Presentation is played, the saved volume is automatically applied to the player.<br><br>' +
            '<b>Features:</b><br>' +
            '• Volume slider (0–100%) per Automatic Presentation via right-click context menu<br>' +
            '• Volume applied automatically when the Automatic Presentation starts playing<br>' +
            '• Volume persisted between sessions<br>' +
            '• Action button to open the full volume map manager<br><br>' +
            infoVDDMM +
            '</div>',
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Automatic Presentation Volume',
                pt: 'Volume de Apresentação Automática',
                es: 'Volumen de Presentación Automática',
                ru: 'Громкость автоматической презентации'
            },
            description: {
                en: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Automatic Presentation Volume</b><br><br>' +
                    'Saves a custom volume percentage per Automatic Presentation file.<br>' +
                    'Right-click any Automatic Presentation in the list to set its volume. When the Automatic Presentation is played, the saved volume is automatically applied to the player.<br><br>' +
                    '<b>Features:</b><br>' +
                    '• Volume slider (0–100%) per Automatic Presentation via right-click context menu<br>' +
                    '• Volume applied automatically when the Automatic Presentation starts playing<br>' +
                    '• Volume persisted between sessions<br>' +
                    '• Action button to open the full volume map manager<br><br>' +
                    infoVDDMM +
                    '</div>',
                pt: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Volume de Apresentação Automática</b><br><br>' +
                    'Salva um percentual de volume personalizado por arquivo de Apresentação Automática.<br>' +
                    'Clique com o botão direito em qualquer Apresentação Automática da lista para definir seu volume. Quando a Apresentação Automática for executada, o volume salvo é aplicado automaticamente ao player.<br><br>' +
                    '<b>Funcionalidades:</b><br>' +
                    '• Controle deslizante de volume (0–100%) por Apresentação Automática via menu de contexto<br>' +
                    '• Volume aplicado automaticamente ao iniciar a Apresentação Automática<br>' +
                    '• Volume persistido entre sessões<br>' +
                    '• Botão de ação para abrir o gerenciador completo de volumes<br><br>' +
                    infoVDDMM +
                    '</div>',
                es: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Volumen de Presentación Automática</b><br><br>' +
                    'Guarda un porcentaje de volumen personalizado por archivo de Presentación Automática.<br>' +
                    'Haga clic derecho en cualquier Presentación Automática de la lista para configurar su volumen. Cuando se reproduzca la Presentación Automática, el volumen guardado se aplica automáticamente al reproductor.<br><br>' +
                    '<b>Características:</b><br>' +
                    '• Control deslizante de volumen (0–100%) por Presentación Automática mediante menú contextual<br>' +
                    '• Volumen aplicado automáticamente al iniciar la Presentación Automática<br>' +
                    '• Volumen persistido entre sesiones<br>' +
                    '• Botón de acción para abrir el administrador completo de volúmenes<br><br>' +
                    infoVDDMM +
                    '</div>',
                ru: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Громкость автоматической презентации</b><br><br>' +
                    'Сохраняет пользовательский процент громкости для каждого файла автоматической презентации.<br>' +
                    'Щёлкните правой кнопкой мыши по любой автоматической презентации в списке, чтобы задать её громкость. При воспроизведении автоматической презентации сохранённая громкость применяется автоматически.<br><br>' +
                    '<b>Функции:</b><br>' +
                    '• Ползунок громкости (0–100%) для каждой автоматической презентации через контекстное меню<br>' +
                    '• Громкость применяется автоматически при запуске автоматической презентации<br>' +
                    '• Громкость сохраняется между сессиями<br>' +
                    '• Кнопка действия для открытия менеджера громкостей<br><br>' +
                    infoVDDMM +
                    '</div>'
            }
        }
    };
}

// =====================================================================
// Settings
// =====================================================================
function settings() {
    var arr = [];

    arr.push({
        name: jsc.i18n('Sobre') + ' ' + mID,
        description: infoVDDMM,
        type: 'label'
    });

    arr.push({ type: 'separator' });

    arr.push({
        type: 'title',
        label: spanIcon('\ue050') + ' ' + jsc.i18n('Configurações padrão')
    });

    arr.push({
        id: 'default_volume',
        label: jsc.i18n('Volume padrão para Apresentações Automáticas sem configuração'),
        description: jsc.i18n('Percentual de volume aplicado quando uma Apresentação Automática não tem volume salvo. Use -1 para não alterar o volume.'),
        type: 'number',
        component: 'slider',
        min: -1,
        max: 100,
        unit: '%',
        default_value: -1
    });

    arr.push({ type: 'separator' });

    arr.push({
        id: 'log',
        label: jsc.i18n('Habilitar log'),
        type: 'boolean',
        onchange: function (obj) {
            logState(obj.input.log, mUID, 'onChange ' + mID);
        }
    });

    return arr;
}

// =====================================================================
// Context Actions (right-click on AP list items)
// =====================================================================
function contextActions(module) {
    var arr = [];

    arr.push({
        name: jsc.i18n('Definir volume da Apresentação Automática') + ' (' + mID + ')',
        types: ['automatic_presentation'],
        action: function (evt) {
            var apName = evt.item.name;
            var currentVolume = getVolumeForAP(apName);

            // If no volume saved yet, default to 100 as starting point for UI
            var displayVolume = (currentVolume < 0) ? 100 : currentVolume;

            var result = h.input([
                {
                    id: 'volume',
                    name: '<html><b>' + apName + '</b><br>' + jsc.i18n('Volume'),
                    description: jsc.i18n('Percentual de volume a ser aplicado quando esta Apresentação Automática for executada'),
                    type: 'number',
                    component: 'slider',
                    min: 0,
                    max: 100,
                    unit: '%',
                    default_value: displayVolume
                }
            ]);

            if (result == null) return;

            var vol = typeof result === 'object' ? result.volume : result;
            vol = parseInt(vol, 10);
            if (isNaN(vol) || vol < 0 || vol > 100) {
                h.notificationError(jsc.i18n('Valor de volume inválido'), 3);
                return;
            }

            saveVolumeForAP(apName, vol);
            h.notification(
                jsc.i18n('Volume definido:') + ' ' + vol + '% → ' + apName, 3
            );
            h.log(mUID, '{i18n|Volume salvo para Apresentação Automática:} "' + apName + '" = ' + vol + '%');
        }
    });

    return arr;
}

// =====================================================================
// Actions (module bar button)
// =====================================================================
function actions(module) {
    return [
        {
            id: 'manage_ap_volumes',
            name: '',
            icon: 'volume_up',
            hint: jsc.i18n('Gerenciar volumes de Apresentações Automáticas'),
            action: function (evt) {
                showVolumeManager();
            }
        }
    ];
}

// =====================================================================
// Public Actions
// =====================================================================
function publicActions(module) {
    return [
        {
            id: 'public_set_ap_volume',
            name: jsc.i18n('Definir volume de uma Apresentação Automática'),
            hint: jsc.i18n('Abre dialog para definir o volume de uma Apresentação Automática específica pelo nome'),
            icon: 'volume_up',
            input: [
                {
                    id: 'ap_name',
                    name: jsc.i18n('Nome da Apresentação Automática'),
                    description: jsc.i18n('Nome do arquivo da Apresentação Automática (ex: minha_ap.ap)'),
                    type: 'automatic_presentation'
                },
                {
                    id: 'volume',
                    name: jsc.i18n('Volume'),
                    type: 'number',
                    component: 'slider',
                    min: 0,
                    max: 100,
                    unit: '%',
                    default_value: 100
                }
            ],
            action: function (evt) {
                var apName = evt.input.ap_name;
                var vol = evt.input.volume;
                if (!apName) {
                    h.notificationError(jsc.i18n('Nome da Apresentação Automática não informado'), 3);
                    return;
                }
                saveVolumeForAP(apName, vol);
                h.notification(
                    jsc.i18n('Volume definido:') + ' ' + vol + '% → ' + apName, 3
                );
            }
        }
    ];
}

// =====================================================================
// Triggers
// =====================================================================
function triggers(module) {
    var arr = [];

    arr.push({
        id: 'ap_volume_apply_' + mUID,
        when: 'displaying',
        item: 'any_automatic_presentation',
        action: function (obj) {
            var apName = obj.name;
            var volume = getVolumeForAP(apName);

            if (volume >= 0) {
                h.log(mUID, '{i18n|Aplicando volume} ' + volume + '% {i18n|para Apresentação Automática:} "' + apName + '"');
                h.hly('APPlayerAction', { volume: volume });
            } else if (module.settings.default_volume >= 0) {
                h.log(mUID, '{i18n|Aplicando volume padrão} ' + module.settings.default_volume + '% {i18n|para Apresentação Automática:} "' + apName + '"');
                h.hly('APPlayerAction', { volume: module.settings.default_volume });
            } else {
                h.log(mUID, '{i18n|Nenhuma configuração de volume para Apresentação Automática:} "' + apName + '" – {i18n|mantendo volume atual}');
            }
        }
    });

    return arr;
}

// =====================================================================
// Volume storage helpers
// =====================================================================

/**
 * Returns the saved volume for an Automatic Presentation by name.
 * Returns -1 if not configured.
 */
function getVolumeForAP(apName) {
    var map = module.restore('volume_map') || {};
    if (typeof map[apName] === 'number') {
        return map[apName];
    }
    return -1;
}

/**
 * Saves the volume for an Automatic Presentation by name.
 */
function saveVolumeForAP(apName, volume) {
    var map = module.restore('volume_map') || {};
    map[apName] = volume;
    module.store('volume_map', map);
}

/**
 * Removes the saved volume for an Automatic Presentation by name.
 */
function removeVolumeForAP(apName) {
    var map = module.restore('volume_map') || {};
    delete map[apName];
    module.store('volume_map', map);
}

// =====================================================================
// Volume Manager dialog
// =====================================================================

/**
 * Opens a dialog showing all APs from the system with their current
 * saved volumes, allowing bulk editing via sliders.
 */
function showVolumeManager() {
    var aps = [];
    try {
        var result = h.hly('GetAutomaticPresentations');
        if (result && result.data) {
            aps = result.data;
        }
    } catch (e) {
        h.notificationError(jsc.i18n('Erro ao listar Apresentações Automáticas'), 3);
        return;
    }

    if (aps.length === 0) {
        h.notification(jsc.i18n('Nenhuma Apresentação Automática encontrada no sistema'), 3);
        return;
    }

    var map = module.restore('volume_map') || {};

    var inputs = [];

    inputs.push({
        id: '_title',
        name: '<html><b>' + jsc.i18n('Volumes por Apresentação Automática') + '</b>',
        type: 'title'
    });

    inputs.push({
        id: '_desc',
        name: jsc.i18n('Volume por Apresentação Automática'),
        type: 'label',
        text: jsc.i18n('Defina o volume (0–100%) para cada Apresentação Automática. Use -1 para não alterar o volume ao executar.'),
        hide_label: true
    });

    inputs.push({ id: '_sep1', type: 'separator' });

    var defaultVol = (typeof module.settings.default_volume === 'number' && module.settings.default_volume >= 0)
        ? module.settings.default_volume
        : 100;

    for (var i = 0; i < aps.length; i++) {
        var apName = aps[i].name;
        var savedVol = (typeof map[apName] === 'number') ? map[apName] : defaultVol;
        inputs.push({
            id: 'vol_' + i,
            name: apName,
            description: jsc.i18n('Volume para esta Apresentação Automática. Use -1 para não aplicar volume.'),
            type: 'number',
            component: 'slider',
            min: -1,
            max: 100,
            unit: '%',
            default_value: savedVol
        });
    }

    var result = h.input(inputs);
    if (result == null) return;

    // Save all values back
    var newMap = {};
    for (var j = 0; j < aps.length; j++) {
        var name = aps[j].name;
        var val = result['vol_' + j];
        if (typeof val === 'number' && val >= 0) {
            newMap[name] = val;
        }
        // If val == -1, we don't include it (no volume override)
    }

    module.store('volume_map', newMap);

    var savedCount = 0;
    for (var k in newMap) {
        if (newMap.hasOwnProperty(k)) savedCount++;
    }

    h.notification(
        jsc.i18n('Itens salvos: {}', [savedCount]), 3
    );
    h.log(mUID, '{i18n|Volume map atualizado via manager:} ' + savedCount + ' {i18n|Apresentações Automáticas configuradas}');
}
