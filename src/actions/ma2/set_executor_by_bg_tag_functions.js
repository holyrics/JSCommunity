function hGetItemInputParams() {
  var tag_map_sets = [];
  var titleDesc = "<html><div style='text-align:center'>"
           + jsc.i18n('Enter the Executor code associated with each Tag.') + "<br>"
           + jsc.i18n('Example') + ": <b>1.3</b><br>";
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
      receiver: 'tcp,grandma2'
    }, {
      id: 'tag_map',
      name: jsc.i18n('Executor codes'),
      type: 'settings',
      hide_label: false,
      settings: tag_map_sets
    }
  ];
}

function stringToExecutorAction(str) {
  str = str.replaceAll("[^0-9.]", "");
  if (str.isEmpty()) return null;  
  return str;
}
