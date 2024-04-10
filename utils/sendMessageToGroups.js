const { MessageMedia } = require('whatsapp-web.js');
const config = require('../config/config.json');


module.exports = {
    sendMessage: async function (client, image, message) {
        const groups = await client.getChats();
        if (!message) {
            message = "🚨 *ATENÇÂO* 🚨"
        }
        groups.forEach(async group => {
            if (group.isGroup && group.name.includes(config.groupName) && !group.name.includes(config.groupNameDel)) {
                if (!image) {
                    await group.sendMessage(message);
                    console.log(`Mensagem enviada para grupo ${group.name}`);

                    const sticker = MessageMedia.fromFilePath('./config/fig/Atencao.webp');
                    group.sendMessage(sticker, { sendMediaAsSticker: true });
                } else {
                    await group.sendMessage(message, { media: MessageMedia.fromFilePath(image) });
                    console.log(`Mensagem enviada para grupo ${group.name}`);
                    const sticker = MessageMedia.fromFilePath('./config/fig/Atencao.webp');
                    group.sendMessage(sticker, { sendMediaAsSticker: true });
                }
            }
        });
    }
};