//
function spreadsheet(id, sheet_id) {
    jsc.err.safeNullOrEmpty(id, 'id');
    jsc.err.safeNullOrEmpty(sheet_id, 'sheet_id');
    var raw = {
        url_suffix: "spreadsheets/d/" + id + "/export?format=csv&gid=" + sheet_id
    };
    var body = jsc.http.request("https://docs.google.com/", raw);
    return h.csvToArray(body);
}

//
function doc(id) {
    jsc.err.safeNullOrEmpty(id, 'id');
    var raw = {
        url_suffix: "document/d/" + id + "/export?format=txt"
    };
    var body = jsc.http.request("https://docs.google.com/", raw);
    if (body.contains("\r\n")) {
        body = body.replaceAll("\r\n\r\n", "\r\n");
        body = body.replaceAll("\r\n", "\n");
    }
    return body;
}