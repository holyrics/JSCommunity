if (!obj || !obj.metadata || !obj.metadata.trigger) return;

var trigger = obj.metadata.trigger;
var bpm = null;
var time_sig = null;
if (trigger.when == 'displaying' && trigger.item == 'any_song') {
    bpm = parseFloat(obj.bpm);
    time_sig = obj.time_sig;
} else if (trigger.when == 'change' && trigger.item == 'bpm') {
    bpm = parseFloat(obj.new_value);
}
if (!bpm || bpm <= 20) return;

if (obj.input.double_tempo_by_time_sig && time_sig) {
    switch(time_sig) {
        case '6/8':
        case '9/8':
        case '12/8':
            bpm *= 2;
            break;
    }
}

if (obj.input.double_tempo_value > 0) {
    while (bpm < obj.input.double_tempo_value && bpm <= 200) {
        bpm *= 2;
    }
}

var p1 = obj.input.receiver_id;

jsc.reaper.setBPM(p1, bpm);

if (obj.input.enable_metronome) jsc.reaper.setMetronomeEnabled(p1, true);

if (obj.input.play) jsc.reaper.play(p1);