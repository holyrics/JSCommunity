function clearPlaylist(lyricsPlaylist, mediaPlaylist) {
    var indexes = [];
    for (var i = 0; i < 256; i++) {
        indexes.push(i);
    }
    if (lyricsPlaylist) {
        h.hly('RemoveFromLyricsPlaylist', {'indexes': indexes});
    }
    if (mediaPlaylist) {
        h.hly('RemoveFromMediaPlaylist', {'indexes': indexes});
    }
}

function addToMediaPlaylist(item) {
    var r = h.hly('AddToPlaylist', {items: [item]});
    if (r.status != 'ok') {
        var msg = jsc.i18n('Error') + ": {}";
        log(msg, [r.error]);
    }
}

function addSongToPlaylist(id, lyricsPlaylist, mediaPlaylist) {
    if (mediaPlaylist) {
        addToMediaPlaylist({type: 'song', id: id});
    }
    if (lyricsPlaylist) {
        h.hly('AddLyricsToPlaylist', {id: id});
    }
}

function log(msg, params) {
    h.log("", msg, params);
}

function hGetItemInputParams() {
    return [
        {
            id: 'playlist_target',
            name: jsc.i18n('Playlist'),
            description: '',
            type: 'string',
            allowed_values: [
                {value: 'media', label: jsc.i18n('Medias')},
                {value: 'lyrics', label: jsc.i18n('Lyrics')},
                {value: 'both', label: jsc.i18n('Both')}
            ],
            default_value: 'media'
        }, {
            id: 'clear_playlist',
            name: jsc.i18n('Clear playlist'),
            description: '',
            type: 'boolean',
            default_value: true
        }
    ];
}