//
function createMute(state) {
    if (state) {
        return {
            active: true,
            foreground: 'E6E6E6',
            background: 'FF0000',
            iconColor: 'E6E6E6'
        };
    }
    return null;
}

//
function createDefaultByStyleColor(name, dataToReplace) {
    var bg = jsc.data.style.colors[name];
    var fg = jsc.utils.color.getBrightness(bg) < 128 ? 'E6E6E6' : '000000';
    var status = {
        foreground: fg,
        background: bg,
        iconColor: fg
    };
    if (dataToReplace) {
        try {
            Object.keys(dataToReplace).forEach(function(k) {
                if (dataToReplace.hasOwnProperty(k)) {
                    status[k] = dataToReplace[k];
                }
            });
        } catch (e) {
            //ignore
        }
    }
    return status;
}

function primary(dataToReplace) {
    return $this.createDefaultByStyleColor('primary', dataToReplace);
}

function info(dataToReplace) {
    return $this.createDefaultByStyleColor('info', dataToReplace);
}

function success(dataToReplace) {
    return $this.createDefaultByStyleColor('success', dataToReplace);
}

function warning(dataToReplace) {
    return $this.createDefaultByStyleColor('warning', dataToReplace);
}

function danger(dataToReplace) {
    return $this.createDefaultByStyleColor('danger', dataToReplace);
}

function dark(dataToReplace) {
    return $this.createDefaultByStyleColor('dark', dataToReplace);
}

function secondary(dataToReplace) {
    return $this.createDefaultByStyleColor('secondary', dataToReplace);
}

function light(dataToReplace) {
    return $this.createDefaultByStyleColor('light', dataToReplace);
}

function white(dataToReplace) {
    return $this.createDefaultByStyleColor('white', dataToReplace);
}


