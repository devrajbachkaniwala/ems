FROM node:16.13.1-alpine AS Production

WORKDIR /home/backend/auth-server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "sh", "-c", "npm run start:production" ]