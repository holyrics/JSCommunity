function hGetItemInputParams() {
  var tag_map_sets = [];
  var titleDesc = "<html><div style='text-align:center'>"
           + jsc.i18n('Enter the Page and Scene associated with each Tag.') + "<br>"
           + jsc.i18n('Example') + ": <b>1,D</b><br>"
           + jsc.i18n('If only the scene is provided, page 1 will be used by default.');
  tag_map_sets.push({
    type: 'title',
    name: titleDesc
  });
  tag_map_sets.push({ type: 'separator' });
    
  h.hly('GetBackgrounds').data.stream()
      .flatMap(function(bg) { return bg.tags.stream(); })
      .distinct()
      .forEach(function(tag) {
        tag_map_sets.push({
          id: tag,
          type: 'string'                
        });
      });
    
  return [
    {
      id: 'receiver_id',
      name: jsc.i18n('Destination'),
      type: 'receiver',
      receiver: 'lumikit'
    }, {
      id: 'tag_map',
      name: jsc.i18n('Scenes'),
      type: 'settings',
      hide_label: false,
      settings: tag_map_sets
    }
  ];
}

function stringToPageAndScene(str) {
  str = str.toUpperCase().replaceAll("[^0-9A-Z]", " ");
  str = str.trim().replaceAll("\\s+", " ");
  if (str.isEmpty()) return null;
  
  var arr = str.split(" ");
  var page = arr.length <= 1 ? '1' : arr[0];
  var scene = arr.length <= 1 ? arr[0] : arr[1];
  
  var page = page.replaceAll("[^0-9]", "");
  if (!page) return null;
  page = parseInt(page) - 1;
  
  scene = scene.replaceAll("[^A-Z]", "");
  scene = "ASDFGHJKLZXCVBNM".indexOf(scene);
  if (scene < 0) return null;
  
  return [page.toFixed(0), scene.toFixed(0)];
}

function fixInputParamTimeout() {
  if (h.isMinVersion('2.25.2')
        || h.getGlobalAndSet('hly#GetBGs#fixInputParamTimeout', false, true)) {
    return;
  }

  var done = false;
  h.setTimeout(function() {
    h.hly('GetBackgrounds');
    done = true;
  }, 0);
  var started = Date.now();
  while (!done && Math.abs(Date.now() - started) < 4000) {
    h.sleep(50);
  }
}

fixInputParamTimeout();

