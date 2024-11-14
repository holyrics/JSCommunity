function info() {
  return {
    id: 'U29saSBEZW8gR2xvcmlh',
    name: 'Conversor de PDF para imagem',
    description: "<html><h1>Conversor de PDF para imagens</h1><h2><img src='icon,warning,16'><img src='icon,warning,16'> Avisos e alertas <img src='icon,warning,16'><img src='icon,warning,16'></h2><p><img src='icon,desktop_windows,16'>Módulo exclusivo para utilização no sistema operacional windows<img src='icon,window,16'></p><p>Este módulo utiliza de programas externos para fazer a conversão de arquivo, utilize por sua conta e risco</p><p>Evite utilizar acentuação nos nomes dos arquivos PDFs</p><hr><h2>Requisitos para executar o módulo</h2><p>Baixe o <a href='https://aka.ms/dotnet-core-applaunch?missing_runtime=true&arch=x64&rid=win-x64&os=win10&apphost_version=8.0.10'>.NET 8</a> e instale</p><p>Baixe o executavel <a href='https://github.com/SrTonn/PDF2Image/releases'>PDF2Image</a> e salve na pasta C:\\Holyrics\\PDF2Image\\</p><p>OBS: a pasta PDF2Image não existe, crie e guarde o arquivo lá para facilitar o uso do script</p><p>OBS²: caso queira salvar o arquivo PDF2Image.exe em outro local, atente-se em mudar as referências do arquivo dentro dos arquivos .BAT</p><hr><h2>Liberando funcionalidades avançadas no holyrics</h2>Para execução de arquivo batch(.bat) é necessário liberar essa opção dentro do holyrics<p>Adicione a escrita 'bat' na lista de extensões permitidas pelo programa holyrics</p><p>Volte ao inicio do programa e siga esse caminho para encontrar a configuração avançada</p><p>arquivo>configuracoes>avançado>\u006aavascript>configurações>permissões avançadas>editar</p><p>Lembre-se de separar por virgula, ficaria parecido com isso: ... xml, zip, bat</p><hr><h2>Criando os arquivos BAT</h2><p>Crie 2 arquivos .txt, um dê o nome de PDF2Image e MultiplesPDF2Image para o outro, salve-os na pasta arquivos tela inicial do programa(onde ficam os PDFs e demais arquivos).</p><p>Para o arquivo MultiplesPDF2Image.txt preencha com o conteúdo desse <a href='https://gist.githubusercontent.com/SrTonn/3f07aafd78e462ca90e9f5106c4c9062/raw/8ae46eb959dc71d56448046782ffad5ebd70bcb9/MultiplesPDF2Image.bat'>link</a> e PDF2Image.txt com esse outro <a href='https://gist.githubusercontent.com/SrTonn/3f07aafd78e462ca90e9f5106c4c9062/raw/8ae46eb959dc71d56448046782ffad5ebd70bcb9/PDF2Image.bat'>link</a></p><p>Caso seu holyrics não esteja instalado no caminho C:\\Holyrics será necessário substituir os caminhos dentro dos arquivos .txt para o local onde o seu holyrics esteja instalado !</p><p>Após ter confirmado que os caminhos estão corretos dentro do bat, basta renomear os arquivos .txt para .bat</p><h3>Seu conversor de PDF está pronto para uso !</h3></html>",
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
    icon: 'task',
    action: function (evt) {
      var s = module.settings;
      h.log("module.settings: " + module.settings)
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
      var fileName = "PDF2Image.bat";
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