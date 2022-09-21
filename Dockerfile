FROM node:16
WORKDIR /usr/src/sdc
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server/index.js"]