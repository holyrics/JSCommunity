// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a224d61696e227d
// v3.2.4 | 2026-09-04
//#import modules_generic_functions
var mID = '@prcris#m19';
var mUID = mID+'';
var currentModule = null;

function startup(module) {
    currentModule = module;
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup '+ mID);
    moduleLog(h.i18n('Compatibilizar Mídias v{} iniciado. As conversões FFmpeg usam module.process.', ['3.2.4']));

}

function moduleLog(message) {
    var text = String(message == null ? '' : message);
    try {
        h.log(mUID, '{%t} {}', text);
    } catch (e1) {}
    try {
        if (currentModule && typeof currentModule.log === 'function') {
            currentModule.log(text);
        }
    } catch (e2) {}
}

function wrapModuleAboutHTML(content) {
    return '<html>' + content + getInfoVDDMM() + '</html>';
}

function info() {
    var descriptions = {
        pt: wrapModuleAboutHTML('' +
        '<h2>Compatibilizar Mídias</h2>' +
        '<p><strong>Converte e normaliza vídeos e áudios para reprodução confiável.</strong></p>' +
        '<p>Foi pensado para situações comuns nas igrejas: vídeos gravados em celular, arquivos recebidos de última hora, áudio quase inaudível ou alto demais e codecs que não abrem no equipamento de exibição.</p>' +
        '<h3>Onde a mídia pode ser usada</h3>' +
        '<ul>' +
        '<li><strong>Holyrics:</strong> vídeos MP4 H.264 e áudios normalizados.</li>' +
        '<li><strong>OBS Studio e vMix:</strong> arquivos preparados em MP4 H.264, evitando codecs que esses players podem rejeitar, especialmente quando a mídia é acessada por uma pasta de rede.</li>' +
        '<li><strong>Outros players:</strong> conversão para formatos comuns quando o codec original não é reconhecido.</li>' +
        '</ul>' +
        '<h3>O que o módulo faz</h3>' +
        '<ul>' +
        '<li>Compatibiliza vídeos para MP4 com vídeo H.264 e pixels yuv420p.</li>' +
        '<li>Normaliza o áudio para o alvo de -16 LUFS, ajudando principalmente em gravações com volume muito baixo.</li>' +
        '<li>Converte áudios para MP3 e normaliza o volume.</li>' +
        '<li>Permite manter a resolução original ou limitar a altura do vídeo.</li>' +
        '<li>Usa NVIDIA, Intel ou AMD quando possível e repete automaticamente pela CPU se a GPU não aceitar o arquivo.</li>' +
        '<li>Salva o resultado ao lado do original com o sufixo correspondente ao idioma.</li>' +
        '</ul>' +
        '<h3>Como baixar e configurar o FFmpeg no Windows</h3>' +
        '<ol>' +
        '<li>Acesse a <a href="https://ffmpeg.org/download.html">página oficial de download do FFmpeg</a>. Na seção <strong>Windows EXE Files</strong>, escolha <strong>Windows builds from gyan.dev</strong>.</li>' +
        '<li>Na página <a href="https://www.gyan.dev/ffmpeg/builds/">FFmpeg Builds</a>, localize <strong>release builds</strong> e baixe <strong>ffmpeg-release-essentials.zip</strong>.</li>' +
        '<li>Extraia o ZIP, abra a pasta extraída e depois a subpasta <strong>bin</strong>.</li>' +
        '<li>Copie somente o arquivo <strong>ffmpeg.exe</strong> para <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong>. Crie a pasta <strong>.modules</strong> caso ela ainda não exista.</li>' +
        '<li>Nas configurações deste módulo, mantenha <strong>Caminho do FFmpeg</strong> como <strong>.modules/ffmpeg.exe</strong>.</li>' +
        '<li>Abra <strong>Permissões Avançadas &gt; Arquivos Permitidos</strong>, adicione exatamente <strong>.modules/ffmpeg.exe</strong> e salve.</li>' +
        '</ol>' +
        '<p>Não é necessário instalar o FFmpeg, copiar os outros executáveis do pacote ou modificar o PATH do Windows.</p>' +
        '<p><strong>Dependência única:</strong> ffmpeg.exe para Windows.</p>'),
        en: wrapModuleAboutHTML('' +
        '<h2>Make Media Compatible</h2>' +
        '<p><strong>Converts and normalizes video and audio for reliable playback.</strong></p>' +
        '<p>Useful for mobile phone recordings, last-minute files, audio that is too quiet or too loud, and codecs rejected by the playback computer.</p>' +
        '<h3>Where to use the converted media</h3>' +
        '<ul><li><strong>Holyrics</strong></li><li><strong>OBS Studio and vMix</strong>, avoiding codecs these players may reject, especially for files opened from network folders</li><li><strong>Other players</strong> that do not support the original codec</li></ul>' +
        '<h3>Features</h3>' +
        '<ul><li>MP4 H.264 video with yuv420p pixels.</li><li>Audio normalization targeting -16 LUFS.</li><li>MP3 audio conversion and normalization.</li><li>Original or height-limited resolution.</li><li>NVIDIA, Intel or AMD acceleration with automatic CPU fallback.</li><li>Output beside the original file with a localized suffix.</li></ul>' +
        '<h3>Download and configure FFmpeg on Windows</h3>' +
        '<ol>' +
        '<li>Open the <a href="https://ffmpeg.org/download.html">official FFmpeg download page</a>. Under <strong>Windows EXE Files</strong>, select <strong>Windows builds from gyan.dev</strong>.</li>' +
        '<li>On <a href="https://www.gyan.dev/ffmpeg/builds/">FFmpeg Builds</a>, find <strong>release builds</strong> and download <strong>ffmpeg-release-essentials.zip</strong>.</li>' +
        '<li>Extract the ZIP and open its <strong>bin</strong> subfolder.</li>' +
        '<li>Copy only <strong>ffmpeg.exe</strong> to <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong>.</li>' +
        '<li>Keep <strong>FFmpeg path</strong> set to <strong>.modules/ffmpeg.exe</strong>.</li>' +
        '<li>Add exactly <strong>.modules/ffmpeg.exe</strong> to <strong>Advanced Permissions &gt; Allowed Files</strong> and save.</li>' +
        '</ol>' +
        '<p>No FFmpeg installation or Windows PATH change is required.</p>' +
        '<p><strong>Only dependency:</strong> ffmpeg.exe for Windows.</p>'),
        es: wrapModuleAboutHTML('' +
        '<h2>Compatibilizar multimedia</h2>' +
        '<p><strong>Convierte y normaliza vídeos y audios para una reproducción confiable.</strong></p>' +
        '<p>Está pensado para grabaciones de teléfonos móviles, archivos recibidos a última hora, audio demasiado bajo o alto y códecs que el equipo de reproducción no reconoce.</p>' +
        '<h3>Dónde usar los archivos convertidos</h3>' +
        '<ul><li><strong>Holyrics</strong></li><li><strong>OBS Studio y vMix</strong>, especialmente con archivos abiertos desde carpetas de red</li><li><strong>Otros reproductores</strong> que no aceptan el códec original</li></ul>' +
        '<h3>Funciones</h3>' +
        '<ul><li>Vídeo MP4 H.264 con píxeles yuv420p.</li><li>Normalización de audio a -16 LUFS.</li><li>Conversión y normalización de audio a MP3.</li><li>Resolución original o altura limitada.</li><li>Aceleración NVIDIA, Intel o AMD con cambio automático a CPU.</li><li>Resultado junto al archivo original.</li></ul>' +
        '<h3>Descargar y configurar FFmpeg en Windows</h3>' +
        '<ol><li>Abra <a href="https://ffmpeg.org/download.html">la página oficial de FFmpeg</a> y seleccione <strong>Windows builds from gyan.dev</strong>.</li><li>En <a href="https://www.gyan.dev/ffmpeg/builds/">FFmpeg Builds</a>, descargue <strong>ffmpeg-release-essentials.zip</strong>.</li><li>Extraiga el ZIP y abra la carpeta <strong>bin</strong>.</li><li>Copie solamente <strong>ffmpeg.exe</strong> a <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong>.</li><li>Mantenga la ruta configurada como <strong>.modules/ffmpeg.exe</strong>.</li><li>Agregue esa misma ruta en <strong>Permisos avanzados &gt; Archivos permitidos</strong>.</li></ol>' +
        '<p>No es necesario instalar FFmpeg ni modificar el PATH de Windows.</p>'),
        ru: wrapModuleAboutHTML('' +
        '<h2>Сделать медиа совместимыми</h2>' +
        '<p><strong>Преобразует и нормализует видео и аудио для надежного воспроизведения.</strong></p>' +
        '<p>Подходит для записей с телефона, файлов, полученных в последний момент, слишком тихого или громкого звука и кодеков, которые не поддерживает компьютер воспроизведения.</p>' +
        '<h3>Где использовать преобразованные файлы</h3>' +
        '<ul><li><strong>Holyrics</strong></li><li><strong>OBS Studio и vMix</strong>, особенно при открытии файлов из сетевых папок</li><li><strong>Другие проигрыватели</strong>, не поддерживающие исходный кодек</li></ul>' +
        '<h3>Возможности</h3>' +
        '<ul><li>Видео MP4 H.264 с форматом пикселей yuv420p.</li><li>Нормализация звука до -16 LUFS.</li><li>Преобразование и нормализация аудио в MP3.</li><li>Исходное разрешение или ограничение по высоте.</li><li>Ускорение NVIDIA, Intel или AMD с автоматическим переходом на CPU.</li><li>Сохранение результата рядом с исходным файлом.</li></ul>' +
        '<h3>Загрузка и настройка FFmpeg в Windows</h3>' +
        '<ol><li>Откройте <a href="https://ffmpeg.org/download.html">официальную страницу FFmpeg</a> и выберите <strong>Windows builds from gyan.dev</strong>.</li><li>На странице <a href="https://www.gyan.dev/ffmpeg/builds/">FFmpeg Builds</a> загрузите <strong>ffmpeg-release-essentials.zip</strong>.</li><li>Распакуйте ZIP и откройте папку <strong>bin</strong>.</li><li>Скопируйте только <strong>ffmpeg.exe</strong> в <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong>.</li><li>Оставьте путь <strong>.modules/ffmpeg.exe</strong> в настройках.</li><li>Добавьте тот же путь в <strong>Расширенные разрешения &gt; Разрешенные файлы</strong>.</li></ol>' +
        '<p>Устанавливать FFmpeg или изменять PATH Windows не требуется.</p>'),
        it: wrapModuleAboutHTML('' +
        '<h2>Rendi compatibili i media</h2>' +
        '<p><strong>Converte e normalizza video e audio per una riproduzione affidabile.</strong></p>' +
        '<p>È pensato per registrazioni da telefono, file ricevuti all’ultimo momento, audio troppo basso o alto e codec non riconosciuti dal computer di riproduzione.</p>' +
        '<h3>Dove usare i file convertiti</h3>' +
        '<ul><li><strong>Holyrics</strong></li><li><strong>OBS Studio e vMix</strong>, soprattutto per file aperti da cartelle di rete</li><li><strong>Altri player</strong> che non supportano il codec originale</li></ul>' +
        '<h3>Funzioni</h3>' +
        '<ul><li>Video MP4 H.264 con pixel yuv420p.</li><li>Normalizzazione audio a -16 LUFS.</li><li>Conversione e normalizzazione audio in MP3.</li><li>Risoluzione originale o altezza limitata.</li><li>Accelerazione NVIDIA, Intel o AMD con fallback automatico alla CPU.</li><li>Risultato salvato accanto al file originale.</li></ul>' +
        '<h3>Scaricare e configurare FFmpeg in Windows</h3>' +
        '<ol><li>Apri la <a href="https://ffmpeg.org/download.html">pagina ufficiale di FFmpeg</a> e seleziona <strong>Windows builds from gyan.dev</strong>.</li><li>In <a href="https://www.gyan.dev/ffmpeg/builds/">FFmpeg Builds</a>, scarica <strong>ffmpeg-release-essentials.zip</strong>.</li><li>Estrai lo ZIP e apri la cartella <strong>bin</strong>.</li><li>Copia solo <strong>ffmpeg.exe</strong> in <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong>.</li><li>Mantieni il percorso <strong>.modules/ffmpeg.exe</strong> nelle impostazioni.</li><li>Aggiungi lo stesso percorso in <strong>Autorizzazioni avanzate &gt; File consentiti</strong>.</li></ol>' +
        '<p>Non è necessario installare FFmpeg o modificare il PATH di Windows.</p>')
    };

    return {
        id: mID,
        name: 'Compatibilizar Mídias',
        min_version: '2.24.0',
        os_required: 'windows',
        permissions: [
            {
                type: 'advanced',
                key: 'allowed_files'
            }
        ],
        description: descriptions.pt,
        i18n: {
            name: {
                en: 'Make Media Compatible',
                pt: 'Compatibilizar Mídias',
                es: 'Compatibilizar multimedia',
                ru: 'Сделать медиа совместимыми',
                it: 'Rendi compatibili i media'
            },
            description: descriptions
        }
    };
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
// v3.2.4 | 2026-09-04
function settings() {
    return [
        {
            name: h.i18n('Sobre') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            id: 'gpu',
            label: h.i18n('Placa de vídeo dedicada'),
            type: 'choice',
            allowed_values: [
                { value: 'none', label: h.i18n('Nenhuma (codificador padrão)') },
                { value: 'nvidia', label: 'NVIDIA NVENC' },
                { value: 'intel', label: 'Intel Quick Sync' },
                { value: 'amd', label: 'AMD AMF' }
            ],
            default_value: 'none',
            description: '<hr>' + h.i18n('Selecione a placa de vídeo dedicada ou escolha "Nenhuma" para usar o codificador padrão.')
        },
        {
            id: 'quality',
            label: h.i18n('Qualidade de codificação/velocidade de conversão'),
            type: 'choice',
            allowed_values: [
                { value: 'low', label: h.i18n('Baixa (menor qualidade, mais rápido)') },
                { value: 'medium', label: h.i18n('Média (equilibrada)') },
                { value: 'faster', label: h.i18n('Alta (melhor qualidade, mais lento)') }
            ],
            default_value: 'medium',
            description: '<hr>' + h.i18n('Selecione a qualidade de codificação. Qualidade maior gera arquivos maiores e exige mais tempo de processamento.')
        },
        {
            id: 'resolution',
            label: h.i18n('Resolução máxima do vídeo convertido'),
            type: 'choice',
            allowed_values: [
                { value: '2160', label: '4k (2160p)' },
                { value: '1080', label: 'Full HD (1080p)' },
                { value: '720', label: 'HD (720p)' }
            ],
            default_value: '1080'
        },
        {
            type: 'separator'
        },
        {
            id: 'ffmpeg_executable',
            label: 'Caminho do FFmpeg',
            description: '<html>Caminho relativo à aba <strong>Arquivos</strong> do Holyrics. Padrão recomendado: <strong>.modules/ffmpeg.exe</strong>.<br>Copie o executável para <strong>Holyrics/files/media/file/.modules/ffmpeg.exe</strong> e adicione o mesmo caminho em <strong>Permissões Avançadas &gt; Arquivos Permitidos</strong>.</html>',
            type: 'string',
            default_value: '.modules/ffmpeg.exe'
        },
        {
            id: 'ffmpeg_installation_instructions',
            label: h.i18n('Instruções de instalação e funcionamento'),
            type: 'button',
            button_label: h.i18n('Gerar no log'),
            action: function () {
                showFFmpegInstallationInstructions();
            }
        },
        {
            id: 'open_converter_log',
            label: 'Retorno do FFmpeg',
            description: 'Abre o log persistente que recebe stdout, stderr, progresso e o código de saída do FFmpeg.',
            type: 'button',
            button_label: 'Abrir log',
            action: function () {
                if (currentModule && typeof currentModule.openLog === 'function') {
                    currentModule.openLog();
                }
            }
        },
        {
            id: 'cancel_ffmpeg_conversion',
            label: 'Conversão em andamento',
            description: 'Encerra o FFmpeg atual e cancela os próximos arquivos da fila.',
            type: 'button',
            button_label: 'Cancelar conversão',
            action: function () {
                cancelFFmpegConversion();
            }
        },
        {
            id: 'log',
            label: h.i18n('Habilitar log'),
            type: 'boolean',
            onchange: function (obj) {
                logState(obj.input.log, mUID, ' onchange ' + mID);
            }
        }
    ];
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e73227d
// v3.2.4 | 2026-09-04
// Função para definir ações de contexto para o módulo especificado
function contextActions(module) {
    var arr = [];

    // Ação: Normalizar Volume para pastas de vídeo/áudio
    arr.push({
        name: h.i18n('Normalizar volume') + ' (' + mID + ')',
        types: ['video_folder', 'audio', 'audio_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'fileNormalize');
        }
    });

    // Ação: Normalizar Volume para arquivos de vídeo .mp4
    arr.push({
        name: h.i18n('Normalizar volume') + ' (' + mID + ')',
        types: ['video'],
        //allow_multiple_items: true,
        filter: {
            item: {
                extension: 'mp4' // Apenas arquivos com extensão .mp4
            }
        },
        action: function (evt) {
            createFFMpegProcessFile(evt, 'fileNormalize');
        }
    });

    // Ação: Compatibilizar vídeo apenas codec (sem alterar resolução)
    arr.push({
        name: h.i18n('Compatibilizar vídeo (.mp4 H.264) + Normalizar volume (manter resolução original)') + ' (' + mID + ')',
        types: ['video', 'video_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'videoToH264NoResize');
        }
    });

    // Ação: Compatibilizar vídeo e normalizar volume (ajustar altura)
    arr.push({
        name: h.i18n('Compatibilizar vídeo (.mp4 H.264) + Normalizar volume + Ajustar altura do vídeo') + ' (' + mID + ')',
        types: ['video', 'video_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'videoToH264');
        }
    });

    return arr;  // Retorna o array de ações de contexto
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// v3.2.4 | 2026-09-04
function actions(module) {
    var act = [
        {

            icon: 'library_add_check',
            action: function() {
                showMessage(module.name, h.i18n('Este módulo não precisa permanecer visível na barra de módulos.'));
            }
        }
    ];
    return act;
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// v3.2.4 | 2026-09-04
function getFfmpegParams(gpuOverride) {
    var settings = {
        nvidia: {
            encoder: ['-c:v', 'h264_nvenc'],
            quality: {
                low: ['-preset', 'fast', '-qp', '30'],
                medium: ['-preset', 'slow', '-qp', '23'],
                faster: ['-preset', 'slow', '-qp', '18']
            }
        },
        intel: {
            encoder: ['-c:v', 'h264_qsv'],
            quality: {
                low: ['-preset', 'fast', '-crf', '28'],
                medium: ['-preset', 'medium', '-crf', '23'],
                faster: ['-preset', 'slow', '-crf', '18']
            }
        },
        amd: {
            encoder: ['-c:v', 'h264_amf'],
            quality: {
                low: ['-quality', 'speed', '-qp', '30'],
                medium: ['-quality', 'balanced', '-qp', '23'],
                faster: ['-quality', 'quality', '-qp', '18']
            }
        },
        none: {
            encoder: ['-c:v', 'libx264'],
            quality: {
                low: ['-preset', 'fast', '-crf', '28'],
                medium: ['-preset', 'medium', '-crf', '23'],
                faster: ['-preset', 'slow', '-crf', '18']
            }
        }
    };

    var gpu = gpuOverride || module.settings.gpu || 'none'; // Valor padrão: 'none'
    var quality = module.settings.quality || 'medium'; // Valor padrão: 'medium'

    var gpuConfig = settings[gpu] || settings.none; // Obtém a configuração para a GPU selecionada
    var encoder = gpuConfig.encoder; // Encoder correspondente à GPU
    var qualityParams = gpuConfig.quality[quality] || gpuConfig.quality.medium; // Qualidade correspondente

    return encoder.concat(qualityParams);
}


function showFFmpegInstallationInstructions() {
    if (!checkOS()) {
        return;
    }
    moduleLog('============================================================');
    moduleLog(h.i18n('1. Acesse a página oficial: https://ffmpeg.org/download.html'));
    moduleLog(h.i18n('2. Em Windows EXE Files, abra Windows builds from gyan.dev.'));
    moduleLog(h.i18n('3. Em release builds, baixe ffmpeg-release-essentials.zip.'));
    moduleLog(h.i18n('4. Extraia o ZIP e abra a subpasta bin.'));
    moduleLog(h.i18n('5. Copie somente ffmpeg.exe para:'));
    moduleLog('   ' + convertBars(mediaPath('file/.modules'), true));
    moduleLog(h.i18n('6. Em Permissões Avançadas > Arquivos Permitidos, adicione:'));
    moduleLog('   ' + getConfiguredFFmpegExecutable());
    moduleLog(h.i18n('7. Salve. Não é necessário instalar o FFmpeg nem alterar o PATH do Windows.'));
    moduleLog(h.i18n('As conversões usam module.process e não precisam de arquivos BAT.'));
    if (currentModule && typeof currentModule.openLog === 'function') {
        currentModule.openLog();
    }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266666d706567227d
// v3.2.4 | 2026-09-04
var ffmpegConversionState = null;
var DEFAULT_FFMPEG_EXECUTABLE = '.modules/ffmpeg.exe';
var FFMPEG_TIMEOUT_MS = 86400000; // 24 horas por arquivo.

function generateCliArgs(type, inputFile, outputFile, typeA, gpuOverride) {
    var args = ['-y', '-hide_banner', '-loglevel', 'info', '-stats', '-i', inputFile];

    if (type === 'videoToH264') {
        var res = String(module.settings.resolution || '1080');
        args.push('-vf');
        args.push('scale=if(gt(ih\\,' + res + ')\\,-1\\,iw):if(gt(ih\\,' + res + ')\\,' + res + '\\,ih),format=yuv420p');
        args = args.concat(getFfmpegParams(gpuOverride));
        args = args.concat(['-filter:a', 'loudnorm=I=-16:LRA=11:TP=-1', '-c:a', 'libmp3lame', '-strict', '-2', outputFile]);
    } else if (type === 'videoToH264NoResize') {
        args = args.concat(['-vf', 'format=yuv420p']);
        args = args.concat(getFfmpegParams(gpuOverride));
        args = args.concat(['-filter:a', 'loudnorm=I=-16:LRA=11:TP=-1', '-c:a', 'libmp3lame', '-strict', '-2', outputFile]);
    } else if (type === 'fileNormalize') {
        if (typeA) {
            args = args.concat(['-filter:a', 'loudnorm=I=-16:LRA=11:TP=-1', '-c:a', 'libmp3lame', outputFile]);
        } else {
            args = args.concat(['-filter:a', 'loudnorm=I=-16:LRA=11:TP=-1', '-c:v', 'copy', '-c:a', 'libmp3lame', '-strict', '-2', outputFile]);
        }
    } else {
        throw new Error(h.i18n('Tipo de conversão FFmpeg desconhecido: {}', [type]));
    }

    return args;
}

function quoteCliArg(value) {
    var text = String(value);
    if (!/[\s"]/g.test(text)) {
        return text;
    }
    return '"' + text.replace(/"/g, '\\"') + '"';
}

function formatCliForLog(executable, args) {
    var result = [quoteCliArg(executable)];
    for (var i = 0; i < args.length; i++) {
        result.push(quoteCliArg(args[i]));
    }
    return result.join(' ');
}

function normalizeRelativePath(path) {
    return convertBars(String(path || ''), false)
        .replace(/^\/+/, '')
        .replace(/\/{2,}/g, '/');
}

function getConfiguredFFmpegExecutable() {
    var configured = module.settings.ffmpeg_executable || DEFAULT_FFMPEG_EXECUTABLE;
    var executable = normalizeRelativePath(String(configured).replace(/^\s+|\s+$/g, ''));
    executable = executable.replace(/^file\//i, '');

    if (!executable || /^[a-z]:\//i.test(executable) || /^\/\//.test(executable) || /(^|\/)\.\.(\/|$)/.test(executable)) {
        throw new Error(h.i18n('O caminho do FFmpeg deve ser relativo à aba Arquivos do Holyrics.'));
    }
    if (!/\.exe$/i.test(executable)) {
        throw new Error(h.i18n('O caminho configurado para o FFmpeg deve terminar em .exe.'));
    }
    return executable;
}

function getParentRelativeFolder(relativePath) {
    var normalized = normalizeRelativePath(relativePath).replace(/\/+$/, '');
    var lastSlash = normalized.lastIndexOf('/');
    return lastSlash >= 0 ? normalized.substring(0, lastSlash + 1) : '';
}

function getCompatibleSuffix() {
    var translated = String(h.i18n('compativel') || 'compativel');
    translated = translated
        .replace(/[<>:"\/\\|?*]/g, '')
        .replace(/\s+/g, '_')
        .replace(/^_+|_+$/g, '');
    return '_' + (translated || 'compativel');
}

function hasCompatibleSuffix(fileName) {
    var baseName = String(fileName).replace(/\.[^/.]+$/, '').toLowerCase();
    var suffixes = [getCompatibleSuffix().toLowerCase(), '_compativel', '_compatible', '_compatibile', '_совместимый'];
    for (var i = 0; i < suffixes.length; i++) {
        var suffix = suffixes[i].toLowerCase();
        if (baseName.substring(baseName.length - suffix.length) === suffix) {
            return true;
        }
    }
    return false;
}

function getCompatibleOutputFileName(fileName, typeA) {
    if (hasCompatibleSuffix(fileName)) {
        return null;
    }
    return String(fileName).replace(/\.[^/.]+$/, '') + getCompatibleSuffix() + (typeA ? '.mp3' : '.mp4');
}

function validateFFmpegExecutable(executable) {
    try {
        if (!h.files.exists('file/' + executable)) {
            var missingMessage = h.i18n('FFmpeg não encontrado em file/{}.', [executable]);
            h.notificationError(missingMessage, 8);
            moduleLog('[FFmpeg ERRO] ' + missingMessage);
            return false;
        }
        var isAllowed = false;
        var allowedFiles = [];
        if (currentModule && typeof currentModule.getAllowedFiles === 'function') {
            allowedFiles = currentModule.getAllowedFiles() || [];
        }
        if (currentModule && typeof currentModule.isAllowedFileToExecute === 'function') {
            isAllowed = currentModule.isAllowedFileToExecute(executable);
        }
        if (!isAllowed) {
            var normalizedExecutable = normalizeRelativePath(executable).toLowerCase();
            for (var i = 0; i < allowedFiles.length; i++) {
                var normalizedAllowed = normalizeRelativePath(allowedFiles[i]).replace(/^file\//i, '').toLowerCase();
                if (normalizedAllowed === normalizedExecutable) {
                    isAllowed = true;
                    break;
                }
            }
        }
        if (!isAllowed) {
            h.notificationError(h.i18n('Adicione {} em Arquivos Permitidos do módulo.', [executable]), 10);
            moduleLog('[FFmpeg ERRO] ' + h.i18n('O FFmpeg existe, mas não está em Arquivos Permitidos: {}', [executable]));
            moduleLog('[DIAGNÓSTICO] ' + h.i18n('Arquivos permitidos informados pelo módulo: {}', [String(allowedFiles)]));
            if (currentModule && typeof currentModule.openSettings === 'function') {
                currentModule.openSettings('allowed_files');
            }
            return false;
        }
    } catch (e) {
        moduleLog('[FFmpeg ERRO] ' + h.i18n('Falha ao validar o FFmpeg: {}', [String(e)]));
        h.notificationError(h.i18n('Não foi possível validar o FFmpeg. Consulte o log do módulo.'), 8);
        return false;
    }
    return true;
}

function appendProcessOutput(state, channel, buffer) {
    var text;
    try {
        text = String(buffer.readString() || '');
    } catch (e) {
        moduleLog('[FFmpeg ' + channel + '] ' + h.i18n('Erro ao ler o retorno do processo: {}', [String(e)]));
        return;
    }

    state.currentOutputTail += text;
    if (state.currentOutputTail.length > 32768) {
        state.currentOutputTail = state.currentOutputTail.substring(state.currentOutputTail.length - 32768);
    }

    var property = channel === 'stderr' ? 'stderrBuffer' : 'stdoutBuffer';
    var combined = state[property] + text;
    var lines = combined.replace(/\r/g, '\n').split('\n');
    state[property] = lines.pop();

    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 0) {
            moduleLog('[FFmpeg ' + channel + '] ' + lines[i]);
        }
    }
}

function shouldRetryWithSoftwareEncoder(job, state, result) {
    if (result === 0 || state.cancelRequested || job.softwareFallbackAttempted || job.type === 'fileNormalize' || job.gpu === 'none') {
        return false;
    }
    return /width\s+\d+\s+exceeds|height\s+\d+\s+exceeds|no capable devices found|error while opening encoder|cannot load|driver does not support|device setup failed|unknown encoder/i.test(state.currentOutputTail);
}

function prepareSoftwareEncoderFallback(job) {
    job.softwareFallbackAttempted = true;
    job.args = generateCliArgs(job.type, job.input, job.output, job.typeA, 'none');
}

function flushProcessOutput(state) {
    if (state.stdoutBuffer) {
        moduleLog('[FFmpeg stdout] ' + state.stdoutBuffer);
        state.stdoutBuffer = '';
    }
    if (state.stderrBuffer) {
        moduleLog('[FFmpeg stderr] ' + state.stderrBuffer);
        state.stderrBuffer = '';
    }
}

function finishFFmpegQueue() {
    var state = ffmpegConversionState;
    if (!state) {
        return;
    }

    var summary = state.cancelRequested
        ? h.i18n('Conversão cancelada: {} sucesso(s), {} falha(s).', [state.success, state.failed])
        : h.i18n('Conversão concluída: {} sucesso(s), {} falha(s).', [state.success, state.failed]);
    moduleLog('============================================================');
    moduleLog(summary);
    moduleLog(h.i18n('Arquivos salvos em: {}', [state.outputFolderAbsolute]));

    if (state.cancelRequested) {
        h.notification(summary, 8);
    } else if (state.failed > 0) {
        h.notificationError(summary + ' ' + h.i18n('Consulte o log do módulo.'), 10);
    } else {
        h.notification(summary + ' ' + h.i18n('Pasta: {}', [state.outputFolderRelative]), 8);
    }
    ffmpegConversionState = null;
}

function runNextFFmpegJob() {
    var state = ffmpegConversionState;
    if (!state) {
        return;
    }
    if (state.cancelRequested) {
        finishFFmpegQueue();
        return;
    }
    if (state.nextIndex >= state.jobs.length) {
        finishFFmpegQueue();
        return;
    }

    var job = state.jobs[state.nextIndex];
    var displayIndex = (state.nextIndex + 1) + '/' + state.jobs.length;
    state.nextIndex++;
    state.stdoutBuffer = '';
    state.stderrBuffer = '';
    state.currentOutputTail = '';

    moduleLog('------------------------------------------------------------');
    moduleLog(h.i18n('Processando arquivo {}', [displayIndex]));
    moduleLog(h.i18n('Origem: {}', [job.input]));
    moduleLog(h.i18n('Destino: {}', [job.output]));
    moduleLog(h.i18n('Comando: {}', [formatCliForLog(state.executable, job.args)]));

    try {
        if (!currentModule || typeof currentModule.process !== 'function') {
            throw new Error(h.i18n('module.process não está disponível nesta versão do Holyrics.'));
        }
        state.currentProcess = currentModule.process(state.executable, {
            cli: job.args,
            on_message: function (buffer) {
                appendProcessOutput(state, 'stdout', buffer);
            },
            on_error: function (buffer) {
                appendProcessOutput(state, 'stderr', buffer);
            },
            on_finish: function (result) {
                flushProcessOutput(state);
                state.currentProcess = null;
                if (shouldRetryWithSoftwareEncoder(job, state, result)) {
                    prepareSoftwareEncoderFallback(job);
                    state.nextIndex--;
                    moduleLog('[FFmpeg AVISO] ' + h.i18n('O encoder de hardware {} não aceitou este arquivo.', [job.gpu]));
                    moduleLog('[FFmpeg AVISO] ' + h.i18n('Repetindo o arquivo {} com libx264 (CPU), sem alterar a resolução solicitada.', [displayIndex]));
                    runNextFFmpegJob();
                    return;
                }
                if (typeof result === 'number' && result === 0) {
                    state.success++;
                    moduleLog('[FFmpeg] ' + h.i18n('Arquivo {} concluído com código 0.', [displayIndex]));
                } else {
                    state.failed++;
                    moduleLog('[FFmpeg ERRO] ' + h.i18n('Arquivo {} finalizou com: {}', [displayIndex, String(result)]));
                }
                if (state.cancelRequested) {
                    moduleLog('[CANCELAMENTO] ' + h.i18n('A fila não executará os arquivos restantes.'));
                    finishFFmpegQueue();
                } else {
                    runNextFFmpegJob();
                }
            },
            timeout: FFMPEG_TIMEOUT_MS
        });
    } catch (e) {
        state.currentProcess = null;
        state.failed++;
        moduleLog('[FFmpeg ERRO] ' + h.i18n('Não foi possível iniciar o arquivo {}: {}', [displayIndex, String(e)]));
        runNextFFmpegJob();
    }
}

function addJobsFromFolder(jobs, typeA, inputFolder, outputFolderAbsolute, type) {
    var filters = typeA
        ? ['.mp3', '.wav', '.aac', '.ogg', '.flac', '.m4a', '.wma', '.opus', '.amr', '.aiff', '.alac', '.mp2', '.au', '.ac3', '.dts']
        : ['.mp4', '.avi', '.mov', '.mkv', '.flv', '.wmv', '.mpg', '.mpeg', '.webm', '.3gp', '.ogv', '.asf', '.vob'];
    var folder = inputFolder.replace(/^video\/|^audio\//, '').replace(/\/$/, '');
    var mediaFolder = mediaPath();
    var seen = {};

    for (var i = 0; i < filters.length; i++) {
        var response = h.hly(typeA ? 'GetAudios' : 'GetVideos', {
            folder: folder,
            filter: filters[i]
        });
        var items = response && response.data ? response.data : [];
        for (var j = 0; j < items.length; j++) {
            var fileName = items[j].name;
            var dedupeKey = String(fileName).toLowerCase();
            if (!seen[dedupeKey]) {
                seen[dedupeKey] = true;
                var outputName = getCompatibleOutputFileName(fileName, typeA);
                if (!outputName) {
                    moduleLog('[IGNORADO] ' + h.i18n('O arquivo já possui sufixo de compatibilidade: {}', [fileName]));
                    continue;
                }
                var input = convertBars(mediaFolder + inputFolder + fileName, true);
                var output = convertBars(outputFolderAbsolute + '/' + outputName, true);
                jobs.push({
                    input: input,
                    output: output,
                    type: type,
                    typeA: typeA,
                    gpu: module.settings.gpu || 'none',
                    softwareFallbackAttempted: false,
                    args: generateCliArgs(type, input, output, typeA)
                });
            }
        }
    }
}

function createFFMpegProcessFile(evt, type) {
    if (!checkOS()) {
        return;
    }
    if (ffmpegConversionState) {
        h.notificationError(h.i18n('Já existe uma conversão FFmpeg em andamento.'), 6);
        return;
    }
    try {
        var executable = getConfiguredFFmpegExecutable();
        if (!validateFFmpegExecutable(executable)) {
            return;
        }
        var file = evt.item;
        var relativePath = normalizeRelativePath(file.file_relative_path);
        var typeA = /^audio\//i.test(relativePath);
        var inputFolder = file.is_dir
            ? relativePath.replace(/\/+$/, '') + '/'
            : getParentRelativeFolder(relativePath);
        var outputFolderRelative = inputFolder.replace(/\/$/, '');
        var outputFolderAbsolute = convertBars(mediaPath() + outputFolderRelative, true);

        moduleLog(h.i18n('Item selecionado: {}', [h.toPrettyJson(file)]));

        var jobs = [];
        if (!file.is_dir) {
            var input = convertBars(file.file_path, true);
            var outputName = getCompatibleOutputFileName(file.file_name, typeA);
            if (!outputName) {
                h.notificationError(h.i18n('Este arquivo já possui o sufixo {}.', [getCompatibleSuffix()]), 6);
                moduleLog('[IGNORADO] ' + h.i18n('O arquivo selecionado já é uma saída compatível: {}', [file.file_name]));
                return;
            }
            var output = convertBars(outputFolderAbsolute + '/' + outputName, true);
            jobs.push({
                input: input,
                output: output,
                type: type,
                typeA: typeA,
                gpu: module.settings.gpu || 'none',
                softwareFallbackAttempted: false,
                args: generateCliArgs(type, input, output, typeA)
            });
        } else {
            addJobsFromFolder(jobs, typeA, inputFolder, outputFolderAbsolute, type);
        }

        if (jobs.length === 0) {
            h.notificationError(h.i18n('Nenhum arquivo compatível foi encontrado para conversão.'), 6);
            moduleLog('[AVISO] ' + h.i18n('Nenhum arquivo compatível foi encontrado em: {}', [inputFolder]));
            return;
        }

        ffmpegConversionState = {
            jobs: jobs,
            nextIndex: 0,
            success: 0,
            failed: 0,
            currentProcess: null,
            cancelRequested: false,
            executable: executable,
            stdoutBuffer: '',
            stderrBuffer: '',
            currentOutputTail: '',
            outputFolderRelative: outputFolderRelative,
            outputFolderAbsolute: outputFolderAbsolute
        };

        moduleLog('============================================================');
        moduleLog(h.i18n('Nova fila FFmpeg: {} arquivo(s). Os resultados serão salvos ao lado dos originais.', [jobs.length]));
        moduleLog(h.i18n('Execução nativa via module.process; nenhum arquivo BAT será criado para esta conversão.'));
        if (currentModule && typeof currentModule.openLog === 'function') {
            currentModule.openLog();
        }
        runNextFFmpegJob();
    } catch (e) {
        ffmpegConversionState = null;
        moduleLog('[ERRO] ' + h.i18n('Falha ao preparar a conversão: {}', [String(e)]));
        h.notificationError(h.i18n('Falha ao preparar a conversão. Consulte o log do módulo.'), 8);
    }
}

function cancelFFmpegConversion() {
    if (!ffmpegConversionState || !ffmpegConversionState.currentProcess) {
        h.notification(h.i18n('Não há conversão FFmpeg em andamento.'), 4);
        return;
    }
    try {
        ffmpegConversionState.cancelRequested = true;
        ffmpegConversionState.currentProcess.destroy();
        moduleLog('[CANCELAMENTO] ' + h.i18n('Solicitação de cancelamento enviada ao processo FFmpeg atual.'));
    } catch (e) {
        moduleLog('[ERRO] ' + h.i18n('Não foi possível cancelar o FFmpeg: {}', [String(e)]));
        h.notificationError(h.i18n('Não foi possível cancelar a conversão.'), 6);
    }
}
