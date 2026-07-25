function fixURLSuffix(urlSuffix) {
    urlSuffix = urlSuffix || "";
    if (!urlSuffix.toLowerCase().startsWith("/api/")) {
        return "/api/" + urlSuffix;
    }
    return urlSuffix;
}

function request(receiverID, urlSuffix, setupRequestData) {
    var requestData = {
        url_suffix: $this.fixURLSuffix(urlSuffix),
        timeout: 2000,
        type: 'POST'
    };    
    if (typeof setupRequestData === 'function') {
        setupRequestData(requestData);
    }
    var r = h.apiRequestEx(receiverID, requestData);
    h.log("jsc.companion", 'urlSuffix: {} | body: {} | result: {}', urlSuffix, requestData.data, r);
    return r;
}

function createAPILocationURL(page, row, column, action) {
    page = jsc.utils.nX(page, 0);
    row = jsc.utils.nX(row, 0);
    column = jsc.utils.nX(column, 0);
    return h.format.f("/api/location/%s/%s/%s/%s", page, row, column, action);
}

function press(receiverID, page, row, column) {
    $this.request(receiverID, $this.createAPILocationURL(page, row, column, 'press'));
}

function down(receiverID, page, row, column) {
    $this.request(receiverID, $this.createAPILocationURL(page, row, column, 'down'));
}

function up(receiverID, page, row, column) {
    $this.request(receiverID, $this.createAPILocationURL(page, row, column, 'up'));
}