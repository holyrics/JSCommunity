// 
function generateSetIntervalX2Y(x, y, step, delay, action, id) {
    var currentAction = 'jsc.utils.thread.generateSetIntervalX2Y#' + id + '#action';
    var previousIntervalID = h.getGlobal(currentAction);
    if (previousIntervalID != null) {
        h.clearInterval(previousIntervalID);
    }
    if (isNaN(x) || isNaN(y)) {
        return;
    }
    step = jsc.utils.range(step || 0.001, 0.0001, 1000000); //increment x
    step = isNaN(step) ? 0.001 : step;
    delay = jsc.utils.range(delay || 10, 1, 3600000); //1h
    var negative = y < x;
    step *= negative ? -1 : 1;
    var newX = x;
    var intervalID = h.setInterval(function() {
        newX += step;
        if (negative ? newX < y : newX > y) {
            h.clearInterval(intervalID);
            action(y);
            return;
        }
        action(newX);
    }, delay);
    h.setGlobal(currentAction, intervalID);
}
