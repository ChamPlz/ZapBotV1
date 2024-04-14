const { MessageMedia } = require('whatsapp-web.js');
const config = require('../config/config.json');
const userCommands = require('./userCommands.js');
const path = require('path');


module.exports = {
    isAdminCommand: function (message) {
        return config.adminNumbers.includes(message.from);
    },

    handleAdminCommand: async function (client, message) {
        // Lógica para lidar com os comandos de administrador
        console.log(message.from + " " + message.body)
        const args = message.body
            .slice(1)
            .trim()
            .split(/ +/g)
        const command = args.shift().toLowerCase()

        try {
            const commandModulePath = path.join(__dirname, `../commands/adminCmd/${command}.js`);
            const commandModule = require(commandModulePath);
            
            // Execute o comando
            await commandModule.execute(client, message, args);
            message.reply('Tentando enviar mensagens!')
        } catch (error) {
            console.error(`Erro ao executar comando '${command}' de ${message.from}:`, error);
            userCommands.handleUserCommand(client, message);
        }
    },
};
