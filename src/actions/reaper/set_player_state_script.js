switch(obj.input.state) {
    case 'play':
    case 'pause':
    case 'stop':
        jsc.reaper[obj.input.state](obj.input.receiver_id);
        break;
}