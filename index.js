const express = require('express');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const adminCommands = require('./commands/adminCommands');
const userCommands = require('./commands/userCommands');
const sendMessageToGroups = require('./utils/sendMessageToGroups.js');

const app = express();
const port = process.env.PORT || 3000;

// Criar uma instância do cliente WhatsApp
const client = new Client({});

// Configurar eventos do cliente WhatsApp
client.on('qr', qr => {
    console.log('QR code gerado. Escaneie-o com seu telefone.');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');

    // Configurar agendamentos com cron
    cron.schedule('0 12 * * *', () => {
        sendMessageToGroups.sendMessage(client, './config/imagens/adminImag/teste.jpeg', "🚨 *ATENÇÂO* 🚨");
    });

    // Outros agendamentos

    // Configure outras tarefas cron aqui
});

client.on('message', async message => {
    // Verificar comandos de admin ou usuário
    if (message.body.indexOf("-") !== 0) { return } else {
        if (adminCommands.isAdminCommand(message)) {
            adminCommands.handleAdminCommand(client, message);
        } else {
            // Verificar se é um comando de usuário comum
            userCommands.handleUserCommand(client, message);
        }
    }
});

client.initialize();

// Rotas para API
app.get('/', (req, res) => {
    res.send('WhatsApp Bot Web Service');
});

app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;

    // Adicione código para enviar uma mensagem usando o cliente WhatsApp
    await client.sendMessage(number, message);
    res.status(200).send('Mensagem enviada');
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
