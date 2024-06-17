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

// 
function getSettings(receiverID, settingsID) {
    var v = jsc.soundcraft.createWebSocket(receiverID).get(settingsID);
    h.log('jsc.soundcraft', 'getSettings: {} - {}: {}', [receiverID, settingsID, v]);
    return v;
}

//
function conn(receiverID) {
    var sc = jsc.soundcraft;
    var volume_cmd = 'mix';
    var cmd = '';
    var builder = {
        cmd: function () {
            return cmd;
        },
        setd: function () {
            return 'SETD' + cmd;
        },
        getSettings: function () {
            return jsc.soundcraft.getSettings(receiverID, builder.setd());
        },
        f: function (n) {
            return jsc.utils.range(n || 0, 0, 1).toFixed(4);
        },
        ci: function (c, i) {
            if (cmd.startsWith("^a.")) {
                var cmd_bkp = cmd.substring(2);
                cmd = '';
                builder.ci(c, i);
                cmd += '.aux' + cmd_bkp;
                volume_cmd = 'value';
                return builder;
            }
            if (cmd.startsWith("^f.")) {
                var cmd_bkp = cmd.substring(2);
                cmd = '';
                builder.ci(c, i);
                cmd += '.fx' + cmd_bkp;
                volume_cmd = 'value';
                return builder;
            }
            cmd += "^" + c + "." + parseInt(i - 1).toFixed(0);
            return builder;
        },
        //
        master: function () {
            cmd += '^m';
            return builder;
        },
        input:  function (i) { return builder.ci('i', i); },
        
        line:   function (l) { return builder.ci('l', l); },
        
        aux:    function (a) { return builder.ci('a', a); },
        
        fx:     function (f) { return builder.ci('f', f); },
        
        sub:    function (s) { return builder.ci('s', s); },
        
        player: function (p) { return builder.ci('p', p); },
        
        vca:    function (v) { return builder.ci('v', v); },
        
        //
        isMute: function () {
            cmd += ".mute";
            return builder.getSettings();
        },
        setMute: function (m) {
            cmd += ".mute^" + (m ? 1 : 0);
            return sc.request(receiverID, builder.setd());
        },
        mute:   function () { return builder.setMute(1); },
        unmute: function () { return builder.setMute(0); },
        
        //
        getVolume: function () {
            cmd += "." + volume_cmd;
            return builder.getSettings();
        },
        setVolume: function (v) {
            cmd += "." + volume_cmd + "^" + builder.f(v);
            return sc.request(receiverID, builder.setd());
        },
        //
        getPan: function () {
            cmd += ".pan";
            return builder.getSettings();
        },
        setPan: function (p) {
            cmd += ".pan^" + builder.f(p);
            return sc.request(receiverID, builder.setd());
        },
        //
        isSolo: function () {
            cmd += ".solo";
            return builder.getSettings();
        },
        setSolo: function (s) {
            cmd += ".solo^" + (s ? 1 : 0);
            return sc.request(receiverID, builder.setd());
        },
        solo:   function () { return builder.setSolo(1); },
        unsolo: function () { return builder.setSolo(0); },
        //
        setSmoothVolume: function (targetVolume, step) {
            var cmd_bkp = cmd + "";
            targetVolume = jsc.utils.range(targetVolume || 0, 0, 1); 
            step = jsc.utils.range(step || 0.001, 0.001, 0.1);
            var delay = 10;
            var settingsID = "SETD" + cmd_bkp + "." + volume_cmd;
            var currentVolume = jsc.soundcraft.getSettings(receiverID, settingsID);
            currentVolume = parseFloat(currentVolume);
            var action = function(newVolume) {
                var command = cmd_bkp + "." + volume_cmd + "^" + builder.f(newVolume);
                sc.request(receiverID, 'SETD' + command);
            };
            jsc.utils.thread.generateSetIntervalX2Y(currentVolume, targetVolume, step, delay, action, cmd_bkp);
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
