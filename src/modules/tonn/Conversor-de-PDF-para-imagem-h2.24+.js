//#import utils

var mID = 'X1NvbGkgRGVvIEdsb3JpYV8='

function startup(module) {
  toggleLogState(mID, module.settings.ENABLE_LOG_OPTION);
}

function info() {
  return {
    id: mID,
    name: jsc.i18n('Converter todos os PDFs para imagem'),
    description: getModuleInfoDescription(mID),
    min_version: '2.24.0'
  };
}

function settings(module) {
  return [
    {
      id: 'DISABLE_ORIGINAL_PDF_READER',
      type: 'boolean',
      label: jsc.i18n('Desativar leitor de PDF padrão'),
      description: jsc.i18n('Substitui o comportamento original do leitor de PDF por uma conversão seguida de apresentação.'),
      checked: 'true'
    }, {
      type: 'separator'
    }, {
      id: 'ENABLE_CONVERT_ALL_PDFS',
      type: 'boolean',
      label: jsc.i18n('Ativar conversão de todos os PDFs'),
      description: jsc.i18n('Habilita um botão para converter todos os PDFs da pasta de origem para a pasta de destino (em imagens).'),
      checked: 'true'
    }, {
      id: 'ENABLE_CONVERT_SELECTED_PDF',
      type: 'boolean',
      label: jsc.i18n('Ativar conversão de PDF selecionado'),
      description: jsc.i18n('Converte o PDF selecionado para imagens. (não exibe o resultado em seguida)'),
      checked: 'true'
    }, {
      type: 'separator'
    }, {
      id: 'EXECUTABLE_EXTRA_ARGS',
      type: 'string',
      label: jsc.i18n('Argumentos extras para o executável'),
      description: jsc.i18n('Só insira valores aqui se souber o que está fazendo, doc: [doc](https://github.com/SrTonn/PDF2Image/blob/main/README.md)'),
      default_value: '--prefix=[new] ;--clear'
    }, {
      type: 'separator'
    }, {
      id: 'PDF_TO_IMAGE_EXECUTABLE',
      type: 'string',
      label: jsc.i18n('Executável para conversão de PDF para imagens'),
      description: jsc.i18n('Caminho do arquivo executável (.exe) usado para converter PDFs em imagens. Valor padrão: PDF2Image/PDF2Image.exe.'),
      default_value: 'PDF2Image\\PDF2Image.exe'
    }, {
      id: 'HOLYRICS_INSTALL_PATH_BASE',
      type: 'string',
      label: jsc.i18n('Caminho de instalação do Holyrics'),
      description: jsc.i18n('Define o diretório base de instalação do programa Holyrics.'),
      default_value: 'C:\\Holyrics\\'
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
    }, {
      id: 'OPEN_ALLOW_FILE_OPTIONS',
      type: 'button',
      name: 'Configurações de permissões',
      button_label: jsc.i18n('Abrir'),
      action: function() { 
        h.openWindow('js_allowed_files');
      }
    }
  ];
}

function actions(module) {
  var actions = [];

  if (!module.settings.ENABLE_CONVERT_ALL_PDFS) return actions;

  actions.push({
    id: 'MultiplesPDF2Image',
    name: jsc.i18n('Converter todos os PDFs para imagem'),
    icon: 'picture_as_pdf',
    action: function (evt) {
      h.popupWorker({
        action: function (evtFn) {
          var exeFileName = module.settings.PDF_TO_IMAGE_EXECUTABLE;
          var installPath = module.settings.HOLYRICS_INSTALL_PATH_BASE;
          var filePath = installPath + "Holyrics\\files\\media\\file";
          var imagePath = installPath + "Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

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

  return actions;
}

function contextActions(module) {
  var arr = [];

  if (!module.settings.ENABLE_CONVERT_SELECTED_PDF) return arr;

  arr.push({
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
          var exeFileName = module.settings.PDF_TO_IMAGE_EXECUTABLE;
          var holyricsInstallPathBase = module.settings.HOLYRICS_INSTALL_PATH_BASE;
          var fileFullName = evt.item.file_fullname;
          var filePath = holyricsInstallPathBase + "Holyrics\\files\\media\\file\\" + fileFullName;
          var imagePath = holyricsInstallPathBase + "Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

          var isValid = validateIfFileExistsAndIsAllowed(exeFileName);
          if (!isValid) return result;

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

  return arr;
}

// double click handle
function handleItemAction() {
  return {
    file: function (evt) {
      if (!(module.settings.DISABLE_ORIGINAL_PDF_READER && evt.item.extension.toLowerCase() === "pdf")) return false;
      h.popupWorker({
        action: function (evtFn) {
          var exeFileName = module.settings.PDF_TO_IMAGE_EXECUTABLE;
          var holyricsInstallPathBase = module.settings.HOLYRICS_INSTALL_PATH_BASE;
          var fileFullName = evt.item.file_fullname;
          var filePath = holyricsInstallPathBase + "Holyrics\\files\\media\\file\\" + fileFullName;
          var imagePath = holyricsInstallPathBase + "Holyrics\\files\\media\\image";
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");

          var result = {
            fileFullName: fileFullName
          }
          var isValid = validateIfFileExistsAndIsAllowed(exeFileName);
          if (!isValid) return result;

          var wasFileConvertBefore = validateIfExistsFilesInOutputFolder(evt.item.file_name, extraArgsArr);
          if (wasFileConvertBefore) {
            result.isSuccess = true
            return result;
          }

          var allArgs = [filePath, imagePath].concat(extraArgsArr)
          result.isSuccess = runFileAsync(exeFileName, allArgs)

          return result;
        },
        callback: function (response, err) {
          if (err) {
            h.log(mID, "err: {}", [err])
            handleError(jsc.i18n("Algo deu errado durante a conversão do arquivo."));
          }
          var extraArgsArr = module.settings.EXECUTABLE_EXTRA_ARGS.split(";");
          if (response.isSuccess) {
            // var imageName = getPrefixArgument(extraArgsArr) + removeExtension(response.fileFullName)
            var imageName = getOutputFolderName(response.fileFullName, extraArgsArr);
            h.showImage(imageName);
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

function validateIfFileExistsAndIsAllowed(filePath) {
  var isAllowed = h.isAllowedFileToExecute(filePath);
  if (!isAllowed) {
    h.openWindow('js_allowed_files');
    h.notification(jsc.i18n("Adicione o executável a lista de arquivos permitidos do holyrics."));
  }
  var fileExists = h.fileExists(filePath);
  if (!fileExists) {
    h.notification(jsc.i18n("O executável não foi encontrado no caminho indicado: {}", [filePath]));
  }

  return isAllowed && fileExists;
}

function handleError(err, timeout) {
  timeout = timeout || 10;
  h.notificationError(String(err), timeout);
}

function runFileAsync(fileName, argsArr) {
  return h.process(fileName, {
    cli: argsArr,
    on_message: function (buf) {
      h.log(mID, "[PDF2Image.exe|Message]: " + buf.readString());
    },
    on_error: function (buf) {
      h.log(mID, "[PDF2Image.exe|Error]: " + buf.readString());
    },
    on_finish: function (code) {
      // h.log(mID, "on_finish " + code);
    },
    //timeout: 60000
  }).await();
}