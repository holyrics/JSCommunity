lumikit = {
    requestUDP: function (receiverID, data) {
        h.apiRequest(receiverID, {
            headers: {
                type: 'UDP'
            },
            port: 22688,
            data: data
        });
    },
    //
    setBPM: function (receiverID, bpm) {
        //Valor aceito pelo lumikit vai de 0 a 255
        //Porém corresponde relativamente ao BPM de 30 a 200
        //A fórmula abaixo ajusta o BPM para o valor relativo correto
        var compatibleBPM = Math.round((bpm - 30) / 170 * 255);
        var data = 'mDMX:UF90:' + parseInt(compatibleBPM).toFixed(0);
        jsc.lumikit.requestUDP(receiverID, data);
    }
};