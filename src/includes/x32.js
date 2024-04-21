//
function request(receiverID, oscCommand) {
    var r = h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: true,
        timeout: 1000,
        response_data_type: "base64"
    });
    return r != null ? h.base64Decode(r) : null;
}

//
function requestAsync(receiverID, oscCommand) {
    h.apiRequest(receiverID, {
        data: oscCommand,
        wait_for_response: false
    });
}

//
function createCmdChannel(channel) {
    return h.createByteBuffer()
            .putString("/ch/")
            .putString(jsc.utils.n2(channel));
}

//
function createCmdChannelMix(channel) {
    return jsc.x32.createCmdChannel(channel)
            .putString("/mix");
}

//
function createCmdChannelMixOn(channel) {
    return jsc.x32.createCmdChannelMix(channel)
            .putString("/on")
            .put0(3);
}

//
function createCmdChannelMixOnSet(channel, state) {
    return jsc.x32.createCmdChannelMixOn(channel)
            .putStringAndFill(",i", 4)
            .putInt(state ? 1 : 0);
}

//
function createCmdChannelVolume(channel) {
    return jsc.x32.createCmdChannelMix(channel)
            .putString("/fader")
            .put0(4);
}

//
function createCmdChannelVolumeSet(channel, volume) {
    return jsc.x32.createCmdChannelVolume(channel)
            .putStringAndFill(",f", 4)
            .putFloat(volume);
}

//
function createCmdGroupMute(group) {
    group = parseInt(group).toFixed(0);
    return h.createByteBuffer()
            .putString("/config/mute/" + group)
            .put0(2);
}

//
function createCmdGroupMuteSet(group, state) {
    return jsc.x32.createCmdGroupMute(group)
            .putStringAndFill(",i", 4)
            .putInt(state ? 1 : 0);
}

//
function getStatus(receiverID) {
    var r = jsc.x32.request(receiverID, "/info");
    return r != null ? h.bytesToString(r) : null;
}

//
function isConnected(receiverID) {
    return jsc.x32.getStatus(receiverID) != null;
}

//
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

//
function setChannelMute(receiverID, channel, state) {
    var osc = jsc.x32.createCmdChannelMixOnSet(channel, !state);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    return state == jsc.x32.isChannelMute(receiverID, channel);
}

//
function toggleChannelMute(receiverID, channel) {
    var currentState = jsc.x32.isChannelMute(receiverID, channel);
    return jsc.x32.setChannelMute(receiverID, channel, !currentState);
}

//
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

//
function setChannelVolume(receiverID, channel, volume) {
    var osc = jsc.x32.createCmdChannelVolumeSet(channel, volume);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    var v = jsc.x32.getChannelVolume(receiverID, channel);
    return volume.toFixed(1).equals(v.toFixed(1));
}

//
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

//
function setGroupMute(receiverID, group, state) {
    var osc = jsc.x32.createCmdGroupMuteSet(group, state);
    jsc.x32.requestAsync(receiverID, osc.toBytes());
    return state == jsc.x32.isGroupMute(receiverID, group);
}

//
function toggleGroupMute(receiverID, group) {
    var currentState = jsc.x32.isGroupMute(receiverID, group);
    return jsc.x32.setGroupMute(receiverID, group, !currentState);
}