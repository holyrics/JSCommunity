if (!obj.tags || !obj.input.receiver_id) return;

for (var i in obj.tags) {
  var tag = obj.tags[i];
  var data = obj.input.tag_map[tag];
  if (!data) continue;
  
  var pageAndScene = stringToPageAndScene(data);
  if (!pageAndScene) continue;
    
  var suffix = '/edmx_change_scene/' + pageAndScene[0] + '/' + pageAndScene[1];
  h.apiRequestEx(obj.input.receiver_id, {
      url_suffix: suffix
  });
  break;
}