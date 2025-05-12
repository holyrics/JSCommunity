// Library for communicating with the Uno overlays platform 
// https://overlays.uno/
// Written by Pr. Cris in 05/2025 with help from ChatGPT

// Sends a command to the Uno API and returns the result or payload
function request(apiKey, dataObj, fullReturn) {
  var url = "https://app.overlays.uno/apiv2/controlapps/" + apiKey + "/api";

  var options = {
    url: url,
    type: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(dataObj),
    timeout: 5000,
    response_data_type: 'string;utf-8'
  };

  var response = h.apijsc.uno.request(url, options);
  
  

  if (!response) {
    h.log('uno', "API → Erro ou timeout: " + JSON.stringify(dataObj));
    return null;
  }

  try {
    var parsed = JSON.parse(response);
    
	h.logp('uno', "Result of {}: {}", dataObj.command, parsed);

    if (parsed.status === 200 && parsed.result === "ok" && fullReturn) {
      return parsed || null;
    }

    if (parsed.status === 200 && parsed.result === "ok") {
      return parsed.payload || null;
    } else {
      h.log('uno', "API → Erro na resposta: " + response);
      return null;
    }

  } catch (e) {
    h.log('uno', "API → Erro ao interpretar JSON de resposta: " + response);
    return null;
  }
}

// Shows a specific overlay by ID
function showOverlay(apiKey, id) {
  return jsc.uno.request(apiKey, { command: "ShowOverlay", id: id });
}

// Hides a specific overlay by ID
function hideOverlay(apiKey, id) {
  return jsc.uno.request(apiKey, { command: "HideOverlay", id: id });
}

// Toggles visibility of a specific overlay by ID
function toggleOverlay(apiKey, id) {
  return jsc.uno.request(apiKey, { command: "ToggleOverlay", id: id });
}

// Gets visibility status (true/false) of a specific overlay
function getOverlayVisibility(apiKey, id) {
  var result = jsc.uno.request(apiKey, { command: "GetOverlayVisibility", id: id }, true);
  return result ? result.payload : null;
}

// Retrieves the content object of a specific overlay
function getOverlayContent(apiKey, id) {
  return jsc.uno.request(apiKey, { command: "GetOverlayContent", id: id });
}

// Hides all overlays for the given API key
function hideAllOverlays(apiKey) {
  return jsc.uno.request(apiKey, { command: "HideAllOverlays" });
}

// Retrieves the list of all overlays available for the API key
function getOverlays(apiKey) {
  return jsc.uno.request(apiKey, { command: "GetOverlays" });
}

// Sets the entire content object for a specific overlay
function setOverlayContent(apiKey, id, contentObj) {
  return jsc.uno.request(apiKey, {
    command: "SetOverlayContent",
    id: id,
    content: contentObj
  });
}

// Sets a specific field in an overlay's content
function setOverlayContentField(apiKey, id, fieldId, value) {
  return jsc.uno.request(apiKey, {
    command: "SetOverlayContentField",
    id: id,
    fieldId: fieldId,
    value: value
  });
}
