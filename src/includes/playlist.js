//
function loadSavedPlaylistByEventName(onlyIfEmpty) {
    onlyIfEmpty = onlyIfEmpty !== undefined ? onlyIfEmpty : true;
    if (onlyIfEmpty && h.hly('GetMediaPlaylist').data.length > 0) {
        // Current list already populated
        return;
    }
    var name = h.getPlaylistInfo().name;
    if (name == '') {
        return;
    }
    h.hly('LoadSavedPlaylist', {name: name});
}

//
function setupWallpaperByEventName(pathPrefix) {
    var eventName = h.getPlaylistInfo().name;
    if (eventName == '') {
        return;
    }
    var filename = '';
    if (pathPrefix !== undefined && pathPrefix.trim() != '') {
        filename = pathPrefix;
        if (!pathPrefix.endsWith("/")) {
            filename += '/';
        }
    }
    filename += eventName + '.jpg';
    h.hly('SetWallpaperSettings', {
        file: filename,
        enabled: true
    });
}