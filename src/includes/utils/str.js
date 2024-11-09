function addLineBreak(str) {
    try {
        var words = str.split(" ");
        if (words.length === 0) return "";
        if (words.length === 1) return words[0];
        if (words.length === 2) return words[0] + "\n" + words[1];

        var candidate = "";
        var minDiff = str.length;

        for (var i = 1; i < words.length; i++) {
            var s1 = words.slice(0, i).join(" ");
            var s2 = words.slice(i).join(" ");
            var diff = Math.abs(s1.length - s2.length);

            if (diff < minDiff) {
                candidate = s1 + "\n" + s2;
                minDiff = diff;
            }
        }
        return candidate;
    } catch (e) {
        return str;
    }
}