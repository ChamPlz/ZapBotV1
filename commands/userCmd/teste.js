const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');


module.exports = {
    execute: function (client, message, args) {
        message.reply(MessageMedia.fromFilePath('./config/doc/userDoc/teste.jpeg'));
        message.reply("teste. 😉");
    },
    get help() {
        return {
            name: 'teste',
            category: 'arquivo',
            description: 'O Comando manda uma imagem',
            usage: '!palavra',
        }
    },
}

