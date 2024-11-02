
function align(text, align) {
    text = text || "";
    return (
            "<div style='text-align: " + align + ";'>"
            + text.replace(/\n/g, "<br>")
            + "</div>"
    );
}

function center(text) {
    return $this.align(text, "center");
}

function left(text) {
    return $this.align(text, "left");
}

function right(text) {
    return $this.align(text, "right");
}

function justify(text) {
    return $this.align(text, "justify");
}

function addLineBreak(value, align) {
    var s = jsc.utils.str.addLineBreak(value).replace(/\n/g, "<br>");
    align = align || "left";
    switch (align) {
        case "center":
        case "right":
        case "left":
        case "justify":
            s = $this.align(s, align);
            break;
    }
    return s;
}
