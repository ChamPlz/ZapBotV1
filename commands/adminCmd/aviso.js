const fs = require('fs');
const sendMessageToGroups = require('../../utils/sendMessageToGroups.js');

module.exports = {
    execute: function (client, message, args) {
        const avisos = getAvisos();
        const avisoList = Object.keys(avisos).join('\n');

        if (message.body.trim() === '?aviso') {
            message.reply('*Tipos de Avisos Disponíveis:*\nUse: !aviso (qual deseja)\n\n' + avisoList);
        } else {
            const avisoSelecionado = message.body.trim().substring(7).toLowerCase(); // Removendo "!aviso" do início da mensagem
            if (avisos.hasOwnProperty(avisoSelecionado)) {
                const tipoAviso = avisos[avisoSelecionado];
                if (tipoAviso === 'Imagem') {
                    const imagemPath = `./config/imagens/adminImag/${avisoSelecionado}.jpeg`; // Considerando que as imagens são arquivos .jpg
                    sendMessageToGroups.sendMessage(client, imagemPath);
                } else if (tipoAviso === 'Documento') {
                    const docPath = `./config/doc/adminDoc/${avisoSelecionado}.pdf`; // Considerando que os documentos são arquivos .pdf
                    sendMessageToGroups.sendMessage(client, docPath);
                }
            } else {
                message.reply('Aviso não encontrado. Por favor, escolha um dos tipos de aviso disponíveis:\n\n' + avisoList + "\n\n*Mande* !aviso (qual deseja)");
            }
        }
    },
    get help() {
        return {
            name: 'aviso',
            category: 'ADM',
            description: 'O Comando manda mensagen de imagem ou pdf a todos os grupos.',
            usage: '?aviso (nome do aviso)',
        }
    },
};

function getAvisos() {
    const avisos = {};
    const imagensDir = './config/imagens/adminImag';
    const docsDir = './config/doc/adminDoc';

    // Lê os arquivos de imagens
    const imagens = fs.readdirSync(imagensDir);
    imagens.forEach(file => {
        const fileName = file.split('.')[0];
        avisos[fileName] = 'Imagem';
    });

    // Lê os arquivos de documentos
    const docs = fs.readdirSync(docsDir);
    docs.forEach(file => {
        const fileName = file.split('.')[0];
        avisos[fileName] = 'Documento';
    });

    return avisos;
}
