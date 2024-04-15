const fs = require('fs');
const sendMessageToGroups = require('../../utils/sendMessageToGroups.js')

module.exports = {
    execute: function (client, message, args) {
        if (message.body.trim() === '-mensagem') {
            message.reply('* Digite a mensagem:* \n !mensagem (texto) ');
        } else {
            const mensagemSelecionado = message.body.trim().substring(9).toLowerCase()
            console.log(mensagemSelecionado)
            sendMessageToGroups.sendMessage(client, null, mensagemSelecionado);
            message.reply('Mensagem enviada ')
        }
    },
    help: {
        name: 'mensagem (texto)',
        category: 'Útil',
        description: 'Mandar mensagen a todos os grupos',
        usage: '!mensagem',
    },
};