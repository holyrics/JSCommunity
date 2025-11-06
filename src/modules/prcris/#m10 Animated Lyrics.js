// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22696e666f227d
var mID = '@prcris#m10'
var mUID = mID + ''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;
 logState(module.settings.log, mUID, 'startup '+ mID); 
}

function info() {
    return {
        id: mID,
        name: 'Animated Lyrics',  // Nome em inglês
        description: '<html>' +
                     '• Use video animations as background automatically based on the song name<br><br>' +
                     'Create an animation folder named exactly as the song name anywhere in the Videos library.<br>' +
                     'Inside it, add numbered files like <u>1.mp4</u>, <u>2.mp4</u> matching slide indexes.<br>' +
                     'Optionally, the legacy path <u>backmusic/SONG_NAME/N.ext</u> is still recognized, and it also accepts the legacy variable <u>alias_background</u> to point to the folder.<br>' +
                     'The module hides main-screen lyrics, replacing them with the video; return screen keeps Holyrics lyrics.<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Animated Lyrics',  // Tradução para inglês
                pt: 'Letras Animadas',  // Tradução para português
                es: 'Letras Animadas',  // Tradução para espanhol
                ru: 'Анимированные Тексты'  // Tradução para russo
            },
            description: {
                en: '<html>' +
                    '• Use video animations as background automatically based on the song name<br><br>' +
                    'Create a folder named exactly like the song anywhere in the Videos library, with files <u>1.mp4</u>, <u>2.mp4</u>, ...<br>' +
                    'Legacy path <u>backmusic/SONG_NAME/N.ext</u> is still supported. It also accepts the legacy variable <u>alias_background</u> to point to the folder.<br>' +
                    'Main screen lyrics are hidden and replaced by the video; return screen keeps Holyrics lyrics.<br>' +
                    infoVDDMM,
                pt: '<html>' +
                    '• Usa animações em vídeo como fundo automaticamente com base no nome da música<br><br>' +
                    'Crie uma pasta com exatamente o nome da música em qualquer lugar da biblioteca de Vídeos, com arquivos <u>1.mp4</u>, <u>2.mp4</u>, ...<br>' +
                    'O caminho legado <u>backmusic/NOME_DA_MUSICA/N.ext</u> continua suportado. Também aceita a variável legada <u>alias_background</u> para indicar a pasta.<br>' +
                    'A tela principal fica sem letra (vídeo no fundo) e a tela de retorno continua com a letra do Holyrics.<br>' +
                    infoVDDMM,
                es: '<html>' +
                    '• Usa animaciones de video como fondo automáticamente basadas en el nombre de la canción<br><br>' +
                    'Crea una carpeta con el mismo nombre de la canción en cualquier lugar de la biblioteca de Videos, con archivos <u>1.mp4</u>, <u>2.mp4</u>, ...<br>' +
                    'La ruta heredada <u>backmusic/NOMBRE_DE_LA_CANCION/N.ext</u> sigue siendo compatible. También acepta la variable heredada <u>alias_background</u> para indicar la carpeta.<br>' +
                    'La pantalla principal oculta la letra y muestra el video; la pantalla de retorno mantiene la letra de Holyrics.<br>' +
                    infoVDDMM,
                ru: '<html>' +
                    '• Использует видео-анимации как фон автоматически на основе названия песни<br><br>' +
                    'Создайте папку с точным названием песни в любом месте библиотеки Видео, с файлами <u>1.mp4</u>, <u>2.mp4</u>, ...<br>' +
                    'Поддерживается устаревший путь <u>backmusic/НАЗВАНИЕ_ПЕСНИ/N.ext</u>. Также принимается устаревшая переменная <u>alias_background</u>, указывающая на папку.<br>' +
                    'На главном экране текст скрывается и заменяется видео; экран возврата продолжает показывать текст Holyrics.<br>' +
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
                logState(obj.input.log, mUID, 'onChange ' + mID);
            }
        }
    ];

}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
/**
 * Utilitário para remover acentos (compatível com #m30)
 */
function removeAccents(str) {
    var accents = 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüý';
    var accentsOut = 'AAAAAACEEEEIIIINOOOOOUUUUYaaaaaaceeeeiiiinooooouuuuy';
    str = (str || '').split('');
    var i, x;
    for (i = 0; i < str.length; i++) {
        if ((x = accents.indexOf(str[i])) !== -1) {
            str[i] = accentsOut[x];
        }
    }
    return str.join('');
}

/** Extensões de vídeo aceitas */
var VIDEO_EXTS = ['mp4', 'mov', 'mkv', 'avi', 'webm', 'm4v'];
/** Tenta ler variável legada (global, dentro do objeto, ou via GetLyrics) */
function getLegacyAlias(module, obj) {
    // Sem configurações: aceitar automaticamente a variável legada "alias_background"
    var key1 = 'alias_background';
    var key2 = 'aliasbackground'; // tolerância mínima sem underscore
    try {
        // 1) Propriedade direta no objeto, como no código antigo: obj.alias_background
        if (obj && typeof obj === 'object') {
            if (typeof obj[key1] === 'string' && String(obj[key1]).trim()) {
                return String(obj[key1]).trim();
            }
            if (typeof obj[key2] === 'string' && String(obj[key2]).trim()) {
                return String(obj[key2]).trim();
            }
        }

        // 2) Propriedades com nome equivalente (varredura rasa, case-insensitive)
        try {
            if (obj && typeof obj === 'object') {
                for (var k in obj) {
                    if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
                    var kLower = String(k).toLowerCase();
                    if (kLower === key1 || kLower === key2) {
                        var v = obj[k];
                        if (typeof v === 'string' && String(v).trim()) {
                            return String(v).trim();
                        }
                    }
                }
            }
        } catch (e) {}

        // 3) Busca em um nível aninhado (ex.: obj.extra.alias_background)
        try {
            if (obj && typeof obj === 'object') {
                for (var k2 in obj) {
                    if (!Object.prototype.hasOwnProperty.call(obj, k2)) continue;
                    var val = obj[k2];
                    if (val && typeof val === 'object') {
                        var cand = null;
                        if (typeof val[key1] === 'string' && String(val[key1]).trim()) {
                            cand = String(val[key1]).trim();
                        } else if (typeof val[key2] === 'string' && String(val[key2]).trim()) {
                            cand = String(val[key2]).trim();
                        } else {
                            for (var k3 in val) {
                                if (!Object.prototype.hasOwnProperty.call(val, k3)) continue;
                                var k3Lower = String(k3).toLowerCase();
                                if (k3Lower === key1 || k3Lower === key2) {
                                    var vv2 = val[k3];
                                    if (typeof vv2 === 'string' && String(vv2).trim()) {
                                        cand = String(vv2).trim();
                                        break;
                                    }
                                }
                            }
                        }
                        if (cand) { return cand; }
                    }
                }
            }
        } catch (e) {}

        // 4) Via GetLyrics (somente no primeiro slide para performance)
        try {
            if (obj && obj.id && obj.slide_show_index == 1) {
                var lyr = h.hly('GetLyrics', { id: obj.id });
                var data = (lyr && lyr.data) ? lyr.data : lyr;
                if (data && typeof data === 'object') {
                    for (var kk in data) {
                        if (!Object.prototype.hasOwnProperty.call(data, kk)) continue;
                        var kkLower = String(kk).toLowerCase();
                        if (kkLower === key1 || kkLower === key2) {
                            var vv = data[kk];
                            if (typeof vv === 'string' && String(vv).trim()) {
                                return String(vv).trim();
                            }
                        }
                    }
                }
            }
        } catch (e) {}

    } catch (e) {}
    return '';
}


/** Log helper com timestamp e mUID */

/** Resolve o nome da pasta-alvo com base no nome da música do Holyrics */
function getPreferredAliasFromSong(obj) {
    // Tenta campos comuns de título/nome da música
    var candidates = [
        obj && obj.song_name,
        obj && obj.songName,
        obj && obj.song_title,
        obj && obj.title,
        obj && obj.name
    ];
    for (var i = 0; i < candidates.length; i++) {
        var v = candidates[i];
        if (v && String(v).trim()) {
            return String(v).trim();
        }
    }
    return '';
}

/** Tenta montar caminho padrão backmusic/alias/index.ext */
function tentarCaminhoBackmusic(alias, index) {
    var n = parseInt(index, 10);
    var idxVariants = [];
    if (!isNaN(n)) {
        idxVariants.push(String(n));
        if (n >= 0 && n < 10) {
            idxVariants.push('0' + n); // suporta 01..09
        }
    } else {
        idxVariants.push(String(index));
    }

    for (var v = 0; v < idxVariants.length; v++) {
        var idx = idxVariants[v];
        for (var i = 0; i < VIDEO_EXTS.length; i++) {
            var path = 'backmusic/' + alias + '/' + idx + '.' + VIDEO_EXTS[i];
            try {
                if (h.videoExists(path)) {
                    return path;
                }
            } catch (e) {
                // continua tentando outras extensões/variantes
            }
        }
    }
    return null;
}

/** Busca global: encontra pasta com nome do alias em qualquer lugar e retorna arquivo index.ext dentro dela */
function buscarVideoParaAlias(module, alias, index) {
    var aliasNorm = removeAccents(String(alias || '').toLowerCase());
    if (!aliasNorm) { return null; }

    // 1) Backward compatibility: tenta estrutura padrão
    var backmusicFound = tentarCaminhoBackmusic(alias, index);
    if (backmusicFound) {
        h.log(mUID, '{%t} {}', ' Usando caminho padrão backmusic: ' + backmusicFound);
        return backmusicFound;
    }

    h.log(mUID, '{%t} {}', 'BUSCA GLOBAL VÍDEO: procurando pasta alias "' + alias + '" (normalizado: ' + aliasNorm + ')');

    // 2) Se o alias contiver um caminho direto (ex.: "Pasta/Subpasta"), tenta diretamente
    var aliasHasPath = (String(alias).indexOf('/') >= 0 || String(alias).indexOf('\\') >= 0);
    if (aliasHasPath) {
        var directFolder = String(alias).replace(/\\/g, '/');
        var direct = encontrarArquivoIndex(directFolder, index);
        if (direct) {
            h.log(mUID, '{%t} {}', 'VÍDEO ENCONTRADO (caminho direto): ' + direct);
            return direct;
        }
    }

    // 3) Busca global em todas as pastas de vídeos
    try {
        var root = h.hly('GetVideos');
        if (!root || !root.data || root.data.length === 0) {
            h.log(mUID, '{%t} {}', 'Nenhuma pasta de vídeos encontrada (GetVideos retornou vazio)');
            return null;
        }

        for (var i = 0; i < root.data.length; i++) {
            var item = root.data[i];
            if (item && item.isDir) {
                var foundFolder = buscarPastaAliasEmSubpastas(item.name, aliasNorm);
                if (foundFolder) {
                    // Dentro da pasta encontrada, procurar pelo arquivo index.ext
                    var foundFile = encontrarArquivoIndex(foundFolder, index);
                    if (foundFile) {
                        h.log(mUID, '{%t} {}', 'VÍDEO ENCONTRADO: ' + foundFile);
                        return foundFile;
                    }
                }
            }
        }
        h.log(mUID, '{%t} {}', '❌ Vídeo não encontrado globalmente para alias: ' + alias + ' (slide ' + index + ')');
        return null;
    } catch (e) {
        h.log(mUID, '{%t} {}', 'Erro na busca global de vídeos: ' + e.message);
        return null;
    }
}

/**
 * Percorre subpastas até encontrar uma pasta cujo nome normalizado seja o alias.
 * Retorna o caminho completo da pasta encontrada (ex: "Alguma/Pasta/alias").
 */
function buscarPastaAliasEmSubpastas(pastaPai, aliasNorm) {
    try {
        var list = h.hly('GetVideos', { folder: pastaPai });
        if (!list || !list.data || list.data.length === 0) {
            return null;
        }

        for (var i = 0; i < list.data.length; i++) {
            var it = list.data[i];
            if (!it || !it.isDir) { continue; }
            var nomeSub = it.name;
            var nomeSubNorm = removeAccents(String(nomeSub || '').toLowerCase());
            var caminhoSub = pastaPai + '/' + nomeSub;
            if (nomeSubNorm === aliasNorm) {
                return caminhoSub;
            }
            var deeper = buscarPastaAliasEmSubpastas(caminhoSub, aliasNorm);
            if (deeper) { return deeper; }
        }
        return null;
    } catch (e) {
        h.log(mUID, '{%t} {}', 'Erro ao varrer subpastas em "' + pastaPai + '": ' + e.message);
        return null;
    }
}

/** Dentro de uma pasta, tenta achar "index.ext" para qualquer extensão suportada */
function encontrarArquivoIndex(pasta, index) {
    var n = parseInt(index, 10);
    var idxVariants = [];
    if (!isNaN(n)) {
        idxVariants.push(String(n));
        if (n >= 0 && n < 10) {
            idxVariants.push('0' + n); // suporta 01..09
        }
    } else {
        idxVariants.push(String(index));
    }

    for (var v = 0; v < idxVariants.length; v++) {
        var idx = idxVariants[v];
        for (var i = 0; i < VIDEO_EXTS.length; i++) {
            var p = pasta + '/' + idx + '.' + VIDEO_EXTS[i];
            try {
                if (h.videoExists(p)) { return p; }
            } catch (e) {}
        }
    }
    return null;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22637573746f6d5468656d65227d
function customTheme(module) {
    return {
        
        song: function(obj) {
              // Resolver alias: 1) variável legada (se habilitada); 2) nome da música
              var legacyAlias = getLegacyAlias(module, obj);
              var aliasPrimary = getPreferredAliasFromSong(obj);
              var chosenAlias = (legacyAlias && String(legacyAlias).trim()) ? String(legacyAlias).trim() : (aliasPrimary || '');

           var loop_disabled = !!chosenAlias;

           // log início
              h.log(mUID, '{%t} {}', 'Animated Lyrics: slide ' + obj.slide_show_index + ' | musica=' + (aliasPrimary || '(desconhecida)') + (legacyAlias ? (' | legacyVar=' + legacyAlias) : ''));

           if (obj.slide_show_index == 1) {
              h.log(mUID, '{%t} {}', 'disable_background_loop? ' + loop_disabled);
              h.setRuntimeSettings('disable_background_loop', loop_disabled);
              h.setRuntimeSettings('disable_extend_single_video', loop_disabled);
                  // Compat: se variável legada existir, ela terá precedência
           }

           if (!chosenAlias) {
               if (obj.slide_show_index == 1) {
                  h.log(mUID, '{%t} {}', jsc.i18n('Nome da música não disponível para localizar animação'));
               }
               return null;
           }

           // Procurar vídeo: primeiro compatibilidade (backmusic), depois busca global
           var path = buscarVideoParaAlias(module, chosenAlias, obj.slide_show_index);
           if (path) {
             if (obj.slide_show_index == 1) {
                 h.log(mUID, '{%t} {}', jsc.i18n('Vídeo configurado') + ' ' + path + ' | pasta=' + chosenAlias);
             }
             return {
               custom_theme: {
                   background: {
                       type: 'video_file',
                       id: path
                   },
                   font: {
                       size: 0
                   }
               }
             };
           } else {
             if (obj.slide_show_index < 1000) {
                h.log(mUID, '{%t} {}', jsc.i18n('Vídeo não encontrado') + ': pasta=' + chosenAlias + ' | slide=' + obj.slide_show_index);
             }
           }
        }
    };
}