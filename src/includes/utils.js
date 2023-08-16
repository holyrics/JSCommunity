utils = {
    example: function () {
        return h.log('jsc.utils.example OK');
    },
    //
    fixBibleReferences: function (references) {
        var booksAliases = jsc.data.booksAliases;
        var lang = jslib.getLanguage();
        if (booksAliases[lang] === undefined) {
            return references;
        }

        for (var book in booksAliases[lang]) {
            for (var i in booksAliases[lang][book]) {
                var alias = booksAliases[lang][book][i];
                // regex group 1: line start or space or punctuation marks
                // regex group 2: alternative alias itself
                // regex group 3 space or dot or digits
                var regex = '(^|\\s|[,;])(' + alias + ')(\\s|\\.|\\d)(?i)';
                // leave group 1 and 3, but replace 2nd group with canonical name.
                references = references.replaceAll(regex, '\u00241' + book + '\u00243');
            }
        }
        return references;
    },
	
    timeline : {

    //  Function to initialize Event
	startEventLog: function(eventName) {
        h.store(eventName, '');
        h.startTimer(eventName);
        return 'Timeline ' + eventName + ' ' + jsc.i18n('inicializada' + '.';
    },
    
    //  Function to clean Event List
	clearEventLog: function(eventName) {
        h.store(eventName, '');
        return 'Timeline ' + eventName  + ' ' + jsc.i18n('esvaziada') + '.';
    },

    // Function to add Event into the timeline
    addEventLog: function(eventName, text) {
        var eventText = h.restore(eventName) + h.getTimer(eventName) + ' ' + text + '\n';
        h.store(eventName, eventText);
        return jsc.i18n('Momento adicionado') +': ' + eventName + ' ' + h.getTimer(eventName) + ' ' + text;
    },

    // Function to generate the timeline list
    generateTimeline: function(eventName) {
        var timeline = h.restore(eventName)
        return timeline;
    }
  }	
  
};
