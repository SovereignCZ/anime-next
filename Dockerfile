# Použij oficiální image Node.js jako základ
FROM node:22-alpine

# Nastav pracovní adresář v kontejneru
WORKDIR /app

# Zkopíruj package.json a pnpm-lock.yaml do pracovního adresáře
COPY /public package.json server.js ./

# na produkci nesmí být, ale u mě?
RUN npm config set strict-ssl=false
# Nainstaluj závislosti
RUN npm install -g pnpm && pnpm install

# Zkopíruj zbytek aplikace do pracovního adresáře
COPY .next .next

# Exponuj port, na kterém bude aplikace běžet
EXPOSE 3000

# Definuj příkaz pro spuštění aplikace
CMD ["npm", "run", "start"]
