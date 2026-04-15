//
function createPageRowColumnInputs() {
    var defaultRowAndColumnDescription = jsc.i18n('If the value set is -1, a popup will appear to select the value in real time when the action is performed.');
    defaultRowAndColumnDescription += "\n" + jsc.i18n('Note: Mechanics not available for triggers.');
    return [
        {
            id: 'page',
            type: 'number',
            name: jsc.i18n('Page'),
            min: 1,
            max: 99,
            default_value: 1
        }, {
            id: 'row',
            type: 'number',
            name: jsc.i18n('Row'),
            description: defaultRowAndColumnDescription,
            min: -1,
            max: 9,
            default_value: 0
        }, {
            id: 'column',
            type: 'number',
            name: jsc.i18n('Column'),
            description: defaultRowAndColumnDescription,
            min: -1,
            max: 9,
            default_value: 0
        }
    ];
}

function popupInputIfIsEmpty(inputs, metadata, callback) {
    var arr = $this.createPageRowColumnInputs();
    arr[0].value = inputs['page'];
    arr[1].value = inputs['row'];
    arr[2].value = inputs['column'];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.value != -1) continue;
        
        if (metadata && metadata.trigger) return;

        var title = h.stream(arr)
                     .map(function(o) { return o.name + ": " + (o.value || "?"); })
                     .collect(h.stream.joining(" | "));
        title = "<html><div style='text-align:center'>" + title + "<br><br>" + item.name + "</div>";
        var itemsToChooser = h.intStreamRangeClosed(0, item.max).toArray();
        var n = h.itemChooser(title, itemsToChooser);
        if (!n) return;
        
        item.value = n;
    }
    callback(arr[0].value, arr[1].value, arr[2].value);
}