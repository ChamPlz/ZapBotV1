const { MessageMedia } = require('whatsapp-web.js');
const config = require('../config/config.json');
const userCommands = require('./userCommands.js');

qrcode

module.exports = {
    isAdminCommand: function (message) {
        return config.adminNumbers.includes(message.from);
    },

    handleAdminCommand: function (client, message) {
        // Lógica para lidar com os comandos de administrador
        console.log(message.from + " " + message.body)
        const args = message.body
            .slice(1)
            .trim()
            .split(/ +/g)
        const command = args.shift().toLowerCase()

        try {
            const commandModule = require(`../commands/adminCmd/${command}.js`);
            commandModule.execute(client, message, args);
        } catch (error) {
            userCommands.handleUserCommand(client, message);
        }
    },
};
