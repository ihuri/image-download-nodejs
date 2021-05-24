const request = require('request');
const fs = require('fs');

// Parametros da Função URL, Diretório de destino, nome do arquivo
async function download(url, dest, name) {

    // Função para pegar o tipo do arquivo e concatena no final
    dest = dest + '/' + name + url.substr(url.length - 4)

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
    const data = await download('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', './images', 'Image');
})();