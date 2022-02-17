const express = require("express");
const app = express();
const session = require("express-session");
// for cors policy
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000" }));
// //////
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 36000 * 100 },
  })
);
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

require("dotenv").config();
const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT } = process.env;
const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURL)
  .then(() => console.log("successfully connect to the database Atlas"))
  .catch((err) => console.log(`error connecting to the database Atlas ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    if (!context.req.session.isAuthenticated) {
      context.req.session.isAuthenticated = false;
    }
    return context;
  },

  // this ↓
  cors: true,
  // or this ↓
  // cors: {
  //   origin: "*",
  //   credentials: true,
  // },
});

server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(PORT, () =>
    console.log(`🚀 apolloServer Server ready at  ${PORT}`)
  );
});
