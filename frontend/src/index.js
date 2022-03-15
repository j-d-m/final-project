import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { createUploadLink } from "apollo-upload-client";
import "animate.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";

// new middlewareLink to attach the token in headers similar to authLink
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    middlewareLink,
    createUploadLink({
      uri: "https://deploy-final-project-anass.herokuapp.com/graphql",
    }),
  ]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
