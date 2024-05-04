// 
function addSingleRun(when, item, condition, action) {
    var triggerID = h.addTriggerListener({
        when: when,
        item: item,
        action: function (obj) {
            if (condition(obj)) {
                h.removeTriggerListener(triggerID);
                action(obj);
            }
        }
    });
}

// 
function addSingleRunVideoOnPlay(name, action) {
    var condition = function(o) {
        return h.isPathEquals(o.file_fullname, name);
    };
    jsc.utils.trigger.addSingleRun('displaying', 'any_video', condition, action);
}

//
function addSingleRunVideoOnStop(name, action) {
    var condition = function(o) {
        return h.isPathEquals(o.file_fullname, name);
    };
    jsc.utils.trigger.addSingleRun('closing', 'any_video', condition, action);
}