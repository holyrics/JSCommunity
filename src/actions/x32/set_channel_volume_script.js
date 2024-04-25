jsc.x32.setSmoothChannelVolume(obj.input.receiver_id, 
                          obj.input.channel,
   		        obj.input.volume / 100,
                          0.001 * obj.input.speed);

if (obj.input.unmute) {
    jsc.x32.setChannelMute(obj.input.receiver_id,
                           obj.input.channel,
			false);