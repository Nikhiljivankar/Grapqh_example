const { ApolloServer, AuthenticationError } =require('apollo-server-express');
const { createServer } =require('http');
const cors =require('cors');
const express =require('express');
const debugFactory =require('debug');
const _ =require('lodash');


require('./config');
// import mysql from './source/connectors/mysql';
const mongo  =require('./source/connectors/mongo');
const schema =require('./source/graphql/schema');
const cronjob = require('./source/cron job/cron');


const debug = debugFactory('server:main');

const app = express();


app.use(express.static('public'));
app.use('*', cors());
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);
// app.use('/tailorodo', router());
app.use("/api/v1/order", require("./source/REST/router/order"));
cronjob();


async function startApolloServer() {

const server = new ApolloServer({
  introspection: true,
  schema,
  context: async ({ req, res, connection }) => {
    const context = {};
    _.assign(context, {
      mongo,
    });
    return context;
  },
});
await server.start();
server.applyMiddleware({
  app,
  path: '/',
  cors: false,
});

const ws = createServer(app);
// server.installSubscriptionHandlers(ws);


const port = 8000;

ws.listen(port, () => {
  console.log(`🚀 Server ready at port : ${port}`);
  console.log(`GraphQL API URL: http://localhost:8000`)
  console.log(`Subscriptions URL: http://localhost:8000`)
});
}
startApolloServer();
