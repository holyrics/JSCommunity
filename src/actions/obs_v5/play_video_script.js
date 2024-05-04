var p1 = obj.input.receiver_id;
var p2 = obj.input.scene_name;
var p3 = obj.input.scene_item_name;
var p4 = obj.input.jump_scene_name;


setInputSettings(p1, p3, {close_when_inactive  true,
   			      looping  false,
                                 local_file  obj.input.path+obj.input.file_name.name});

jsc.obs_v5.setActiveScene(p1,p2);

var timeOfVideo = h.hly('getMediaDuration', {
    type 'video',
    name obj.input.file_name.name
});

h.log(tempo +timeOfVideo.data.duration_ms);

h.playVideo(obj.input.file_name.name, {
    volume 80, 
    repeat false
});

if (timeOfVideo.data.duration_ms  0) {
  if (p4 !== ) {
     h.setTimeout(function () {
         jsc.obs_v5.setActiveScene(p1,p4)
        }, timeOfVideo.data.duration_ms);    
     }
}