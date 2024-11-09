// 
function createWebSocket(receiverID) {
    var ws = h.ws(receiverID);
    if (ws != null) {
        return ws;
    }
    //create websocket object
    var stateLoaded = false;
    ws = h.ws(receiverID, {
        on_error: function (evt) {
            h.log('jsc.soundcraft', 'on_error: {}', [evt]);
        },
        loop: function(evt) {
            evt.source.send("3:::ALIVE");
        },
        on_message: function (msg) {
            jsc.soundcraft.saveStateFromMessage(ws, msg);
            stateLoaded = true;
        }
    });
    if (ws == null) {
        throw 'connection failed';
    }
    var timerID = h.uuid();
    while (!stateLoaded && h.getTimerMillis(timerID) < 3000) {
        h.sleep(50);
    }
    ws.onPropertyChange(function(evt) {
        h.log('jsc.soundcraft', 'onPropertyChange: {}', [evt]);
    });
    return ws;
}

//
function saveStateFromMessage(ws, msg) {
    var rows = msg.split("\n");
    for (var i = 0; i < rows.length; i++) {
        var idxOf = rows[i].indexOf("SETD^");
        if (idxOf < 0) {
            continue;
        }
        var setd = rows[i].substring(idxOf + 5);
        idxOf = setd.indexOf('^');
        if (idxOf < 0) {
            continue;
        }
        var k = setd.substring(0, idxOf);
        if (k.endsWith(".mix") || k.endsWith(".value")|| k.endsWith(".pan")) {
            ws.put("SETD^" + k, parseFloat(setd.substring(idxOf + 1)));
        }
        if (k.endsWith(".mute") || k.endsWith(".solo")) {
            ws.put("SETD^" + k, setd.substring(idxOf + 1) == '1');
        }
        if (k.endsWith(".stereoIndex")) {
            ws.put("SETD^" + k, parseInt(setd.substring(idxOf + 1)));
        }
    }
}

// 
function request(receiverID, data) {
    var ws = jsc.soundcraft.createWebSocket(receiverID);
    if (!data.startsWith("3:::")) {
        data = "3:::" + data;
    }
    h.log('jsc.soundcraft', 'send: {} {}', [receiverID, data]);
    ws.send(data);
    jsc.soundcraft.saveStateFromMessage(ws, data);
}

function batchRequest(receiverID, array) {
    var ws = jsc.soundcraft.createWebSocket(receiverID);
    for (var i = 0; i < array.length; i++) {
        var data = array[i];
        if (!data.startsWith("3:::")) {
            data = "3:::" + data;
        }
        h.log('jsc.soundcraft', 'send: {} {}', [receiverID, data]);
        ws.send(data);
        jsc.soundcraft.saveStateFromMessage(ws, data);
    }
}

// 
function getSettings(receiverID, settingsID) {
    var v = jsc.soundcraft.createWebSocket(receiverID).get(settingsID);
    h.log('jsc.soundcraft', 'getSettings: {} - {}: {}', [receiverID, settingsID, v]);
    return v;
}

//
function createSETD(type, number, subtype, subtype_number, action, value) {
    var cmd = "";
    if (!type) {
        cmd = 'SETD^^' + (action || '');
        if (value) {
            cmd += "^" + value;
        }
        return cmd;
    }
    if (type == 'm' && subtype) {
        type = subtype;
        number = subtype_number;
        subtype = null;
        subtype_number = null;
    }
    if (subtype) {
        switch (subtype) {
            case 'i':
            case 'l':
            case 'a':
            case 'f':
            case 's':
            case 'p':
            case 'v':
                cmd += subtype + "." + parseInt(subtype_number - 1).toFixed(0);
                break;
        }
    }
    switch (type) {
        case 'm':
        case 'i':
        case 'l':
        case 'a':
        case 'f':
        case 's':
        case 'p':
        case 'v':
            if (cmd != '') {
                if (type == 'a') {
                    type = 'aux';
                }
                if (type == 'f') {
                    type = 'fx';
                }
                if (action == 'mix') {
                    action = 'value';
                }
            }
            if (type == 'm') {
                if (!subtype) {
                    cmd += 'm';
                }
                break;
            }
            if (cmd != '') {
                cmd += '.';
            }
            cmd += type + "." + parseInt(number - 1).toFixed(0);
            break;
    }
    cmd = 'SETD^' + cmd + '.' + action;
    if (value !== null && value !== undefined) {
        cmd += "^" + value;
    }
    return cmd;
}

//
function getIndexesWithStereoIndex(receiverID, type, number) {
    var cmd = jsc.soundcraft.createSETD(type, number, null, null, 'stereoIndex', null);
    var settings = jsc.soundcraft.getSettings(receiverID, cmd);
    if (settings === 0) {
        return [number, number + 1];
    }
    if (settings === 1) {
        return [number, number - 1];
    }
    return [number];
}

//
function createSETDAndStereoIndex(receiverID, type, number, subtype, subtype_number, action, value) {
    var linkedTypes = jsc.soundcraft.getIndexesWithStereoIndex(receiverID, type, number);
    var linkedSubtypes = [];
    if (subtype) {
        linkedSubtypes = jsc.soundcraft.getIndexesWithStereoIndex(receiverID, subtype, subtype_number);
    } else {
        linkedSubtypes.push(subtype_number);
    }
    var cmds = [];
    for (var x = 0; x < linkedTypes.length; x++) {
        for (var y = 0; y < linkedSubtypes.length; y++) {
            cmds.push(jsc.soundcraft.createSETD(type, linkedTypes[x], subtype, linkedSubtypes[y], action, value));
        }
    }
    return cmds;
}

//
function conn(receiverID) {
    var sc = jsc.soundcraft;
    var type = null;
    var number = null;
    var subtype = null;
    var subtype_number = null;
    var builder = {
        setd: function (action, value) {
            return jsc.soundcraft.createSETD(type, number, subtype, subtype_number, action, value);
        },
        setdAndStereoIndex: function (action, value) {
            return jsc.soundcraft.createSETDAndStereoIndex(receiverID, type, number, subtype, subtype_number, action, value);
        },
        getSettings: function (action) {
            return jsc.soundcraft.getSettings(receiverID, builder.setd(action));
        },
        f: function (n) {
            return jsc.utils.range(n || 0, 0, 1).toFixed(4);
        },
        ci: function (c, i) {
            if (type && type != 'm') {
                subtype = c;
                subtype_number = i;
                return builder;
            }
            type = c;
            number = i;
            return builder;
        },
        //
        master: function ()  { return builder.ci('m', 0); },
        
        input:  function (i) { return builder.ci('i', i); },
        
        line:   function (l) { return builder.ci('l', l); },
        
        aux:    function (a) { return builder.ci('a', a); },
        
        fx:     function (f) { return builder.ci('f', f); },
        
        sub:    function (s) { return builder.ci('s', s); },
        
        player: function (p) { return builder.ci('p', p); },
        
        vca:    function (v) { return builder.ci('v', v); },
        
        //
        isMute: function () {
            return builder.getSettings('mute');
        },
        setMute: function (m) {
            var cmds = builder.setdAndStereoIndex('mute', (m ? 1 : 0));
            return sc.batchRequest(receiverID, cmds);
        },
        mute:   function () { return builder.setMute(1); },
        unmute: function () { return builder.setMute(0); },
        
        //
        getVolume: function () {
            return builder.getSettings('mix');
        },
        setVolume: function (v) {
            var cmds = builder.setdAndStereoIndex('mix', builder.f(v));
            return sc.batchRequest(receiverID, cmds);
        },
        //
        getPan: function () {
            return builder.getSettings('pan');
        },
        setPan: function (p) {
            var cmd = builder.setd('pan', builder.f(p));
            return sc.request(receiverID, cmd);
        },
        //
        isSolo: function () {
            return builder.getSettings('solo');
        },
        setSolo: function (s) {
            var cmds = builder.setdAndStereoIndex('solo', (s ? 1 : 0));
            return sc.batchRequest(receiverID, cmds);
        },
        solo:   function () { return builder.setSolo(1); },
        unsolo: function () { return builder.setSolo(0); },
        //
        setSmoothVolume: function (targetVolume, step) {
            var cmds = builder.setdAndStereoIndex('mix');
            targetVolume = jsc.utils.range(targetVolume || 0, 0, 1); 
            step = jsc.utils.range(step || 0.001, 0.001, 0.1);
            var delay = 10;
            var currentVolume = jsc.soundcraft.getSettings(receiverID, cmds[0]);
            currentVolume = parseFloat(currentVolume);
            var action = function(newVolume) {
                var arr = [];
                for (var i = 0; i < cmds.length; i++) {
                    arr.push(cmds[i] + "^" + builder.f(newVolume));
                }
                sc.batchRequest(receiverID, arr);
            };
            jsc.utils.thread.generateSetIntervalX2Y(currentVolume, targetVolume, step, delay, action, cmds[0]);
        }
    };
    
    //aliases
    builder.channel = builder.input;
    builder.volume = builder.setVolume;
    builder.pan = builder.setPan;
    
    return builder;
}

//
function connFromInput(input) {
    var conn = jsc.soundcraft.conn(input.receiver_id);
    if (!conn[input.type]) {
        throw 'invalid soundcraft type: ' + input.type;
    }
    conn = conn[input.type](input.number);
    if (input.subtype) {
        if (!conn[input.subtype]) {
            throw 'invalid soundcraft subtype: ' + input.subtype;
        }
        conn = conn[input.subtype](input.subtype_number);
    }
    return conn;
}

//
function setMuteFromInput(input) {
    var mute;
    if (input.muted == 'toggle') {
        mute = !jsc.soundcraft.connFromInput(input).isMute();
    } else {
        mute = input.muted == 'enable';
    }
    jsc.soundcraft.connFromInput(input).setMute(mute);
}

//
function setVolumeFromInput(input) {
    var range = h.getGlobal("jsc.soundcraft.smooth_volume_range", 8);
    range = jsc.utils.range(range, 1, 30);
    var speed = (range * (Math.exp(input.smoothness / 10) - 1)) / (Math.E - 1);
    
    jsc.soundcraft.connFromInput(input).setSmoothVolume(input.volume / 100, 0.001 * speed);
    if (input.unmute) {
        jsc.soundcraft.connFromInput(input).unmute();
    }
}
