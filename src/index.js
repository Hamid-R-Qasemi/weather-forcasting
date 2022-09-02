import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  useQuery,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map((message, location, path) => {
      console.log(`graphql Error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: "https://graphql-weather-api.herokuapp.com/",
  }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  option: { mode: "no-cors" },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
