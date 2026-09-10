// v1.0.1 | 2026-09-08
// Behringer WING OSC library for Holyrics JSCommunity.
// Author: @prcris
// Configure the Holyrics receiver as UDP on port 2223.
// The standard public volume API uses 0..1, matching jsc.x32 and jsc.soundcraft.
// Methods ending in Db use -144.0..+10.0; methods ending in Percent use 0..100.
// Conversions follow the physical WING fader scale measured in the module.

/*
Exemplo de utilização:

1. No Holyrics, cadastre um receptor UDP apontando para o IP da WING,
   usando a porta 2223.
2. Use o ID desse receptor nas chamadas abaixo.

var receiverID = 'wing_igreja';

if (jsc.wing.isConnected(receiverID)) {
    // false libera o canal; true ativa o mute.
    jsc.wing.setChannelMute(receiverID, 1, false);

    // O padrão das bibliotecas Holyrics é 0..1: 0.75 representa 75%.
    jsc.wing.setChannelVolume(receiverID, 1, 0.75);

    // Os atalhos explícitos também permitem trabalhar em dB ou em 0..100.
    jsc.wing.setChannelVolumeDb(receiverID, 1, -10.0);
    jsc.wing.setChannelVolumePercent(receiverID, 1, 75);

    // Conversão pela escala real do fader: 50% = -10 dB e 75% = 0 dB.
    var volumeDb = jsc.wing.percentToDb(75);
    var volumePercent = jsc.wing.dbToPercent(-10);

    // Também é possível controlar auxiliares e DCAs.
    jsc.wing.setAuxVolume(receiverID, 1, 0.50);
    jsc.wing.setDcaMute(receiverID, 1, false);
}
*/

function __wingError(context, message, values) {
    return '[wing:' + context + '] ' + h.i18n(message, values || []);
}

function __wingClampDb(value) {
    value = parseFloat(value);
    if (isNaN(value)) return -144.0;
    return Math.max(-144.0, Math.min(10.0, value));
}

function __wingClamp01(value) {
    value = parseFloat(value);
    if (isNaN(value)) return 0.0;
    return Math.max(0.0, Math.min(1.0, value));
}

function __wingVolumeToDb(volume) {
    volume = jsc.wing.__wingClamp01(volume);
    if (volume <= 0) return -144.0;
    if (volume <= 0.0625) return -90.0 + volume * 480.0;
    if (volume <= 0.25) return -70.0 + volume * 160.0;
    if (volume <= 0.5) return -50.0 + volume * 80.0;
    return -30.0 + volume * 40.0;
}

function __wingDbToVolume(dbValue) {
    dbValue = parseFloat(dbValue);
    if (isNaN(dbValue) || dbValue <= -90.0) return 0;
    if (dbValue <= -60.0) return jsc.wing.__wingClamp01((dbValue + 90.0) / 480.0);
    if (dbValue <= -30.0) return jsc.wing.__wingClamp01((dbValue + 70.0) / 160.0);
    if (dbValue <= -10.0) return jsc.wing.__wingClamp01((dbValue + 50.0) / 80.0);
    return jsc.wing.__wingClamp01((dbValue + 30.0) / 40.0);
}

// Converte o volume normalizado usado por outros mixers (0..1) para dB da WING.
function volumeToDb(volume) {
    return jsc.wing.__wingVolumeToDb(volume);
}

// Converte dB da WING para o volume normalizado usado por outros mixers (0..1).
function dbToVolume(dbValue) {
    return jsc.wing.__wingDbToVolume(dbValue);
}

// Converte uma porcentagem de interface (0..100) para dB da WING.
function percentToDb(percent) {
    percent = parseFloat(percent);
    if (isNaN(percent)) percent = 0;
    return jsc.wing.__wingVolumeToDb(percent / 100.0);
}

// Converte dB da WING para uma porcentagem de interface (0..100).
function dbToPercent(dbValue) {
    return jsc.wing.__wingDbToVolume(dbValue) * 100.0;
}

function __wingPadLength(str) {
    var len = (str || '').length + 1;
    return (4 - (len % 4)) % 4;
}

function createCmdPath(path) {
    var bb;
    try {
        bb = h.createByteBuffer();
    } catch (e1) {
        throw jsc.wing.__wingError('createCmdPath:h.createByteBuffer', 'Failed to create the OSC buffer: {}', [e1]);
    }
    if (bb == null) throw jsc.wing.__wingError('createCmdPath:h.createByteBuffer', 'The OSC buffer could not be created.');
    try {
        bb.putString(path);
    } catch (e2) {
        throw jsc.wing.__wingError('createCmdPath:putString', 'Failed to write the OSC path: {}', [e2]);
    }
    try {
        bb.put0(1 + jsc.wing.__wingPadLength(path));
    } catch (e3) {
        throw jsc.wing.__wingError('createCmdPath:put0', 'Failed to align the OSC path: {}', [e3]);
    }
    return bb;
}

function __wingCommandToBytes(command, stage) {
    if (command == null) throw jsc.wing.__wingError(stage + ':command', 'The OSC command is empty.');
    try {
        return command.toBytes();
    } catch (e) {
        throw jsc.wing.__wingError(stage + ':toBytes', 'Failed to convert the OSC command to bytes: {}', [e]);
    }
}

function __wingByte_Value(bytes, index) {
    var value = bytes[index];
    if (value < 0) value += 256;
    return value;
}

function __wingBytesToSafeText(bytes, limit) {
    if (!bytes) return '';
    limit = limit || bytes.length;
    var arr = [];
    var max = Math.min(bytes.length, limit);
    for (var i = 0; i < max; i++) {
        var value = jsc.wing.__wingByte_Value(bytes, i);
        if (value >= 32 && value <= 126) {
            arr.push(String.fromCharCode(value));
        } else {
            var hval = value.toString(16).toUpperCase();
            if (hval.length < 2) hval = '0' + hval;
            arr.push('\\x' + hval);
        }
    }
    if (bytes.length > limit) arr.push('...');
    return arr.join('');
}

function __oscStringAt(raw, pos) {
    var end = raw.indexOf('\0', pos);
    if (end < 0) return { value: '', nextPos: raw.length };
    var value = raw.substring(pos, end);
    var len = end - pos + 1;
    var pad = (4 - (len % 4)) % 4;
    return { value: value, nextPos: end + 1 + pad };
}

function __wingReadInt32BE(bytes, pos) {
    var b0 = jsc.wing.__wingByte_Value(bytes, pos);
    var b1 = jsc.wing.__wingByte_Value(bytes, pos + 1);
    var b2 = jsc.wing.__wingByte_Value(bytes, pos + 2);
    var b3 = jsc.wing.__wingByte_Value(bytes, pos + 3);
    return (b0 << 24) | (b1 << 16) | (b2 << 8) | b3;
}

function __wingReadFloat32BE(bytes, pos) {
    var b0 = jsc.wing.__wingByte_Value(bytes, pos);
    var b1 = jsc.wing.__wingByte_Value(bytes, pos + 1);
    var b2 = jsc.wing.__wingByte_Value(bytes, pos + 2);
    var b3 = jsc.wing.__wingByte_Value(bytes, pos + 3);
    var sign = (b0 & 128) !== 0 ? -1 : 1;
    var exponent = ((b0 & 127) << 1) | (b1 >> 7);
    var mantissa = ((b1 & 127) << 16) | (b2 << 8) | b3;

    if (exponent === 255) return mantissa === 0 ? sign * Infinity : NaN;
    if (exponent === 0) return sign * mantissa * Math.pow(2, -149);
    return sign * (1 + mantissa / 8388608) * Math.pow(2, exponent - 127);
}

function __parseWingOSCBuffer(buffer) {
    if (!buffer) return null;
    var raw;
    try {
        raw = h.bytesToString(buffer) || '';
    } catch (e1) {
        throw jsc.wing.__wingError('parse:h.bytesToString', 'Failed to read the OSC response: {}', [e1]);
    }

    var addrInfo = jsc.wing.__oscStringAt(raw, 0);
    var addrTotal = addrInfo.nextPos;

    var tagInfo = jsc.wing.__oscStringAt(raw, addrTotal);

    var typeTag = tagInfo.value;
    if (!typeTag || typeTag.charAt(0) !== ',') return null;
    var types = typeTag.substring(1);
    var result = { address: addrInfo.value, args: [] };
    var currentPos = tagInfo.nextPos;

    for (var i = 0; i < types.length; i++) {
        var t = types.charAt(i);
        if (t === 's') {
            var strInfo = jsc.wing.__oscStringAt(raw, currentPos);
            result.args.push({ type: 's', value: strInfo.value });
            currentPos = strInfo.nextPos;
        } else if (t === 'i') {
            result.args.push({ type: 'i', value: jsc.wing.__wingReadInt32BE(buffer, currentPos) });
            currentPos += 4;
        } else if (t === 'f') {
            result.args.push({ type: 'f', value: jsc.wing.__wingReadFloat32BE(buffer, currentPos) });
            currentPos += 4;
        } else {
            result.args.push({ type: t, value: null });
        }
    }
    return result;
}

function __wingFirstStringParam(bytes) {
    var parsed = jsc.wing.__parseWingOSCBuffer(bytes);
    if (parsed && parsed.args) {
        for (var i = 0; i < parsed.args.length; i++) {
            if (parsed.args[i].type === 's') return parsed.args[i].value;
        }
    }
    return bytes != null ? jsc.wing.__wingBytesToSafeText(bytes, 160) : null;
}

function __wingLastFloatParam(bytes) {
    var parsed = jsc.wing.__parseWingOSCBuffer(bytes);
    if (!parsed || !parsed.args) return null;
    for (var i = parsed.args.length - 1; i >= 0; i--) {
        if (parsed.args[i].type === 'f') return parsed.args[i].value;
    }
    return null;
}

function __wingLastIntParam(bytes) {
    var parsed = jsc.wing.__parseWingOSCBuffer(bytes);
    if (!parsed || !parsed.args) return null;
    for (var i = parsed.args.length - 1; i >= 0; i--) {
        if (parsed.args[i].type === 'i') return parsed.args[i].value;
    }
    return null;
}

function request(receiverID, oscCommand) {
    var r;
    try {
        r = h.apiRequest(receiverID, {
            data: oscCommand,
            wait_for_response: true,
            timeout: 500,
            response_data_type: 'base64'
        });
    } catch (e1) {
        throw jsc.wing.__wingError('request:h.apiRequest', 'Failed to send the WING request: {}', [e1]);
    }
    if (r == null) return null;
    try {
        return h.base64Decode(r);
    } catch (e2) {
        throw jsc.wing.__wingError('request:h.base64Decode', 'Failed to decode the WING response: {}', [e2]);
    }
}

function requestAsync(receiverID, oscCommand) {
    try {
        h.apiRequest(receiverID, {
            data: oscCommand,
            wait_for_response: false
        });
    } catch (e) {
        throw jsc.wing.__wingError('requestAsync:h.apiRequest', 'Failed to send the WING request: {}', [e]);
    }
}

function __wingCreateSetInt(path, value) {
    return jsc.wing.createCmdPath(path)
        .putStringAndFill(',i', 4)
        .putInt(parseInt(value, 10) || 0);
}

function __wingCreateSetFloat(path, value) {
    return jsc.wing.createCmdPath(path)
        .putStringAndFill(',f', 4)
        .putFloat(parseFloat(value) || 0);
}

function __wingCreateSetString(path, value) {
    return jsc.wing.createCmdPath(path)
        .putStringAndFill(',s', 4)
        .putStringAndFill(String(value || ''), 4);
}

function __wingGetMute(receiverID, path) {
    var command = jsc.wing.createCmdPath(path);
    var bytes = jsc.wing.__wingCommandToBytes(command, 'getMute ' + path);
    var r;
    try {
        r = jsc.wing.request(receiverID, bytes);
    } catch (e) {
        throw jsc.wing.__wingError('getMute:request ' + path, 'Failed to read the mute state: {}', [e]);
    }
    if (r == null) throw h.i18n('Timed out while waiting for a response from WING.');
    var intValue;
    try {
        intValue = jsc.wing.__wingLastIntParam(r);
    } catch (e2) {
        throw jsc.wing.__wingError('getMute:parse ' + path, 'Failed to parse the mute state: {}', [e2]);
    }
    return intValue === 1;
}

function __wingSetMute(receiverID, path, state) {
    var command = jsc.wing.__wingCreateSetInt(path, state ? 1 : 0);
    var bytes = jsc.wing.__wingCommandToBytes(command, 'setMute ' + path);
    try {
        jsc.wing.requestAsync(receiverID, bytes);
    } catch (e) {
        throw jsc.wing.__wingError('setMute:requestAsync ' + path, 'Failed to set the mute state: {}', [e]);
    }
    return true;
}

function __wingGetName(receiverID, path) {
    var r = jsc.wing.request(receiverID, jsc.wing.createCmdPath(path).toBytes());
    return jsc.wing.__wingFirstStringParam(r);
}

function __wingSetName(receiverID, path, name) {
    jsc.wing.requestAsync(receiverID, jsc.wing.__wingCreateSetString(path, name).toBytes());
    return true;
}

function __wingGetFaderDb(receiverID, path) {
    var r = jsc.wing.request(receiverID, jsc.wing.createCmdPath(path).toBytes());
    if (r == null) throw h.i18n('Timed out while waiting for a response from WING.');
    return jsc.wing.__wingLastFloatParam(r);
}

function __wingSetFaderDb(receiverID, path, dbValue) {
    jsc.wing.requestAsync(receiverID, jsc.wing.__wingCreateSetFloat(path, jsc.wing.__wingClampDb(dbValue)).toBytes());
    return true;
}

function createCmdChannel(channel) {
    return jsc.wing.createCmdPath('/ch/' + parseInt(channel, 10));
}

function createCmdChannelMute(channel) {
    return jsc.wing.createCmdPath('/ch/' + parseInt(channel, 10) + '/mute');
}

function createCmdChannelMuteSet(channel, state) {
    return jsc.wing.__wingCreateSetInt('/ch/' + parseInt(channel, 10) + '/mute', state ? 1 : 0);
}

function createCmdChannelFader(channel) {
    return jsc.wing.createCmdPath('/ch/' + parseInt(channel, 10) + '/fdr');
}

function createCmdChannelFaderSet(channel, volume) {
    return jsc.wing.createCmdChannelFaderSetDb(channel, jsc.wing.__wingVolumeToDb(volume));
}

function createCmdChannelFaderSetDb(channel, dbValue) {
    return jsc.wing.__wingCreateSetFloat('/ch/' + parseInt(channel, 10) + '/fdr', jsc.wing.__wingClampDb(dbValue));
}

function createCmdAuxMute(aux) {
    return jsc.wing.createCmdPath('/aux/' + parseInt(aux, 10) + '/mute');
}

function createCmdAuxMuteSet(aux, state) {
    return jsc.wing.__wingCreateSetInt('/aux/' + parseInt(aux, 10) + '/mute', state ? 1 : 0);
}

function createCmdAuxFader(aux) {
    return jsc.wing.createCmdPath('/aux/' + parseInt(aux, 10) + '/fdr');
}

function createCmdAuxFaderSet(aux, volume) {
    return jsc.wing.createCmdAuxFaderSetDb(aux, jsc.wing.__wingVolumeToDb(volume));
}

function createCmdAuxFaderSetDb(aux, dbValue) {
    return jsc.wing.__wingCreateSetFloat('/aux/' + parseInt(aux, 10) + '/fdr', jsc.wing.__wingClampDb(dbValue));
}

function createCmdDcaMute(dca) {
    return jsc.wing.createCmdPath('/dca/' + parseInt(dca, 10) + '/mute');
}

function createCmdDcaMuteSet(dca, state) {
    return jsc.wing.__wingCreateSetInt('/dca/' + parseInt(dca, 10) + '/mute', state ? 1 : 0);
}

function createCmdDcaFader(dca) {
    return jsc.wing.createCmdPath('/dca/' + parseInt(dca, 10) + '/fdr');
}

function createCmdDcaFaderSet(dca, volume) {
    return jsc.wing.createCmdDcaFaderSetDb(dca, jsc.wing.__wingVolumeToDb(volume));
}

function createCmdDcaFaderSetDb(dca, dbValue) {
    return jsc.wing.__wingCreateSetFloat('/dca/' + parseInt(dca, 10) + '/fdr', jsc.wing.__wingClampDb(dbValue));
}

function createCmdMuteGroup(group) {
    return jsc.wing.createCmdPath('/mgrp/' + parseInt(group, 10) + '/mute');
}

function createCmdMuteGroupSet(group, state) {
    return jsc.wing.__wingCreateSetInt('/mgrp/' + parseInt(group, 10) + '/mute', state ? 1 : 0);
}

function getStatus(receiverID) {
    var r = jsc.wing.request(receiverID, jsc.wing.createCmdPath('/?').toBytes());
    return r != null ? h.bytesToString(r) : null;
}

function isConnected(receiverID) {
    return jsc.wing.getStatus(receiverID) != null;
}

function isChannelMute(receiverID, channel) {
    return jsc.wing.__wingGetMute(receiverID, '/ch/' + parseInt(channel, 10) + '/mute');
}

function setChannelMute(receiverID, channel, state) {
    return jsc.wing.__wingSetMute(receiverID, '/ch/' + parseInt(channel, 10) + '/mute', state);
}

function toggleChannelMute(receiverID, channel) {
    var currentState = jsc.wing.isChannelMute(receiverID, channel);
    jsc.wing.setChannelMute(receiverID, channel, !currentState);
    return !currentState;
}

function getChannelName(receiverID, channel) {
    return jsc.wing.__wingGetName(receiverID, '/ch/' + parseInt(channel, 10) + '/name');
}

function setChannelName(receiverID, channel, name) {
    return jsc.wing.__wingSetName(receiverID, '/ch/' + parseInt(channel, 10) + '/name', name);
}

function getChannelVolume(receiverID, channel) {
    var dbValue = jsc.wing.getChannelVolumeDb(receiverID, channel);
    return dbValue == null ? null : jsc.wing.dbToVolume(dbValue);
}

function setChannelVolume(receiverID, channel, volume) {
    return jsc.wing.setChannelVolumeDb(receiverID, channel, jsc.wing.volumeToDb(volume));
}

function setChannelVolumeAsync(receiverID, channel, volume) {
    jsc.wing.setChannelVolumeDbAsync(receiverID, channel, jsc.wing.volumeToDb(volume));
}

function getChannelVolumeDb(receiverID, channel) {
    return jsc.wing.__wingGetFaderDb(receiverID, '/ch/' + parseInt(channel, 10) + '/fdr');
}

function setChannelVolumeDb(receiverID, channel, dbValue) {
    return jsc.wing.__wingSetFaderDb(receiverID, '/ch/' + parseInt(channel, 10) + '/fdr', dbValue);
}

function setChannelVolumeDbAsync(receiverID, channel, dbValue) {
    jsc.wing.setChannelVolumeDb(receiverID, channel, dbValue);
}

// Lê o fader do canal e devolve uma porcentagem de interface (0..100).
function getChannelVolumePercent(receiverID, channel) {
    var volume = jsc.wing.getChannelVolume(receiverID, channel);
    return volume == null ? null : volume * 100.0;
}

// Define o fader do canal usando uma porcentagem de interface (0..100).
function setChannelVolumePercent(receiverID, channel, percent) {
    return jsc.wing.setChannelVolume(receiverID, channel, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function setChannelVolumePercentAsync(receiverID, channel, percent) {
    jsc.wing.setChannelVolumeAsync(receiverID, channel, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function getAuxName(receiverID, aux) {
    return jsc.wing.__wingGetName(receiverID, '/aux/' + parseInt(aux, 10) + '/name');
}

function isAuxMute(receiverID, aux) {
    return jsc.wing.__wingGetMute(receiverID, '/aux/' + parseInt(aux, 10) + '/mute');
}

function setAuxMute(receiverID, aux, state) {
    return jsc.wing.__wingSetMute(receiverID, '/aux/' + parseInt(aux, 10) + '/mute', state);
}

function toggleAuxMute(receiverID, aux) {
    var currentState = jsc.wing.isAuxMute(receiverID, aux);
    jsc.wing.setAuxMute(receiverID, aux, !currentState);
    return !currentState;
}

function getAuxVolume(receiverID, aux) {
    var dbValue = jsc.wing.getAuxVolumeDb(receiverID, aux);
    return dbValue == null ? null : jsc.wing.dbToVolume(dbValue);
}

function setAuxVolume(receiverID, aux, volume) {
    return jsc.wing.setAuxVolumeDb(receiverID, aux, jsc.wing.volumeToDb(volume));
}

function setAuxVolumeAsync(receiverID, aux, volume) {
    jsc.wing.setAuxVolumeDbAsync(receiverID, aux, jsc.wing.volumeToDb(volume));
}

function getAuxVolumeDb(receiverID, aux) {
    return jsc.wing.__wingGetFaderDb(receiverID, '/aux/' + parseInt(aux, 10) + '/fdr');
}

function setAuxVolumeDb(receiverID, aux, dbValue) {
    return jsc.wing.__wingSetFaderDb(receiverID, '/aux/' + parseInt(aux, 10) + '/fdr', dbValue);
}

function setAuxVolumeDbAsync(receiverID, aux, dbValue) {
    jsc.wing.setAuxVolumeDb(receiverID, aux, dbValue);
}

// Lê o fader auxiliar e devolve uma porcentagem de interface (0..100).
function getAuxVolumePercent(receiverID, aux) {
    var volume = jsc.wing.getAuxVolume(receiverID, aux);
    return volume == null ? null : volume * 100.0;
}

// Define o fader auxiliar usando uma porcentagem de interface (0..100).
function setAuxVolumePercent(receiverID, aux, percent) {
    return jsc.wing.setAuxVolume(receiverID, aux, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function setAuxVolumePercentAsync(receiverID, aux, percent) {
    jsc.wing.setAuxVolumeAsync(receiverID, aux, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function getDcaName(receiverID, dca) {
    return jsc.wing.__wingGetName(receiverID, '/dca/' + parseInt(dca, 10) + '/name');
}

function isDcaMute(receiverID, dca) {
    return jsc.wing.__wingGetMute(receiverID, '/dca/' + parseInt(dca, 10) + '/mute');
}

function setDcaMute(receiverID, dca, state) {
    return jsc.wing.__wingSetMute(receiverID, '/dca/' + parseInt(dca, 10) + '/mute', state);
}

function toggleDcaMute(receiverID, dca) {
    var currentState = jsc.wing.isDcaMute(receiverID, dca);
    jsc.wing.setDcaMute(receiverID, dca, !currentState);
    return !currentState;
}

function getDcaVolume(receiverID, dca) {
    var dbValue = jsc.wing.getDcaVolumeDb(receiverID, dca);
    return dbValue == null ? null : jsc.wing.dbToVolume(dbValue);
}

function setDcaVolume(receiverID, dca, volume) {
    return jsc.wing.setDcaVolumeDb(receiverID, dca, jsc.wing.volumeToDb(volume));
}

function setDcaVolumeAsync(receiverID, dca, volume) {
    jsc.wing.setDcaVolumeDbAsync(receiverID, dca, jsc.wing.volumeToDb(volume));
}

function getDcaVolumeDb(receiverID, dca) {
    return jsc.wing.__wingGetFaderDb(receiverID, '/dca/' + parseInt(dca, 10) + '/fdr');
}

function setDcaVolumeDb(receiverID, dca, dbValue) {
    return jsc.wing.__wingSetFaderDb(receiverID, '/dca/' + parseInt(dca, 10) + '/fdr', dbValue);
}

function setDcaVolumeDbAsync(receiverID, dca, dbValue) {
    jsc.wing.setDcaVolumeDb(receiverID, dca, dbValue);
}

// Lê o fader DCA e devolve uma porcentagem de interface (0..100).
function getDcaVolumePercent(receiverID, dca) {
    var volume = jsc.wing.getDcaVolume(receiverID, dca);
    return volume == null ? null : volume * 100.0;
}

// Define o fader DCA usando uma porcentagem de interface (0..100).
function setDcaVolumePercent(receiverID, dca, percent) {
    return jsc.wing.setDcaVolume(receiverID, dca, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function setDcaVolumePercentAsync(receiverID, dca, percent) {
    jsc.wing.setDcaVolumeAsync(receiverID, dca, jsc.wing.__wingClamp01(parseFloat(percent) / 100.0));
}

function isGroupMute(receiverID, group) {
    return jsc.wing.__wingGetMute(receiverID, '/mgrp/' + parseInt(group, 10) + '/mute');
}

function setGroupMute(receiverID, group, state) {
    return jsc.wing.__wingSetMute(receiverID, '/mgrp/' + parseInt(group, 10) + '/mute', state);
}

function toggleGroupMute(receiverID, group) {
    var current = jsc.wing.isGroupMute(receiverID, group);
    jsc.wing.setGroupMute(receiverID, group, !current);
    return !current;
}

function getMuteGroupName(receiverID, group) {
    return jsc.wing.__wingGetName(receiverID, '/mgrp/' + parseInt(group, 10) + '/name');
}

function setMuteGroupName(receiverID, group, name) {
    return jsc.wing.__wingSetName(receiverID, '/mgrp/' + parseInt(group, 10) + '/name', name);
}

function getInputName(receiverID, type, index) {
    type = String(type || '').toUpperCase();
    return jsc.wing.__wingGetName(receiverID, '/io/in/' + type + '/' + parseInt(index, 10) + '/name');
}

function setInputName(receiverID, type, index, name) {
    type = String(type || '').toUpperCase();
    return jsc.wing.__wingSetName(receiverID, '/io/in/' + type + '/' + parseInt(index, 10) + '/name', name);
}

function setSmoothChannelVolume(receiverID, channel, targetVolume, step) {
    jsc.wing.__wingSetSmoothFader(receiverID, 'channel', channel, targetVolume, step);
}

function setSmoothAuxVolume(receiverID, aux, targetVolume, step) {
    jsc.wing.__wingSetSmoothFader(receiverID, 'aux', aux, targetVolume, step);
}

function setSmoothDcaVolume(receiverID, dca, targetVolume, step) {
    jsc.wing.__wingSetSmoothFader(receiverID, 'dca', dca, targetVolume, step);
}

function setSmoothChannelVolumePercent(receiverID, channel, targetPercent, stepPercent) {
    jsc.wing.setSmoothChannelVolume(receiverID, channel, targetPercent / 100.0, stepPercent / 100.0);
}

function setSmoothAuxVolumePercent(receiverID, aux, targetPercent, stepPercent) {
    jsc.wing.setSmoothAuxVolume(receiverID, aux, targetPercent / 100.0, stepPercent / 100.0);
}

function setSmoothDcaVolumePercent(receiverID, dca, targetPercent, stepPercent) {
    jsc.wing.setSmoothDcaVolume(receiverID, dca, targetPercent / 100.0, stepPercent / 100.0);
}

function __wingSetSmoothFader(receiverID, targetType, index, targetVolume, step) {
    var currentAction = 'jsc.wing.smooth.' + targetType + '.' + index;
    var id = h.getGlobal(currentAction);
    if (id != null) h.clearInterval(id);
    targetVolume = jsc.wing.__wingClamp01(targetVolume);
    step = Math.abs(parseFloat(step) || 0.01);

    var getter = targetType === 'aux' ? jsc.wing.getAuxVolume : targetType === 'dca' ? jsc.wing.getDcaVolume : jsc.wing.getChannelVolume;
    var setter = targetType === 'aux' ? jsc.wing.setAuxVolumeAsync : targetType === 'dca' ? jsc.wing.setDcaVolumeAsync : jsc.wing.setChannelVolumeAsync;
    var currentVolume = getter(receiverID, index);
    if (isNaN(currentVolume)) return;
    var negative = targetVolume < currentVolume;
    step *= negative ? -1 : 1;
    var newVolume = currentVolume;
    var intervalID = h.setInterval(function() {
        newVolume += step;
        if (negative ? newVolume < targetVolume : newVolume > targetVolume) {
            h.clearInterval(intervalID);
            setter(receiverID, index, targetVolume);
            return;
        }
        setter(receiverID, index, newVolume);
    }, 30);
    h.setGlobal(currentAction, intervalID);
}

function setBPM(receiverID, fxSlot, bpm) {
    fxSlot = parseInt(fxSlot, 10);
    bpm = parseFloat(bpm);
    if (isNaN(fxSlot) || fxSlot < 1 || fxSlot > 8) fxSlot = 1;
    if (isNaN(bpm) || bpm <= 0) bpm = 120;
    var command = '/fx/' + fxSlot + '/par/02';
    var effectTime = Math.round(60000 / bpm);
    var oscCommand = h.createByteBuffer()
        .putString(command)
        .put0(1 + jsc.wing.__wingPadLength(command))
        .putStringAndFill(',i', 4)
        .putInt(effectTime);
    jsc.wing.requestAsync(receiverID, oscCommand.toBytes());
}
