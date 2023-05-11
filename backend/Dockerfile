FROM node:17.3

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install


COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate

COPY . .

RUN npm run migrate:prod
RUN npm run build

EXPOSE 8080
EXPOSE 8000
CMD ["npm","run","start"]