// Function to initialize Event
function startEventLog(eventName) {
    h.store(eventName, '');
    h.startTimer(eventName);
    return 'Timeline ' + eventName + ' ' + jsc.i18n('Initialized').toLowerCase() + '.';
}

// Function to clean Event List
function clearEventLog(eventName) {
    h.store(eventName, '');
    return 'Timeline ' + eventName + ' ' + jsc.i18n('Emptied').toLowerCase() + '.';
}

// Function to add Event into the timeline
function addEventLog(eventName, text) {
    var eventText = h.restore(eventName) + h.getTimer(eventName) + ' ' + text + '\n';
    h.store(eventName, eventText);
    return jsc.i18n('Moment added') + ': ' + eventName + ' ' + h.getTimer(eventName) + ' ' + text;
}

// Function to get the timeline list
function getTimeline(eventName) {
    return h.restore(eventName);
}