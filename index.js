import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    user(id: ID!): User
  }
  type User {
    id: ID!
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        username: 'Dragos',
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT || 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
