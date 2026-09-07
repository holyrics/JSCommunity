if (!obj.tags || !obj.input.receiver_id) return;

for (var i in obj.tags) {
  var tag = obj.tags[i];
  var data = obj.input.tag_map[tag];
  if (!data) continue;
  
  var cmd = stringToExecutorAction(data);
  if (!cmd) continue;

  var stateKey = 'ma2ActiveExecutor:' + obj.input.receiver_id;
  var previousExecutor = String(h.getGlobal(stateKey, '') || '');

  if (previousExecutor == cmd) break;
  jsc.ma2.executorOn(obj.input.receiver_id, cmd);
  if (previousExecutor) {
    jsc.ma2.executorOff(obj.input.receiver_id, previousExecutor);
  }
  h.setGlobal(stateKey, cmd);
  break;
}
