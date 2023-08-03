obs_v5 = {
    op6: function (d) {
        return {op: 6, d: d};
    },
    //
    request: function (receptorID, requestType, requestData) {
        jsc.err.safeNullOrEmpty(receptorID, 'receptorID');
        var d = {requestType: requestType};
        if (requestData != null) {
            d.requestData = requestData;
        }
        var json = h.apiRequest(receptorID, {op: 6, d: d});
        if (json == null) {
            throw h.getApiRequestLastError();
        }
        var response = JSON.parse(json);
        if (response.d.requestStatus.result) {
            return response.d.responseData;
        }
        throw JSON.stringify(response.d.requestStatus);
    },
    //
    getSceneList: function (receptorID) {
        var response = jsc.obs_v5.request(receptorID, 'GetSceneList', null);
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
    },
    //
    getSceneItemList: function (receptorID, sceneName) {
        var response = jsc.obs_v5.request(receptorID, 'GetSceneItemList', {
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
    },
    //
    getSceneItemIDByName: function (receptorID, sceneName, sceneItemName) {
        var keyCache = "obs_v5#getSceneItemIDByName#" + receptorID + "#" + sceneName;
        var cache = h.getGlobal(keyCache);
        if (cache == null || typeof cache[sceneItemName.toLowerCase()] === 'undefined') {
            var response = jsc.obs_v5.request(receptorID, 'GetSceneItemList', {
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
    },
    //
    getSceneItemEnabled: function (receptorID, sceneName, sceneItemNameOrID) {
        if (sceneItemNameOrID == '' || isNaN(sceneItemNameOrID)) {
            sceneItemNameOrID = jsc.obs_v5.getSceneItemIDByName(receptorID, sceneName, sceneItemNameOrID);
        }
        var response = jsc.obs_v5.request(receptorID, 'GetSceneItemEnabled', {
            sceneName: sceneName,
            sceneItemId: parseInt(sceneItemNameOrID)
        });
        h.log('jsc.obs_v5', 'getSceneItemEnabled response: {}', response);
        return response.sceneItemEnabled;
    },
    //
    setSceneItemEnabled: function (receptorID, sceneName, sceneItemNameOrID, enabled) {
        if (sceneItemNameOrID == '' || isNaN(sceneItemNameOrID)) {
            sceneItemNameOrID = jsc.obs_v5.getSceneItemIDByName(receptorID, sceneName, sceneItemNameOrID);
        }
        var response = jsc.obs_v5.request(receptorID, 'SetSceneItemEnabled', {
            sceneName: sceneName,
            sceneItemId: parseInt(sceneItemNameOrID),
            sceneItemEnabled: enabled
        });
        h.log('jsc.obs_v5', 'setSceneItemEnabled response: {}', response);
        return response;
    }
};