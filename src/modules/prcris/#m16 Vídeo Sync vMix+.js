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
        name: 'Video Sync vMix+',
        description: '<html>' +
                     '• Displays a video in a pre-configured scene in vMix simultaneously with its display on Holyrics.<br>' +
                     '• Uses the Holyrics Plugin to directly access the video without NDI capture.<br>' +
                     '• Supports video queues.<br>' +
                     '• Allows video interruption.<br>' +
                     '• Allows sending another video while one is playing, enabling an immediate switch.<br>' +
                     '• When the video ends on Holyrics, the previous scene is reactivated.<br>' +
                     '• Has a panic button to interrupt the video in vMix without affecting the main screen, activating the previous scene.<br>' +
                     '<hr><b><u>Setup Instructions:</u></b><br>' +
                     '<p style="padding-left: 30px;">• Create 2 Browser-type inputs and set the URL to: <u>about:blank</u>, then assign names for each input, e.g., <u>Holyrics Video 1</u> and <u>Holyrics Video 2</u>.<br>' +
                     '• In Holyrics, configure a receiver to communicate with vMix (copy the exact address from vMix configuration screen under settings, Web Controller) and select the inputs created in vMix.<br>' +
                     '• From this point, videos will be displayed simultaneously in vMix.<br></p>' +
                     '• Be mindful of your firewall and network settings, as these often block communication between two computers.<br>' +
                     '<br><b>Note:</b> The use of 2 inputs is due to the fact that vMix doesn’t support the video occupying the full screen; therefore, I am using the ZOOM command to adjust the video to the screen size if needed, which can only be done if the scene is not “live”. Thus, the module always alternates between these two inputs.<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        i18n: {
            name: {
                en: 'Video Sync vMix+',
                pt: 'Video Sync vMix+',
                es: 'Video Sync vMix+',
                ru: 'Video Sync vMix+',
                it: 'Video Sync vMix+'
            },
            description: {
                en: '<html>' +
                    '• Displays a video in a pre-configured scene in vMix simultaneously with its display on Holyrics.<br>' +
                    '• Uses the Holyrics Plugin to directly access the video without NDI capture.<br>' +
                    '• Supports video queues.<br>' +
                    '• Allows video interruption.<br>' +
                    '• Allows sending another video while one is playing, enabling an immediate switch.<br>' +
                    '• When the video ends on Holyrics, the previous scene is reactivated.<br>' +
                    '• Has a panic button to interrupt the video in vMix without affecting the main screen, activating the previous scene.<br>' +
                    '<hr><b><u>Setup Instructions:</u></b><br>' +
                    '<p style="padding-left: 30px;">• Create 2 Browser-type inputs and set the URL to: <u>about:blank</u>, then assign names for each input, e.g., <u>Holyrics Video 1</u> and <u>Holyrics Video 2</u>.<br>' +
                    '• In Holyrics, configure a receiver to communicate with vMix (copy the exact address from vMix configuration screen under settings, Web Controller) and select the inputs created in vMix.<br>' +
                    '• From this point, videos will be displayed simultaneously in vMix.<br></p>' +
                    '• Be mindful of your firewall and network settings, as these often block communication between two computers.<br>' +
                    '<br><b>Note:</b> The use of 2 inputs is due to the fact that vMix doesn’t support the video occupying the full screen; therefore, I am using the ZOOM command to adjust the video to the screen size if needed, which can only be done if the scene is not “live”. Thus, the module always alternates between these two inputs.<br>'+infoVDDMM,
                pt: '<html>' +
                    '• Exibe um vídeo em uma cena previamente configurada no vMix simultaneamente à exibição no Holyrics.<br>' +
                    '• Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>' +
                    '• Aceita fila de vídeos.<br>' +
                    '• Aceita interromper o vídeo.<br>' +
                    '• Aceita enviar outro vídeo enquanto um está passando, fazendo a troca imediata.<br>' +
                    '• Quando termina o vídeo no Holyrics, ativa cena anterior.<br>' +
                    '• Possui botão de pânico para interromper vídeo no vMix sem interferir no telão, ativando a cena anterior.<br>' +
                    '<hr><b><u>Configurações para uso:</u></b><br>' +
                    '<p style="padding-left: 30px;">• Crie 2 inputs(entrada) do tipo Browser(Navegador) e coloque na url: <u>about:blank</u> e defina um nome para cada input(entrada), ex: <u>Holyrics Video 1</u> e <u>Holyrics Video 2</u>.<br>' +
                    '• No Holyrics, configure um receptor para se comunicar com o vMix (copie o endereço exato da tela de configuração do vMix, em settings, Web Controller) e selecione os inputs criados no vMix.<br>' +
                    '• A partir deste ponto, os vídeos serão exibidos simultaneamente no vMix.<br></p>' +
                    '• Fique atento às suas configurações de firewall e rede, pois na maioria das vezes é isto que bloqueia a comunicação entre dois computadores.<br>' +
                    '<br><b>Observação:</b> O uso de 2 inputs se deve ao fato do vMix não possuir função do vídeo ocupar a tela toda, então estou utilizando o comando ZOOM para ajustar o vídeo ao tamanho da tela se necessário, o que só pode ser feito se a cena não estiver no "ao vivo", então o módulo sempre alterna entre estes dois inputs.<br>'+infoVDDMM,
                es: '<html>' +
                    '• Muestra un video en una escena preconfigurada en vMix simultáneamente con su visualización en Holyrics.<br>' +
                    '• Utiliza el plugin de Holyrics para acceder al video directamente, sin captura por NDI.<br>' +
                    '• Admite cola de videos.<br>' +
                    '• Permite la interrupción del video.<br>' +
                    '• Permite enviar otro video mientras uno se está reproduciendo, permitiendo un cambio inmediato.<br>' +
                    '• Cuando termina el video en Holyrics, se reactiva la escena anterior.<br>' +
                    '• Tiene un botón de pánico para interrumpir el video en vMix sin afectar la pantalla principal, activando la escena anterior.<br>' +
                    '<hr><b><u>Instrucciones de configuración:</u></b><br>' +
                    '<p style="padding-left: 30px;">• Cree 2 entradas de tipo navegador y configure la URL en: <u>about:blank</u>, luego asigne nombres a cada entrada, por ejemplo, <u>Holyrics Video 1</u> y <u>Holyrics Video 2</u>.<br>' +
                    '• En Holyrics, configure un receptor para comunicarse con vMix (copie la dirección exacta de la pantalla de configuración de vMix en settings, Web Controller) y seleccione las entradas creadas en vMix.<br>' +
                    '• A partir de este punto, los videos se mostrarán simultáneamente en vMix.<br></p>' +
                    '• Preste atención a su configuración de firewall y red, ya que generalmente esto bloquea la comunicación entre dos computadoras.<br>' +
                    '<br><b>Nota:</b> El uso de 2 entradas se debe al hec'+'ho de que vMix no permite que el video ocupe toda la pantalla; por lo tanto, utilizo el comando ZOOM para ajustar el video al tamaño de la pantalla si es necesario, lo cual solo se puede hacer si la escena no está en "vivo". Por ello, el módulo siempre alterna entre estas dos entradas.<br>'+infoVDDMM,
                ru: '<html>' +
                    '• Отображает видео в заранее настроенной сцене в vMix одновременно с его отображением на Holyrics.<br>' +
                    '• Использует плагин Holyrics для прямого доступа к видео без захвата по NDI.<br>' +
                    '• Поддерживает очередь видео.<br>' +
                    '• Позволяет прерывать видео.<br>' +
                    '• Позволяет отправить другое видео во время воспроизведения, обеспечивая мгновенное переключение.<br>' +
                    '• Когда видео заканчивается на Holyrics, активируется предыдущая сцена.<br>' +
                    '• Имеет кнопку паники для прерывания видео в vMix без влияния на главный экран, активируя предыдущую сцену.<br>' +
                    '<hr><b><u>Инструкции по настройке:</u></b><br>' +
                    '<p style="padding-left: 30px;">• Создайте 2 входа типа браузера и установите URL на: <u>about:blank</u>, затем назначьте имена для каждого входа, например, <u>Holyrics Video 1</u> и <u>Holyrics Video 2</u>.<br>' +
                    '• В Holyrics настройте приемник для связи с vMix (скопируйте точный адрес с экрана настроек vMix в настройках, Web Controller) и выберите входы, созданные в vMix.<br>' +
                    '• С этого момента видео будут отображаться одновременно в vMix.<br></p>' +
                    '• Обратите внимание на настройки брандмауэра и сети, так как это часто блокирует связь между двумя компьютерами.<br>' +
                    '<br><b>Примечание:</b> Использование 2 входов связано с тем, что vMix не поддерживает видео на весь экран; поэтому я использую команду ZOOM, чтобы при необходимости настроить видео на размер экрана, что можно сделать только если сцена не "в эфире". Таким образом, модуль всегда чередует эти два входа.<br>'+infoVDDMM,
                it: '<html>' +
                    '• Mostra un video in una scena preconfigurata in vMix contemporaneamente alla sua visualizzazione su Holyrics.<br>' +
                    '• Utilizza il plugin Holyrics per accedere direttamente al video senza cattura NDI.<br>' +
                    '• Supporta le code di video.<br>' +
                    '• Consente di interrompere il video.<br>' +
                    '• Consente l’invio di un altro video mentre uno è in riproduzione, consentendo uno switch immediato.<br>' +
                    '• Quando il video termina su Holyrics, viene riattivata la scena precedente.<br>' +
                    '• Ha un pulsante di emergenza per interrompere il video in vMix senza influire sullo schermo principale, riattivando la scena precedente.<br>' +
                    '<hr><b><u>Istruzioni di configurazione:</u></b><br>' +
                    '<p style="padding-left: 30px;">• Crea 2 ingressi di tipo browser e imposta l’URL su: <u>about:blank</u>, quindi assegna nomi a ciascun ingresso, ad es., <u>Holyrics Video 1</u> e <u>Holyrics Video 2</u>.<br>' +
                    '• In Holyrics, configura un ricevitore per comunicare con vMix (copia l’indirizzo esatto dalla schermata di configurazione di vMix nelle impostazioni, Web Controller) e seleziona gli ingressi creati in vMix.<br>' +
                    '• Da questo momento, i video verranno visualizzati contemporaneamente in vMix.<br></p>' +
                    '• Fai attenzione alle impostazioni del firewall e della rete, poiché spesso bloccano la comunicazione tra due computer.<br>' +
                    '<br><b>Nota:</b> L’uso di 2 ingressi è dovuto al fatto che vMix non supporta la visualizzazione del video a schermo intero; quindi utilizzo il comando ZOOM per regolare il video alle dimensioni dello schermo se necessario, cosa possibile solo se la scena non è “live”. Pertanto, il modulo alterna sempre tra questi due ingressi.<br>'+infoVDDMM
            }
        }
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
            name: jsc.i18n('About') + ' ' + mID,
            description: "<html><hr>@ " + jsc.i18n("For more information on automation with Holyrics, visit") + 
                         " <br><a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        }, 
        {
            type: 'title',
            label: '<html>' + jsc.i18n("Settings in vMix") + ':'
        }, 
        {
            id: 'receiver_id',
            name: 'vMIX',
            description: jsc.i18n("vMix receiver name"),
            type: 'receiver',
            receiver: 'vMix'
        }, 
        {       
            id: 'scene_name1',
            name: jsc.i18n('First Input'),
            description: jsc.i18n("Select the first input in vMix to play the video"),
            type: 'string',
            suggested_values: function(obj) {
                return getInputBrowser(obj.input.receiver_id);
            }
        },
        {       
            id: 'scene_name2',
            name: jsc.i18n('Second Input'),
            description: jsc.i18n("Select the second input in vMix to play the video."),
            type: 'string',
            suggested_values: function(obj) {
                return getInputBrowser(obj.input.receiver_id);
            }
        },
        {       
            id: 'output_resolution',
            name: jsc.i18n('Output Resolution'),
            description: jsc.i18n("Select your vMix output resolution."),
            type: 'integer',
            allowed_values: [
               { value: 2160, label: '2160p (4K): 3840 x 2160' },
               { value: 1440, label: '1440p (2K): 2560 x 1440' },
               { value: 1080, label: '1080p (FHD): 1920 x 1080' },
               { value: 720, label: '720p (HD): 1280 x 720' }
             ],
            default_value: 1080
        },
        {        
            id: 'exclamation_mark',
            label: jsc.i18n('Send to vMix') + ':',
            description: jsc.i18n("Allows the option to send only certain videos or folders to vMix"),
            type: 'string',
            allowed_values: [
                { value: true , label: jsc.i18n('Only videos with ! in the name or folder') },
                { value: false , label: jsc.i18n('Only videos without ! in the name or folder') }
            ],
            default_value: false
        },
        {
            id: 'samePC',
            label: jsc.i18n("Holyrics and vMix on the same computer"),
            type: 'boolean'
        },
        {
            type: 'separator'
        }, 
        {
            id: 'log',
            label: jsc.i18n("Enable log"),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onchange ' + mID); // Enables or disables logging based on settings  
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
    h.log(mUID, jsc.i18n("Selected scene") + " {}", p2);

    if (!show) { 
        if (gsJump()) {
            h.log(mUID, "======= " + jsc.i18n("Video playback in vMix interrupted by panic button, returning to scene") + " {}", gsJump());
            h.notification(jsc.i18n("Video playback in vMix interrupted by panic button."), 3);
            restorePreviousScene(module); 
        }
        return;
    }

    h.log(mUID, "exclamation_mark: {} , mediaName: {}", s.exclamation_mark, mediaName);
    h.log(mUID, "mediaName.indexOf('!') {}", mediaName.indexOf('!'));
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o vMix
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {  //caso não possua
           h.log(mUID, "======= " + jsc.i18n("Video not sent to vMix because it does NOT have ! in the name."));
           restorePreviousScene(module); 
           return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o vMix
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) { //caso possua:
           h.log(mUID, "======= " + jsc.i18n("Video not sent to vMix because it HAS ! in the name."));
           restorePreviousScene(module); 
           return;
    }
    var heigth = getVideoHeigth(mediaName);
    var zoom = calculateZoom(s.output_resolution, heigth);
    var url = createURL(pSettings, mediaName, s.samePC);
    var previousScene = jsc.vmix.getActiveInputName(p1);
    
/*    
    if (gsJump()) {
       h.log(mUID, "++++++++++++++++++ " + jsc.i18n("New video playing while another video is still running."));
       setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
       jsc.vmix.setActiveInput(p1, p2); 
       h.sleep(500);
    } 
*/
    
    if (previousScene != s.scene_name2 && previousScene != s.scene_name1) { // nunca captura a cena do video
        gsJump(previousScene); 
        h.log(mUID, jsc.i18n("Current scene captured") + ": {}", previousScene);
    }
         
    sendVideo(p1, p2, url);  // configura o vídeo na cena browser
    setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
    jsc.vmix.setInput(p1, p2, "Fade", 1000);  // ativa a cena(input) no vmix
    
    sendVideo(p1, lastScene == 2 ? s.scene_name2 : s.scene_name1, "about:blank");  //limpa eventual resíduo na cena anterior
    
    h.setTimeout(function() {
         setZoom(p1, p2, zoom); // define o zoom de acordo com a altura do vídeo e resolução de saída
         jsc.vmix.setActiveInput(p1, p2);  // Força a ativação da cena
    }, 1000);
    
    h.log(mUID, "======= " + jsc.i18n("Scene activated in vMix") + ", " + jsc.i18n("scene") + ": {}, " + jsc.i18n("file") + ": {}", p2, mediaName);

    // Prepara para retornar à cena original quando o vídeo terminar ou for parado
    if (gsJump()) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.vmix.getActiveInputName(p1) == p2) { // só troca de cena se ainda estiver na cena do Vídeo
                  h.setTimeout(function() { 
                    if (!isPlaying()) {
                       h.log(mUID, "======= " + jsc.i18n("trigger Video_close - activating previous scene in vMix") + ", " + jsc.i18n("scene") + ": {}", [gsJump()]);
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


function actionPanic(module) { // cancels video playback in vMix
 
return {
            id: 'clearTimeout',
            label: '',
            icon: 'video_camera_front',
            hint: jsc.i18n("Cancels video playback in vMix, returning to the original scene, but continues playback in VLC"),
            action: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                      vmixVideo(module, false);
                      h.setGlobal(mUID + '_jumpToScene', null);
                      h.notification(jsc.i18n("Video in vMix canceled, returning to scene") + " " + jumpToScene, 3);
                      module.updatePanel();
                  }
                  else { 
                      h.notification(jsc.i18n("Don't panic, there is no video to be canceled!"), 3);
                  }
            },
            status: function(evt) {
                  var jumpToScene = h.getGlobal(mUID + '_jumpToScene', null);
                  if (jumpToScene) {
                      return {
                          description: '<-' + jsc.i18n("Panic"),
                          icon: 'camera',
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