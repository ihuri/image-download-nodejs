const request = require('request');
const fs = require('fs');

// Parametros da Função URL, Diretório de destino, nome do arquivo
async function download(url, dest, name) {

    // Condição para pegar o tipo do arquivo e concatena no final
    if (url.indexOf('.jpg') > 0) {
        dest = dest + '/' + name + '.jpg';
    } else if (url.indexOf('.png') > 0) {
        dest = dest + '/' + name + '.png';
    } else if (url.indexOf('.gif') > 0) {
        dest = dest + '/' + name + '.gif';
    } else {
        dest = dest + '/' + name;
    }

    /* Crie um arquivo vazio onde possamos salvar os dados */
    const file = fs.createWriteStream(dest);

    /* Using Promises so that we can use the ASYNC AWAIT syntax */
    await new Promise((resolve, reject) => {
            request({
                    /* Aqui você deve especificar o link exato para o arquivo que você está tentando baixar */
                    uri: url,
                    gzip: true,
                })
                .pipe(file)
                .on('finish', async() => {
                    console.log(`Download Finalizado com sucesso.`);
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        })
        .catch((error) => {
            console.log(`Algo aconteceu: ${error}`);
        });
}

//Exemplo
(async() => {
    const data = await download('https://s2.glbimg.com/g3v1PypQU-zhZ-a4BICkEk3h9Qo=/850x446/s2.glbimg.com/-SD6jkXwv_MgNqyMHYw3dua7b0w=/0x178:695x521/695x343/s.glbimg.com/po/tt2/f/original/2015/05/31/nyan2.gif', './images', 'Gif');
})();
