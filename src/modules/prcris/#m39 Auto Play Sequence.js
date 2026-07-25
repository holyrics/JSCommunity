var mID = '@prcris#m39';
var mUID = mID + '';

//#import modules_generic_functions

function startup(module) {
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup ' + mID);

    // Inicializa estado do módulo como desativado
    h.setGlobal(mUID + '_active', false);
    h.setGlobal(mUID + '_currentIndex', -1);
    h.setGlobal(mUID + '_currentTitle', null);
    h.setGlobal(mUID + '_currentPlaylistIndex', null);
}

function info() {
    return {
        id: mID,
        name: 'Auto Play Sequence',
        description: '<html>' +
            '<div style="text-align: left;">' +
            '<b>Auto Play Sequence Module</b><br><br>' +
            'This module allows automatic and continuous execution of media list items within the same title. Its main features include:<br><br>' +
            '<b>• Title-scoped auto play:</b> Automatically executes only items from the same title where it was started using h.mediaPlaylistAction().<br>' +
            '<b>• Complete support for all media types:</b> Works with songs, automatic presentations, videos, images, audios, texts, verses and files.<br>' +
            '<b>• Single button control:</b> Compact button that toggles activate/deactivate with dynamic icon (play/pause).<br>' +
            '<b>• Intelligent end detection:</b> Uses specific triggers (any_song, any_video, any_automatic_presentation, etc.) to detect when each type ends.<br>' +
            '<b>• Highlighted visual status:</b> Yellow background when active to call operator attention, dynamic icon changes.<br>' +
            '<b>• Position-based navigation:</b> Uses playlist_index for efficient next item location in the list.<br>' +
            '<b>• Flexible settings:</b> Image display time and specific behaviors.<br><br>' +
            'Perfect for cantatas, sequential presentations and title-organized blocks. Automatically stops when finding a new title or end of current title.<br><br>' +
            infoVDDMM +
            '</div>',
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Auto Play Sequence',
                pt: 'Sequência Auto Play',
                es: 'Secuencia Auto Play',
                ru: 'Автопоследовательность'
            },
            description: {
                en: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Auto Play Sequence Module</b><br><br>' +
                    'This module allows automatic and continuous execution of media list items within the same title. Its main features include:<br><br>' +
                    '<b>• Title-scoped auto play:</b> Automatically executes only items from the same title where it was started using h.mediaPlaylistAction().<br>' +
                    '<b>• Complete support for all media types:</b> Works with songs, automatic presentations, videos, images, audios, texts, verses and files.<br>' +
                    '<b>• Single button control:</b> Compact button that toggles activate/deactivate with dynamic icon (play/pause).<br>' +
                    '<b>• Intelligent end detection:</b> Uses specific triggers (any_song, any_video, any_automatic_presentation, etc.) to detect when each type ends.<br>' +
                    '<b>• Highlighted visual status:</b> Yellow background when active to call operator attention, dynamic icon changes.<br>' +
                    '<b>• Position-based navigation:</b> Uses playlist_index for efficient next item location in the list.<br>' +
                    '<b>• Flexible settings:</b> Image display time and specific behaviors.<br><br>' +
                    'Perfect for cantatas, sequential presentations and title-organized blocks. Automatically stops when finding a new title or end of current title.<br><br>' +
                    infoVDDMM +
                    '</div>',
                pt: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Reprodução Automática Sequencial</b><br><br>' +
                    'Este módulo permite a execução automática e contínua dos itens da lista de mídias. Suas principais funcionalidades incluem:<br><br>' +
                    '<b>• Reprodução automática por título:</b> Executa automaticamente apenas os itens do mesmo título onde foi iniciado usando h.mediaPlaylistAction().<br>' +
                    '<b>• Suporte completo a todos os tipos de mídia:</b> Funciona com músicas, apresentações automáticas, vídeos, imagens, áudios, textos, versículos e arquivos.<br>' +
                    '<b>• Detecção inteligente de fim:</b> Usa triggers específicos (any_song, any_video, any_automatic_presentation, etc.) para detectar quando cada tipo termina.<br>' +
                    '<b>• Navegação por posição:</b> Usa playlist_index para localização eficiente do próximo item na lista.<br>' +
                    '<b>• Configurações flexíveis:</b> Tempo de exibição de imagens e comportamentos específicos.<br><br>' +
                    'Ideal para apresentações automáticas, playlists de adoração e sequências programadas de conteúdo.<br><br>' +
                    infoVDDMM +
                    '</div>',
                es: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Módulo de Reproducción Automática Secuencial</b><br><br>' +
                    'Este módulo permite la ejecución automática y continua de los elementos de la lista de medios. Sus principales características incluyen:<br><br>' +
                    '<b>• Reproducción automática por título:</b> Ejecuta automáticamente solo elementos del mismo título donde fue iniciado usando h.mediaPlaylistAction().<br>' +
                    '<b>• Soporte completo para todos los tipos de medios:</b> Funciona con canciones, presentaciones automáticas, videos, imágenes, audios, textos, versículos y archivos.<br>' +
                    '<b>• Detección inteligente de fin:</b> Usa triggers específicos (any_song, any_video, any_automatic_presentation, etc.) para detectar cuando cada tipo termina.<br>' +
                    '<b>• Navegación por posición:</b> Usa playlist_index para localización eficiente del siguiente elemento en la lista.<br>' +
                    '<b>• Configuraciones flexibles:</b> Tiempo de visualización de imágenes y comportamientos específicos.<br><br>' +
                    'Perfecto para presentaciones automáticas, listas de adoración y secuencias programadas de contenido.<br><br>' +
                    infoVDDMM +
                    '</div>',
                ru: '<html>' +
                    '<div style="text-align: left;">' +
                    '<b>Модуль Автоматического Последовательного Воспроизведения</b><br><br>' +
                    'Этот модуль позволяет автоматическое и непрерывное выполнение элементов списка медиа. Основные функции включают:<br><br>' +
                    '<b>• Автовоспроизведение по заголовку:</b> Автоматически выполняет только элементы из того же заголовка где было запущено используя h.mediaPlaylistAction().<br>' +
                    '<b>• Полная поддержка всех типов медиа:</b> Работает с песнями, автоматическими презентациями, видео, изображениями, аудио, текстами, стихами и файлами.<br>' +
                    '<b>• Интеллектуальное определение окончания:</b> Использует специфические триггеры (any_song, any_video, any_automatic_presentation, и т.д.) для определения когда каждый тип заканчивается.<br>' +
                    '<b>• Навигация по позиции:</b> Использует playlist_index для эффективного поиска следующего элемента в списке.<br>' +
                    '<b>• Гибкие настройки:</b> Интервалы между элементами, время отображения изображений и специфические поведения.<br><br>' +
                    'Идеально для автоматических презентаций, плейлистов поклонения и запрограммированных последовательностей контента.<br><br>' +
                    infoVDDMM +
                    '</div>'
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
            type: 'title',
            label: spanIcon('\ue425') + ' ' + jsc.i18n('Configurações de Tempo')
        },
        {
            id: 'image_display_time',
            label: jsc.i18n('Tempo de exibição de imagens (segundos)'),
            description: jsc.i18n('Por quanto tempo uma imagem fica visível antes de passar para o próximo item'),
            type: 'number',
            min: 3,
            max: 60,
            default_value: 10
        },
        { type: 'separator' },
        {
            type: 'title',
            label: spanIcon('\ue8b8') + ' ' + jsc.i18n('Comportamento')
        },
        {
            id: 'stop_at_title_end',
            label: jsc.i18n('Parar ao chegar no final do título'),
            description: jsc.i18n('Se marcado, para a reprodução automática ao encontrar um novo título ou fim da lista'),
            type: 'boolean',
            default_value: true
        },
        {
            id: 'skip_titles',
            label: jsc.i18n('Pular títulos automaticamente'),
            description: jsc.i18n('Se marcado, títulos serão pulados e não exibidos durante a reprodução automática'),
            type: 'boolean',
            default_value: true
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
 * Ativa o modo de reprodução automática
 */
function activateAutoPlay() {
    h.setGlobal(mUID + '_active', true);
    h.setGlobal(mUID + '_currentIndex', -1);
    h.setGlobal(mUID + '_currentTitle', null);
    h.setGlobal(mUID + '_currentPlaylistIndex', null);
    h.log(mUID, '{%t} Auto Play ativado');
}

/**
 * Desativa o modo de reprodução automática
 */
function deactivateAutoPlay() {
    h.setGlobal(mUID + '_active', false);
    h.setGlobal(mUID + '_currentIndex', -1);
    h.setGlobal(mUID + '_currentTitle', null);
    h.setGlobal(mUID + '_currentPlaylistIndex', null);
    
    // Para qualquer timeout ativo de imagem
    var imageTimeoutId = h.getGlobal(mUID + '_imageTimeout');
    if (imageTimeoutId) {
        h.clearTimeout(imageTimeoutId);
        h.setGlobal(mUID + '_imageTimeout', null);
    }
    
    h.log(mUID, '{%t} Auto Play desativado - triggers e timeouts cancelados');
}

/**
 * Verifica se o modo está ativo
 */
function isAutoPlayActive() {
    return h.getGlobal(mUID + '_active') === true;
}

/**
 * Obtém a playlist atual
 */
function getCurrentPlaylist() {
    try {
        var response = h.hly('GetMediaPlaylist');
        return response && response.data ? response.data : [];
    } catch (err) {
        h.log(mUID, 'Erro ao obter playlist: {}', err);
        return [];
    }
}

/**
 * Encontra o título que contém um determinado índice
 */
function getTitleForIndex(itemIndex) {
    var playlist = getCurrentPlaylist();
    var currentTitle = null;
    
    // Percorre a playlist até o índice do item, procurando pelo último título encontrado
    for (var i = 0; i <= itemIndex && i < playlist.length; i++) {
        var item = playlist[i];
        if (item.type === 'title') {
            currentTitle = item;
        }
    }
    
    return currentTitle;
}

/**
 * Encontra o índice do item atual na playlist
 */
function findCurrentItemIndex(currentItemId, currentItemType) {
    var playlist = getCurrentPlaylist();
    
    h.log(mUID, '{%t} Procurando item: ID={}, Tipo={}', currentItemId, currentItemType);

    for (var i = 0; i < playlist.length; i++) {
        var item = playlist[i];

        if (currentItemType === 'song' && item.type === 'song' && item.song_id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (song_id={})', i, item.name || 'sem nome', item.song_id);
            return i;
        } else if (currentItemType === 'verse' && item.type === 'verse' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'text' && item.type === 'text' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'audio' && item.type === 'audio' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'video' && item.type === 'video' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'image' && item.type === 'image' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'file' && item.type === 'file' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        } else if (currentItemType === 'automatic_presentation' && item.type === 'automatic_presentation' && item.id == currentItemId) {
            h.log(mUID, '{%t} Item encontrado no índice {}: {} (id={})', i, item.name || 'sem nome', item.id);
            return i;
        }
    }

    h.log(mUID, '{%t} Item NÃO encontrado na playlist!');
    return -1;
}

/**
 * Encontra o próximo item executável na playlist dentro do mesmo título
 */
function findNextExecutableItem(startIndex) {
    var playlist = getCurrentPlaylist();
    var skipTitles = module.settings.skip_titles;
    var currentTitle = h.getGlobal(mUID + '_currentTitle');

    for (var i = startIndex + 1; i < playlist.length; i++) {
        var item = playlist[i];

        // Se encontrou um novo título, para a busca (chegou ao fim do título atual)
        if (item.type === 'title') {
            h.log(mUID, '{%t} Encontrado novo título "{}", parando auto play no título atual', item.name);
            return null;
        }

        // Se deve pular títulos e é um título, continua (não deveria chegar aqui)
        if (skipTitles && item.type === 'title') {
            continue;
        }

        // Verifica se é um tipo executável
        if (item.type === 'song' || item.type === 'verse' || item.type === 'text' ||
            item.type === 'audio' || item.type === 'video' || item.type === 'image' ||
            item.type === 'file' || item.type === 'automatic_presentation') {
            return { index: i, item: item };
        }
    }

    return null;
}

/**
 * Executa o próximo item baseado nas informações salvas pelos triggers
 */
function playNextItemFromPlaylist() {
    if (!isAutoPlayActive()) {
        h.log(mUID, '{%t} Auto Play não está ativo, ignorando próximo item');
        return;
    }

    var currentPlaylistIndex = h.getGlobal(mUID + '_currentPlaylistIndex');
    var currentTitle = h.getGlobal(mUID + '_currentTitle');
    
    if (currentPlaylistIndex === null || currentPlaylistIndex === undefined || !currentTitle) {
        h.log(mUID, '{%t} Informações do item atual não encontradas (index: {}, título: "{}")', 
            currentPlaylistIndex, currentTitle);
        return;
    }
    
    h.log(mUID, '{%t} Procurando próximo item após posição {} no título: "{}"', 
        currentPlaylistIndex, currentTitle);
    
    var playlist = getCurrentPlaylist();
    
    // Procura o próximo item executável na playlist a partir da posição atual
    for (var i = currentPlaylistIndex + 1; i < playlist.length; i++) {
        var item = playlist[i];
        
        // Se encontrou um novo título, para a busca (fim do título atual)
        if (item.type === 'title') {
            h.log(mUID, '{%t} Chegou ao fim do título "{}" - finalizando Auto Play', currentTitle);
            deactivateAutoPlay();
            h.notification(jsc.i18n('Auto Play finalizado - chegou ao final do título: {}', [currentTitle]), 4);
            return;
        }
        
        // Verifica se é um tipo executável
        if (item.type === 'song' || item.type === 'verse' || item.type === 'text' ||
            item.type === 'audio' || item.type === 'video' || item.type === 'image' ||
            item.type === 'file' || item.type === 'automatic_presentation') {
            
            h.log(mUID, '{%t} Próximo item encontrado na posição {}: {} ({}) - ID: {}', 
                i, item.name || item.title || 'sem nome', item.type, item.id);
            
            // Executa imediatamente sem delay
            if (isAutoPlayActive()) {
                h.log(mUID, '{%t} Executando próximo item via mediaPlaylistAction: {}', item.id);
                h.mediaPlaylistAction(item.id);
                h.notification(jsc.i18n('Auto Play: {}', [item.name || item.title || 'Item']), 3);
            }
            return;
        }
    }
    
    // Se chegou aqui, não há próximo item
    h.log(mUID, '{%t} Não há próximo item no título "{}" - finalizando Auto Play', currentTitle);
    deactivateAutoPlay();
    h.notification(jsc.i18n('Auto Play finalizado - chegou ao final do título: {}', [currentTitle]), 4);
}

/**
 * Executa o próximo item da playlist (função antiga - mantida para compatibilidade)
 */
function playNextItem(currentItemId, currentItemType) {
    if (!isAutoPlayActive()) {
        h.log(mUID, '{%t} Auto Play não está ativo, ignorando próximo item');
        return;
    }

    var currentIndex = findCurrentItemIndex(currentItemId, currentItemType);
    if (currentIndex === -1) {
        h.log(mUID, '{%t} Item atual não encontrado na playlist');
        return;
    }

    h.setGlobal(mUID + '_currentIndex', currentIndex);

    // Define o título atual se ainda não foi definido
    var currentTitle = h.getGlobal(mUID + '_currentTitle');
    if (!currentTitle) {
        var titleObj = getTitleForIndex(currentIndex);
        if (titleObj) {
            h.setGlobal(mUID + '_currentTitle', titleObj.id);
            h.log(mUID, '{%t} Auto Play iniciado no título: "{}"', titleObj.name);
        } else {
            h.log(mUID, '{%t} Auto Play iniciado sem título definido');
        }
    }

    var nextItem = findNextExecutableItem(currentIndex);
    if (!nextItem) {
        var titleObj = getTitleForIndex(currentIndex);
        var titleName = titleObj ? titleObj.name : 'sem título';
        
        h.log(mUID, '{%t} Não há próximo item no título "{}" - finalizando Auto Play', titleName);
        deactivateAutoPlay();
        h.notification(jsc.i18n('Auto Play finalizado - chegou ao final do título: {}', [titleName]), 4);
        return;
    }

    // Executa imediatamente sem delay
    if (isAutoPlayActive()) {
        executePlaylistItem(nextItem.item);
    }
}



/**
 * Programa o próximo item para imagens (que não têm fim automático)
 */
function scheduleNextForImage(imageItem) {
    var displayTime = (module.settings.image_display_time || 10) * 1000;

    // Cancela timeout anterior se existir
    var previousTimeoutId = h.getGlobal(mUID + '_imageTimeout');
    if (previousTimeoutId) {
        h.clearTimeout(previousTimeoutId);
    }

    // Programa novo timeout
    var timeoutId = h.setTimeout(function () {
        if (isAutoPlayActive()) {
            playNextItem(imageItem.id, 'image');
        }
        h.setGlobal(mUID + '_imageTimeout', null);
    }, displayTime);
    
    // Salva o ID do timeout para poder cancelar depois
    h.setGlobal(mUID + '_imageTimeout', timeoutId);
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

function triggers(module) {
    var arr = [];

    // Trigger principal - captura execução de qualquer item dentro de um título
    arr.push({
        id: "capture_item_execution_" + mUID,
        when: "displaying",
        item: "any_title_subitem",
        action: function (obj) {
            if (!isAutoPlayActive()) return;
            
            // Extrai informações do subitem
            var subitem = obj.subitem;
            if (!subitem) {
                h.log(mUID, '{%t} Trigger acionada mas sem subitem válido');
                return;
            }
            
            // Salva informações do item atual e título
            h.setGlobal(mUID + '_currentTitle', obj.title);
            h.setGlobal(mUID + '_currentPlaylistIndex', obj.playlist_index);
            h.setGlobal(mUID + '_currentItem', {
                id: subitem.id,
                type: subitem.type,
                name: subitem.name,
                file: subitem.file || subitem.name,
                playlist_index: obj.playlist_index
            });
            
            h.log(mUID, '{%t} Item executado: {} (tipo: {}) no título: "{}" (posição: {})', 
                subitem.name || subitem.file || subitem.id, subitem.type, obj.title, obj.playlist_index);
            
            // Se for uma imagem, programa timeout automático para passar ao próximo item
            if (subitem.type === 'image') {
                var displayTime = (module.settings.image_display_time || 10) * 1000;
                
                // Cancela timeout anterior se existir
                var previousTimeoutId = h.getGlobal(mUID + '_imageTimeout');
                if (previousTimeoutId) {
                    h.clearTimeout(previousTimeoutId);
                }
                
                // Programa novo timeout
                var timeoutId = h.setTimeout(function () {
                    if (isAutoPlayActive()) {
                        h.log(mUID, '{%t} Tempo de exibição da imagem esgotado, passando para próximo item');
                        playNextItemFromPlaylist();
                    }
                    h.setGlobal(mUID + '_imageTimeout', null);
                }, displayTime);
                
                // Salva o ID do timeout para poder cancelar depois
                h.setGlobal(mUID + '_imageTimeout', timeoutId);
                h.log(mUID, '{%t} Timeout programado para imagem: {} segundos', displayTime / 1000);
            }
        }
    });

    // Trigger para músicas - quando fecha
    arr.push({
        id: "auto_play_song_close_" + mUID,
        when: "closing",
        item: "any_song",
        action: function (obj) {
            if (!isAutoPlayActive()) return;
            
            h.log(mUID, '{%t} Música {} finalizada, indo para próximo item', obj.id);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para versículos - quando fecha
    arr.push({
        id: "auto_play_verse_close_" + mUID,
        when: "closing",
        item: "any_verse",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Versículo {} finalizado, indo para próximo item', obj.id);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para textos - quando fecha
    arr.push({
        id: "auto_play_text_close_" + mUID,
        when: "closing",
        item: "any_text",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Texto {} finalizado, indo para próximo item', obj.id);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para imagens - quando fecha
    arr.push({
        id: "auto_play_image_close_" + mUID,
        when: "closing", 
        item: "any_image",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Imagem {} finalizada, indo para próximo item', obj.file);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para PowerPoint - quando fecha
    arr.push({
        id: "auto_play_ppt_close_" + mUID,
        when: "closing",
        item: "any_ppt",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} PowerPoint {} finalizado, indo para próximo item', obj.file);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para áudios - quando fecha
    arr.push({
        id: "auto_play_audio_" + mUID,
        when: "closing",
        item: "any_audio",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Áudio {} finalizado, indo para próximo item', obj.file);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para vídeos - quando fecha
    arr.push({
        id: "auto_play_video_" + mUID,
        when: "closing",
        item: "any_video",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Vídeo {} finalizado, indo para próximo item', obj.file);
            playNextItemFromPlaylist();
        }
    });

    // Trigger para apresentações automáticas - quando fecha
    arr.push({
        id: "auto_play_automatic_presentation_" + mUID,
        when: "closing",
        item: "any_automatic_presentation",
        action: function (obj) {
            if (!isAutoPlayActive()) return;

            h.log(mUID, '{%t} Apresentação automática {} finalizada, indo para próximo item', obj.id);
            playNextItemFromPlaylist();
        }
    });

    return arr;
}

function actions(module) {
    var arr = [];

    // Botão compacto com ícone dinâmico
    arr.push({
        id: 'toggle_auto_play',
        name: '', // Sem texto, apenas ícone
        action: function (evt) {
            if (isAutoPlayActive()) {
                deactivateAutoPlay();
                h.notification(jsc.i18n('Auto Play desativado'), 3);
            } else {
                activateAutoPlay();
                h.notification(jsc.i18n('Auto Play ativado'), 3);
            }
        },
        status: function(evt) {
            var isActive = isAutoPlayActive();
            var result = {
                icon: isActive ? 'pause' : 'play_arrow',
                hint: isActive ? jsc.i18n('Desativar Auto Play') : jsc.i18n('Ativar Auto Play')
            };
            
            // Destaca com fundo amarelo quando ativo para chamar atenção
            if (isActive) {
                return jsc.utils.ui.item_status.warning(result);
            } else {
                return result;
            }
        }
    });
    
    return arr;
}

function publicActions(module) {
    return [];
}
