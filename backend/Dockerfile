FROM node:lts

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
RUN npx prisma migrate deploy

COPY . .

RUN npm run build

EXPOSE 8080
EXPOSE 8000
CMD ["npm","run","start"]