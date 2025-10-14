var p1 = obj.input.receiver_id;
switch(obj.input.state) {
    case 'enable':
    case 'disable':
        jsc.reaper.setMetronomeEnabled(p1, obj.input.state === 'enable');
        break;
}