import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import 'dotenv/config';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }
  type User {
    id: ID!
    username: String!
  }
`;

let users = {
  1: {
    id: '1',
    username: 'Dragos',
  },
  2: {
    id: '2',
    username: 'Tony',
  },
};

const me = users[1];

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: () => {
      return me;
    },
  },
  User: {
    username: parent => {
      return parent.username;
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
