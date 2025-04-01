// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22737461727475705c7530303236696e666f227d
var mID = '@prcris#m15'; 
var mUID = mID + ''; 
var pause = false;

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
        name: 'Video Sync OBS+',
        description: '<html>' +
                     (h.isMinVersion("2.24.0") ? '<span style="background-color: yellow;"><font color="black"><b>##NEW</b></font></span> No need to release SetInputSettings on blacklist_request<br>' : '') +
                     '• Displays a video on a pre-configured scene in OBS simultaneously with the Holyrics display.<br>' +
                     '• Uses the Holyrics Plugin to directly access the video, without NDI capture.<br>' +
                     '• Supports Pause/Resume directly on the VLC player<br>' +
                     '• Supports video queue.<br>' +
                     '• Supports interrupting the video.<br>' +
                     '• Supports sending another video while one is playing, for immediate switching.<br>' +
                     '• When the video ends in Holyrics, it activates the previous scene.<br>' +
                     '• Has a panic button to stop the video in OBS without interfering with the main screen, activating the previous scene.<br>' +
                     infoVDDMM,
        allowed_requests: [
            allowedPrcrisModuleRequests
        ],
        permissions: [
            {
                type: 'blacklist_request',
                key: 'obs_v5',
                value: 'SetInputSettings'
            }
        ],
        i18n: {
            name: {
                en: 'Video Sync OBS+',
                pt: 'Video Sync OBS+',
                es: 'Sincronización de Video OBS+',
                ru: 'Синхронизация видео OBS+'
            },
            description: {
                en: '<html>' +
                    (h.isMinVersion("2.24.0") ? '<span style="background-color: yellow;"><font color="black"><b>##NEW</b></font></span> No need to release SetInputSettings on blacklist_request<br>' : '') +
                    '• Displays a video on a pre-configured scene in OBS simultaneously with the Holyrics display.<br>' +
                    '• Uses the Holyrics Plugin to directly access the video, without NDI capture.<br>' +
                    '• Supports Pause/Resume directly on the VLC player<br>' +
                    '• Supports video queue.<br>' +
                    '• Supports interrupting the video.<br>' +
                    '• Supports sending another video while one is playing, for immediate switching.<br>' +
                    '• When the video ends in Holyrics, it activates the previous scene.<br>' +
                    '• Has a panic button to stop the video in OBS without interfering with the main screen, activating the previous scene.<br>' +
                     infoVDDMM,
                pt: '<html>' +
                    (h.isMinVersion("2.24.0") ? '<span style="background-color: yellow;"><font color="black"><b>##NOVO</b></font></span> Não precisa mais liberar na blacklist_request o SetInputSettings<br>' : '') +
                    '• Exibe um vídeo em uma cena previamente configurada no OBS simultaneamente à exibição no Holyrics.<br>' +
                    '• Usa o Plugin do Holyrics para acessar diretamente o vídeo, sem captura por NDI.<br>' +
                    '• Aceita Pause/Resume direto no player do VLC<br>' +
                    '• Aceita fila de vídeos.<br>' +
                    '• Aceita interromper o vídeo.<br>' +
                    '• Aceita enviar outro vídeo enquanto um está passando, fazendo a troca imediata.<br>' +
                    '• Quando termina o vídeo no Holyrics, ativa cena anterior.<br>' +
                    '• Possui botão de pânico para interromper vídeo no OBS sem interferir no telão, ativando a cena anterior.<br>' +
                     infoVDDMM,
                es: '<html>' +
                    (h.isMinVersion("2.24.0") ? '<span style="background-color: yellow;"><font color="black"><b>##NUEVO</b></font></span> No es necesario liberar SetInputSettings en blacklist_request<br>' : '') +
                    '• Muestra un video en una escena preconfigurada en OBS simultáneamente con la visualización en Holyrics.<br>' +
                    '• Utiliza el Plugin de Holyrics para acceder directamente al video, sin captura por NDI.<br>' +
                    '• Soporta Pausa/Reanudar directamente en el reproductor VLC<br>' +
                    '• Soporta cola de videos.<br>' +
                    '• Soporta interrumpir el video.<br>' +
                    '• Permite enviar otro video mientras se reproduce uno, para cambio inmediato.<br>' +
                    '• Cuando el video termina en Holyrics, activa la escena anterior.<br>' +
                    '• Tiene un botón de pánico para detener el video en OBS sin interferir en la pantalla principal, activando la escena anterior.<br>' +
                     infoVDDMM,
                ru: '<html>' +
                    (h.isMinVersion("2.24.0") ? '<span style="background-color: yellow;"><font color="black"><b>##НОВОЕ</b></font></span> Не нужно разблокировать SetInputSettings в blacklist_request<br>' : '') +
                    '• Показывает видео на предварительно настроенной сцене в OBS одновременно с показом в Holyrics.<br>' +
                    '• Использует плагин Holyrics для прямого доступа к видео, без захвата через NDI.<br>' +
                    '• Поддерживает паузу/возобновление непосредственно в плеере VLC<br>' +
                    '• Поддерживает очередь видео.<br>' +
                    '• Поддерживает прерывание видео.<br>' +
                    '• Поддерживает отправку другого видео во время воспроизведения одного, для немедленной смены.<br>' +
                    '• Когда видео заканчивается в Holyrics, активируется предыдущая сцена.<br>' +
                    '• Имеет кнопку экстренного прерывания видео в OBS без вмешательства в основной экран, активируя предыдущую сцену.<br>' +
                     infoVDDMM
            }
        }
    };
}




// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a227472696767657273227d
/// triggers para ocultar / exibir texto no telão e OBS
function triggers(module) {
  startup(module);
  var arr = [];
  arr.push({
    id: "video_show_obs_" + mUID,
    when: "displaying",
    item: "any_video",
    action: function(obj) {
      if (isModuleSuspended()) {
         return;
      }
      obsVideo(module, true, obj.file_fullname);
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
            description: "<html><hr>@ " + jsc.i18n("For more information about automation with Holyrics, visit") + 
                         "<br><a href='https://youtube.com/@multimidiaverdadebalneario'>youtube.com/@multimidiaverdadebalneario</a></html>",
            type: 'label'
        },
        {
            type: 'title',
            label: jsc.i18n('OBS Settings')
        },
        {
            id: 'receiver_id',
            name: 'OBS Studio',
            description: jsc.i18n('OBS receiver name'),
            type: 'receiver',
            receiver: 'obs_v5'
        },
        {
            id: 'scene_name',
            name: jsc.i18n('Scene name'), 
            description: jsc.i18n('Select the OBS scene to play the video'),
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneList(obj.input.receiver_id);
            }
        },
        {
            id: 'scene_item_name',
            name: jsc.i18n('OBS "Media Source" name'),
            description: jsc.i18n('The script interacts directly with a "media source" object in the selected scene, dynamically configuring it for the video Holyrics is displaying.'),
            type: 'string',
            suggested_values: function(obj) {
                return jsc.obs_v5.getSceneItemList(obj.input.receiver_id, obj.input.scene_name);
            }
        },
        {
            id: 'use_preview_scene',
            label: jsc.i18n('Use the preview scene when finishing the video'),
            type: 'boolean'
        },        
        {
            id: 'exclamation_mark',
            label: jsc.i18n('Send to OBS'),
            description: jsc.i18n('Option to send only specific videos or folders to OBS'),
            type: 'string',
            allowed_values: [
                { value: true , label: jsc.i18n('Only videos with ! in the name or folder') },
                { value: false , label: jsc.i18n('Only videos without ! in the name or folder') }
            ],
            default_value: false
        },
        {
            id: 'samePC',
            label: jsc.i18n('Holyrics and OBS on the same computer'),
            type: 'boolean'
        },
        {
            type: 'separator'
        },
        {
            id: 'log',
            label: jsc.i18n('Enable log'),
            description: jsc.i18n('Option to enable activity logging'),
            type: 'boolean',
            onchange: function(obj) {
                logState(obj.input.log, mUID, 'onchange ' + mID); // Log enabled/disabled based on setting
            }
        }
    ];
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a2266756e6374696f6e73227d
function pauseResumeVideoOBS(module, playing) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_item_name;
    
    if (playing) {
          jsc.obs_v5.pauseMedia(p1, p2);
    } else {
          jsc.obs_v5.playMedia(p1, p2);   
    } 
    pause = !playing;
}

function intervalPauseVLC(module) {
    var p = h.getPlayer();
    var playing = true;
    var id = h.setInterval(function() {
        //verifica condição para cancelar a verificação
        if (!gsJump()) {
            h.clearInterval(id);
            return;
        }

        if (p.isPlaying() == playing) return;
        playing = p.isPlaying();

        pauseResumeVideoOBS(module, !playing);

    }, 200);
}

function restorePreviousScene(module) {
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_name;
    var p3 = s.scene_item_name;
    if (module.settings.use_preview_scene) {
       try {
       var scene = jsc.obs_v5.getPreviewScene(p1);   
       h.log(mUID,'{%t} scene {}', scene);  
       if (scene) {
         gsJump(scene);   
       }
      } catch (err) { h.log(mUID,'Erro {}',[err]) };
    }
    jsc.obs_v5.setActiveScene(p1, gsJump());
    gsJump("");
}

function gsJump(value) {
    if (value != undefined) { 
        h.setGlobal(mUID + '_jumpToScene', value == "" ? null : value);
    } else {
        return h.getGlobal(mUID + '_jumpToScene', null);
    }
}

function obsVideo(module, show, mediaName) { 
    var s = module.settings;
    var p1 = s.receiver_id;
    var p2 = s.scene_name;
    var p3 = s.scene_item_name;
    pause = false;

    if (!show) { 
        if (gsJump()) {
            h.log(mUID, "{%t} ======= " + jsc.i18n("OBS video playback interrupted by panic button, returning to previous scene"));
            h.notification(jsc.i18n("OBS video playback interrupted by panic button"), 3);
            restorePreviousScene(module); 
        }
        return;
    }

    h.log(mUID, "{%t} " + jsc.i18n("exclamation mark") + ": {} , mediaName: {}", [s.exclamation_mark, mediaName]);
    h.log(mUID, "{%t} " + jsc.i18n("media name contains '!'") + ": {}", [mediaName.indexOf('!') !== -1]);
    
    // Se exclamation_mark estiver habilitado, apenas vídeos com "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'true' && mediaName.indexOf('!') == -1) {
        h.log(mUID, "{%t} ======= " + jsc.i18n("Video not sent to OBS as it does NOT contain '!' in the name"));
        restorePreviousScene(module);
        return;
    }
    
    // Se exclamation_mark estiver desabilitado, apenas vídeos sem "!" no nome serão enviados para o OBS
    if (s.exclamation_mark == 'false' && mediaName.indexOf('!') > -1) {
        h.log(mUID, "{%t} ======= " + jsc.i18n("Video not sent to OBS as it contains '!' in the name"));
        restorePreviousScene(module);
        return;
    }

    var pSettings = getPluginSettings();

    // Verifica se as configurações necessárias estão presentes
    if (!pSettings.ip || !pSettings.port || !pSettings.token) {
        h.log("{%t} " + jsc.i18n("OBS video plugin settings not found. Configure the Holyrics Plugin"));
        return;
    }

    h.log(mUID, "{%t} ======= " + jsc.i18n("Video sent to OBS") + ": " + mediaName);
    
    var previousScene = jsc.obs_v5.getActiveScene(p1);
    
    if (previousScene !== s.scene_name) { 
        gsJump(previousScene); 
        h.log(mUID, "{%t} " + jsc.i18n("Current scene captured") + ": {}", previousScene);
    }

    module.updatePanel();
    
    var url = createURL(pSettings, mediaName, s.samePC);

    jsc.obs_v5.setSceneItemEnabled(p1, p2, p3, true);
    jsc.obs_v5.setInputSettings(p1, p3, {
        input: url,
        input_format: "",
        close_when_inactive: true,
        looping: false,
        is_local_file: false
    });
    jsc.obs_v5.setActiveScene(p1, p2);
    
    intervalPauseVLC(module);
   
    h.log(mUID, "{%t} ======= " + jsc.i18n("Scene activated in OBS, scene") + ": {}, item_scene: {}, file: {}", [p2, p3, mediaName]);

    if (gsJump()) {
        jsc.utils.trigger.addSingleRunVideoOnStop(mediaName, function() {
            if (jsc.obs_v5.getActiveScene(p1) == p2) {
                h.setTimeout(function() { 
                    if (!isPlaying()) {
                        h.log(mUID, "{%t} ======= " + jsc.i18n("Video finished - activating previous scene in OBS") + ": {}", [gsJump()]);
                        restorePreviousScene(module); 
                        module.updatePanel();
                        pause = false;
                    }
                }, 800);
            }
        });
    }
}

function isPlaying() {
    var p = h.getPlayer();
    return p.isPlaying();
}

// __SCRIPT_SEPARATOR__ - info:7b226e616d65223a22616374696f6e73227d
function actions(module) {
    var arr = [];
    arr.push(actionPanic(module));
    return arr;
}

function actionPanic(module) { // cancela a execução de um vídeo no OBS
    return {
        id: 'clearTimeout',
        label: '',
        icon : 'video_camera_front',
        hint : jsc.i18n("Cancels video playback in OBS, returning to the original scene, but continues playback in VLC"),
        action: function(evt) {
            if (gsJump()) {
                obsVideo(module, false);
                h.setGlobal(mUID + '_jumpToScene', null);
                h.notification(jsc.i18n("Video in OBS canceled, returning to scene") + " " + gsJump(), 3);
                module.updatePanel();
                module.settings.pause = false;
            } else { 
                h.notification(jsc.i18n("Don’t panic, there is no video to cancel!"), 3);
            }
        },
        status: function(evt) {
            if (h.getGlobal(mUID + '_jumpToScene', null)) {
                return {
                    description : jsc.i18n("<-Panic"),
                    icon : 'camera',
                    background: '790903',  
                };
            } else {
                return null; // default values
            }
        }
    }
}