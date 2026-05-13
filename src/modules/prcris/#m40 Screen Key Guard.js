var mID = '@prcris#m40';
var mUID = mID + '';

//#import modules_generic_functions

// =========================
// Lógica de proteção (detectar e reverter)
// =========================

/**
 * Retorna o tipo da apresentação em curso via GetCurrentPresentation.
 * Retorna 'song', 'text', 'bible', ou null se não houver apresentação ativa.
 */
function _getCurrentContext() {
    var cp = h.hly('GetCurrentPresentation').data;
    if (!cp || !cp.type) return null;
    var type = cp.type.toLowerCase();
    if (type === 'song') return 'song';
    if (type === 'text') return 'text';
    if (type === 'bible') return 'bible';
    return null;
}

/**
 * Chamado quando F8, F9 ou F10 é acionado (trigger when:'displaying').
 * Consulta GetCurrentPresentation para determinar o contexto atual.
 * Se o contexto proibir essa tecla, reverte imediatamente.
 *
 * NOTA: a API não bloqueia a tecla fisicamente — o efeito poderá aparecer
 * por um instante antes de ser revertido.
 */
function _onFKeyActivated(key) {
    var ctx = _getCurrentContext();
    h.log(mUID, '{%t} [trigger] {} displaying — {i18n|contexto}={}', key.toUpperCase(), ctx || '{i18n|nenhum}');

    if (!ctx) return;

    var shouldRevert = false;
    if (ctx === 'song' && module.settings.protect_song !== false) {
        if (key === 'f8' || key === 'f10') shouldRevert = true;
    }
    if (ctx === 'text' && module.settings.protect_text !== false) {
        if (key === 'f9' || key === 'f10') shouldRevert = true;
    }
    if (ctx === 'bible' && module.settings.protect_bible !== false) {
        if (key === 'f9' || key === 'f10') shouldRevert = true;
    }
    if (!shouldRevert) return;

    var replacement = ctx === 'song' ? 'F9' : 'F8';
    h.log(mUID, '{%t} {} {i18n|acionado durante contexto} "{}" — {i18n|ativando} {}', key.toUpperCase(), ctx, replacement);
    try {
        h.hly('Set' + replacement, { enable: true });
    } catch (e) {
        h.log(mUID, '{%t} {i18n|Erro ao reverter} {}: {}', key.toUpperCase(), e);
    }
    if (module.settings.show_notification) {
        h.notification(key.toUpperCase() + ' → ' + replacement + ' (auto)', 2);
    }
}

// =========================
// Funções padrão do módulo
// =========================

function info() {
    return {
        id: mID,
        name: 'Screen Key Guard',
        description:
            '<p>Monitors F8, F9 and F10 during presentations and auto-reverts unwanted key activations.</p>' +
            '<ul>' +
            '<li><b>Song:</b> Reverts F8 and F10 if activated. Protects the animated background.</li>' +
            '<li><b>Text/Sermon:</b> Reverts F9 and F10 if activated. Prevents F9 from being used instead of F8.</li>' +
            '<li><b>Bible:</b> Reverts F9 and F10 if activated. Same behavior as text protection.</li>' +
            '</ul>' +
            '<p><i>Note: the effect may flash briefly before being reverted — the API simulates the key state, it does not block the physical key press.</i></p>',
        min_version: '2.23.0',
        i18n: {
            name: {
                pt: 'Screen Key Guard',
                en: 'Screen Key Guard',
                es: 'Screen Key Guard',
                it: 'Screen Key Guard',
                ru: 'Screen Key Guard'
            },
            description: {
                pt:
                    '<p>Monitora F8, F9 e F10 durante apresentações e reverte acionamentos indevidos automaticamente.</p>' +
                    '<ul>' +
                    '<li><b>Música:</b> Reverte F8 e F10 se acionados. Protege o fundo animado.</li>' +
                    '<li><b>Texto/Pregação:</b> Reverte F9 e F10 se acionados. Evita que F9 seja usado no lugar de F8.</li>' +
                    '<li><b>Bíblia:</b> Reverte F9 e F10 se acionados. Mesmo comportamento da proteção de texto.</li>' +
                    '</ul>',
                en:
                    '<p>Monitors F8, F9 and F10 during presentations and auto-reverts unwanted key activations.</p>' +
                    '<ul>' +
                    '<li><b>Song:</b> Reverts F8 and F10 if activated. Protects the animated background.</li>' +
                    '<li><b>Text/Sermon:</b> Reverts F9 and F10 if activated. Prevents F9 from being used instead of F8.</li>' +
                    '<li><b>Bible:</b> Reverts F9 and F10 if activated. Same behavior as text protection.</li>' +
                    '</ul>',
                es:
                    '<p>Monitorea F8, F9 y F10 durante las presentaciones y revierte activaciones no deseadas.</p>' +
                    '<ul>' +
                    '<li><b>Música:</b> Revierte F8 y F10 si se activan. Protege el fondo animado.</li>' +
                    '<li><b>Texto/Predicación:</b> Revierte F9 y F10 si se activan. Evita que F9 se use en lugar de F8.</li>' +
                    '<li><b>Biblia:</b> Revierte F9 y F10 si se activan. Mismo comportamiento que la protección de texto.</li>' +
                    '</ul>',
                ru:
                    '<p>Отслеживает F8, F9 и F10 во время презентаций и автоматически отменяет нежелательные нажатия.</p>' +
                    '<ul>' +
                    '<li><b>Музыка:</b> Отменяет F8 и F10 при нажатии. Защищает анимированный фон.</li>' +
                    '<li><b>Текст/Проповедь:</b> Отменяет F9 и F10 при нажатии. Предотвращает случайное использование F9 вместо F8.</li>' +
                    '<li><b>Библия:</b> Отменяет F9 и F10 при нажатии. Поведение аналогично защите текста.</li>' +
                    '</ul>'
            }
        }
    };
}

function settings() {
    return [
        { type: 'title', name: jsc.i18n('Proteção durante músicas') },
        { type: 'separator' },
        {
            id: 'protect_song',
            type: 'boolean',
            label: jsc.i18n('Reverter F8 e F10 durante músicas'),
            description: jsc.i18n('Se F8 (plano de fundo) ou F10 (tela preta) forem acionados durante uma música, serão revertidos automaticamente.'),
            default_value: true
        },
        { type: 'separator' },
        { type: 'title', name: jsc.i18n('Proteção durante textos / pregação') },
        { type: 'separator' },
        {
            id: 'protect_text',
            type: 'boolean',
            label: jsc.i18n('Reverter F9 e F10 durante textos'),
            description: jsc.i18n('Se F9 (sem letra) ou F10 (tela preta) forem acionados durante um texto, serão revertidos automaticamente.'),
            default_value: true
        },
        { type: 'separator' },
        { type: 'title', name: jsc.i18n('Proteção durante Bíblia') },
        { type: 'separator' },
        {
            id: 'protect_bible',
            type: 'boolean',
            label: jsc.i18n('Reverter F9 e F10 durante Bíblia'),
            description: jsc.i18n('Se F9 (sem letra) ou F10 (tela preta) forem acionados durante uma apresentação da Bíblia, serão revertidos automaticamente.'),
            default_value: true
        },
        { type: 'separator' },
        { type: 'title', name: jsc.i18n('Geral') },
        { type: 'separator' },
        {
            id: 'show_notification',
            type: 'boolean',
            label: jsc.i18n('Exibir notificação ao reverter tecla'),
            default_value: false
        },
        { type: 'separator' },
        {
            id: 'log',
            type: 'boolean',
            label: jsc.i18n('Habilitar log'),
            onchange: function (obj) {
                logState(obj.input.log, mUID, 'onChange ' + mID);
            }
        }
    ];
}

function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID);
    h.log(mUID, '{%t} ✓ {i18n|Screen Key Guard iniciado}');
}

function shutdown(module) {
    logState(module.settings.log, mUID, 'shutdown ' + mID);
    h.log(mUID, '{%t} ✓ {i18n|Screen Key Guard encerrado}');
}


// =========================
// Triggers
// =========================

function triggers(module) {
    return [
        {
            id: mID + '_f8_activated',
            when: 'displaying',
            item: 'f8',
            action: function (obj) {
                _onFKeyActivated('f8');
            }
        },
        {
            id: mID + '_f9_activated',
            when: 'displaying',
            item: 'f9',
            action: function (obj) {
                _onFKeyActivated('f9');
            }
        },
        {
            id: mID + '_f10_activated',
            when: 'displaying',
            item: 'f10',
            action: function (obj) {
                _onFKeyActivated('f10');
            }
        }
    ];
}