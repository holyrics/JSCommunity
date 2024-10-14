//Functions created based on the vMix API documentation, extracted from https://www.vmix.com/help23/index.htm?DeveloperAPI.html

// Sends a request to the vMix with a given URL suffix.
function request(receiverID, urlSuffix) {
    if (!urlSuffix.toUpperCase().startsWith("/API/?")) {
        urlSuffix = "/API/?" + urlSuffix;
    }
    var r = h.apiRequestEx(receiverID, { url_suffix: urlSuffix });
    h.log("jsc.vmix", 'urlSuffix: {} result : {}', urlSuffix, r);
    return r;
}

// Retrieves the current status of the specified vMix.
function getStatus(receiverID) {
    return jsc.vmix.request(receiverID, "");
}

// Searches for an input by its key within the provided inputs array.
function searchInputByKey(inputs, key) {
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].key === key) {
            return inputs[i];
        }
    }
    return null;
}

// Extracts input information from the current vMix status.
function extractInputsFromStatus(status) {
    var arr = [];
    var inputs = h.tagExtract(status, "<inputs>", "</inputs>");
    if (inputs.length == 0) {
        return arr;
    }
    inputs = h.tagExtract(inputs[0], "<input", "</input>");
    var fields = ['key', 'number', 'type', 'title', 'shortTitle', 'state', 'position', 'duration', 'loop'];
    for (var i = 0; i < inputs.length; i++) {
        var item = {};
        for (var j = 0; j < fields.length; j++) {
            item[fields[j]] = h.tagExtractSingle(inputs[i], (fields[j] + "=\""), "\"");
        }
        arr.push(item);
    }
    return arr;
}

// Extracts overlay information from the current vMix status.
function extractOverlaysFromStatus(status) {
    var arr = [];
    var overlays = h.tagExtract(status, "<overlays>", "</overlays>");
    if (overlays.length == 0) {
        return arr;
    }
    overlays = overlays[0];
    for (var j = 1; j <= 4; j++) {
        var tag = "<overlay number=\"" + j + "\">";
        var idxOf = overlays.indexOf(tag);
        var input_number = null;
        if (idxOf >= 0) {
            input_number = overlays.substring(idxOf + tag.length);
            input_number = input_number.substring(0, input_number.indexOf("<"));
        }
        arr.push({
            number: j,
            input_number: input_number
        });
    }
    return arr;
}

// Retrieves all inputs from the specified vMix's status.
function getInputs(receiverID) {
    //fields: key, number, type, title, shortTitle, state, position, duration, loop
    var status = jsc.vmix.getStatus(receiverID);
    return jsc.vmix.extractInputsFromStatus(status);
}

// Gets the name of the currently active input for the specified vMix.
function getActiveInputName(receiverID) {
    var status = jsc.vmix.getStatus(receiverID);
    var inputs = jsc.vmix.extractInputsFromStatus(status);
    var activeIndex = h.tagExtractSingle(status, "<active>", "</active>");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].number === activeIndex) {
            return inputs[i].title;
        }
    }
    return null;
}

// Retrieves the names of all inputs from the specified vMix.
function getInputNames(receiverID) {
    var inputs = jsc.vmix.getInputs(receiverID);
    var names = [];
    for (var i = 0; i < inputs.length; i++) {
        names.push(inputs[i].title);
    }
    return names;
}

// Checks if a specific input is currently active on the specified vMix.
function isInputActive(receiverID, inputID) {
    var status = jsc.vmix.getStatus(receiverID);
    var inputs = jsc.vmix.extractInputsFromStatus(status);
    var activeIndex = h.tagExtractSingle(status, "<active>", "</active>");

    var input = jsc.vmix.searchInputByKey(inputs, inputID);
    return input != null && input.number === activeIndex;
}

// Checks if a specific overlay input is currently active on the specified vMix.
function isOverlayActive(receiverID, inputID, overlayNumber) {
    var status = jsc.vmix.getStatus(receiverID);
    var inputs = jsc.vmix.extractOverlaysFromStatus(status);
    var input = jsc.vmix.searchInputByKey(inputs, inputID);
    if (input == null) {
        return false;
    }
    var overlays = jsc.vmix.extractOverlaysFromStatus(status);
    var overlay = null;
    for (var i = 0; i < overlays.length; i++) {
        if (overlays[i].number === overlayNumber) {
            overlay = overlays[i];
            break;
        }
    }
    return overlay != null && overlay.input_number === input.number;
}

// Checks if the specified vMix is currently streaming.
function isStreaming(receiverID) {
    var status = jsc.vmix.getStatus(receiverID);
    var streaming = h.tagExtractSingle(status, "<streaming", "</streaming>");
    return streaming.toLowerCase().endsWith("true");
}

// Checks if the specified vMix is currently recording.
function isRecording(receiverID) {
    var status = jsc.vmix.getStatus(receiverID);
    var recording = h.tagExtractSingle(status, "<recording", "</recording>");
    return recording.toLowerCase().endsWith("true");
}

// Activates the input without transition for the specified vMix.
function setActiveInput(receiverID, inputName) {
    var url = 'Function=ActiveInput&Input=' + encodeURIComponent(inputName);
    return jsc.vmix.request(receiverID, url);
}

// Activates the input with a transition for the specified vMix.
function setInput(receiverID, inputID, transitionType, transitionDuration) {
    transitionType = transitionType || "Fade";
    var request = "Function=" + transitionType + "&Input=" + encodeURIComponent(inputID);
    if (transitionDuration) {
        request += "&Duration=" + transitionDuration;
    }
    return jsc.vmix.request(receiverID, request);
}

// Enables or disables the overlay input for the specified vMix.
function setOverlayInputEnabled(receiverID, inputID, overlayNumber, enabled) {
    var request = "Function=OverlayInput" + overlayNumber;
    request += enabled ? "In&Input=" + inputID : "Out";
    return jsc.vmix.request(receiverID, request);
}

// Toggles the overlay input for the specified vMix.
function toggleOverlayInputEnabled(receiverID, inputID, overlayNumber) {
    var request = "Function=OverlayInput" + overlayNumber + "&Input=" + inputID;
    return jsc.vmix.request(receiverID, request);
}

// Starts or stops streaming on the specified vMix.
function setStreamingEnabled(receiverID, enabled) {
    var request = "Function=" + (enabled ? "Start" : "Stop") + "Streaming";
    return jsc.vmix.request(receiverID, request);
}

// Starts streaming on the specified vMix.
function startStreaming(receiverID) {
    return jsc.vmix.setStreamingEnabled(receiverID, true);
}

// Stops streaming on the specified vMix.
function stopStreaming(receiverID) {
    return jsc.vmix.setStreamingEnabled(receiverID, false);
}

// Toggles streaming on the specified vMix.
function toggleStreaming(receiverID) {
    return jsc.vmix.request(receiverID, "Function=StartStopStreaming");
}

// Starts or stops recording on the specified vMix.
function setRecordingEnabled(receiverID, enabled) {
    var request = "Function=" + (enabled ? "Start" : "Stop") + "Recording";
    return jsc.vmix.request(receiverID, request);
}

// Starts recording on the specified vMix.
function startRecording(receiverID) {
    return jsc.vmix.setRecordingEnabled(receiverID, true);
}

// Stops recording on the specified vMix.
function stopRecording(receiverID) {
    return jsc.vmix.setRecordingEnabled(receiverID, false);
}

// Toggles recording on the specified vMix.
function toggleRecording(receiverID) {
    return jsc.vmix.request(receiverID, "Function=StartStopRecording");
}
