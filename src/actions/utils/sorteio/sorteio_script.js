function scriptAction(obj) {
    // Ler as imagens disponíveis no diretório
    var images = h.hly('GetImages', { folder: '/brindes/' });
    if (!images || !images.data) {
        h.log('Erro ao ler as imagens.');
        return;
    }

    // Criar a lista de brindes vinculando cada brinde à sua imagem correspondente
    var brindes = [];
    images.data.forEach(function(image) {
        var imageName = image.name.toLowerCase();
        if (imageName.startsWith('brinde') && (imageName.endsWith('.png') || imageName.endsWith('.jpg') || imageName.endsWith('.jpeg'))) {
            var brindeNumber = parseInt(imageName.replace('brinde', '').replace('.png', '').replace('.jpg', '').replace('.jpeg', ''));
            if (!isNaN(brindeNumber)) {
                brindes.push({
                    label: 'Brinde ' + brindeNumber,
                    value: brindeNumber,
                    image: '/brindes/' + image.name
                });
            }
        }
    });

    // Ordenar os brindes por valor
    brindes.sort(function(a, b) {
        return a.value - b.value;
    });

    // Mostra os brindes disponíveis
    var listaBrindes = "Brindes Disponíveis:\n";
    brindes.forEach(function(brinde, index) {
        listaBrindes += (index + 1) + ". " + brinde.label + "\n";
    });

    h.log(listaBrindes);

    // Chama a função para escolher o brinde
    brindeChooser(brindes);
}