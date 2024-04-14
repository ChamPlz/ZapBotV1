const { MessageMedia } = require('whatsapp-web.js');
const config = require('../config/config.json');
const path = require('path');

module.exports = {
    handleUserCommand: async function (client, message) {
        // Lógica para lidar com os comandos de administrador
        console.log(message.from + " " + message.body + "  USER COMAND")
        const args = message.body
            .slice(1)
            .trim()
            .split(/ +/g)
        const command = args.shift().toLowerCase()

        try {
            const commandModulePath = path.join(__dirname, `../commands/userCmd/${command}.js`);
            const commandModule = require(commandModulePath);
            
            // Execute o comando
            await commandModule.execute(client, message, args);
        } catch (error) {
            if (message.author) {
                return
            } else { message.reply('Comando de Usuario não reconhecido! Digite !help para obter a lista de comandos.'); }
            console.log("Comando não encontrado")
        }
    },
};
