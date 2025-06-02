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

//
function runWhenTrue(input) {
    var condition = input.condition;
    if (!condition) throw "'condition' is required";
    
    var action = input.action;
    if (!action) throw "'action' is required";
    
    if (typeof action !== 'function') throw "'action' is not a function";
    
    var now = Date.now();
    var timeout = isNaN(input.timeout) ? 0 : (input.timeout || 0);
    var step = jsc.utils.range(input.step || 100, 50, 3000);
    var intervalID = h.setInterval(function() {
        if (timeout > 0 && Math.abs(Date.now() - now) > timeout) {
            //timeout
            h.clearInterval(intervalID);
            if (typeof input.action_when_timeout === 'function') {
                input.action_when_timeout();
            }
            return;
        }
        if (!condition()) return;
        
        h.clearInterval(intervalID);
        action();
    }, step);
}