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
  operation.setContext({
    headers: {
      token: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});

const link = onError(({ graphQLErrors, networkError }) => {
  // if (graphQLErrors) {
  //   graphQLErrors.map(({ message, locations, path }) =>
  //     Swal.fire({
  //       position: "top",
  //       icon: "error",
  //       title: `${message}`,
  //       showConfirmButton: false,
  //       timer: 2000,
  //       customClass: "swal-width",
  //     })
  //   );
  // }
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
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    link,
    middlewareLink,
    createUploadLink({
      uri: "http://localhost:5000/graphql",
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
