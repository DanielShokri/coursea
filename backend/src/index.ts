import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from '@apollo/server';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUserFromToken } from './Utils/getUserFromToken';

const app = express();

const startServer = async () => {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://coursea.vercel.app'
          : 'http://localhost:5173',
      credentials: true,
    }),
    bodyParser.json({ limit: '50mb' }),
    // morgan('dev'),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const userInfo = await getUserFromToken(
          req.headers['authorization']?.split(' ')[1] as string
        );

        return { userInfo };
      },
    })
  );
  const port = Number(process.env.PORT ?? 8080);
  await new Promise<void>((resolve, reject) => {
    try {
      httpServer.listen({ host: '0.0.0.0', port }, resolve);
      console.log(`🚀 Server ready at http://localhost:${port}`);
    } catch (error) {
      console.log(error);

      return reject(error);
    }
  });
};
startServer();
