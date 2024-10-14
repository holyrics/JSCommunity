//Functions created based on the vMix API documentation, extracted from https://www.vmix.com/help23/index.htm?DeveloperAPI.html

// Sends a request to the vMix with a given URL suffix.
function request(receiverID, urlSuffix) {
    if (!urlSuffix.toUpperCase().startsWith("/API/?")) {
        urlSuffix = "/API/?" + urlSuffix;
    }
    const r = h.apiRequestEx(receiverID, { url_suffix: urlSuffix });
    h.log("jsc.vmix", 'urlSuffix: {} result : {}', urlSuffix, r);
    return r;
}

// Retrieves the current status of the specified vMix.
function getStatus(receiverID) {
    return request(receiverID, "");
}

// Searches for an input by its key within the provided inputs array.
function searchInputByKey(inputs, key) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].key === key) {
            return inputs[i];
        }
    }
    return null;
}

// Extracts input information from the current vMix status.
function extractInputsFromStatus(status) {
    return jsc.vmix.extractInputsFromStatus(status);
}

// Extracts overlay information from the current vMix status.
function extractOverlaysFromStatus(status) {
    return jsc.vmix.extractOverlaysFromStatus(status);
}

// Retrieves all inputs from the specified vMix's status.
function getInputs(receiverID) {
    const status = getStatus(receiverID);
    return jsc.vmix.extractInputsFromStatus(status);
}

// Gets the name of the currently active input for the specified vMix.
function getActiveInputName(receiverID) {
    const status = getStatus(receiverID);
    const inputs = jsc.vmix.extractInputsFromStatus(status);
    const activeIndex = h.tagExtractSingle(status, "<active>", "</active>");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].number === activeIndex) {
            return inputs[i].title;
        }
    }
}

// Retrieves the names of all inputs from the specified vMix.
function getInputNames(receiverID) {
    const inputs = getInputs(receiverID);
    const names = [];
    for (let i = 0; i < inputs.length; i++) {
        names.push(inputs[i].title);
    }
    return names;
}

// Checks if a specific input is currently active on the specified vMix.
function isInputActive(receiverID, inputID) {
    const status = getStatus(receiverID);
    const inputs = jsc.vmix.extractInputsFromStatus(status);
    const activeIndex = h.tagExtractSingle(status, "<active>", "</active>");

    const input = searchInputByKey(inputs, inputID);
    return input != null && input.number === activeIndex;
}

// Checks if a specific overlay input is currently active on the specified vMix.
function isOverlayActive(receiverID, inputID, overlayNumber) {
    const status = getStatus(receiverID);
    const inputs = jsc.vmix.extractOverlaysFromStatus(status);
    const input = searchInputByKey(inputs, inputID);
    if (input == null) {
        return false;
    }
    const overlays = jsc.vmix.extractOverlaysFromStatus(status);
    let overlay = null;
    for (let i = 0; i < overlays.length; i++) {
        if (overlays[i].number === overlayNumber) {
            overlay = overlays[i];
            break;
        }
    }
    return overlay != null && overlay.input_number === input.number;
}

// Checks if the specified vMix is currently streaming.
function isStreaming(receiverID) {
    const status = getStatus(receiverID);
    const streaming = h.tagExtractSingle(status, "<streaming", "</streaming>");
    return streaming.toLowerCase().endsWith("true");
}

// Checks if the specified vMix is currently recording.
function isRecording(receiverID) {
    const status = getStatus(receiverID);
    const recording = h.tagExtractSingle(status, "<recording", "</recording>");
    return recording.toLowerCase().endsWith("true");
}

// Activates the input without transition for the specified vMix.
function setActiveInput(receiverID, inputName) {
    const url = 'Function=ActiveInput&Input=' + encodeURIComponent(inputName);
    request(receiverID, url);
}

// Activates the input with a transition for the specified vMix.
function setInput(receiverID, inputID, transitionType, transitionDuration) {
    transitionType = transitionType || "Fade";
    let request = "Function=" + transitionType + "&Input=" + encodeURIComponent(inputID);
    if (transitionDuration) {
        request += "&Duration=" + transitionDuration;
    }
    const r = request(receiverID, request);
    h.log("jsc.vmix", "setInput response: {}", [r]);
    return r;
}

// Enables or disables the overlay input for the specified vMix.
function setOverlayInputEnabled(receiverID, inputID, overlayNumber, enabled) {
    const request = "Function=OverlayInput" + overlayNumber;
    request += enabled ? "In&Input=" + inputID : "Out";
    const r = request(receiverID, request);
    h.log("jsc.vmix", "setOverlayInputEnabled response: {}", [r]);
    return r;
}

// Toggles the overlay input for the specified vMix.
function toggleOverlayInputEnabled(receiverID, inputID, overlayNumber) {
    const request = "Function=OverlayInput" + overlayNumber + "&Input=" + inputID;
    const r = request(receiverID, request);
    h.log("jsc.vmix", "toggleOverlayInputEnabled response: {}", [r]);
    return r;
}

// Starts or stops streaming on the specified vMix.
function setStreamingEnabled(receiverID, enabled) {
    const request = "Function=" + (enabled ? "Start" : "Stop") + "Streaming";
    const r = request(receiverID, request);
    h.log("jsc.vmix", "setStreamingEnabled response: {}", [r]);
    return r;
}

// Starts streaming on the specified vMix.
function startStreaming(receiverID) {
    return setStreamingEnabled(receiverID, true);
}

// Stops streaming on the specified vMix.
function stopStreaming(receiverID) {
    return setStreamingEnabled(receiverID, false);
}

// Toggles streaming on the specified vMix.
function toggleStreaming(receiverID) {
    const r = request(receiverID, "Function=StartStopStreaming");
    h.log("jsc.vmix", "toggleStreaming response: {}", [r]);
    return r;
}

// Starts or stops recording on the specified vMix.
function setRecordingEnabled(receiverID, enabled) {
    const request = "Function=" + (enabled ? "Start" : "Stop") + "Recording";
    const r = request(receiverID, request);
    h.log("jsc.vmix", "setRecordingEnabled response: {}", [r]);
    return r;
}

// Starts recording on the specified vMix.
function startRecording(receiverID) {
    return setRecordingEnabled(receiverID, true);
}

// Stops recording on the specified vMix.
function stopRecording(receiverID) {
    return setRecordingEnabled(receiverID, false);
}

// Toggles recording on the specified vMix.
function toggleRecording(receiverID) {
    const r = request(receiverID, "Function=StartStopRecording");
    h.log("jsc.vmix", "toggleRecording response: {}", [r]);
    return r;
}
