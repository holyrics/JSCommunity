var target = obj.input.playlist_target;
var bothPlaylist = target == 'both';
var lyricsPlaylist = bothPlaylist || target == 'lyrics';
var mediaPlaylist = bothPlaylist || target == 'media';

if (obj.input.clear_playlist) {
    clearPlaylist(lyricsPlaylist, mediaPlaylist);
}

var clipboard = h.getClipboard();
var arr = clipboard.split("\n");
for (var k in arr) {
    var text = arr[k];
    if (text.trim() == '' || text.trim().startsWith('//')) { //ignore empty or comment
        continue;
    }
    if (text.indexOf('==') == 0) {
        //title item
        text = text.substring(2).trim();
        if (mediaPlaylist) {
            addToMediaPlaylist({type: 'title', name: text});
        }
        continue;
    }
    if (text.indexOf(':') > 0) {
        //verse item
        if (mediaPlaylist) {
            addToMediaPlaylist({type: 'verse', references: text});
        }
        continue;
    }
    //song item
    var json = h.hly('SearchSong', {text: text});
    if (json.data.length == 0) {
        log(jsc.i18n('Item not found') + ": " + text);
        continue;
    }
    if (json.data.length == 1) {
        addSongToPlaylist(json.data[0].id, lyricsPlaylist, mediaPlaylist);
        continue;
    }
    //If found more than one result
    //will display a window for the user to choose an item by creating the 'label' property
    //because it will be displayed in the list as the item name
    json.data.forEach(function (m) {
        m.label = m.title + " (" + m.artist + ")";
    });
    var selected = h.itemChooser(text + " - " + jsc.i18n('Multiple items found'), json.data);
    if (selected == null) {
        continue;
    }
    addSongToPlaylist(selected.id, lyricsPlaylist, mediaPlaylist);
}