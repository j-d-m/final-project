import React from "react";
import App from "./App.js";
import reactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

//creating the connection to the backend
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});
export const ALL_Companies = gql`
  query GetCompanies {
    getCompanies {
      company_name
      description
      id
    }
  }
`;
reactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
