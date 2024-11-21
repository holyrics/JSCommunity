function getModuleInfoDescription(moduleId) {
  //Converter todos os PDFs para imagem - Holyrics 2.23.1-
  if (moduleId === "U29saSBEZW8gR2xvcmlh") return '<html><h1>Conversor de PDF para imagens</h1><h2><img src="icon,warning,16"><img src="icon,warning,16"> Avisos e alertas <img src="icon,warning,16"><img src="icon,warning,16"></h2><p><img src="icon,desktop_windows,16">Módulo exclusivo para utilização no sistema operacional windows<img src="icon,window,16"></p><p>Este módulo utiliza de programas externos para fazer a conversão de arquivo, utilize por sua conta e risco</p><p>Evite utilizar acentuação nos nomes dos arquivos PDFs</p><hr><h2>Requisitos para executar o módulo</h2><p>Baixe o <a href="https://aka.ms/dotnet-core-applaunch?missing_runtime=true&arch=x64&rid=win-x64&os=win10&apphost_version=8.0.10">.NET 8</a> e instale</p><p>Baixe o executavel <a href="https://github.com/SrTonn/PDF2Image/releases">PDF2Image</a> e salve na pasta C:\\Holyrics\\PDF2Image\\</p><p>OBS: a pasta PDF2Image não existe, crie e guarde o arquivo lá para facilitar o uso do script</p><p>OBS²: caso queira salvar o arquivo PDF2Image.exe em outro local, atente-se em mudar as referências do arquivo dentro dos arquivos .BAT</p><hr><h2>Liberando funcionalidades avançadas no holyrics</h2>Para execução de arquivo batch(.bat) é necessário liberar essa opção dentro do holyrics<p>Adicione a escrita "bat" na lista de extensões permitidas pelo programa holyrics</p><p>Volte ao inicio do programa e siga esse caminho para encontrar a configuração avançada</p><p>arquivo>configuracoes>avançado>\u006aavascript>configurações>permissões avançadas>editar</p><p>Lembre-se de separar por virgula, ficaria parecido com isso: ... xml, zip, bat</p><hr><h2>Criando os arquivos BAT</h2><p>Crie 2 arquivos .txt, um dê o nome de PDF2Image e MultiplesPDF2Image para o outro, salve-os na pasta arquivos tela inicial do programa(onde ficam os PDFs e demais arquivos).</p><p>Para o arquivo MultiplesPDF2Image.txt preencha com o conteúdo desse <a href="https://gist.githubusercontent.com/SrTonn/3f07aafd78e462ca90e9f5106c4c9062/raw/8ae46eb959dc71d56448046782ffad5ebd70bcb9/MultiplesPDF2Image.bat">link</a> e PDF2Image.txt com esse outro <a href="https://gist.githubusercontent.com/SrTonn/3f07aafd78e462ca90e9f5106c4c9062/raw/8ae46eb959dc71d56448046782ffad5ebd70bcb9/PDF2Image.bat">link</a></p><p>Caso seu holyrics não esteja instalado no caminho C:\\Holyrics será necessário substituir os caminhos dentro dos arquivos .txt para o local onde o seu holyrics esteja instalado !</p><p>Após ter confirmado que os caminhos estão corretos dentro do bat, basta renomear os arquivos .txt para .bat</p><h3>Seu conversor de PDF está pronto para uso !</h3></html>';
  //Converter todos os PDFs para imagem - Holyrics 2.24.0+
  if (moduleId === "X1NvbGkgRGVvIEdsb3JpYV8=") return '<html><h1>Conversor de PDF para imagens</h1><h2><img src="icon,warning,16"><img src="icon,warning,16"> Avisos e alertas <img src="icon,warning,16"><img src="icon,warning,16"></h2><p><img src="icon,desktop_windows,16">Módulo exclusivo para utilização no sistema operacional windows<img src="icon,window,16"></p><p>Este módulo utiliza de programas externos para fazer a conversão de arquivo, utilize por sua conta e risco</p><hr><h2>Requisitos para executar o módulo</h2><p>Baixe o <a href="https://aka.ms/dotnet-core-applaunch?missing_runtime=true&arch=x64&rid=win-x64&os=win10&apphost_version=8.0.10">.NET 8</a> e instale.</p><p>Baixe o executavel <a href="https://github.com/SrTonn/PDF2Image/releases">PDF2Image</a></p><hr><h2>Configurações necessárias</h2><ol><li>Salve o arquivo PDF2Image na pasta C:\\Holyrics\\Holyrics\\files\\media\\file\\PDF2Image</li><li>Abra as configurações do módulo e clique no botão "Abrir configurações de permissões", em seguida selecione o arquivo PDF2Image através do botão adicionar</li><p>O caminho será parecido ou igual a este: PDF2Image/PDF2Image.exe</p></ol><p>OBS: Abra a pasta arquivo do holyrics através da interface, vá até a tela principal e procure pela aba arquivo, clique no icone de pasta, crie uma pasta lá dentro e cole o executavel</p><p>OBS²: O arquivo exe pode ser salvo em qualquer subpasta a partir do local arquivo, caso opte por guardar o arquivo em uma pasta diferente da sugerida nesse tutorial é necessário informar o caminho correto nas configurações do módulo.</p><h4>Seu conversor de PDF está pronto para uso !</h4></html>';
}

var removeExtension = (inputStr) => replaceLastOccurrence(inputStr, ".pdf", "").trim()

function replaceLastOccurrence(inputStr, searchStr, replacementStr) {
  var result;
  searchStr = searchStr.toLowerCase();
  var originalStr = inputStr.toLowerCase();
  var lastIndex = originalStr.lastIndexOf(searchStr);
  if (!inputStr.endsWith(searchStr)) {
    return inputStr; // The substring is not found
  }

  result = inputStr.slice(0, lastIndex) + replacementStr + inputStr.slice(lastIndex + searchStr.length);
  //recursive
  // if (endsWith(result, searchStr)) return replaceLastOccurrence(result, searchStr, replacementStr);

  return (
    result
  );
}

function toggleLogState(id, log){ 
  h.log.setEnabled(id, log);
}