// Sends a request to the Home Assistant 
function request(receiverID, urlSuffix, requestData) {
  h.apiRequest(receiverID, {
    url_suffix: urlSuffix,
    data: { entity_id: requestData }
  });
}

// Posts data to the Home Assistant 
function post(receiverID, urlSuffix, requestData) {
  jsc.ha.request(receiverID, urlSuffix, requestData);
}

// Retrieves data from the Home Assistant 
function get(receiverID, urlSuffix) {
  return h.apiRequestEx(receiverID, {
    url_suffix: urlSuffix,
    headers: { type: 'GET' }
  });
}

// Retrieves items by type from the Home Assistant 
function getItemsByType(receiverID, type) {
  var r = jsc.ha.get(receiverID, '/api/states');
  var output = [];
  var json = JSON.parse(r);
  h.log(json);
  var starts = type + ".";
  for (var i = 0; i < json.length; i++) {
    var item = json[i];
    if (item.entity_id.startsWith(starts)) {
      output.push(item.entity_id);
    }
  }
  return output;
}

// Retrieves a list of switches from the Home Assistant
function getSwitchList(receiverID) {
  return jsc.ha.getItemsByType(receiverID, 'switch');
}

// Retrieves the state of an entity from the Home Assistant
function getState(receiverID, entityID, state = 'state') {
  var urlSuffix = '/api/states/' + entityID;
  var response = jsc.ha.get(receiverID, urlSuffix);
  var json = JSON.parse(response);
  h.log('jsc.ha', 'getStatus response: ' + response);
  if (state == 'state') {
    return json[state] == 'on' ? true : false;
  } else {
    return json[state];
  }
}

// Sets the state of a switch in the Home Assistant 
function setSwitch(receiverID, entityID, state) {
  var urlSuffix = '/api/services/switch/turn_' + (state ? 'on' : 'off');
  jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Toggles the state of a switch in the Home Assistant 
function toggleSwitch(receiverID, entityID) {
  var urlSuffix = '/api/services/switch/toggle';
  jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Sets the state of a script in the Home Assistant f
function setScript(receiverID, entityID, state) {
  var urlSuffix = '/api/services/script/turn_' + (state ? 'on' : 'off');
  jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Toggles the state of a script in the Home Assistant
function toggleScript(receiverID, entityID) {
  var urlSuffix = '/api/services/script/toggle';
  jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Activates a scene in the Home Assistant 
function activateScene(receiverID, entityID) {
  var urlSuffix = '/api/services/scene/turn_on';
  jsc.ha.request(receiverID, urlSuffix, entityID);
}

// Activates a trigger in the Home Assistant 
function activateTrigger(receiverID, entityID) {
  var urlSuffix = '/api/services/automation/trigger';
  jsc.ha.request(receiverID, urlSuffix, entityID);
}
