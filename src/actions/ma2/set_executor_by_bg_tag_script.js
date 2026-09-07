if (!obj.tags || !obj.input.receiver_id) return;

for (var i in obj.tags) {
  var tag = obj.tags[i];
  var data = obj.input.tag_map[tag];
  if (!data) continue;
  
  var cmd = stringToExecutorAction(data);
  if (!cmd) continue;
    
  jsc.ma2.executorOn(obj.input.receiver_id, cmd);
  break;
}