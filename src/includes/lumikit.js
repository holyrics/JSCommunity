// Sends a UDP request with the specified data to a receiver.
function requestUDP(receiverID, data1, data2) {
    var data = (data1.indexOf('mDMX:') === 0) ? data1 : 'mDMX:' + data1;
    if (data2 !== undefined) {
        data += ':' + data2;
    }
    h.apiRequest(receiverID, {
        headers: {
            type: 'UDP'
        },
        port: 22688,
        data: data
    });
}

// Sets the BPM (beats per minute) value on the specified receiver.
function setBPM(receiverID, bpm) {
    var relativeBPM = Math.round((bpm - 30) / 170 * 255);
    jsc.lumikit.requestUDP(receiverID, 'UF90', parseInt(relativeBPM).toFixed(0));
}

// Selects a fixture group using a relative value on the specified receiver.
function selectFixtureGroup(receiverID, value) {
    var relative_value = Math.round((value - 1) / 127 * 255);
    jsc.lumikit.requestUDP(receiverID, 'MS02', parseInt(relative_value).toFixed(0));
}

// Selects a fixture using a relative value on the specified receiver.
function selectFixture(receiverID, value) {
    var relative_value = Math.round(value / 127 * 255);
    jsc.lumikit.requestUDP(receiverID, 'MS03', parseInt(relative_value).toFixed(0));
}

// Resets the selection on the specified receiver.
function resetSelection(receiverID) {
    jsc.lumikit.requestUDP(receiverID, 'MS15', 255);
}

// Selects a scene within a specific page on the specified receiver.
function setActiveScene(receiverID, page, scene) {
    var sceneID = scene < 10 ? '0' + scene : scene;
    var pageID = Math.round((page - 1) / 127 * 255);
    jsc.lumikit.requestUDP(receiverID, 'MF03', pageID);
    jsc.lumikit.requestUDP(receiverID, 'MX' + sceneID, 255);
}

// Sets the dimmer value on the specified receiver.
function setDimmer(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF07', value);
}

// Sets the strobe effect value on the specified receiver.
function setStrobo(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF31', value);
}

// Sets the red color value on the specified receiver.
function setR(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF32', value);
}

// Sets the green color value on the specified receiver.
function setG(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF33', value);
}

// Sets the blue color value on the specified receiver.
function setB(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF34', value);
}

// Sets the white color value on the specified receiver.
function setW(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF35', value);
}

// Sets the amber color value on the specified receiver.
function setA(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF36', value);
}

// Sets the UV (ultraviolet) color value on the specified receiver.
function setU(receiverID, value) {
    jsc.lumikit.requestUDP(receiverID, 'XF37', value);
}

// Sets multiple color values (red, green, blue, white, amber, UV) on the specified receiver.
function setRGBWAU(receiverID, R, G, B, W, A, U) {
    jsc.lumikit.setR(receiverID, R);
    jsc.lumikit.setG(receiverID, G);
    jsc.lumikit.setB(receiverID, B);
    jsc.lumikit.setW(receiverID, W);
    jsc.lumikit.setA(receiverID, A);
    jsc.lumikit.setU(receiverID, U);
}