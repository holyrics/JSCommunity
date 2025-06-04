var custom = {
    obs_v5: {
        request: function(receiverID, requestType, requestData) {
            jsc.err.safeNullOrEmpty(receiverID, 'receiverID');
            var d = { requestType: requestType };
            if (requestData != null) {
                d.requestData = requestData;
            }
           
            var x = h.isMinVersion("2.24.0") : module ? h;
            var json = x.apiRequestEx(receiverID, { op: 6, d: d });

            if (json == null) {
                throw 'unknown';
            }

            var response = JSON.parse(json);
            if (response.d.requestStatus.result) {
                return response.d.responseData;
            }

            throw JSON.stringify(response.d.requestStatus);
        },

        isYoutubeStreamingConfigured: function(receiverID) {
            var response = custom.obs_v5.request(receiverID, 'GetStreamServiceSettings');
            h.log(mUID, 'GetStreamServiceSettings response: {}', response);

            var settings = response && response.streamServiceSettings;
            var stream_id = settings && settings.stream_id;

            if (!stream_id) return false;

            var storedList = module.restore('stream_ids') || [];
            var i, item, isUsed = false;

            for (i = 0; i < storedList.length; i++) {
                if (storedList[i].stream_id === stream_id) {
                    item = storedList[i];
                    isUsed = item.used === true;
                    break;
                }
            }

            h.log(mUID, 'Configured streaming ID: {} | Already used: {}', [stream_id, isUsed]);

            return !isUsed;
        },

        getStreamingStatus: function(receiverID) {
            try {
                var response = custom.obs_v5.request(receiverID, 'GetStreamStatus');
                h.log(mUID, 'GetStreamStatus response: {}', response);

                var isActive = response && response.outputActive === true;

                var streamSettings = custom.obs_v5.request(receiverID, 'GetStreamServiceSettings');
                var settings = streamSettings && streamSettings.streamServiceSettings;
                var stream_id = settings && settings.stream_id;

                if (stream_id) {
                    var storedList = module.restore('stream_ids') || [];
                    var i, entry, found = false;

                    for (i = 0; i < storedList.length; i++) {
                        if (storedList[i].stream_id === stream_id) {
                            entry = storedList[i];
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        storedList.push({
                            stream_id: stream_id,
                            used: false,
                            wasActive: isActive
                        });
                    } else {
                        if (entry.used === false) {
                            if (entry.wasActive && !isActive) {
                                entry.used = true;
                            } else if (isActive) {
                                entry.wasActive = true;
                            }
                        }
                    }

                    module.store('stream_ids', storedList);
                }

                return {
                    active: isActive,
                    reconnecting: response.outputReconnecting || false,
                    timecode: response.outputTimecode || null
                };
            } catch (e) {
                h.log(mUID, 'GetStreamStatus error: {}', e);
                return {
                    active: false,
                    reconnecting: false,
                    timecode: null
                };
            }
        },

        getRecordingStatus: function(receiverID) {
            try {
                var response = custom.obs_v5.request(receiverID, 'GetRecordStatus');
                h.log(mUID, 'GetRecordStatus response: {}', response);

                return {
                    active: response.outputActive || false,
                    paused: response.outputPaused || false,
                    timecode: response.outputTimecode || null
                };
            } catch (e) {
                h.log(mUID, 'GetRecordStatus error: {}', e);
                return {
                    active: false,
                    paused: false,
                    timecode: null
                };
            }
        }, 
        setInputSettings: function(receiverID, inputName, settings) {
           settings = settings || {};
           if (settings.local_file) {
               settings.local_file = settings.local_file.replace(/\\/g, '/');
           }
        
           return custom.obs_v5.request(receiverID, 'SetInputSettings', {
               inputName: inputName,
               inputSettings: settings
           });        
        }    
    }
};
