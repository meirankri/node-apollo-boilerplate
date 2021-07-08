import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import typeDefs from '../graphql/schema';
import resolvers from './../graphql/resolvers/index';

require('dotenv').config();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: false,
});

//express server
const app = express();

apolloServer.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
