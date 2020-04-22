const fs = require('fs');

const controller = {

    realizarUpload: (req, res) => {
        const { 
            name, 
            mimetype,
            data
        } = req.files['arquivo'];

        /**
         * Cria o nome do arquivo temporário
         */
        const nomeArquivo = `${new Date().getTime()}`;
        console.log(nomeArquivo);

        /**
         * Cria o arquivo temporário
         */
        fs.writeFileSync(nomeArquivo, data);

        /**
         * Cria o stream de leitura do arquivo temporário
         */
        const readStream = fs.createReadStream(nomeArquivo);

        /**
         * Realiza a gravação do arquivo no banco de dados
         */
        const Arquivo = require('../models/Arquivo');
        const metadados = {
            filename: name, 
            contentType: mimetype
        };
        Arquivo.write(metadados, readStream, (erro, arquivo) => {
            fs.unlinkSync(nomeArquivo);
            if (erro) {
                console.log(erro);
                res.status(500).json({ 
                    erro: 'Erro ao tentar salvar o arquivo' 
                })
            } else {
                res.status(201).json({ 
                    mensagem: 'Arquivo salvo', 
                    id: arquivo._id 
                });
            }
        });
    }
};

module.exports = controller;