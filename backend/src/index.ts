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
      origin: 'https://coursea.vercel.app',
      // origin: process.env.GRAPHQL_URL
      //   ? process.env.GRAPHQL_URL
      //   : 'http://127.0.0.1:5173',
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

// const app = express();

// const httpServer = http.createServer(app);

// const server = new ApolloServer({
//   typeDefs: schema,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// const startServer = async () => {
//   await server.start();

//   app.use(
//     '/',
//     cors<cors.CorsRequest>({
//       origin: 'http://127.0.0.1:5173',
//       credentials: true,
//     }),
//     // cors<cors.CorsRequest>({
//     //   origin: 'http://127.0.0.1:5173',
//     //   // origin:
//     //   //   process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5173' : '',
//     //   credentials: true,
//     // }),
//     bodyParser.json({ limit: '50mb' }),
//     // morgan('dev'),
//     expressMiddleware(server, {
//       context: async ({ req }) => {
//         const userInfo = await getUserFromToken(
//           req.headers['authorization']?.split(' ')[1] as string
//         );

//         return { userInfo };
//       },
//     })
//   );
//   const port = Number(process.env.PORT ?? 8080);
//   console.log('🚀 ~ file: index.ts:52 ~ startServer ~ port:', port);
//   // Modified server startup
//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port, host: '0.0.0.0' }, resolve)
//   );
//   console.log(`🚀 Server ready at http://localhost:${port}/`);
// };

// startServer();
