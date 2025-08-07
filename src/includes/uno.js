// Library for communicating with the Uno overlays platform 
// https://overlays.uno/
// Written by Pr. Cris in 05/2025 with help from ChatGPT

// Sends a command to the Uno API and returns the result or payload

function request(apiKey, dataObj, fullReturn) {
	var options = {
		url_suffix: "controlapps/" + apiKey + "/api",
		type: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify(dataObj),
		timeout: 5000,
		response_data_type: 'string;utf-8'
	};

	var response;
	try {
		response = h.httpRequest('https://app.overlays.uno/apiv2/', options);
	} catch (err) {
		h.log("", 'Erro {}', [err]);
		return null;
	}

	try {
		var parsed = JSON.parse(response);

		h.logp('jsc.uno', "Result of {}: {}", dataObj.command, parsed);

		if (parsed.status === 200 && parsed.result === "ok" && fullReturn) {
			return parsed || null;
		}

		if (parsed.status === 200 && parsed.result === "ok") {
			return parsed.payload || null;
		} else {
			h.log('jsc.uno', "API → Erro na resposta: " + response);
			return null;
		}

	} catch (e) {
		h.log('jsc.uno', "API → Erro ao interpretar JSON de resposta: " + response);
		return null;
	}
}

// Overlays Básicos

function showOverlay(apiKey, id) {
	return jsc.uno.request(apiKey, { command: "ShowOverlay", id: id });
}

function hideOverlay(apiKey, id) {
	return jsc.uno.request(apiKey, { command: "HideOverlay", id: id });
}

function toggleOverlay(apiKey, id) {
	return jsc.uno.request(apiKey, { command: "ToggleOverlay", id: id });
}

function getOverlayVisibility(apiKey, id) {
	var result = jsc.uno.request(apiKey, { command: "GetOverlayVisibility", id: id }, true);
	return result ? result.payload : null;
}

function getOverlayContent(apiKey, id) {
	return jsc.uno.request(apiKey, { command: "GetOverlayContent", id: id });
}

function hideAllOverlays(apiKey) {
	return jsc.uno.request(apiKey, { command: "HideAllOverlays" });
}

function getOverlays(apiKey) {
	return jsc.uno.request(apiKey, { command: "GetOverlays" });
}

function setOverlayContent(apiKey, id, contentObj) {
	return jsc.uno.request(apiKey, {
		command: "SetOverlayContent",
		id: id,
		content: contentObj
	});
}

function setOverlayContentField(apiKey, id, fieldId, value) {
	return jsc.uno.request(apiKey, {
		command: "SetOverlayContentField",
		id: id,
		fieldId: fieldId,
		value: value
	});
}
// Modelos e slots

function getOverlayModel(apiKey, id) {
	return jsc.uno.request(apiKey, {
		command: "GetOverlayModel",
		id: id
	}, true);
}

function takeOverlaySlotName(apiKey, id, slotName) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlaySlotName",
		id: id,
		value: slotName
	});
}

function takeOverlaySlotNumber(apiKey, id, slotNumber) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlaySlotNumber",
		id: id,
		value: slotNumber
	});
}

function takeOverlayFirstSlot(apiKey, id) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlayFirstSlot",
		id: id
	});
}

function takeOverlayNextSlot(apiKey, id) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlayNextSlot",
		id: id
	});
}

function takeOverlayPreviousSlot(apiKey, id) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlayPreviousSlot",
		id: id
	});
}

function takeOverlayLastSlot(apiKey, id) {
	return jsc.uno.request(apiKey, {
		command: "TakeOverlayLastSlot",
		id: id
	});
}
// Timer Controls

function setTimer(apiKey, seconds) {
	return jsc.uno.request(apiKey, {
		command: "SetTimer",
		value: seconds
	});
}

function startTimer(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "StartTimer"
	});
}

function pauseTimer(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "PauseTimer"
	});
}

function playTimer(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "PlayTimer"
	});
}

function resetTimer(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "ResetTimer"
	});
}

function getTimer(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "GetTimer"
	}, true);
}

function increaseTimer(apiKey, value) {
	return jsc.uno.request(apiKey, {
		command: "IncreaseTimer",
		value: value
	});
}

function decreaseTimer(apiKey, value) {
	return jsc.uno.request(apiKey, {
		command: "DecreaseTimer",
		value: value
	});
}

function setBeginTimer(apiKey, seconds) {
	return jsc.uno.request(apiKey, {
		command: "SetBeginTime",
		value: seconds
	});
}

function getBeginTime(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "GetBeginTime"
	});
}

function setUseMessage(apiKey, enabled) {
	return jsc.uno.request(apiKey, {
		command: "SetUseMessage",
		value: enabled
	});
}

function getUseMessage(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "GetUseMessage"
	});
}

function setTimerMessage(apiKey, message) {
	return jsc.uno.request(apiKey, {
		command: "SetMessage",
		value: message
	});
}

function getTimerMessage(apiKey) {
	return jsc.uno.request(apiKey, {
		command: "GetMessage"
	});
}