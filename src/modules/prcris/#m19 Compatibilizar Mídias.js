// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a224d61696e227d
// v3.3.1 | 2026-09-09
//#import modules_generic_functions
var mID = '@prcris#m19';
var mUID = mID+'';
var currentModule = null;

function startup(module) {
    currentModule = module;
    mUID = mID + module.id;
    logState(module.settings.log, mUID, 'startup '+ mID);
    moduleLog('Compatibilizar Mídias v3.3.1 iniciado. As conversões FFmpeg usam module.process.');

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
    var description = wrapModuleAboutHTML('' +
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
        '<li>Salva o resultado ao lado do original com o sufixo _compativel.</li>' +
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
        '<p><strong>Dependência única:</strong> ffmpeg.exe para Windows.</p>');

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
        description: description
    };
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
// v3.3.0 | 2026-09-05
function settings() {
    return [
        {
            name: 'Sobre' + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            id: 'gpu',
            label: 'Placa de vídeo dedicada',
            type: 'choice',
            allowed_values: [
                { value: 'none', label: 'Nenhuma (codificador padrão)' },
                { value: 'nvidia', label: 'NVIDIA NVENC' },
                { value: 'intel', label: 'Intel Quick Sync' },
                { value: 'amd', label: 'AMD AMF' }
            ],
            default_value: 'none',
            description: '<hr>' + 'Selecione a placa de vídeo dedicada ou escolha "Nenhuma" para usar o codificador padrão.'
        },
        {
            id: 'quality',
            label: 'Qualidade de codificação/velocidade de conversão',
            type: 'choice',
            allowed_values: [
                { value: 'low', label: 'Baixa (menor qualidade, mais rápido)' },
                { value: 'medium', label: 'Média (equilibrada)' },
                { value: 'faster', label: 'Alta (melhor qualidade, mais lento)' }
            ],
            default_value: 'medium',
            description: '<hr>' + 'Selecione a qualidade de codificação. Qualidade maior gera arquivos maiores e exige mais tempo de processamento.'
        },
        {
            id: 'resolution',
            label: 'Resolução máxima do vídeo convertido',
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
            label: 'Instruções de instalação e funcionamento',
            type: 'button',
            button_label: 'Gerar no log',
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
            label: 'Habilitar log',
            type: 'boolean',
            onchange: function (obj) {
                logState(obj.input.log, mUID, ' onchange ' + mID);
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e73227d
// v3.3.1 | 2026-09-09
// Função para definir ações de contexto para o módulo especificado
function contextActions(module) {
    var arr = [];

    // Ação: Normalizar Volume para pastas de vídeo/áudio
    arr.push({
        name: 'Normalizar volume',
        icon: 'audiotrack',
        types: ['video_folder', 'audio', 'audio_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'fileNormalize');
        }
    });

    // Ação: Normalizar Volume para arquivos de vídeo .mp4
    arr.push({
        name: 'Normalizar volume',
        icon: 'audiotrack',
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
        name: 'Compatibilizar vídeo (.mp4 H.264) + Normalizar volume (manter resolução original)',
        icon: 'movie',
        types: ['video', 'video_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'videoToH264NoResize');
        }
    });

    // Ação: Compatibilizar vídeo e normalizar volume (ajustar altura)
    arr.push({
        name: 'Compatibilizar vídeo (.mp4 H.264) + Normalizar volume + Ajustar altura do vídeo',
        icon: 'aspect_ratio',
        types: ['video', 'video_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'videoToH264');
        }
    });

    return arr;  // Retorna o array de ações de contexto
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
// v3.3.0 | 2026-09-05
function actions(module) {
    var act = [
        {

            icon: 'library_add_check',
            action: function() {
                showMessage(module.name, 'Este módulo não precisa permanecer visível na barra de módulos.');
            }
        }
    ];
    return act;
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
// v3.3.0 | 2026-09-05
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
    moduleLog('1. Acesse a página oficial: https://ffmpeg.org/download.html');
    moduleLog('2. Em Windows EXE Files, abra Windows builds from gyan.dev.');
    moduleLog('3. Em release builds, baixe ffmpeg-release-essentials.zip.');
    moduleLog('4. Extraia o ZIP e abra a subpasta bin.');
    moduleLog('5. Copie somente ffmpeg.exe para:');
    moduleLog('   ' + convertBars(mediaPath('file/.modules'), true));
    moduleLog('6. Em Permissões Avançadas > Arquivos Permitidos, adicione:');
    moduleLog('   ' + getConfiguredFFmpegExecutable());
    moduleLog('7. Salve. Não é necessário instalar o FFmpeg nem alterar o PATH do Windows.');
    moduleLog('As conversões usam module.process e não precisam de arquivos BAT.');
    if (currentModule && typeof currentModule.openLog === 'function') {
        currentModule.openLog();
    }
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266666d706567227d
// v3.3.0 | 2026-09-05
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
        throw new Error(("Tipo de conversão FFmpeg desconhecido: " + String(type)));
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
        throw new Error('O caminho do FFmpeg deve ser relativo à aba Arquivos do Holyrics.');
    }
    if (!/\.exe$/i.test(executable)) {
        throw new Error('O caminho configurado para o FFmpeg deve terminar em .exe.');
    }
    return executable;
}

function getParentRelativeFolder(relativePath) {
    var normalized = normalizeRelativePath(relativePath).replace(/\/+$/, '');
    var lastSlash = normalized.lastIndexOf('/');
    return lastSlash >= 0 ? normalized.substring(0, lastSlash + 1) : '';
}

function getCompatibleSuffix() {
    return '_compativel';
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
            var missingMessage = ("FFmpeg não encontrado em file/" + String(executable) + ".");
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
            h.notificationError(("Adicione " + String(executable) + " em Arquivos Permitidos do módulo."), 10);
            moduleLog('[FFmpeg ERRO] ' + ("O FFmpeg existe, mas não está em Arquivos Permitidos: " + String(executable)));
            moduleLog('[DIAGNÓSTICO] ' + ("Arquivos permitidos informados pelo módulo: " + String(String(allowedFiles))));
            if (currentModule && typeof currentModule.openSettings === 'function') {
                currentModule.openSettings('allowed_files');
            }
            return false;
        }
    } catch (e) {
        moduleLog('[FFmpeg ERRO] ' + ("Falha ao validar o FFmpeg: " + String(String(e))));
        h.notificationError('Não foi possível validar o FFmpeg. Consulte o log do módulo.', 8);
        return false;
    }
    return true;
}

function appendProcessOutput(state, channel, buffer) {
    var text;
    try {
        text = String(buffer.readString() || '');
    } catch (e) {
        moduleLog('[FFmpeg ' + channel + '] ' + ("Erro ao ler o retorno do processo: " + String(String(e))));
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
        ? ("Conversão cancelada: " + String(state.success) + " sucesso(s), " + String(state.failed) + " falha(s).")
        : ("Conversão concluída: " + String(state.success) + " sucesso(s), " + String(state.failed) + " falha(s).");
    moduleLog('============================================================');
    moduleLog(summary);
    moduleLog(("Arquivos salvos em: " + String(state.outputFolderAbsolute)));

    if (state.cancelRequested) {
        h.notification(summary, 8);
    } else if (state.failed > 0) {
        h.notificationError(summary + ' ' + 'Consulte o log do módulo.', 10);
    } else {
        h.notification(summary + ' ' + ("Pasta: " + String(state.outputFolderRelative)), 8);
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
    moduleLog(("Processando arquivo " + String(displayIndex)));
    moduleLog(("Origem: " + String(job.input)));
    moduleLog(("Destino: " + String(job.output)));
    moduleLog(("Comando: " + String(formatCliForLog(state.executable, job.args))));

    try {
        if (!currentModule || typeof currentModule.process !== 'function') {
            throw new Error('module.process não está disponível nesta versão do Holyrics.');
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
                    moduleLog('[FFmpeg AVISO] ' + ("O encoder de hardware " + String(job.gpu) + " não aceitou este arquivo."));
                    moduleLog('[FFmpeg AVISO] ' + ("Repetindo o arquivo " + String(displayIndex) + " com libx264 (CPU), sem alterar a resolução solicitada."));
                    runNextFFmpegJob();
                    return;
                }
                if (typeof result === 'number' && result === 0) {
                    state.success++;
                    moduleLog('[FFmpeg] ' + ("Arquivo " + String(displayIndex) + " concluído com código 0."));
                } else {
                    state.failed++;
                    moduleLog('[FFmpeg ERRO] ' + ("Arquivo " + String(displayIndex) + " finalizou com: " + String(String(result))));
                }
                if (state.cancelRequested) {
                    moduleLog('[CANCELAMENTO] ' + 'A fila não executará os arquivos restantes.');
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
        moduleLog('[FFmpeg ERRO] ' + ("Não foi possível iniciar o arquivo " + String(displayIndex) + ": " + String(String(e))));
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
                    moduleLog('[IGNORADO] ' + ("O arquivo já possui sufixo de compatibilidade: " + String(fileName)));
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
        h.notificationError('Já existe uma conversão FFmpeg em andamento.', 6);
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

        moduleLog(("Item selecionado: " + String(h.toPrettyJson(file))));

        var jobs = [];
        if (!file.is_dir) {
            var input = convertBars(file.file_path, true);
            var outputName = getCompatibleOutputFileName(file.file_name, typeA);
            if (!outputName) {
                h.notificationError(("Este arquivo já possui o sufixo " + String(getCompatibleSuffix()) + "."), 6);
                moduleLog('[IGNORADO] ' + ("O arquivo selecionado já é uma saída compatível: " + String(file.file_name)));
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
            h.notificationError('Nenhum arquivo compatível foi encontrado para conversão.', 6);
            moduleLog('[AVISO] ' + ("Nenhum arquivo compatível foi encontrado em: " + String(inputFolder)));
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
        moduleLog(("Nova fila FFmpeg: " + String(jobs.length) + " arquivo(s). Os resultados serão salvos ao lado dos originais."));
        moduleLog('Execução nativa via module.process; nenhum arquivo BAT será criado para esta conversão.');
        if (currentModule && typeof currentModule.openLog === 'function') {
            currentModule.openLog();
        }
        runNextFFmpegJob();
    } catch (e) {
        ffmpegConversionState = null;
        moduleLog('[ERRO] ' + ("Falha ao preparar a conversão: " + String(String(e))));
        h.notificationError('Falha ao preparar a conversão. Consulte o log do módulo.', 8);
    }
}

function cancelFFmpegConversion() {
    if (!ffmpegConversionState || !ffmpegConversionState.currentProcess) {
        h.notification('Não há conversão FFmpeg em andamento.', 4);
        return;
    }
    try {
        ffmpegConversionState.cancelRequested = true;
        ffmpegConversionState.currentProcess.destroy();
        moduleLog('[CANCELAMENTO] ' + 'Solicitação de cancelamento enviada ao processo FFmpeg atual.');
    } catch (e) {
        moduleLog('[ERRO] ' + ("Não foi possível cancelar o FFmpeg: " + String(String(e))));
        h.notificationError('Não foi possível cancelar a conversão.', 6);
    }
}
