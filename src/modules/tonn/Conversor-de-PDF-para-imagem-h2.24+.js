//#import utils
//#import module_description_pdf2image_new

var mID = 'X1NvbGkgRGVvIEdsb3JpYV8='

function startup(module) {
  toggleLogState(mID, module.settings.ENABLE_LOG_OPTION);
}

function info() {
  var moduleInfos = getModuleInfo();

  return {
    id: mID,
    name: moduleInfos.name,
    description: moduleInfos.description,
    min_version: '2.24.0',
    available_in_bible_window: false,
    permissions: [
      {
        type: 'advanced',
        key: 'allowed_files'
      }
    ],
    i18n: moduleInfos.i18n
  };
}

function settings(module) {
  return [
    {
      id: 'DISABLE_ORIGINAL_PDF_READER',
      type: 'boolean',
      label: jsc.i18n('Desativar leitor de PDF padrão'),
      description: jsc.i18n('Substitui o comportamento original do leitor de PDF por uma conversão seguida de apresentação.'),
      default_value: 'true'
    }, {
      type: 'separator'
    }, {
      id: 'ENABLE_CONVERT_ALL_PDFS',
      type: 'boolean',
      label: jsc.i18n('Ativar conversão de todos os PDFs'),
      description: jsc.i18n('Habilita um botão para converter todos os PDFs da pasta de origem para a pasta de destino (em imagens).'),
      default_value: 'true'
    }, {
      id: 'ENABLE_CONVERT_SELECTED_PDF',
      type: 'boolean',
      label: jsc.i18n('Ativar conversão de PDF selecionado'),
      description: jsc.i18n('Converte o PDF selecionado para imagens. (não exibe o resultado em seguida)'),
      default_value: 'true'
    }, {
      type: 'separator'
    }, {
      id: 'EXECUTABLE_EXTRA_ARGS',
      type: 'string',
      label: jsc.i18n('Argumentos extras para o executável'),
      description: jsc.i18n('Só insira valores aqui se souber o que está fazendo') + ', doc: [doc](https://github.com/SrTonn/PDF2Image/blob/main/README.md)',
      default_value: '--prefix=[new] ;--clear'
    }, {
      type: 'separator'
    }, {
      id: 'ENABLE_LOG_OPTION',
      label: jsc.i18n('Habilitar log'),
      type: 'boolean',
      onchange: function (obj) {
        toggleLogState(mID, obj.input.ENABLE_LOG_OPTION);
      }
    }, {
      type: 'separator'
    }
  ];
}

function actions(module) {
  var actionArr = [];

  if (!module.settings.ENABLE_CONVERT_ALL_PDFS) return actionArr;

  actionArr.push({
    id: 'MultiplesPDF2Image',
    name: jsc.i18n('Converter todos os PDFs para imagem'),
    icon: 'picture_as_pdf',
    action: function (evt) {
      h.popupWorker({
        action: function (evtFn) {
          var installPath = h.hly('GetVersion').data.baseDir;
          var filePath = installPath + "\\Holyrics\\files\\media\\file";
          var imagePath = installPath + "\\Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

          var allowedFiles = module.getAllowedFiles()
          var isValid = isFileAllowed(allowedFiles);
          if (!isValid) return;

          var exeFileName = allowedFiles[0];

          var allArgs = [filePath, imagePath].concat(extraArgsArr)
          runFileAsync(exeFileName, allArgs)
        },
        callback: function (response, err) {
          if (err) {
            h.log(mID, "err: {}", [err])
            handleError(jsc.i18n("Algo deu errado durante a conversão dos arquivos."));
          }
        },
      });

    }
  });

  return actionArr;
}

function contextActions(module) {
  var ctxActionArr = [];

  if (!module.settings.ENABLE_CONVERT_SELECTED_PDF) return ctxActionArr;

  ctxActionArr.push({
    name: jsc.i18n('Converter para imagem'),
    types: ['file'],
    filter: {
      item: {
        extension: '--rgx PDF'
      }
    },
    action: function (evt) {
      h.popupWorker({
        action: function (evtFn) {
          var holyricsInstallPathBase = h.hly('GetVersion').data.baseDir;
          var fileFullName = evt.item.file_fullname;
          var filePath = holyricsInstallPathBase + "\\Holyrics\\files\\media\\file\\" + fileFullName;
          var imagePath = holyricsInstallPathBase + "\\Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

          var allowedFiles = module.getAllowedFiles()
          var isValid = isFileAllowed(allowedFiles);
          if (!isValid) return;

          var exeFileName = allowedFiles[0];

          var allArgs = [filePath, imagePath].concat(extraArgsArr)
          runFileAsync(exeFileName, allArgs)
        },
        callback: function (response, err) {
          if (err) {
            h.log(mID, "err: {}", [err])
            handleError(jsc.i18n("Algo deu errado durante a conversão do arquivo."));
          }
        },
      });

    }
  });

  return ctxActionArr;
}

// double click handle
function handleItemAction() {
  return {
    file: function (evt) {
      if (!(module.settings.DISABLE_ORIGINAL_PDF_READER && evt.item.extension.toLowerCase() === "pdf")) return false;

      h.popupWorker({
        action: function (evtFn) {
          var holyricsInstallPathBase = h.hly('GetVersion').data.baseDir;

          var fileFullName = evt.item.file_fullname;
          var filePath = holyricsInstallPathBase + "\\Holyrics\\files\\media\\file\\" + fileFullName;
          var imagePath = holyricsInstallPathBase + "\\Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

          var wasFileConvertBefore = validateIfExistsFilesInOutputFolder(evt.item.file_name, extraArgsArr);
          var imageName = getOutputFolderName(fileFullName, extraArgsArr);
          if (wasFileConvertBefore) {
            h.showImage(imageName);
            return;
          }

          var allowedFiles = module.getAllowedFiles()
          var isValid = isFileAllowed(allowedFiles);
          if (!isValid) return;

          var exeFileName = allowedFiles[0];

          var allArgs = [filePath, imagePath].concat(extraArgsArr)
          runFileAsync(exeFileName, allArgs, { showImage: true, imageName: imageName })

          return null;
        },
        callback: function (response, err) {
          if (err) {
            h.log(mID, "err: {}", [err])
            handleError(jsc.i18n("Algo deu errado durante a conversão do arquivo."));
          }
        },
      });

      return true;
    }
  };
}

function getOutputFolderName(fileFullName, extraArgsArr) {
  return getPrefixArgument(extraArgsArr) + removeExtension(fileFullName)
}

function validateIfExistsFilesInOutputFolder(fileName, extraArgsArr) {
  var response = h.hly('GetImages', { folder: getPrefixArgument(extraArgsArr) + removeExtension(fileName) });
  if (response.data.length === 0) return false;
  var result = hofSomeFn(response.data);
  return result;
}

function getPrefixArgument(argArr) {
  var prefix = '';
  // function includes
  argArr.forEach(function (item) {
    if (item.indexOf('--prefix=') === 0) {
      prefix = item.split('prefix=')[1];
    }
  })

  return prefix.replace('%20', ' ');
}

function hofSomeFn(arr) {
  var hasSomeFile = false;
  for (let i = 0; i < arr.length; i++) {
    var element = arr[i];
    if (element.isDir == false) {
      hasSomeFile = true
      break;
    }
  }
  return hasSomeFile;
}

function isFileAllowed(allowedFiles) {
  if (allowedFiles.length !== 1) {
    h.setTimeout(function () {
      if (h.yesNo(jsc.i18n("Configure apenas o arquivo PDF2Image.exe na lista de arquivos permitidos. Deseja ir para as configurações?"), jsc.i18n("Abrir janela de configurações de arquivos permitidos."))) {
        module.openSettings('allowed_files');
      }
    }, 0);
    return false;
  }

  var isAllowed = allowedFiles[0].toLowerCase().endsWith("pdf2image.exe")
  if (!isAllowed) {
    h.setTimeout(function () {
      if (h.yesNo(jsc.i18n("O arquivo PDF2Image.exe não foi identificado, deseja ir para as configurações?"), jsc.i18n("Abrir janela de configurações de arquivos permitidos."))) {
        module.openSettings('allowed_files');
      }
    }, 0);
  }

  return isAllowed;
}

function handleError(err, timeout) {
  timeout = timeout || 10;
  h.notificationError(String(err), timeout);
}

function runFileAsync(exeFileName, argsArr, imgOptions) {
  imgOptions = imgOptions || {};
  imgOptions.showImage = imgOptions.showImage || false;
  return module.process(exeFileName, {
    cli: argsArr,
    on_message: function (buf) {
      h.log(mID, "[PDF2Image.exe|Message]: " + buf.readString());
    },
    on_error: function (buf) {
      h.log(mID, "[PDF2Image.exe|Error]: " + buf.readString());
    },
    on_finish: function (code) {
      h.log(mID, "[ResultProcessCode]: " + code);
      var wasSuccess = code === 0;
      if (wasSuccess && imgOptions.showImage) {
        h.showImage(imgOptions.imageName);
      }
    },
    //timeout: 60000
  }).await();
}