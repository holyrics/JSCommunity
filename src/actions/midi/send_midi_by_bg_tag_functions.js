function hGetItemInputParams() {
  var tag_map_sets = [];
  var titleDesc = "<html><div style='text-align:center'>"
           + jsc.i18n('Enter the MIDI code and velocity associated with each Tag.') + "<br>"
           + jsc.i18n('Example') + ": <b>10,127</b><br>"
           + jsc.i18n('If only the code is provided, speed 127 will be used by default.');
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
      receiver: 'midi'
    }, {
      id: 'tag_map',
      name: jsc.i18n('MIDI codes'),
      type: 'settings',
      hide_label: false,
      settings: tag_map_sets
    }
  ];
}

function stringToMidiAction(str) {
  str = str.replaceAll("[^0-9]", " ");
  str = str.trim().replaceAll("\\s+", " ");
  if (str.isEmpty()) return null;
  
  var arr = str.split(" ");
  if (arr.length <= 1) {
    arr.push(127);
  }
  return arr;
}

