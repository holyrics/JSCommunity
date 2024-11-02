//
function getBrightness(color) {
    var r = 0, g = 0, b = 0;
    if (typeof color == 'string' && color.length >= 6) {
        r = parseInt(color.substring(0, 2));
        g = parseInt(color.substring(2, 4));
        b = parseInt(color.substring(4, 6));
    } else {
        return 255;
    }
    return (r * 299 + g * 587 + b * 114) / 1000;
}