var p1 = obj.input.receiver_id;
var p2 = obj.input.source_name;
var p3 = obj.input.source_filter_name;
var p4;
switch (obj.input.state_action) {
    case 'enable':
        p4 = true;
        break;
    case 'disable':
        p4 = false;
        break;
    case 'toggle':
    default:
        p4 = !jsc.obs_v5.getSourceFilterEnabled(p1, p2, p3);
        break;
}
jsc.obs_v5.setSourceFilterEnabled(p1, p2, p3, p4);
