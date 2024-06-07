// Auxiliary function, used by main functions
function request(receiverID, oscCommand) {
    var r = h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: true,
        timeout: 1000,
        response_data_type: "base64"
    });
    return r != null ? h.base64Decode(r) : null;
}

// Auxiliary function, used by main functions
function requestAsync(receiverID, oscCommand) {
    h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: false
    });
}

// Auxiliary function, used by main functions
function createCmdChannel(channel) {
    return h.createByteBuffer()
            .putString("/ch/")
            .putString(jsc.utils.n2(channel));
}

// Auxiliary function, used by main functions
function createCmdChannelMix(channel) {
    return jsc.x32.createCmdChannel(channel)
            .putString("/mix");
}

// Auxiliary function, used by main functions
function createCmdChannelMixOn(channel) {
    return jsc.x32.createCmdChannelMix(channel)
            .putString("/on")
            .put0(3);
}

// Auxiliary function, used by main functions
function createCmdChannelMixOnSet(channel, state) {
    return jsc.x32.createCmdChannelMixOn(channel)
            .putStringAndFill(",i", 4)
            .putInt(state ? 1 : 0);
}

// Auxiliary function, used by main functions
function createCmdChannelVolume(channel) {
    return jsc.x32.createCmdChannelMix(channel)
            .putString("/fader")
            .put0(4);
}

// Auxiliary function, used by main functions
function createCmdChannelVolumeSet(channel, volume) {
    return jsc.x32.createCmdChannelVolume(channel)
            .putStringAndFill(",f", 4)
            .putFloat(volume);
}

// Auxiliary function, used by main functions
function createCmdGroupMute(group) {
    group = parseInt(group).toFixed(0);
    return h.createByteBuffer()
            .putString("/config/mute/" + group)
            .put0(2);
}

// Auxiliary function, used by main functions
function createCmdGroupMuteSet(group, state) {
    return jsc.x32.createCmdGroupMute(group)
            .putStringAndFill(",i", 4)
            .putInt(state ? 1 : 0);
}

// Auxiliary function, used by main functions
function createCmdAuxMixOn(aux) {
    return h.createByteBuffer()
        .putString("/auxin/")
        .putString(jsc.utils.n2(aux))
        .putString("/mix/on")
        .put0(4);
}

// Auxiliary function, used by main functions
function createCmdAuxMixOnSet(aux, state) {
    return jsc.x32.createCmdAuxMixOn(aux)
        .putStringAndFill(",i", 4)
        .putInt(state ? 1 : 0);
}

// Auxiliary function, used by main functions
function createCmdAuxVolume(aux) {
    return h.createByteBuffer()
        .putString("/auxin/")
        .putString(jsc.utils.n2(aux))
        .putString("/mix/fader")
        .put0(1);
}

// Auxiliary function, used by main functions
function createCmdAuxVolumeSet(aux, volume) {
    return jsc.x32.createCmdAuxVolume(aux)
           .putStringAndFill(",f", 4)
           .putFloat(volume);
}

// Retrieves the status information of a digital mixer receiver identified by its ID.
function getStatus(receiverID) {
    var r = jsc.x32.request(receiverID, "/info");
    return r != null ? h.bytesToString(r) : null;
}

// Checks if a digital mixer receiver identified by its ID is currently connected.
function isConnected(receiverID) {
    return jsc.x32.getStatus(receiverID) != null;
}

// Checks if a specific channel on a digital mixer receiver identified by its ID is muted.
function isChannelMute(receiverID, channel) {
    var osc = jsc.x32.createCmdChannelMixOn(channel);
    var r = jsc.x32.request(receiverID, osc.toBytes());
    if (r == null) {
        throw 'timeout';
    }
    var bb = h.createByteBufferToRead(r);
    bb.readBytes(20); //    /ch/01/mix/on~~~,i~~
    return bb.readInt() == 0;
}

// Sets the mute state of a specific channel on a digital mixer receiver identified by its ID.
function setChannelMute(receiverID, channel, state) {
    var osc = jsc.x32.createCmdChannelMixOnSet(channel, !state);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    return state == jsc.x32.isChannelMute(receiverID, channel);
}

// Toggles the mute state of a specific channel on a digital mixer receiver identified by its ID.
function toggleChannelMute(receiverID, channel) {
    var currentState = jsc.x32.isChannelMute(receiverID, channel);
    return jsc.x32.setChannelMute(receiverID, channel, !currentState);
}

// Retrieves the volume level of a specific channel on a digital mixer receiver identified by its ID.
function getChannelVolume(receiverID, channel) {
    var osc = jsc.x32.createCmdChannelVolume(channel);
    var r = jsc.x32.request(receiverID, osc.toBytes());
    if (r == null) {
        throw 'timeout';
    }
    var bb = h.createByteBufferToRead(r);
    bb.readBytes(24); //    /ch/01/mix/fader~~~~,f~~
    return bb.readFloat();
}

// Sets the volume level of a specific channel on a digital mixer receiver identified by its ID.
function setChannelVolume(receiverID, channel, volume) {
    var osc = jsc.x32.createCmdChannelVolumeSet(channel, volume);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    var v = jsc.x32.getChannelVolume(receiverID, channel);
    return volume.toFixed(1) === v.toFixed(1);
}

// Sets the volume level of a specific channel on a digital mixer receiver identified by its ID but does not wait for a response.
function setChannelVolumeAsync(receiverID, channel, volume) {
    var osc = jsc.x32.createCmdChannelVolumeSet(channel, volume);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
}

// Function to retrieve the status of muting of a specific aux input on a digital mixer receiver identified by its ID.
function isAuxMute(receiverID, aux) {
    var osc = jsc.x32.createCmdAuxMixOn(aux);
    var r = jsc.x32.request(receiverID, osc.toBytes());
    if (r == null) {
        throw 'timeout';
    }
    var bb = h.createByteBufferToRead(r);
    bb.readBytes(24); //    /auxin/01/mix/on~~~~,i~~
    return bb.readInt() == 0;
}

// Function to set the mute state of a specific aux input on a digital mixer receiver identified by its ID.
function setAuxMute(receiverID, aux, state) {
    var osc = jsc.x32.createCmdAuxMixOnSet(aux, !state);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    return state == jsc.x32.isAuxMute(receiverID, aux);
}

// Function to toggle the mute state of a specific aux input on a digital mixer receiver identified by its ID.
function toggleAuxMute(receiverID, aux) {
    var currentState = jsc.x32.isAuxMute(receiverID, aux);
    return jsc.x32.setAuxMute(receiverID, aux, !currentState);
}

// Function to retrieve the volume level of a specific aux input on a digital mixer receiver identified by its ID.
function getAuxVolume(receiverID, aux) {
    var osc = jsc.x32.createCmdAuxVolume(aux);
    var r = jsc.x32.request(receiverID, osc.toBytes());
    if (r == null) {
        throw 'timeout';
    }
    var bb = h.createByteBufferToRead(r);
    bb.readBytes(24); //    /auxin/01/mix/fader~
    return bb.readFloat();
}

// Function to set the volume level of a specific aux input on a digital mixer receiver identified by its ID.
function setAuxVolume(receiverID, aux, volume) {
    var osc = jsc.x32.createCmdAuxVolumeSet(aux, volume);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    var v = jsc.x32.getAuxVolume(receiverID, aux);
    return volume.toFixed(1) === v.toFixed(1);
}

// Function to set the volume level of a specific aux input on a digital mixer receiver identified by its ID but does not wait for a response.
function setAuxVolumeAsync(receiverID, aux, volume) {
    var osc = jsc.x32.createCmdAuxVolumeSet(aux, volume);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
}

// Checks if a group on a digital mixer receiver identified by its ID is muted.
function isGroupMute(receiverID, group) {
    var osc = jsc.x32.createCmdGroupMute(group);
    var r = jsc.x32.request(receiverID, osc.toBytes());
    if (r == null) {
        throw 'timeout';
    }
    var bb = h.createByteBufferToRead(r);
    bb.readBytes(20); //    /config/mute/1~~,i~~
    return bb.readInt() == 1;
}

// Sets the mute state of a group on a digital mixer receiver identified by its ID.
function setGroupMute(receiverID, group, state) {
    var osc = jsc.x32.createCmdGroupMuteSet(group, state);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    return state == jsc.x32.isGroupMute(receiverID, group);
}

// Toggles the mute state of a group on a digital mixer receiver identified by its ID.
function toggleGroupMute(receiverID, group) {
    var currentState = jsc.x32.isGroupMute(receiverID, group);
    return jsc.x32.setGroupMute(receiverID, group, !currentState);
}

// Sets the volume level of a specific channel on a digital mixer receiver identified by its ID, smoothly transitioning to the target volume.
function setSmoothChannelVolume(receiverID, channel, targetVolume, step) {
    var currentAction = 'jsc.setSmoothChannelVolume'+channel+'#action';
    var id = h.getGlobal(currentAction);
    if (id != null) {
        h.clearInterval(id);
    }
    channel = jsc.utils.range(channel || 1, 1, 50);
    targetVolume = jsc.utils.range(targetVolume || 0, 0, 1); 
    step = jsc.utils.range(step || 0.001, 0.001, 0.1);
    var delay = 10;
    var currentVolume = jsc.x32.getChannelVolume(receiverID, channel);
    var negative = targetVolume < currentVolume;
    step *= negative ? -1 : 1;
    var newVolume = currentVolume;
    var intervalID = h.setInterval(function() {
        newVolume += step;
        if (negative ? newVolume < targetVolume : newVolume > targetVolume) {
            h.clearInterval(intervalID);
            jsc.x32.setChannelVolumeAsync(receiverID, channel, targetVolume);
            return;
        }
        jsc.x32.setChannelVolumeAsync(receiverID, channel, newVolume);
    }, delay);
    h.setGlobal(currentAction, intervalID); 
}

// Function to set the volume level of a specific aux input on a digital mixer receiver identified by its ID, smoothly transitioning to the target volume.
function setSmoothAuxVolume(receiverID, aux, targetVolume, step) {
    var currentAction = 'jsc.setSmoothAuxVolume' + aux + '#action';
    var id = h.getGlobal(currentAction);
    if (id != null) {
        h.clearInterval(id);
    }
    aux = jsc.utils.range(aux || 1, 1, 12); // Assume 12 aux inputs for range
    targetVolume = jsc.utils.range(targetVolume || 0, 0, 1); 
    step = jsc.utils.range(step || 0.001, 0.001, 0.1);
    var delay = 10;
    var currentVolume = jsc.x32.getAuxVolume(receiverID, aux);
    var negative = targetVolume < currentVolume;
    step *= negative ? -1 : 1;
    var newVolume = currentVolume;
    var intervalID = h.setInterval(function() {
        newVolume += step;
        if (negative ? newVolume < targetVolume : newVolume > targetVolume) {
            h.clearInterval(intervalID);
            jsc.x32.setAuxVolumeAsync(receiverID, aux, targetVolume);
            return;
        }
        jsc.x32.setAuxVolumeAsync(receiverID, aux, newVolume);
    }, delay);
    h.setGlobal(currentAction, intervalID); 
}

