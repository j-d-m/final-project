/**  This code sets up a React application with Apollo Client for GraphQL, including middleware for attaching a token to headers, error handling with sweetalert2, and routing using HashRouter. It then renders the App component into the root DOM element. */

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
import { onError } from "apollo-link-error";
import Swal from "sweetalert2";
// new middlewareLink to attach the token in headers similar to authLink
const middlewareLink = new ApolloLink((operation, forward) => {
  //set context with token from localStorage
  operation.setContext({
    headers: {
      token: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});
//Define the error handling link
const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      Swal.fire({
        position: "top",
        icon: "error",
        title: `${message}`,
        showConfirmButton: false,
        timer: 2000,
        customClass: "swal-width",
      })
    );
  }
  //handle network errors
  if (networkError) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: networkError,
      showConfirmButton: false,
      timer: 2000,
      customClass: "swal-width",
    });
  }
});
//initalize the AplloClient with caching and link setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    link,
    middlewareLink,
    createUploadLink({
      uri: "https://final-project-backend-chi.vercel.app/",
    }),
  ]),
});
// Render the application
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
