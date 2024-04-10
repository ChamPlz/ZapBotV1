
# ZapBot V1

Este é um bot para WhatsApp desenvolvido em Node.js utilizando a biblioteca `whatsapp-web.js`. Ele permite o envio de mensagens automáticas, agendamento de envios, execução de comandos de administrador e usuário comum, além da funcionalidade de enviar arquivos e mensagens em massa para grupos selecionados.

## Configuração

Antes de usar o bot, é necessário configurar algumas coisas:

1. Certifique-se de ter um telefone com WhatsApp disponível para escanear o QR code.
2. Abra o arquivo `config/config.json` e atualize as seguintes configurações:

```json
{
    "adminNumbers": ["5511999999999@c.us", "exemplo2@c.us", "exemplo3@c.us"],
    "groupName" : [" "],
    "groupNameDel" : [" "],
    "messages": {
        "message1": "🚨 *ATENÇÂO* 🚨",
        "msgQrCode": "🚨 *PASSO A PASSO* 🚨"
    }
}
```

- `adminNumbers`: Lista de números de administradores. Substitua "exemplo1@c.us", "exemplo2@c.us" e "exemplo3@c.us" pelos números reais dos administradores.
- `groupName`: Nome do grupo para o qual o bot enviará mensagens.
- `groupNameDel`: Nome do grupo para o qual o bot não enviará mensagens.
- `messages`: Mensagens pré-definidas pelo bot. Você pode personalizá-las conforme necessário.

3. Configure outras variáveis necessárias nos arquivos conforme necessário.

## Instalação e Uso

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório.
3. Na pasta do projeto, execute `npm install` para instalar as dependências.
4. Execute o bot com `node index.js`.
5. Escaneie o QR code com seu telefone para autenticar o bot.

## Funcionalidades

- **Envio de Mensagens Automáticas**: O bot pode enviar mensagens automáticas em horários agendados.
- **Comandos de Administrador**: Administradores podem enviar comandos especiais para o bot.
- **Comandos de Usuário Comum**: Usuários comuns podem interagir com o bot através de comandos específicos.
- **Envio de Arquivos e Mensagens em Massa**: O bot é capaz de enviar arquivos e mensagens em massa para grupos selecionados.

## Arquivos de Comando

### Admin Commands

#### adminCommands.js

Este módulo contém a lógica para lidar com os comandos de administrador no bot do WhatsApp.

### User Commands

#### userCommands.js

Este módulo contém a lógica para lidar com os comandos de usuário comum no bot do WhatsApp.

### Help Commands

#### help.js

Este arquivo contém a lógica para exibir uma lista de comandos disponíveis para os usuários do bot do WhatsApp.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
