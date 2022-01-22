FROM node:12.22.0-alpine

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7000

CMD ["npm", "start"]
