var mID = '@prcris#m19';
var mUID = mID+''; 

//#import modules_generic_functions

function startup(module) { 

mUID = mID + module.id;

logState(module.settings.log, mUID, 'startup '+ mID);

}

function info() {   
    return {  
        id: mID,
        name: jsc.i18n('Swiss Army Knife'), 
        minVersion: '2.24.0',  
        description: '' +
            '<p>A powerful file conversion and media compatibility tool for Holyrics.</p>' +
            
            '<h3>Features</h3>' +
            '<ul>' +
                '<li><strong>Normalize volume of MP3 and MP4 files:</strong>' +
                    '<br>Adjusts the file\'s volume level to an international standard, solving issues with low or high media volume.' +
                '</li>' +
                '<li><strong>Converts and normalizes incompatible video formats to MP4 (H.264)</strong></li>' +
                '<li><strong>Converts and normalizes incompatible audio formats to MP3</strong></li>' +
                '<li><strong>Converts PPTX/PPT (PowerPoint) to PNG slides</strong></li>' +
                '<li><strong>Converts ODP (OpenDocument Presentation) to PNG slides</strong></li>' +
                '<li><strong>Converts PDF to PNG slides</strong></li>' +
            '</ul>' +

            '<hr>' +

            '<h3><strong>ATTENTION:</strong></h3>' +
            '<p>This module uses third-party technology for conversions, as listed below:</p>' +
            
            '<ul>' +
                '<li><strong>Microsoft Office or LibreOffice*</strong>' +  
                    '<br>Required for PPTX and ODP file conversion.' +
                    '<br><em>* PDF to PNG conversion is needed if using LibreOffice.</em>' +
                '</li>' +
                '<li><strong>FFmpeg</strong> (latest version)' +
                    '<br>Required for handling video and audio files.' +
                '</li>' +
                '<li><strong>pdf2image</strong>' +  
                    '<br>Utility developed by brother SrTonn to convert PDFs into PNGs.' +
                '<br><br><em>* Incorrect configuration or absence of these dependencies will cause module failures.</em><br>' +
                '</li>' +
                '<br><hr>' +

                '<em>* Slide formatting cannot be guaranteed for PPTX files converted by LibreOffice. LibreOffice cannot read TTF fonts absent from your system, which may result in changes to slide appearance.</em>' +
            '</ul>' +

            '<p>Watch the tutorial for configuration and usage.</p>' +
            infoVDDMM,
            
        i18n: {
            name: {
                en: 'Swiss Army Knife',
                pt: 'Canivete Suíço',
                es: 'Navaja Suiza',
                ru: 'Швейцарский нож'
            },
            description: {
                en: '<p>A powerful file conversion and media compatibility tool for Holyrics.</p>' +
                    '<h3>Features</h3>' +
                    '<ul>' +
                        '<li><strong>Normalize volume of MP3 and MP4 files:</strong>' +
                            '<br>Adjusts the file\'s volume level to an international standard, solving issues with low or high media volume.' +
                        '</li>' +
                        '<li><strong>Converts and normalizes incompatible video formats to MP4 (H.264)</strong></li>' +
                        '<li><strong>Converts and normalizes incompatible audio formats to MP3</strong></li>' +
                        '<li><strong>Converts PPTX/PPT (PowerPoint) to PNG slides</strong></li>' +
                        '<li><strong>Converts ODP (OpenDocument Presentation) to PNG slides</strong></li>' +
                        '<li><strong>Converts PDF to PNG slides</strong></li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h3><strong>ATTENTION:</strong></h3>' +
                    '<p>This module uses third-party technology for conversions, as listed below:</p>' +
                    '<ul>' +
                        '<li><strong>Microsoft Office or LibreOffice*</strong>' +
                            '<br>Required for PPTX and ODP file conversion.' +
                            '<br><em>* PDF to PNG conversion is needed if using LibreOffice.</em>' +
                        '</li>' +
                        '<li><strong>FFmpeg</strong> (latest version)' +
                            '<br>Required for handling video and audio files.' +
                        '</li>' +
                        '<li><strong>pdf2image</strong>' +
                            '<br>Utility developed by brother SrTonn to convert PDFs into PNGs.' +
                        '<br><br><em>* Incorrect configuration or absence of these dependencies will cause module failures.</em><br>' +
                        '</li>' +
                        '<br><hr>' +
                        '<em>* Slide formatting cannot be guaranteed for PPTX files converted by LibreOffice. LibreOffice cannot read TTF fonts absent from your system, which may result in changes to slide appearance.</em>' +
                    '</ul>' +
                    '<p>Watch the tutorial for configuration and usage.</p>' +
                    infoVDDMM,
                pt: '<p>Uma poderosa ferramenta de conversão de arquivos e compatibilidade de mídia para Holyrics.</p>' +
                    '<h3>Funcionalidades</h3>' +
                    '<ul>' +
                        '<li><strong>Normalizar volume de arquivos MP3 e MP4:</strong>' +
                            '<br>Ajusta o nível de volume do arquivo para um padrão internacional, resolvendo problemas de volume baixo ou alto em mídias.' +
                        '</li>' +
                        '<li><strong>Converte e normaliza formatos de vídeo incompatíveis para MP4 (H.264)</strong></li>' +
                        '<li><strong>Converte e normaliza formatos de áudio incompatíveis para MP3</strong></li>' +
                        '<li><strong>Converte PPTX/PPT (PowerPoint) para slides PNG</strong></li>' +
                        '<li><strong>Converte ODP (Apresentação OpenDocument) para slides PNG</strong></li>' +
                        '<li><strong>Converte PDF para slides PNG</strong></li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h3><strong>ATENÇÃO:</strong></h3>' +
                    '<p>Este módulo utiliza tecnologia de terceiros para conversões, conforme listado abaixo:</p>' +
                    '<ul>' +
                        '<li><strong>Microsoft Office ou LibreOffice*</strong>' +
                            '<br>Necessário para conversão de arquivos PPTX e ODP.' +
                            '<br><em>* O conversor de PDF para PNG é necessário se utilizar LibreOffice.</em>' +
                        '</li>' +
                        '<li><strong>FFmpeg</strong> (última versão)' +
                            '<br>Necessário para manipular arquivos de vídeo e áudio.' +
                        '</li>' +
                        '<li><strong>pdf2image</strong>' +
                            '<br>Utilitário desenvolvido pelo irmão SrTonn para converter PDFs em PNGs.' +
                        '<br><br><em>* A configuração incorreta ou ausência dessas dependências causará falhas no módulo.</em><br>' +
                        '</li>' +
                        '<br><hr>' +
                        '<em>* Não é possível garantir a formatação de slides PPTX convertidos pelo LibreOffice, o LibreOffice não é capaz de ler as fontes TTF inexistentes no seu sistema, o que pode ocasionar mudança na aparência de slides.</em>' +
                    '</ul>' +
                    '<p>Assista ao tutorial para configuração e uso.</p>' +
                    infoVDDMM,
                es: '<p>Una poderosa herramienta de conversión de archivos y compatibilidad de medios para Holyrics.</p>' +
                    '<h3>Funciones</h3>' +
                    '<ul>' +
                        '<li><strong>Normalizar el volumen de archivos MP3 y MP4:</strong>' +
                            '<br>Ajusta el nivel de volumen del archivo a un estándar internacional, resolviendo problemas de volumen bajo o alto en medios.' +
                        '</li>' +
                        '<li><strong>Convierte y normaliza formatos de video incompatibles a MP4 (H.264)</strong></li>' +
                        '<li><strong>Convierte y normaliza formatos de audio incompatibles a MP3</strong></li>' +
                        '<li><strong>Convierte PPTX/PPT (PowerPoint) a diapositivas PNG</strong></li>' +
                        '<li><strong>Convierte ODP (Presentación OpenDocument) a diapositivas PNG</strong></li>' +
                        '<li><strong>Convierte PDF a diapositivas PNG</strong></li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h3><strong>ATENCIÓN:</strong></h3>' +
                    '<p>Este módulo utiliza tecnología de terceros para conversiones, según lo indicado a continuación:</p>' +
                    '<ul>' +
                        '<li><strong>Microsoft Office o LibreOffice*</strong>' +
                            '<br>Requerido para la conversión de archivos PPTX y ODP.' +
                            '<br><em>* La conversión de PDF a PNG es necesaria si se utiliza LibreOffice.</em>' +
                        '</li>' +
                        '<li><strong>FFmpeg</strong> (última versión)' +
                            '<br>Necesario para manipular archivos de video y audio.' +
                        '</li>' +
                        '<li><strong>pdf2image</strong>' +
                            '<br>Utilidad desarrollada por el hermano SrTonn para convertir PDFs en PNGs.' +
                        '<br><br><em>* Una configuración incorrecta o la ausencia de estas dependencias causará fallas en el módulo.</em><br>' +
                        '</li>' +
                        '<br><hr>' +
                        '<em>* No se puede garantizar el formato de las diapositivas PPTX convertidas por LibreOffice. LibreOffice no puede leer fuentes TTF inexistentes en su sistema, lo que puede ocasionar cambios en la apariencia de las diapositivas.</em>' +
                    '</ul>' +
                    '<p>Vea el tutorial para configuración y uso.</p>' +
                    infoVDDMM,
                ru: '<p>Мощный инструмент для преобразования файлов и совместимости медиа для Holyrics.</p>' +
                    '<h3>Функции</h3>' +
                    '<ul>' +
                        '<li><strong>Нормализация громкости MP3 и MP4 файлов:</strong>' +
                            '<br>Регулирует уровень громкости файла до международного стандарта, решая проблемы с низкой или высокой громкостью.' +
                        '</li>' +
                        '<li><strong>Конвертирует и нормализует несовместимые видеоформаты в MP4 (H.264)</strong></li>' +
                        '<li><strong>Конвертирует и нормализует несовместимые аудиоформаты в MP3</strong></li>' +
                        '<li><strong>Конвертирует PPTX/PPT (PowerPoint) в слайды PNG</strong></li>' +
                        '<li><strong>Конвертирует ODP (Презентация OpenDocument) в слайды PNG</strong></li>' +
                        '<li><strong>Конвертирует PDF в слайды PNG</strong></li>' +
                    '</ul>' +
                    '<hr>' +
                    '<h3><strong>ВНИМАНИЕ:</strong></h3>' +
                    '<p>Этот модуль использует сторонние технологии для конверсий, как указано ниже:</p>' +
                    '<ul>' +
                        '<li><strong>Microsoft Office или LibreOffice*</strong>' +
                            '<br>Необходимо для конверсии файлов PPTX и ODP.' +
                            '<br><em>* Конверсия PDF в PNG требуется, если используется LibreOffice.</em>' +
                        '</li>' +
                        '<li><strong>FFmpeg</strong> (последняя версия)' +
                            '<br>Необходимо для работы с видео- и аудиофайлами.' +
                        '</li>' +
                        '<li><strong>pdf2image</strong>' +
                            '<br>Утилита, разработанная братом SrTonn для преобразования PDF в PNG.' +
                        '<br><br><em>* Некорректная конфигурация или отсутствие этих зависимостей приведет к сбоям в модуле.</em><br>' +
                        '</li>' +
                        '<br><hr>' +
                        '<em>* Невозможно гарантировать форматирование слайдов PPTX, преобразованных с помощью LibreOffice. LibreOffice не может читать шрифты TTF, отсутствующие в вашей системе, что может привести к изменению внешнего вида слайдов.</em>' +
                    '</ul>' +
                    '<p>Посмотрите учебное пособие по настройке и использованию.</p>' +
                    infoVDDMM
            }
        }
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: jsc.i18n('About') + ' ' + mID,
            description: infoVDDMM,
            type: 'label'
        },
        {
            type: 'separator'
        },
        {
            id: 'gpu',
            label: jsc.i18n('Placa de Vídeo Dedicada'),
            type: 'choice',
            allowed_values: [
                { value: 'none', label: jsc.i18n('Nenhuma (Codificador Padrão)') },
                { value: 'nvidia', label: 'NVIDIA NVENC' },
                { value: 'intel', label: 'Intel Quick Sync' },
                { value: 'amd', label: 'AMD AMF' }
            ],
            default_value: 'none',
            description: '<hr>' + jsc.i18n('Selecione a placa de vídeo dedicada ou escolha "Nenhuma" para usar o codificador padrão.')
        },
        {
            id: 'quality',
            label: jsc.i18n('Qualidade de Codificação/Velocidade de Conversão'),
            type: 'choice',
            allowed_values: [
                { value: 'low', label: jsc.i18n('Baixa (Menor Qualidade, Mais Rápido)') },
                { value: 'medium', label: jsc.i18n('Média (Equilibrada)') },
                { value: 'faster', label: jsc.i18n('Alta (Melhor Qualidade, Mais Lento)') }
            ],
            default_value: 'medium',
            description: '<hr>' + jsc.i18n('Selecione a qualidade de codificação. Configurações de qualidade mais alta resultam em arquivos maiores e tempos de processamento mais longos.')
        },
        {
            id: 'resolution',
            label: jsc.i18n('Resolução Máxima do Vídeo Convertido'),
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
            id: 'pngConverter',
            label: jsc.i18n('Conversor para PNG'),
            type: 'choice',
            allowed_values: [
                { value: 'office', label: 'Microsoft PowerPoint' },
                { value: 'libreoffice', label: 'LibreOffice + tonn Pdf2image.exe' }
            ],
            default_value: 'libreoffice'
        },
        {
            id: 'libre_folder',
            label: jsc.i18n('Pasta onde está instalado o LibreOffice (caso tenha optado por ele)'),
            type: 'string',
            default_value: convertBars('C:/Program Files/LibreOffice/program', true)
        },
        { 
            type: 'separator' 
        },
        {
            id: 'output_folder',
            label: jsc.i18n('Subpasta de destino para o arquivo gerado'),
            description: jsc.i18n('Escolha o nome da pasta para colocar o arquivo gerado'),
            type: 'string',
            default_value: 'module_converter'
        },
        {
            id: 'first_bat',
            label: jsc.i18n('Instruções de instalação e funcionamento'),
            type: 'button',
            button_label: 'Gerar no Log',
            action: function (evt) {
                createFirstBat();
            }
        },
        {
            id: 'log',
            label: jsc.i18n('Enable log'),
            type: 'boolean',
            onchange: function (obj) {
                logState(obj.input.log, mUID, ' onchange ' + mID);
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22636f6e74657874416374696f6e73227d
// Função para definir ações de contexto para o módulo especificado
function contextActions(module) {
    var arr = [];

    // Ação: Normalizar Volume para pastas de vídeo/áudio
    arr.push({
        name: jsc.i18n('Normalizar Volume') + ' (' + mID + ')',
        types: ['video_folder', 'audio', 'audio_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'fileNormalize');
        }
    });

    // Ação: Normalizar Volume para arquivos de vídeo .mp4
    arr.push({
        name: jsc.i18n('Normalizar Volume') + ' (' + mID + ')',
        types: ['video'],
        allow_multiple_items: true,
        filter: {
            item: {
                extension: 'mp4' // Apenas arquivos com extensão .mp4
            }
        },
        action: function (evt) {
            createFFMpegProcessFile(evt, 'fileNormalize');
        }
    });

    // Ação: Compatibilizar vídeo para VLC Holyrics e normalizar volume
    arr.push({
        name: jsc.i18n('Compatiblizar com VLC Holyrics (.mp4 h264) \n+ Normalizar Volume \n+ Ajustar Resolução') + ' (' + mID + ')',
        types: ['video', 'video_folder'],
        action: function (evt) {
            createFFMpegProcessFile(evt, 'videoToH264');
        }
    });

    // Ação: Converter apresentações em slides PNG
    arr.push({
        name: jsc.i18n('Converter em slides .PNG') + ' (' + mID + ')',
        types: ['file', 'file_folder'],
        allow_multiple_items: true,
        filter: {
            item: {
                extension: '--rgx (pptx|ppt|odp)' // Extensões de apresentações
            }
        },
        action: function (evt) {
            convertPPT2PNG(evt);  // Função de conversão para slides PNG
        }
    });

    // Ação: Converter PDFs em slides PNG
    arr.push({
        name: jsc.i18n('Converter em slides .PNG') + ' (' + mID + ')',
        types: ['file', 'file_folder'],
        allow_multiple_items: true,
        filter: {
            item: {
                extension: 'pdf' // Apenas arquivos PDF
            }
        },
        action: function (evt) {
            convertPDF2PNG(evt); 
        }
    });

    return arr;  // Retorna o array de ações de contexto
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
    var act = [
        {
            
            icon: 'library_add_check',
            action: function() {
                showMessage(module.name,jsc.i18n('Este módulo não necessita ficar visível na barra de módulos.'));
            }
        }
    ];
    return act;
}




// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d

function getFfmpegParams() {
    var settings = {
        nvidia: {
            encoder: '-c:v h264_nvenc',
            quality: {
                low: '-preset fast -qp 30',
                medium: '-preset slow -qp 23',
                faster: '-preset slow -qp 18'
            }
        },
        intel: {
            encoder: '-c:v h264_qsv',
            quality: {
                low: '-preset fast -crf 28',
                medium: '-preset medium -crf 23',
                faster: '-preset slow -crf 18'
            }
        },
        amd: {
            encoder: '-c:v h264_amf',
            quality: {
                low: '-quality speed -qp 30',
                medium: '-quality balanced -qp 23',
                faster: '-quality quality -qp 18'
            }
        },
        none: {
            encoder: '-c:v libx264',
            quality: {
                low: '-preset fast -crf 28',
                medium: '-preset medium -crf 23',
                faster: '-preset slow -crf 18'
            }
        }
    };

    var gpu = module.settings.gpu || 'none'; // Valor padrão: 'none'
    var quality = module.settings.quality || 'medium'; // Valor padrão: 'medium'

    var gpuConfig = settings[gpu]; // Obtém a configuração para a GPU selecionada
    var encoder = gpuConfig.encoder; // Encoder correspondente à GPU
    var qualityParams = gpuConfig.quality[quality]; // Qualidade correspondente

    return ' ' + encoder + ' ' + qualityParams + ' ';
}


function createFirstBat() {

    if (!checkOS()) {
      return
    }

    h.log('','\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
    h.log('','1.  ' + jsc.i18n('Abra o holyrics e crie a pasta ".modules" dentro de "' + convertBars(mediaPath('file'),true) + '"\n    conforme o tutorial, mantenha o explorer aberto nesta pasta'));
    h.log('','2.  ' + jsc.i18n('Faça o Download do pacote do ffmpeg neste endereço:'));
    h.log('','    https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.7z');
    h.log('','    ' + jsc.i18n('Descompacte e copie apenas o arquivo ffmpeg.exe para a pasta') + ' "' + convertBars(mediaPath('file/.modules'),true)+'"');
    h.log('','=== ' + jsc.i18n('Caso não precise converter apresentações (ppt,pptx,odp,pdf), vá para para o passo 4'));
    h.log('','3.  ' + jsc.i18n('Garanta que o Microsoft Office ou o LibreOffice esteja intalado.'));
    h.log('','3.1 ' + jsc.i18n('Caso opte por utilizar o LibreOffice ou deseje converter PDF em imagem: '));
    h.log('','    ' + jsc.i18n('Faça download do PDF2image.exe e salve em') + ' "' + convertBars(mediaPath('file/.modules'),true)+'"');
    h.log('','    https://github.com/SrTonn/PDF2Image/releases/tag/v1.1.0');
    h.log('','4.  ' + jsc.i18n('Abra "Permissões Avançadas" do próprio módulo e adicione em "Arquivos Permitidos": ')+' .modules/swissconveter.bat');    
    h.log('','5.  ' + jsc.i18n('Abra o bloco de notas com um arquivo novo.')); 
    h.log('','=== ' + jsc.i18n('Selecione, copie as linhas do script abaixo (control C) e cole no bloco de notas.'));
    h.log('','=== ' + jsc.i18n('Salve o arquivo com este caminho e nome (recomendo copiar e colar):'));
    h.log('','    "' + convertBars(mediaPath('file') + '.modules/swissconveter.bat"',true));
    h.log('','')
    h.log('','')
    h.log('','@echo off');
    h.log('','setlocal enabledelayedexpansion');
    h.log('','chcp 65001');
    h.log('','for /f "tokens=*" %%D in (\'powershell -command "[Environment]::GetFolderPath(\'MyDocuments\')"\') do set DOCUMENTS_PATH=%%D');
    h.log('','copy /y "%DOCUMENTS_PATH%\\Holyrics\\js\\converterCommands.txt" "%DOCUMENTS_PATH%\\Holyrics\\js\\converterCommands.bat"');
    h.log('','del "%DOCUMENTS_PATH%\\Holyrics\\js\\converterCommands.txt"');
    h.log('','call "%DOCUMENTS_PATH%\\Holyrics\\js\\converterCommands.bat"');
    h.log('','del "%DOCUMENTS_PATH%\\Holyrics\\js\\converterCommands.bat"');
    h.log('','pause');

}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266666d706567227d
function generateCliArgs(type, inputFile, outputFile, typeA) {
    if (type === 'videoToH264') {
        var res = module.settings.resolution;
        return '-y -loglevel warning -i "' + inputFile + '" -vf "scale=-1:if(gt(ih\\,'+res+')\\,'+res+'\\,ih),format=yuv420p" ' + getFfmpegParams() + '-filter:a "loudnorm=I=-16:LRA=11:TP=-1" -c:a libmp3lame -strict -2 "' + outputFile + '"';
    } else if (type === 'fileNormalize') {
        if (typeA) { 
            return '-y -loglevel warning -i "' + inputFile + '" -filter:a "loudnorm=I=-16:LRA=11:TP=-1" -c:a libmp3lame "' + outputFile + '"';
        } else {
            return '-y -loglevel warning -i "' + inputFile + '" -filter:a "loudnorm=I=-16:LRA=11:TP=-1" -c:v copy -c:a libmp3lame -strict -2 "' + outputFile + '"';
        }
    }
}


function createFFMpegProcessFile(evt, type) {
    if (!checkOS()) {
        return;
    }
    var f = evt.item; 
    var s = module.settings;
    var mediaFolder = mediaPath();
    var cmdPath = mediaFolder + 'file/.modules'
    var typeA = f.file_relative_path.indexOf('audio') === 0;
    var inputFolder = convertBars(f.file_relative_path);

    if (!f.is_dir) {
       inputFolder = inputFolder.replace(f.file_name,"");
    } else {
      inputFolder = inputFolder + '/';
    }
     
    h.log(mUID,'evt.item {}', h.toPrettyJson(f));
    var outputFolder = mediaPath() + inputFolder + s.output_folder;    
    
    var commandLines = [];
    var ec = 'ec' + 'ho ';
    commandLines.push('@' + ec + ' on');
    commandLines.push('chcp 65001');  // Definindo o código de página UTF-8
    commandLines.push('md "' + outputFolder + '"');  // Criando a pasta de destino
    commandLines.push('cd /d "' + cmdPath + '"');  // Navega até o diretório do ffmpeg
    commandLines.push('cls');  // Limpa o console
   
    function addFile(file,index) {
       
        var inputFile = file; 
        var outputFile = convertBars(outputFileFullPath);
        
        var ffmpeg_command = 'ffmpeg.exe ' + generateCliArgs(type, inputFile, outputFile, typeA) //parametros para a conversão
        h.log(mUID,'{%t} {}', ffmpeg_command);

        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');        
        commandLines.push(ec + jsc.i18n('Processando arquivo') + ' ' + index);  
        commandLines.push(ec + '← ' + inputFile);  
        commandLines.push(ec + '→ ' + outputFile);  
        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');  
        commandLines.push(ffmpeg_command);  // Adiciona o comando ffmpeg
    }

    if (!f.is_dir) {
       var outputFileName = f.file_name.replace(/\.[^/.]+$/, '') + (typeA ? '.mp3' : '.mp4');
       var outputFileFullPath = outputFolder + '/' + outputFileName;
       addFile(convertBars(f.file_path),'1/1');
       }
    else
       {
        if (typeA) {
           var filter = '.wav,.aac,.ogg,.flac,.m4a,.wma,.opus,.amr,.aiff,.alac,.mp2,.au,.ac3,.dts';
        } else { 
           var filter = '.mp4,.avi,.mov,.mkv,.flv,.wmv,.mpg,.mpeg,.webm,.3gp,.ogv,.asf,.vob'; 
        }
        
        var folder = inputFolder.replace(/^video\/|^audio\//, '');
        var filterArr = filter.split(',');
        var files = [];
        for (var i = 0; i < filterArr.length; i++) {
            var currentFilter = filterArr[i];
            var fi = h.hly((typeA ? 'GetAudios' : 'GetVideos'), { folder: folder, filter: currentFilter });
            fi.data.forEach(function(item) {
               h.log(mUID,'{%t} item.name {}', item.name);
               files.push(item.name);
            });
        }
        for (var i = 0; i < files.length; i++) { 
           var file = files[i];
           var outputFileName = file.replace(/\.[^/.]+$/, '') + (typeA ? '.mp3' : '.mp4');
           var outputFileFullPath = outputFolder + '/' + outputFileName;
           var inputFile = mediaFolder + inputFolder + file;
           addFile(convertBars(inputFile),(i+1)+'/'+files.length); 
        }
       }
    
    commandLines.push(ec + ' .');
    commandLines.push(ec + ' Arquivos salvos na pasta ' + s.output_folder);
    commandLines.push('start explorer "' + outputFolder.replace(/\//g, '\\') + '"');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' ====    Processamento Concluído    ==========');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' .');
    

    // Exporta o arquivo .bat
    h.exportTXT(commandLines.join('\n'), {
        name: 'converterCommands'
    });
   // return
    try {
        h.executeFile('.modules/swissconveter.bat');  // Executa o arquivo master do módulo
    } catch (e) {
        h.notificationError(i18n('Erro ao executar o arquivo BAT: {}', String(e)), 5);
    }
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22505054227d
function convertPPT2PNG(evt) {
    if (!checkOS()) {
        return;
    }
    var f = evt.item; 
    var s = module.settings;
    var mediaFolder = mediaPath();
    var cmdPath = mediaFolder + 'file/.modules'
    var inputFolder = convertBars(f.file_relative_path);
    
    if (inputFolder.indexOf("file/") === -1) {
       showMessage('Holyrics',jsc.i18n('O arquivo precisa estar na pasta "file" do holyrics'));
       return
    }
    
    h.log(mUID,'evt.item {}', h.toPrettyJson(f));

    if (!f.is_dir) {
       inputFolder = inputFolder.replace(f.file_name,"");
    } else {
      inputFolder = inputFolder + '/';
    }
     
    
    var outputFolder = mediaPath() + inputFolder.replace(/^file\//, "image/") + s.output_folder;    
    
    var commandLines = [];
    var ec = 'ec' + 'ho ';
    commandLines.push('@' + ec + ' off');
    commandLines.push('chcp 65001');  // Definindo o código de página UTF-8
    commandLines.push('setlocal enabledelayedexpansion');
    commandLines.push('for /f "tokens=*" %%D in (\'powershell -command "[Environment]::GetFolderPath(\'MyDocuments\')"\') do set DOCUMENTS_PATH=%%D');
    if (s.pngConverter === 'office') {
        commandLines.push('cd /d "%DOCUMENTS_PATH%\\Holyrics\\js"');
        commandLines.push('copy /y ConvertPPTXToPNG.txt ConvertPPTXToPNG.vbs');
        commandLines.push('del ConvertPPTXToPNG.txt ');
    }
    else {
        commandLines.push('cd /d "' + convertBars(inputFolder,true) + '"');
    }
    commandLines.push('cls');  // Limpa o console
   
    function addFile(file,index) {
       
        var inputFile = file; 
        var outputFile = convertBars(outputFileFullPath);
        
        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');        
        commandLines.push(ec + jsc.i18n('Processando arquivo') + ' ' + index);  
        commandLines.push(ec + '← ' + inputFile);  
        commandLines.push(ec + '→ ' + outputFile);  
        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');  
        commandLines.push('md "'+outputFile+'" 2>nul');
        if (s.pngConverter === 'office') {
            commandLines.push('cscript //nologo "%DOCUMENTS_PATH%\\Holyrics\\js\\ConvertPPTXToPNG.vbs" "' + convertBars(inputFile,true) + '" "' + convertBars(outputFile,true) + '\\"');
        }
        else {   
            var pdfFile = inputFile.replace(/\.[^\.]+$/, ".pdf");
            commandLines.push(convertBars('set path=%path%;"'+s.libre_folder+'"'));
            commandLines.push(convertBars('soffice --headless --convert-to pdf "' + inputFile + '" --outdir "' + mediaPath() + inputFolder.substring(0, inputFolder.length - 1) +'"',true));
            commandLines.push(convertBars(cmdPath + '/PDF2Image "' + pdfFile + '" "' + outputFolder + '"',true));                        
            commandLines.push(convertBars('del "' + pdfFile + '"', true));                        
        }
    }

    if (!f.is_dir) {
       var outputFileName = f.file_name.replace(/\.[^/.]+$/, '');
       var outputFileFullPath = outputFolder + '/' + outputFileName;
       addFile(convertBars(f.file_path),'1/1');
       }
    else
       {
        var filter = '.pptx,.ppt,.odp,.pdf';
        var folder = inputFolder.replace(/^video\/|^audio\//, '');
        var filterArr = filter.split(',');
        var files = [];
        for (var i = 0; i < filterArr.length; i++) {
            var currentFilter = filterArr[i];
            var fi = h.hly('GetFiles', { folder: folder, filter: currentFilter });
            fi.data.forEach(function(item) {
               h.log(mUID,'{%t} item.name {}', item.name);
               files.push(item.name);
            });
        }
        for (var i = 0; i < files.length; i++) { 
           var file = files[i];
           var outputFileName = file.replace(/\.[^/.]+$/, '');
           var outputFileFullPath = outputFolder + '/' + outputFileName;
           var inputFile = mediaFolder + inputFolder + file;
           addFile(convertBars(inputFile),(i+1)+'/'+files.length); 
        }
    }
    commandLines.push(ec + ' .');
    if (s.pngConverter === 'office') {
       commandLines.push('del ConvertPPTXToPNG.*');
       vbScriptCreator();
    }
    commandLines.push(ec + ' Arquivos salvos na pasta ' + s.output_folder);
    commandLines.push('start explorer "' + convertBars(outputFileFullPath,true) + '"');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' ====    Processamento Concluído    ==========');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' .');
    
    h.exportTXT(commandLines.join('\n'), {
        name: 'converterCommands'
    });
   // return
    try {
        h.executeFile('.modules/swissconveter.bat');  // Executa o arquivo master do módulo
    } catch (e) {
        h.notificationError(i18n('Erro ao executar o arquivo BAT: {}', String(e)), 5);
    }
}

function vbScriptCreator() {

var commandLines = [];
commandLines.push('Dim args, powerpoint, presentation, outputDir, slide, slideIndex');
commandLines.push('');
commandLines.push('Set args = WScript.Arguments');
commandLines.push('If args.Count <> 2 Then');
commandLines.push('    WScript.Echo "Uso: ConvertPPTXToPNG.vbs arquivo.pptx diretorio_de_saida"');
commandLines.push('    WScript.Quit 1');
commandLines.push('End If');
commandLines.push('');
commandLines.push('Set powerpoint = CreateObject("PowerPoint.Application")');
commandLines.push('powerpoint.Visible = True');
commandLines.push('');
commandLines.push('On Error Resume Next');
commandLines.push('Set presentation = powerpoint.Presentations.Open(args(0))');
commandLines.push('If Err.Number <> 0 Then');
commandLines.push('    WScript.Echo "Erro ao abrir o arquivo: " & args(0)');
commandLines.push('    powerpoint.Quit');
commandLines.push('    WScript.Quit 1');
commandLines.push('End If');
commandLines.push('On Error GoTo 0');
commandLines.push('');
commandLines.push('outputDir = args(1)');
commandLines.push('If Not CreateObject("Scripting.FileSystemObject").FolderExists(outputDir) Then');
commandLines.push('    CreateObject("Scripting.FileSystemObject").CreateFolder(outputDir)');
commandLines.push('End If');
commandLines.push('');
commandLines.push('\' Loop para exportar todos os slides');
commandLines.push('For slideIndex = 1 To presentation.Slides.Count');
commandLines.push('    Set slide = presentation.Slides(slideIndex)');
commandLines.push('    \' Exporta o slide para PNG');
commandLines.push('    slide.Export outputDir & "\Slide" & slideIndex & ".png", "PNG", 1920, 1080');
commandLines.push('Next');
commandLines.push('');
commandLines.push('presentation.Close');
commandLines.push('powerpoint.Quit');
commandLines.push('');
commandLines.push('WScript.Echo "Conversao concluida para o diretorio: " & outputDir');
commandLines.push('WScript.Quit 0');
h.exportTXT(commandLines.join('\n'), {
     name: 'ConvertPPTXToPNG'
});

}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22504446227d
function convertPDF2PNG(evt) {
    if (!checkOS()) {
        return;
    }
    var f = evt.item; 
    var s = module.settings;
    var mediaFolder = mediaPath();
    var cmdPath = mediaFolder + 'file/.modules'
    var inputFolder = convertBars(f.file_relative_path);
    
    if (inputFolder.indexOf("file/") === -1) {
       showMessage('Holyrics',jsc.i18n('O arquivo precisa estar na pasta "file" do holyrics'));
       return
    }
    
    h.log(mUID,'evt.item {}', h.toPrettyJson(f));

    if (!f.is_dir) {
       inputFolder = inputFolder.replace(f.file_name,"");
    } else {
      inputFolder = inputFolder + '/';
    }
     
    
    var outputFolder = mediaPath() + inputFolder.replace(/^file\//, "image/") + s.output_folder;    
    
    var commandLines = [];
    var ec = 'ec' + 'ho ';
    commandLines.push('@' + ec + ' off');
    commandLines.push('chcp 65001');  // Definindo o código de página UTF-8
    commandLines.push('setlocal enabledelayedexpansion');
    commandLines.push('cd /d "' + convertBars(inputFolder,true) + '"');
    commandLines.push('cls');  // Limpa o console
   
    function addFile(file,index) {
       
        var inputFile = file; 
        var outputFile = convertBars(outputFileFullPath);
        
        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');        
        commandLines.push(ec + jsc.i18n('Processando arquivo') + ' ' + index);  
        commandLines.push(ec + '← ' + inputFile);  
        commandLines.push(ec + '→ ' + outputFile);  
        commandLines.push(ec + '.');  
        commandLines.push(ec + '.');  
        commandLines.push('md "'+outputFile+'" 2>nul');
        var pdfFile = inputFile.replace(/\.[^\.]+$/, ".pdf");
        commandLines.push(convertBars(cmdPath + '/PDF2Image "' + inputFile + '" "' + outputFolder + '"',true));                        
        
    }

    if (!f.is_dir) {
       var outputFileName = f.file_name.replace(/\.[^/.]+$/, '');
       var outputFileFullPath = outputFolder + '/' + outputFileName;
       addFile(convertBars(f.file_path),'1/1');
       }
    else
       {
        var filter = '.pdf';
        var folder = inputFolder.replace(/^video\/|^audio\//, '');
        var filterArr = filter.split(',');
        var files = [];
        for (var i = 0; i < filterArr.length; i++) {
            var currentFilter = filterArr[i];
            var fi = h.hly('GetFiles', { folder: folder, filter: currentFilter });
            fi.data.forEach(function(item) {
               h.log(mUID,'{%t} item.name {}', item.name);
               files.push(item.name);
            });
        }
        for (var i = 0; i < files.length; i++) { 
           var file = files[i];
           var outputFileName = file.replace(/\.[^/.]+$/, '');
           var outputFileFullPath = outputFolder + '/' + outputFileName;
           var inputFile = mediaFolder + inputFolder + file;
           addFile(convertBars(inputFile),(i+1)+'/'+files.length); 
        }
    }
    commandLines.push(ec + ' Arquivos salvos na pasta ' + s.output_folder);
    commandLines.push('start explorer "' + convertBars(outputFileFullPath,true) + '"');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' ====    Processamento Concluído    ==========');
    commandLines.push(ec + ' ===========================================');
    commandLines.push(ec + ' .');
    h.exportTXT(commandLines.join('\n'), {
        name: 'converterCommands'
    });
   // return
    try {
        h.executeFile('.modules/swissconveter.bat');  // Executa o arquivo master do módulo
    } catch (e) {
        h.notificationError(i18n('Erro ao executar o arquivo BAT: {}', String(e)), 5);
    }
}