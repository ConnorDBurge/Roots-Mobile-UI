import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  uri: "https://4u71cpdrx3.execute-api.us-east-1.amazonaws.com/graphql",
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => (
  <Provider client={client}>{children}</Provider>
);
