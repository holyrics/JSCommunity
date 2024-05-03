// Create an object for operation 6
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
function setActiveScene(receiverID, sceneName) {
    var response = jsc.obs_v5.request(receiverID, 'SetCurrentProgramScene', {
        sceneName: sceneName
    });
    h.log('jsc.obs_v5', 'SetCurrentProgramScene response: {}', response);
    return response;
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

// Mute or unmute an input
function setInputMute(receiverID, inputName, state) {
    var response = jsc.obs_v5.request(receiverID, 'SetInputMute', {
        inputName: inputName,
        inputMuted: state
    });
    h.log('jsc.obs_v5', 'setInputMute response: {}', response);
    return response;
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
function getInputSettings(receiverID, sceneName, sceneItemName) {

    var sceneItemID = jsc.obs_v5.getSceneItemIDByName(receiverID, sceneName, sceneItemName);
    
    return  jsc.obs_v5.request(receiverID, 'GetInputSettings', {
        inputUuid: sceneItemID,
        inputName: sceneItemName
    });
}

// Change the local file name for an Media Source item
function setMediaSourceLocalFile(receiverID, sceneName, sceneItemName, filePath, fileName, looping, closeWhenInactive) {
    
    var actualStatus = jsc.obs_v5.getInputSettings(receiverID, sceneName, sceneItemName);
    var sceneItemID = jsc.obs_v5.getSceneItemIDByName(receiverID, sceneName, sceneItemName);
    closeWhenInactive = closeWhenInactive == null ? actualStatus.inputSettings.close_when_inactive : closeWhenInactive;
    looping = looping == null ? actualStatus.inputSettings.looping : looping;
    filePath = (filePath.replace(/\u005C/g, '/')+'/').replace(/\x2F\x2F/g, '/');
    var localFile = filePath + fileName;
    jsc.obs_v5.request(receiverID, 'SetInputSettings', {
        inputUuid: sceneItemID,
        inputName: sceneItemName, 
        inputSettings: {
            close_when_inactive: closeWhenInactive,
            local_file: localFile,
            looping: looping
            }
        });

    var newStatus = jsc.obs_v5.getInputSettings(receiverID, sceneName, sceneItemName);

    return newStatus && newStatus.inputSettings && newStatus.inputSettings.local_file == localFile;
}
