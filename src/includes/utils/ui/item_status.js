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
