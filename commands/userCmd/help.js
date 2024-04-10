const fs = require('fs');

module.exports = {
    execute: function (client, message, args) {
        const categories = [];

        const adminCommands = fs
            .readdirSync(`./commands/userCmd/`)
            .filter(file => file.endsWith('.js'))
            .map(command => {
                const commandProps = require(`../../commands/userCmd/${command}`);
                return `!${commandProps.help.name}`;
            })
            .filter(i => i !== undefined);
        categories.push({ name: 'Comandos', value: adminCommands.join('\n') });

        // Formatando a mensagem
        let response = 'Comandos disponíveis:\n\n';
        categories.forEach(category => {
            response += `*${category.name}*:\n${category.value}\n\n`;
        });

        // Enviando a mensagem formatada
        message.reply(response);
    },
    help: {
        name: 'help',
        category: 'Útil',
        description: 'Os Comandos.',
        usage: '!help',
    },
};