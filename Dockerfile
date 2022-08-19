FROM node:14

WORKDIR /leon/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app.js"]

