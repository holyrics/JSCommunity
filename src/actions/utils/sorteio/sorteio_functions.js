function inputNumeros() {
    var quantidadeNumeros;
    // Obtém a quantidade de números a serem sorteados
    var param = [{
        key: 'numeros',
        type: 'number',
        name: 'Quantidade de Números',
        min: 1,
        max: 300,
        default_value: 300
    }];

    quantidadeNumeros = h.input(param);

    if (typeof quantidadeNumeros !== 'number' || quantidadeNumeros <= 0) {
        h.log('Quantidade inválida.');
        return null; // Retorna null em caso de erro
    }
    return quantidadeNumeros;
}

function brindeChooser(brindes) {
    var brindeSelecionadoLabel = h.itemChooser('Selecione o brinde', brindes.map(function(brinde) { return brinde.label; }));
    if (brindeSelecionadoLabel == null) {
        // Cancelado pelo usuário
        h.log('Seleção de brinde cancelada.');
        return;
    }

    // Encontra o brinde selecionado na lista de brindes
    var brindeSelecionado = null;
    for (var i = 0; i < brindes.length; i++) {
        if (brindes[i].label === brindeSelecionadoLabel) {
            brindeSelecionado = brindes[i];
            break;
        }
    }

    if (brindeSelecionado) {
        // Exibe a imagem do brinde selecionado
        h.hly('ShowImage', { file: brindeSelecionado.image });

        var quantidadeNumeros = inputNumeros();

        if (quantidadeNumeros) {
            // Cria a lista de números para o sorteio
            var numeros = [];
            for (var i = 1; i <= quantidadeNumeros; i++) {
                numeros.push(i.toString());
            }

            var id = h.setTimeout(function () {
                // Abre a janela de sorteio com os números
                h.hly('OpenDrawLots', { items: numeros });
            }, 3000);
        }
    } else {
        h.log('Brinde não encontrado.');
    }
}
