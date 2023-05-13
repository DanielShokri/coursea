FROM node:17.3

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
ENV DATABASE_URL=postgresql://postgres:dAOnHhcKWz6OAM85BObh@containers-us-west-149.railway.app:7192/railway

COPY prisma/schema.prisma ./prisma/
RUN npx prisma generate
RUN npx prisma migrate deploy

COPY . .

RUN npm run build

EXPOSE 8080
EXPOSE 8000
CMD ["npm","run","start"]