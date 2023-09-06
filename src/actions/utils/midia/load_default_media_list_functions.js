function hGetItemInputParams() {
    return [
          {
            id: 'changeWallpaper',
            name: jsc.i18n('Alterar o Papel de Parede?'),
            description: jsc.i18n('Define se o papel de parede com o nome do evento deverá ser configurado.'),
            type: 'boolean',
            default_value: true
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
  var id = h.setInterval(function(){
    var syncStatus = h.hly('GetSyncStatus').data;
    if (syncStatus.progress < 100) {
      // Synchronization in progress
      return;
    }
    h.clearInterval(id); // Cancel the loop execution
    h.setGlobal(key, false);
    if (h.hly('GetMediaPlaylist').data.length > 0) {
      // Current list already populated
      return;
    }
    var playlistName = MediaName();
    h.hly('LoadSavedPlaylist', {name: playlistName });
  }, 1000);
}

function MediaName() {
  var result = h.getPlaylistInfo();
  var playlistName = result.name;
  return playlistName;
}

function setWallpaper() {
var evento = MediaName();
h.hly('SetWallpaperSettings', {
    file: evento+'.jpg',
    enabled: true,
    fill_color: '000000'
});
}