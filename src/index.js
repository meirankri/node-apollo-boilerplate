import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';

import typeDefs from '../graphql/schema';
import resolvers from './../graphql/resolvers/index';
import session from 'express-session';
import { v4 as uuid } from 'uuid';
import passport from 'passport';
import User from '../models/User';

passport.serializeUser((user, done) => {
  done(null, user.userId);
});
passport.deserializeUser((id, done) => {
  const matchingUser = User().findOne({ where: { userId: id } });
  done(null, matchingUser);
});

passport.use(
  new GraphQLLocalStrategy(async (email, password, done) => {
    const users = (await User().findAll()) || [];
    const matchingUser = users.find(
      (user) => email === user.email && password === user.password
    );

    const error = matchingUser ? null : new Error('no matching user');
    done(error, matchingUser);
  })
);

const SESSION_SECRECT = 'bad secret';

require('dotenv').config();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => buildContext({ req, res, User })
  // playground: false,
});

//express server
const app = express();

app.use(
  session({
    genid: (req) => uuid(),
    secret: SESSION_SECRECT,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

apolloServer.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
