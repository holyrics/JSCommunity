//#import utils

var mID = 'U29saSBEZW8gR2xvcmlh'

function info() {
  return {
    id: mID,
    name: 'Conversor de PDF para imagem',
    description: getModuleInfoDescription(mID),
    max_version: "2.23.1"
  };
}

function settings(module) {
  var arr = [
    {
      name: 'Opções para salvar os arquivos .bat em subpasta ou com nome diferente do padrão(MultiplesPDF2Image.bat|PDF2Image.bat)',
      description: 'Exemplo do arquivo .bat dentro de uma subPasta: NomeDaSuaSubPastaAqui/MultiplesPDF2Image.bat',
      type: 'label'
    }, {
      type: 'separator'
    }, {
      id: 'MultiplesPDF2Image',
      label: '(opcional) Informe o nome do arquivo .bat de conversão de múltiplos PDFs',
      type: 'string',
      description: 'Esse campo é opcional, o valor padrão é MultiplesPDF2Image.bat',
      default_value: 'MultiplesPDF2Image.bat'
    }, {
      id: 'PDF2Image',
      label: '(opcional) Informe o nome do arquivo .bat de conversão de um único PDF',
      type: 'string',
      description: 'Esse campo é opcional, o valor padrão é PDF2Image.bat',
      default_value: 'PDF2Image.bat'
    }
  ];
  return arr;
}

function actions(module) {
  var arr = [];

  arr.push({
    id: 'MultiplesPDF2Image',
    name: 'Converter todos os PDFs para imagem',
    icon: 'picture_as_pdf',
    action: function (evt) {
      var fileName = module.settings.MultiplesPDF2Image || "MultiplesPDF2Image.bat";
      if (!h.fileExists(fileName)) {
        h.notification("O arquivo " + fileName + " não foi encontrado na pasta de arquivos do holyrics", 10)
        return;
      }
      try {
        runFile(fileName);
      } catch (e) {
        h.notificationError(String(e), 5);
      }
    }
  });

  return arr;
}

function contextActions(module) {
  var arr = [];

  arr.push({
    name: 'Converter para imagem',
    types: ['file'],
    action: function (evt) {
      var fileName = module.settings.PDF2Image || "PDF2Image.bat";
      if (!h.fileExists(fileName)) {
        h.notification("O arquivo " + fileName + " não foi encontrado na pasta de arquivos do holyrics", 10)
        return;
      }
      try {
        h.exportTXT(evt.item.file_path, {
          name: "pdfFilePathToConvert"
        });
        runFile(fileName);
      } catch (e) {
        h.notificationError(String(e), 5);
      }
    }
  });

  return arr;
}

function runFile(fileName) {
  var r = h.executeFile(fileName)
  if (r.status != 'ok') throw r.error;
}