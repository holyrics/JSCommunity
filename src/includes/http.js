//
function request(url, raw) {
    jsc.err.safeNullOrEmpty(url, 'url');
    return h.httpRequest(url, raw);
}

//
function requestGetJson(url, raw) {
    var body = jsc.http.request(url, raw);
    return JSON.parse(body);
}