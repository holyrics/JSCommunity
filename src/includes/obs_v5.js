//
function op6(d) {
    return {op: 6, d: d};
}

//
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
    //create an array with only the scene name
    //(FOR gets the array in descending form because the return from the v5 websocket comes in the opposite order displayed in the OBS list)
    var names = [];
    for (var i = scenes.length - 1; i >= 0; i--) {
        names.push(scenes[i].sceneName);
    }
    h.log('jsc.obs_v5', 'getSceneList names: {}', [names]);
    return names;
}

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
    //(FOR gets the array in descending form because the return from the v5 websocket comes in the opposite order displayed in the OBS list)
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