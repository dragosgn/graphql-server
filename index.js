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
    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
  },
  2: {
    id: '2',
    text: 'By World',
  },
};

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
    me: (parent, args, { me }) => {
      return me;
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, { id }) => {
      return messages[id];
    },
  },
  User: {
    username: user => `${user.firstname} ${user.lastname}`,
  },
  Message: {
    user: (parent, args, { me }) => {
      return me;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT || 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
