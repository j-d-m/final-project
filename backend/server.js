// for cors policy
// const app = express();
// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000" }));
// const express = require("express");
// //////
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

mongoose.connect("mongodb://127.0.0.1:27017/final-project-dci", () =>
  console.log("connected to DB")
);
// const { typeDefs, resolvers } = require("./graphql/resolvers");

// require("dotenv").config();
// const mongoose = require("mongoose");
// const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
// const mongoURL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
// mongoose
//   .connect(mongoURL)
//   .then(() => console.log("successfully connect to the database Atlas"))
//   .catch((err) => console.log(`error connecting to the database Atlas ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (context) => {
    return context;
  },
  // this ↓
  cors: true,
  // or this ↓
  // cors: {
  // 	origin: '*',
  // 	credentials: true}
});

server.listen().then(({ url }) => {
  console.log(`🚀 apolloServer Server ready at  ${url}`);
});
