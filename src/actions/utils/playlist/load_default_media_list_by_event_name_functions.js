function hGetItemInputParams() {
    return [
        {
            id: 'changeWallpaper',
            name: jsc.i18n('Alterar o Papel de Parede?'),
            description: jsc.i18n('Define se o papel de parede com o nome do evento deverá ser configurado.'),
            type: 'boolean',
            default_value: true
        }, {
            id: 'wallpaperPathPrefix',
            name: jsc.i18n('Pasta - papel de parede'),
            description: jsc.i18n('Define a pasta padrão onde estão as imagens de papel de parede. Se estiver vazio, as imagens serão procuradas na pasta raiz.'),
            type: 'string'
        }
    ];
}

function onPlaylistChange() {
    var key = 'saved_playlist_running';
    if (h.getGlobal(key) == 'ok') {
        // Block to prevent creating 2 loops
        return;
    }
    h.setGlobal(key, 'ok');
    var id = h.setInterval(function () {
        var syncStatus = h.hly('GetSyncStatus').data;
        if (syncStatus.enabled && syncStatus.progress < 100) {
            // Synchronization in progress
            return;
        }
        h.clearInterval(id); // Cancel the loop execution
        h.setGlobal(key, false);
        jsc.playlist.loadSavedPlaylistByEventName();
    }, 1000);
}