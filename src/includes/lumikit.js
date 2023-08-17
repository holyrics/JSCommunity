lumikit = {
    requestUDP: function (receiverID, data1, data2) {
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
    },
    //
    setBPM: function (receiverID, bpm) {
        var relativeBPM = Math.round((bpm - 30) / 170 * 255);
        jsc.lumikit.requestUDP(receiverID, 'UF90', parseInt(relativeBPM).toFixed(0));
    },
    //
    selectFixtureGroup: function (receiverID, value) {
        var relative_value = Math.round((value - 1) / 127 * 255);
        jsc.lumikit.requestUDP(receiverID, 'MS02', parseInt(relative_value).toFixed(0));
    },
    //
    selectFixture: function (receiverID, value) {
        var relative_value = Math.round(value / 127 * 255);
        jsc.lumikit.requestUDP(receiverID, 'MS03', parseInt(relative_value).toFixed(0));
    },
    //
    resetSelection: function (receiverID) {
        jsc.lumikit.requestUDP(receiverID, 'MS15', 255);
    },
    //
    setDimmer: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF07', value);
    },
    //
    setStrobo: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF31', value);
    },
    //
    setR: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF32', value);
    },
    //
    setG: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF33', value);
    },
    //
    setB: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF34', value);
    },
    //
    setW: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF35', value);
    },
    //
    setA: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF36', value);
    },
    //
    setU: function (receiverID, value) {
        jsc.lumikit.requestUDP(receiverID, 'XF37', value);
    },
    //
    setRGBWAU: function (receiverID, R, G, B, W, A, U) {
        jsc.lumikit.setR(receiverID, R);
        jsc.lumikit.setG(receiverID, G);
        jsc.lumikit.setB(receiverID, B);
        jsc.lumikit.setW(receiverID, W);
        jsc.lumikit.setA(receiverID, A);
        jsc.lumikit.setU(receiverID, U);
    }
};