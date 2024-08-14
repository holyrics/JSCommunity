// Sends a request to the Home Assistant 
function request(receiverID, urlSuffix, requestData) {
    if (typeof requestData === 'string') {
        var entity_id = String(requestData);
        requestData = { entity_id: entity_id };
    }
    return h.apiRequestEx(receiverID, {
        url_suffix: urlSuffix,
        data: requestData
    });
}

// Posts data to the Home Assistant 
function post(receiverID, urlSuffix, requestData) {
    jsc.ha.request(receiverID, urlSuffix, requestData);
}

// Retrieves data from the Home Assistant 
function get(receiverID, urlSuffix) {
    return h.apiRequestEx(receiverID, {
        url_suffix: urlSuffix,
        headers: { type: 'GET' }
    });
}

// Retrieves items by type from the Home Assistant 
function getItemsByType(receiverID, type) {
    var r = jsc.ha.get(receiverID, '/api/states');
    var json = JSON.parse(r);
    h.log("jsc.ha", "getItemsByType {}, response: {}", [type, json]);
    var starts = type + ".";
    var output = [];
    for (var i = 0; i < json.length; i++) {
        var eID = json[i].entity_id;
        if (eID.startsWith(starts)) {
            output.push(eID);
        }
    }
    h.log("jsc.ha", "getItemsByType {}, items: {}", [type, output]);
    return output;
}

// Retrieves a list of switches from the Home Assistant
function getSwitchList(receiverID) {
    return jsc.ha.getItemsByType(receiverID, 'switch');
}

// Retrieves a list of scenes from the Home Assistant
function getSceneList(receiverID) {
    return jsc.ha.getItemsByType(receiverID, 'scene');
}

// Retrieves a list of scripts from the Home Assistant
function getScriptList(receiverID) {
    return jsc.ha.getItemsByType(receiverID, 'script');
}

// Retrieves a list of automations from the Home Assistant
function getAutomationList(receiverID) {
    return jsc.ha.getItemsByType(receiverID, 'automation');
}

// Retrieves the state of an entity from the Home Assistant
function getState(receiverID, entityID, fieldName) {
    var urlSuffix = '/api/states/' + entityID;
    var response = jsc.ha.get(receiverID, urlSuffix);
    var json = JSON.parse(response);
    h.log('jsc.ha', 'getStatus response: {}', [response]);
    if (fieldName) {
        return json[fieldName];
    }
    return json['state'] == 'on';
}

// Sets the state of a switch in the Home Assistant 
function setSwitch(receiverID, entityID, state) {
    var urlSuffix = '/api/services/switch/turn_' + (state ? 'on' : 'off');
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Toggles the state of a switch in the Home Assistant 
function toggleSwitch(receiverID, entityID) {
    var urlSuffix = '/api/services/switch/toggle';
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Sets the state of a script in the Home Assistant f
function setScript(receiverID, entityID, state) {
    var urlSuffix = '/api/services/script/turn_' + (state ? 'on' : 'off');
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Toggles the state of a script in the Home Assistant
function toggleScript(receiverID, entityID) {
    var urlSuffix = '/api/services/script/toggle';
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Activates a scene in the Home Assistant 
function activateScene(receiverID, entityID) {
    var urlSuffix = '/api/services/scene/turn_on';
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Activates a trigger in the Home Assistant 
function activateTrigger(receiverID, entityID) {
    var urlSuffix = '/api/services/automation/trigger';
    jsc.ha.request(receiverID, urlSuffix, entityID);
}


//spotify on ha
// Function to play a specific music track on a Spotify media player
function spotifyPlayMusic(receiverID, entityID, mediaID) {
    var urlSuffix = '/api/services/media_player/play_media';
    var data = {
        entity_id: entityID,
        media_content_id: mediaID,
        media_content_type: 'music'
    };
	h.log('jsc.ha', "spotifyPlayMusic({}, {}, {})", [receiverID, entityID, data]);
    jsc.ha.request(receiverID, urlSuffix, data);
}

// Function to start playback on a Spotify media player, optionally setting a source first
function spotifyPlay(receiverID, entityID, source) {
    if (source) {
        spotifySetSource(receiverID, entityID, source);
        h.sleep(500);
    }
    var urlSuffix = '/api/services/media_player/media_play';
    h.log('jsc.ha', "spotifyPlay({}, {}, {})", [receiverID, entityID, source]);
    jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Function to set the source of a Spotify media player
function spotifySetSource(receiverID, entityID, source) {
    var urlSuffix = '/api/services/media_player/select_source';
    h.log('jsc.ha', "spotifySetSource({}, {}, {})", [receiverID, entityID, source]);
    jsc.ha.request(receiverID, urlSuffix, {entity_id: entityID, source: source});
}

// Function to pause playback on a Spotify media player, optionally setting a source first
// Note: Although the 'source' parameter is not mandatory, it is often better to include it 
// to avoid potential errors that may occur when it is omitted.
function spotifyPause(receiverID, entityID, source) {
    if (source) {
        spotifySetSource(receiverID, entityID, source);
    }
    var urlSuffix = '/api/services/media_player/media_pause';
    h.log('jsc.ha', "spotifyPause({}, {}, {})", [receiverID, entityID, source]);
    jsc.ha.request(receiverID, urlSuffix, entityID);
}