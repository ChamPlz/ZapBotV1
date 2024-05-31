const { Client,LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
const adminCommands = require('./commands/adminCommands');
const userCommands = require('./commands/userCommands');
const sendMessageToGroups = require('./utils/sendMessageToGroups.js');

const client = new Client({
    webVersionCache: {
         type: 'remote',
         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
     }, 
     authStrategy: new LocalAuth({
         dataPath: 'session'
     }),
     puppeteer: {
         args: ['--no-sandbox', '--disable-setuid-sandbox'],
     },
 });

client.on('qr', qr => {
    console.log('QR code gerado. Escaneie-o com seu telefone.');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('ready', () => {
    console.log('Cliente WhatsApp está pronto!');

    // Agendar o envio de mensagens
    cron.schedule('0 12 * * *', () => {
        sendMessageToGroups.sendMessage(client, './config/imagens/adminIamg/recusa.jpeg', "🚨 *ATENÇÂO* 🚨");
    });
    cron.schedule('0 9,17 * * *', () => {
        sendMessageToGroups.sendMessage(client, './config/doc/adminDoc/como localizar os treinamentos.pdf', "🚨 *EVITE BLOQUEIOS FAZENDO OS TREINAMENTOS DISPONIBILIZADOS PELO MERCADO LIVRE!* 🚨\nOBS: Bloqueio depois 72HRs com treinamentos pendentes.");
    });
});

client.on('message', async message => {
    // Verificar se é um comando de administrador
    if (message.body.indexOf("?") !== 0) { return } else {
        if (adminCommands.isAdminCommand(message)) {
            adminCommands.handleAdminCommand(client, message);
        } else {
            // Verificar se é um comando de usuário comum
            userCommands.handleUserCommand(client, message);
        }
    }
});

client.initialize();