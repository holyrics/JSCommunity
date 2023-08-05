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
    }
};
