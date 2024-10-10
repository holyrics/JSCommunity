function getPluginSettings() {
  var arr = ['~\u0024', ''];
  for (var i in arr) {
    try {
      var json = h.readFileAsText(arr[i] + '.plugin_system_settings.txt');
      return JSON.parse(json);
    } catch (e) {}
  }
  return {};
}

function createURL(settings, path, samePC) {
  var token = h.sha256(path + "#" + settings.token);
  token = h.base64Encode(token);
  token = token.replaceAll("[^a-zA-Z0-9]", "");
  token = token.substring(0, Math.min(20, token.length()));
     
  return "http://" + (samePC ? 'localhost' : settings.ip) + (settings.port == '80' ? "" : ":" + settings.port)
         + "/get_video"
         + "?path=" + encodeURIComponent(path)
         + "&token=" + token;
}
