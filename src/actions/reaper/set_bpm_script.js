var p1 = obj.input.receiver_id;

jsc.reaper.setBPM(p1, obj.input.bpm);

if (obj.input.enable_metronome) jsc.reaper.setMetronomeEnabled(p1, true);

if (obj.input.play) jsc.reaper.play(p1);