# Use uma imagem base do Node.js
FROM node:14

# Instale dependências do sistema necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libgtk-3-0

# Copie arquivos do projeto para o contêiner
WORKDIR /app
COPY . .

# Instale as dependências do projeto
RUN npm install

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]
