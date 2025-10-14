function request(receiverID, osc) {
  var r = h.apiRequestEx(receiverID, {
    type: 'UDP',
    data: osc,
    wait_for_response: true,
    response_data_type: 'base64',
    timeout: 1000
  });
  var bytes = h.base64Decode(r);
  return h.createByteBufferToRead(bytes);
}

function requestAsync(receiverID, osc) {
  h.apiRequest(receiverID, {
    type: 'UDP',
    data: osc
  });
}

function getFeedback(receiverID) {
  var osc = h.createByteBuffer()
             .putString("/action").put0(1)
             .putStringAndFill(",i", 4)
             .putInt(41743);
  var opts = {
    type: 'UDP',
    data: osc,
    wait_for_response: true,
    response_data_type: 'base64',
    timeout: 500
  };
  r = h.apiRequest(receiverID, opts);
  var bytes = h.base64Decode(r);
  var bb = h.createByteBufferToRead(bytes);
  return $this.extractFeedback(bb);
}

function extractFeedback(bb) {
  var feedback = {};
  while (bb.available() >= 4) {
    var str = bb.readString(4);
    if (str.charAt(0) !== '/') {
      continue;
    }
    var action = str + $this.getNextString(bb);
    str = bb.readString(4);
    var value = null;
    switch(str.charAt(1)) {
      case 'f':
        value = bb.readFloat();
        break;
      case 'i':
        value = bb.readInt();
        break;
      case 's':
        value = getNextString(bb);
        break;
    }
    feedback[action.substring(1)] = value;
  }
  return feedback;
}

function getNextString(bb) {
  var bytes = [];
  while (bb.available() >= 4) {
    var buf = bb.readBytes(4);
    for (var i = 0; i < buf.length; i++) {
      if (buf[i] === 0) {
        buf = null;
        break;
      }
      bytes.push(buf[i]);
    }
    if (buf === null) break;
  }
  bb = h.createByteBufferToRead(bytes);
  return bb.readString(bb.available());
}

function defaultActionToggle(receiverID, action, state) {
  var mod = action.length() % 4;
  var osc = h.createByteBuffer()
             .putString(action)
             .put0(mod === 0 ? 4 : 4 - mod);
  if (state === 'toggle') {
    $this.requestAsync(receiverID, osc);
    return;
  }
  var feedback = $this.getFeedback(receiverID);
  var b = feedback[action.substring(1)] == 1;
  if (b == state) {
    return;
  }
  $this.requestAsync(receiverID, osc);
}

function createCommandAction(id) {
  return h.createByteBuffer()
          .putString("/action").put0(1)
          .putStringAndFill(",i", 4)
          .putInt(id);
}

function defaultActionByID(receiverID, actionID) {
  var osc = $this.createCommandAction(actionID);
  $this.requestAsync(receiverID, osc);
}

function play(receiverID) {
  $this.defaultActionByID(receiverID, 1007);
}

function pause(receiverID) {
  $this.defaultActionByID(receiverID, 1008);
}

function stop(receiverID) {
  $this.defaultActionByID(receiverID, 1016);
}

function setMetronomeEnabled(receiverID, state) {
  $this.defaultActionByID(receiverID, state ? 41745 : 41746);
}

function getBPM(receiverID) {
  return $this.getFeedback(receiverID)['tempo/raw'];
}

function setBPM(receiverID, value) {
  var osc = h.createByteBuffer()
             .putString('/tempo/raw').put0(2)
             .putStringAndFill(',f', 4)
             .putFloat(parseFloat(value));
  $this.requestAsync(receiverID, osc);
}