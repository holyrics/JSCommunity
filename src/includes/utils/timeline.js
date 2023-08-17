timeline = {
    // Function to initialize Event
    startEventLog: function (eventName) {
        h.store(eventName, '');
        h.startTimer(eventName);
        return 'Timeline ' + eventName + ' ' + jsc.i18n('Initialized').toLowerCase() + '.';
    },
    // Function to clean Event List
    clearEventLog: function (eventName) {
        h.store(eventName, '');
        return 'Timeline ' + eventName + ' ' + jsc.i18n('Emptied').toLowerCase() + '.';
    },
    // Function to add Event into the timeline
    addEventLog: function (eventName, text) {
        var eventText = h.restore(eventName) + h.getTimer(eventName) + ' ' + text + '\n';
        h.store(eventName, eventText);
        return jsc.i18n('Moment added') + ': ' + eventName + ' ' + h.getTimer(eventName) + ' ' + text;
    },
    // Function to get the timeline list
    getTimeline: function (eventName) {
        return h.restore(eventName);
    }
};