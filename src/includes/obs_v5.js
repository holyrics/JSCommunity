// Documentation website:
// https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md

/**
 * Creates an object with the operation `op` set to 6 and includes the provided data.
 *
 * @param {any} d - The data to be included in the object.
 * @returns {Object} An object containing the operation and the data.
 */
function op6(d) {
    return {op: 6, d: d};
}

// Send a request to the OBS WebSocket server
function request(receiverID, requestType, requestData) {
    jsc.err.safeNullOrEmpty(receiverID, 'receiverID');
    var d = {requestType: requestType};
    if (requestData != null) {
        d.requestData = requestData;
    }
    var json = h.apiRequest(receiverID, {op: 6, d: d});
    if (json == null) {
        throw h.getApiRequestLastError();
    }
    var response = JSON.parse(json);
    if (response.d.requestStatus.result) {
        return response.d.responseData;
    }
    throw JSON.stringify(response.d.requestStatus);
}

// Send a request batch to the OBS WebSocket server
function requestBatch(receiverID, requests) {
    jsc.err.safeNullOrEmpty(receiverID, 'receiverID');
    var d = {"requests": requests};
    var json = h.apiRequest(receiverID, {op: 8, d: d});
    if (json == null) {
        throw h.getApiRequestLastError();
    }
    var response = JSON.parse(json);
    if (response.d.results) {
        return response.d.results;
    }
    throw JSON.stringify('unknown');
}

// Get a list of available scenes
function getSceneList(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetSceneList', null);
    h.log('jsc.obs_v5', 'getSceneList response: {}', response);
    var scenes = response.scenes;
    if (scenes.length == 0) {
        return [];
    }
    // Create an array with only the scene name
    // (FOR gets the array in descending form because the return from the v5 websocket comes in the opposite order displayed in the OBS list)
    var names = [];
    for (var i = scenes.length - 1; i >= 0; i--) {
        names.push(scenes[i].sceneName);
    }
    h.log('jsc.obs_v5', 'getSceneList names: {}', [names]);
    return names;
}

// Set the active scene
function getActiveScene(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'GetCurrentProgramScene');
    h.log('jsc.obs_v5', 'GetCurrentProgramScene response: {}', response);
    return response.currentProgramSceneName || response.sceneName;
}

// Set the active scene
function setActiveScene(receiverID, sceneName) {
    jsc.obs_v5.request(receiverID, 'SetCurrentProgramScene', {
        sceneName: sceneName
    });
    h.log('jsc.obs_v5', 'SetCurrentProgramScene OK');
}

// Get a list of items within a scene
function getSceneItemList(receiverID, sceneName) {
    var response = jsc.obs_v5.request(receiverID, 'GetSceneItemList', {
        sceneName: sceneName
    });
    h.log('jsc.obs_v5', 'getSceneItemList response: {}', response);
    var items = response.sceneItems;
    if (items.length == 0) {
        return [];
    }
    // (FOR gets the array in descending form because the return from the v5 websocket comes in the opposite order displayed in the OBS list)
    var names = [];
    for (var i = items.length - 1; i >= 0; i--) {
        names.push(items[i].sourceName);
    }
    h.log('jsc.obs_v5', 'getSceneItemList names: {}', [names]);
    return names;
}

// Get the ID of a scene item by its name
function getSceneItemIDByName(receiverID, sceneName, sceneItemName) {
    var keyCache = "obs_v5#getSceneItemIDByName#" + receiverID + "#" + sceneName;
    var cache = h.getGlobal(keyCache);
    if (cache == null || typeof cache[sceneItemName.toLowerCase()] === 'undefined') {
        var response = jsc.obs_v5.request(receiverID, 'GetSceneItemList', {
            sceneName: sceneName
        });
        cache = {};
        h.log('jsc.obs_v5', 'getSceneItemIDByName response: {}', response);
        var items = response.sceneItems;
        for (var i = 0; i < items.length; i++) {
            cache[items[i].sourceName.toLowerCase()] = items[i].sceneItemId;
        }
        h.setGlobal(keyCache, cache);
    }
    h.log('jsc.obs_v5', 'getSceneItemIDByName cache: {}', cache);
    var n = cache[sceneItemName.toLowerCase()];
    if (typeof n === 'undefined') {
        throw 'Scene item not found';
    }
    return n;
}

// Get the enabled/disabled status of a scene item
function getSceneItemEnabled(receiverID, sceneName, sceneItemNameOrID) {
    if (sceneItemNameOrID == '' || isNaN(sceneItemNameOrID)) {
        sceneItemNameOrID = jsc.obs_v5.getSceneItemIDByName(receiverID, sceneName, sceneItemNameOrID);
    }
    var response = jsc.obs_v5.request(receiverID, 'GetSceneItemEnabled', {
        sceneName: sceneName,
        sceneItemId: parseInt(sceneItemNameOrID)
    });
    h.log('jsc.obs_v5', 'getSceneItemEnabled response: {}', response);
    return response.sceneItemEnabled;
}

// Set the enabled/disabled status of a scene item
function setSceneItemEnabled(receiverID, sceneName, sceneItemNameOrID, enabled) {
    if (sceneItemNameOrID == '' || isNaN(sceneItemNameOrID)) {
        sceneItemNameOrID = jsc.obs_v5.getSceneItemIDByName(receiverID, sceneName, sceneItemNameOrID);
    }
    var response = jsc.obs_v5.request(receiverID, 'SetSceneItemEnabled', {
        sceneName: sceneName,
        sceneItemId: parseInt(sceneItemNameOrID),
        sceneItemEnabled: enabled
    });
    h.log('jsc.obs_v5', 'setSceneItemEnabled response: {}', response);
    return response;
}

// Get Mute state for an input
function getInputMute(receiverID, inputName) {
    var response = jsc.obs_v5.request(receiverID, 'GetInputMute', {
        inputName: inputName
    });
    h.log('jsc.obs_v5', 'getInputMute response: {}', response);
    return response.inputMuted;
}

// Mute or unmute an input
function setInputMute(receiverID, inputName, state) {
    var response = jsc.obs_v5.request(receiverID, 'SetInputMute', {
        inputName: inputName,
        inputMuted: state
    });
    h.log('jsc.obs_v5', 'setInputMute response: {}', response);
    return response;
}

// Toggle Mute state for an input
function toggleInputMute(receiverID, inputName) {
    var response = jsc.obs_v5.request(receiverID, 'ToggleInputMute', {
        inputName: inputName
    });
    h.log('jsc.obs_v5', 'toggleInputMute response: {}', response);
    return response.inputMuted;
}
// Start streaming
function startStream(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'StartStream');
    h.log('jsc.obs_v5', 'startStream response: {}', response);
    return response;
}

// Stop streaming
function stopStream(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'StopStream');
    h.log('jsc.obs_v5', 'stopStream response: {}', response);
    return response;
}

// Start recording
function startRecord(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'StartRecord');
    h.log('jsc.obs_v5', 'startRecord response: {}', response);
    return response;
}

// Stop recording
function stopRecord(receiverID) {
    var response = jsc.obs_v5.request(receiverID, 'StopRecord');
    h.log('jsc.obs_v5', 'stopRecord response: {}', response);
    return response;
}

// Trigger Hotkey by name
function triggerHotkeyByName(receiverID, keyName) {
    var response = jsc.obs_v5.request(receiverID, 'TriggerHotkeyByName', {
        hotkeyName: keyName
    });
    h.log('jsc.obs_v5', 'triggerHotkeyByName response: {}', response);
    return response;
}

// Get a list of sources
function getSourceList(receiverID) {
    // Get a list of sources from all scenes
    var sources = [];
    var scenes = jsc.obs_v5.getSceneList(receiverID);
    for (var i = 0; i < scenes.length; i++) {
        var sceneSources = jsc.obs_v5.getSceneItemList(receiverID, scenes[i]);
        sources = sources.concat(sceneSources);
    }
    jsc.utils.array.distinct(sources);
    jsc.utils.array.sort(sources);
    h.log('jsc.obs_v5', 'getSourceList response: {}', sources);
    return sources;
}

// Get a list of filters for a source
function getSourceFilterList(receiverID, sourceName) {
    var response = jsc.obs_v5.request(receiverID, 'GetSourceFilterList', {
        sourceName: sourceName
    });
    h.log('jsc.obs_v5', 'GetSourceFilterList response: {}', response);
    var items = response.filters;
    if (items.length == 0) {
        return [];
    }
    var names = [];
    for (var i = 0; i < items.length; i++) {
        names.push(items[i].filterName);
    }
    h.log('jsc.obs_v5', 'getSourceFilterList names: {}', [names]);
    return names;
}

// Get the enabled/disabled status of a filter for a source
function getSourceFilterEnabled(receiverID, sourceName, filterName) {
    var response = jsc.obs_v5.request(receiverID, 'GetSourceFilter', {
        sourceName: sourceName,
        filterName: filterName
    });
    h.log('jsc.obs_v5', 'getSourceFilterEnabled response: {}', response);
    return response.filterEnabled;
}

// Set the enabled/disabled status of a filter for a source
function setSourceFilterEnabled(receiverID, sourceName, filterName, enabled) {
    var response = jsc.obs_v5.request(receiverID, 'SetSourceFilterEnabled', {
        sourceName: sourceName,
        filterName: filterName,
        filterEnabled: enabled
    });
    h.log('jsc.obs_v5', 'setSourceFilterEnabled response: {}', response);
    return response;
}

// Get the settings for an input
function getInputSettings(receiverID, inputName) {
    var response = jsc.obs_v5.request(receiverID, 'GetInputSettings', {
        inputName: inputName
    });
    h.log('jsc.obs_v5', 'getInputSettings response: {}', response);
    return response;
}

// set input settings, example: local_file, close_when_inactive, and/or looping of the item
function setInputSettings(receiverID, inputName, settings) {
    /* 
     Example Media Source:
     jsc.obs_v5.setInputSettings(receiverID, inputName, {
     close_when_inactive: true,
     looping: true,
     local_file: 'c:/folder/filename.mp4'
     });
     */
    settings = settings || {};
    if (settings.local_file) {
        settings.local_file = settings.local_file.replace(/\\/g, '/');
    }

    return jsc.obs_v5.request(receiverID, 'SetInputSettings', {
        inputName: inputName,
        inputSettings: settings
    });
}

//Retrieves a list of audio inputs available
function getAudioInputList(receiverID) {
    var inputs = [];
    var input_kinds = jsc.obs_v5.request(receiverID, 'GetInputKindList');
    var requests = [];

    for (var i = 0; i < input_kinds.inputKinds.length; i++) {
        requests.push({
            requestType: 'GetInputList',
            requestData: {
                inputKind: input_kinds.inputKinds[i]
            }
        });
    }

    var rBatch = jsc.obs_v5.requestBatch(receiverID, requests);
    var audioInputList = [];

    for (var i = 0; i < rBatch.length; i++) {
        var input_kind = rBatch[i].responseData;

        if (input_kind && input_kind.inputs && input_kind.inputs.length > 0) {
            for (var j = 0; j < input_kind.inputs.length; j++) {
                var inputName = input_kind.inputs[j].inputName;
                inputs.push(inputName);
            }
        }
    }

    // Create a new requestBatch with the obtained inputs
    var requestsMute = [];
    for (var i = 0; i < inputs.length; i++) {
        requestsMute.push({
            requestType: 'GetInputMute',
            requestData: {
                inputName: inputs[i]
            }
        });
    }

    var rBatchMute = jsc.obs_v5.requestBatch(receiverID, requestsMute);

    for (var i = 0; i < rBatchMute.length; i++) {
        var response = rBatchMute[i].responseData;
        if (response) {
            audioInputList.push(inputs[i]);
        }
    }
    jsc.utils.array.distinct(audioInputList);
    jsc.utils.array.sort(audioInputList);
    return audioInputList;
}

// pause media
function pauseMedia(receiverID, mediaSourceName) {
    var requestData = {
        inputName: mediaSourceName,
        mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PAUSE"
    };

    var response = jsc.obs_v5.request(receiverID, 'TriggerMediaInputAction', requestData);
    h.log('jsc.obs_v5', 'Pause media response: {}', response);
}

// resume/start media
function playMedia(receiverID, mediaSourceName) {
    var requestData = {
        inputName: mediaSourceName,
        mediaAction: "OBS_WEBSOCKET_MEDIA_INPUT_ACTION_PLAY"
    };

    var response = jsc.obs_v5.request(receiverID, 'TriggerMediaInputAction', requestData);
    h.log('jsc.obs_v5', 'Resume media response: {}', response);
}
