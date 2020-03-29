import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(PORT, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
