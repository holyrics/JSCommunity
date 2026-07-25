if (!obj.tags || !obj.input.receiver_id) return;

for (var i in obj.tags) {
  var tag = obj.tags[i];
  var data = obj.input.tag_map[tag];
  if (!data) continue;
  
  var midi = stringToMidiAction(data);
  if (!midi) continue;
    
  h.apiRequestEx(obj.input.receiver_id, midi);
  break;
}