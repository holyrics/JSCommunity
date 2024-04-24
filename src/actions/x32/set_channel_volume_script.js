jsc.x32.setChannelVolume(obj.input.receiver_id,
                          obj.input.channel,
						  obj.input.volume / 100);

if (obj.input.unmute) {
    jsc.x32.setChannelMute(obj.input.receiver_id,
                            obj.input.channel,
							false);
   }
