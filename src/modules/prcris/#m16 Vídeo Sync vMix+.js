// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
var mID = '@prcris#m16';  
var mUID = '@prcris#m16';  

//#import modules_generic_functions
//#import plugin_video_resources

function startup(module) { 

mUID = mID + module.id;
logState(module.settings.log, mUID,'startup '+ mID);

if (isDev() && module.settings.log && module.isEnabled()) { 
   h.openWindow('js_monitor');    
}

}

function info() {
    return {
        id: mID,
        name: 'Vídeo Sync vMix+',
        description: '<html>'+
                     '• Exibe um vídeo em uma cena previamente configurada no vMix simultaneamente à exibição no Holyrics.<br>'+
                     '• Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>'+
                     '• Aceita fila de vídeos.<br>'+
                     '• Aceita interromper o vídeo.<br>'+
                     '• Aceita enviar outro vídeo enquanto um está passando, fazendo a troca imediata.<br>'+
                     '• Quando termina o vídeo no Holyrics, ativa cena anterior.<br>'+
                     '• Possui botão de pânico para interromper vídeo no vMix sem interferir no telão, ativando a cena anterior.<br>'+
                     '<hr><b><u>Configurações para uso:</u></b><br>' +
                     '<p style="padding-left: 30px;">• Crie 2 inputs(entrada) do tipo Browser(Navegador) e coloque na url: '+
                     '<u>about:blank</u> e defina um nome para cada input(entrada), ex: <u>Holyrics Video 1</u> e <u>Holyrics Video 2</u>.<br>'+
                     '• No holyrics, configure um receptor para se comunicar com o vmix (copie o endereço exato da tela de configuração do vMix, em settings, Web Controller) e selecione os inputs(entrada) criados no vmix.<br>'+
                     '• A partir deste ponto, os vídeos serão exibidos simultaneamente no vMix.<br></p>'+
                     '• Fique atento às suas configurações de firewall e rede, pois na maioria das vezes é isto que bloqueia a comunicação entre dois computadores.'+
                     '<br><br><b>Observação:</b> O uso de 2 inputs se deve ao fato do vMix não possuir função do vídeo ocupar a tela toda, então '+
                     'estou utilizando o comando ZOOM para ajustar o vídeo ao tamanho da tela se necessário, '+
                     'o que só pode ser feito se a cena não estiver no "ao vivo", então o módulo sempre alterna entre estes dois inputs.<br>'+
                     infoVDDMM
    };
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir texto no telão e vMix
function triggers(module) {
  startup(module);
  
  var arr = [];
  arr.push({
    id: "video_show_vmix_" + mUID,
    when: "displaying",
    item: "any_video",
    action: function(obj) {
      vmixVideo(module, true, obj.file_fullname);
       module.updatePanel();
    }
  });

  return arr; // Retorna o array de triggers
}


// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2273657474696e6773227d
function settings() {
    return [
        {
            name: 'Sobre ' + mID,
            description: "<html><hr>@ Para mais informações sobre automação com holyrics, visite <br><a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        }, 
        {
            type: 'title',
            label: '<html>Configurações no vMix:'
        }, 
        {
            id: 'receiver_id',
            name: 'vMIX',
            description: 'Nome do receptor do vMix.',
            type: 'receiver',
            receiver: 'vMix'
        }, 
        {       
            id: 'scene_name1',
            name: jsc.i18n('Primeira Entrada'),
            description: 'Escolha a primeira Entrada(input) do vMix para passar o vídeo.',
            type: 'string',
            suggested_values: function(obj) {
                return getInputBrowser(obj.input.receiver_id);
            }
        },
        {       
            id: 'scene_name2',
            name: jsc.i18n('Segunda Entrada'),
            description: 'Escolha a segunda Entrada(input) do vMix para passar o vídeo.',
            type: 'string',
            suggested_values: function(obj) {
                return getInputBrowser(obj.input.receiver_id);
            }
        },

        {       
            id: 'output_resolution',
            name: jsc.i18n('Resolução de Saída'),
            description: 'Escolha a resolução de saída do seu vMix.',
            type: 'integer',
            allowed_values: [
               { value: 2160, label: '2160p (4K): 3840 x 2160' },
               { value: 1440, label: '1440p (2K): 2560 x 1440' },
               { value: 1080, label: '1080p (FHD): 1920 x 1080' },
               { value: 720, label: '720p (HD): 1280 x 720' }
             ],
            default_value : 1080
        },
        {        
            id: 'exclamation_mark',
            label: jsc.i18n('Enviar para o vMix:'),
            description: 'Dá a opção de enviar apenas alguns vídeos ou pastas para o vMix',
            type: 'string',
            allowed_values: [
                { value: true , label: 'Apenas vídeos com ! no nome ou na pasta' },
                { value: false , label: 'Apenas vídeos sem ! no nome ou na pasta' }
            ],
            default_value: false
        },
        {
            id: 'samePC',
            label: 'Holyrics e vMix no mesmo computador',
            type: 'boolean'
        },{
            type: 'separator'
        }, 
        {
            id: 'log',
            label: 'Habilitar log',
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID,'onchange '+ mID); // Habilita ou desabilita o log de acordo com a configuração  
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function vmixVideo(module, show, mediaName) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var pSettings = getPluginSettings();
   
    var lastScene = h.getGlobal(mUID + '_lastScene', 1);
    var p2 = lastScene == 1 ? s.scene_name2 : s.scene_name1;
    h.setGlobal(mUID + '_lastScene', lastScene == 1 ? 2 : 1);
    h.log(mUID, "Cena selecionada {}", p2);

    if (!show) { 
        if (gsJump()) {
            h.log(mUID, "======= Execução de vídeo no vMix interrompida pelo botão de pânico, voltando para a cena {}", gsJump());
            h.notification("Execução de vídeo no vMix interrompida pelo botão de pânico.", 3);
            restorePreviousScene(module); 
        }
        return;
    }

    h.log(mUID, "exclamation_mark: {} , mediaName: {}", s.exclamation_mark, mediaName);
    h.log(mUID, "mediaName.indexOf('!') {}", mediaName.indexOf('!'));
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o vMix
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {  //caso não possua
           h.log(mUID, "======= Vídeo não enviado para o vMix por NÃO possuir ! no nome.");
           restorePreviousScene(module); 
           return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o vMix
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) { //caso possua:
           h.log(mUID, "======= Vídeo não enviado para o vMix por POSSUIR ! no nome.");
           restorePreviousScene(module); 
           return;
    }
    var heigth = getVideoHeigth(mediaName);
    var zoom = calculateZoom(s.output_resolution,heigth);
    var url = createURL(pSettings, mediaName, s.samePC);
    var previousScene = jsc.vmix.getActiveInputName(p1);
    
/*    
    if (gsJump()) {
       h.log(mUID,"++++++++++++++++++  Vídeo novo sendo executado com vídeo ainda passando.");
       setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
       jsc.vmix.setActiveInput(p1, p2); 
       h.sleep(500);
    } 
*/
    
    if (previousScene != s.scene_name2 && previousScene != s.scene_name1) { // nunca captura a cena do video
        gsJump(previousScene); 
        h.log(mUID,"Cena atual capturada: {}", previousScene);
    }
         
    sendVideo(p1,p2,url);  // configura o vídeo na cena browser
    setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
    jsc.vmix.setInput(p1, p2, "Fade", 1000);  // ativa a cena(input) no vmix
    
    sendVideo(p1, lastScene == 2 ? s.scene_name2 : s.scene_name1, "about:blank");  //limpa eventual resíduo na cena anterior
    
    h.setTimeout(function() {
         setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
         jsc.vmix.setActiveInput(p1, p2);  // Força a ativação da cena
    }, 1000);
    
    h.log(mUID, "======= Cena ativada no vMix, scene: {}, file: {}", p2, mediaName);

    // Prepara para retornar à cena original quando o vídeo terminar ou for parado
    if (gsJump()) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.vmix.getActiveInputName(p1) == p2) { // só troca de cena se ainda estiver na cena do Vídeo
                  h.setTimeout(function() { 
                    if (!isPlaying()) {
                       h.log(mUID, "======= trigger Video_close - ativando cena anterior no vMix, scene: {}", [gsJump()]);
                       restorePreviousScene(module); 
                       module.updatePanel();
                     }
                 }, 800);
            }
        });
    }
}

function intervalPauseVLC(module) {
var p = h.getPlayer();
var playing = true;
var id = h.setInterval(function(){
  //verifica condição para cancelar a verificação
  if (!h.getGlobal(mUID + '_jumpToScene', null)) {
    h.clearInterval(id);
    return;
  }

  if (p.isPlaying() == playing) return;
  playing = p.isPlaying();

  pauseResumeVideovMix(module, !playing);

  }, 200);
}

function calculateZoom(outputResolution, videoResolution) {
    // Calcula o zoom como razão da altura da saída pela altura do vídeo
    var zoom = outputResolution / videoResolution;
    h.log(mUID, "outputResolution:{}, videoResolution:{}, zoom:{}",outputResolution, videoResolution,zoom);
    return zoom;
}


function getFilePath(fullPath) {
    var lastSlashIndex = fullPath.lastIndexOf('\\');
    if (lastSlashIndex === -1) {
        return ''; // Retorna string vazia se não houver barra (não há caminho)
    }
    return fullPath.substring(0, lastSlashIndex);
}

function getFileName(fullPath) {
    var lastSlashIndex = fullPath.lastIndexOf('\\');
    if (lastSlashIndex === -1) {
        return fullPath; // Retorna o próprio fullPath se não houver barra (somente o nome do arquivo)
    }
    return fullPath.substring(lastSlashIndex + 1);
}

function getVideoHeigth(mediaName) {
  
  var folder = getFilePath(mediaName);
  var file = getFileName(mediaName);

  h.log(mUID, "folder:{} | file:{}",folder, file);
  return h.hly('GetVideos', {
                   folder : folder,
                   filter : file,
                   include_metadata: true
             }).data[0].height;

}

function gsJump(value) {

h.log(mUID, "gsJump:{}", value);

if (value != undefined) { 
  h.setGlobal(mUID + '_jumpToScene', value == "" ? null : value);
  }
else
  return h.getGlobal(mUID + '_jumpToScene', null);
}


function restorePreviousScene(module) {
      var s = module.settings;
      var p1 = s.receiver_id
      jsc.vmix.setInput(p1, gsJump(), "Fade", 100);
      sendVideo(p1, s.scene_name1, "about:blank");
      sendVideo(p1, s.scene_name2, "about:blank");
      gsJump("");
}


function isPlaying() {
var p = h.getPlayer();
   return p.isPlaying()
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
 var arr = [];
 arr.push(actionPanic(module));
 return arr;
}


function actionPanic(module) { // cancela a execução de um vídeo no vMix
 
return {
            id: 'clearTimeout',
            label: '',
            icon : 'video_camera_front',
            hint : 'Cancela a execução do vídeo no vMix, retornando à cena original, mas continua a execução no VLC',
            action: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                      vmixVideo(module, false);
                      h.setGlobal(mUID + '_jumpToScene', null)
                      h.notification("Vídeo no vMix cancelado, voltando à cena " + jumpToScene,3);
                      module.updatePanel();
                      }
                  else { 
                  h.notification("Não entre em pânico, não há vídeo para ser cancelado!",3);
                  }
            },
            status: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                  return {
                        description : '<-Pânico',
                        icon : 'camera',
                        background: '790903',  
                    };
                } else {
                    return null; // default values
                }
            }
         }
}
// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22766d6978227d
jsc.vmix.request = function (receiverID, urlSuffix) {
        
        if (!urlSuffix.toUpperCase().startsWith("/API/?")) {
            urlSuffix = "/API/?" + urlSuffix;
        }

        h.log(mUID ,'urlSuffix: {} result : {}', urlSuffix,r);

        var r =  h.apiRequestEx(receiverID, { 
                 url_suffix: urlSuffix 
                 });

        return r
}


function sendVideo(receiverID, inputName, newUrl) { 
    var url = 'Function=BrowserNavigate&Input=' + encodeURIComponent(inputName) + '&Value=' + encodeURIComponent(newUrl);
    jsc.vmix.request(receiverID, url);
   
}

function setZoom(receiverID,inputName,zoom) {
 var url = 'Function=SetZoom&Input='+encodeURIComponent(inputName) + '&Value=' + encodeURIComponent(zoom);
 jsc.vmix.request(receiverID, url);
}

function getInputBrowser(receiverID) {
    var inputs = jsc.vmix.getInputs(receiverID);
    var names = [];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == 'Browser') {
           names.push(inputs[i].title);
        }
    }
    return names;
}