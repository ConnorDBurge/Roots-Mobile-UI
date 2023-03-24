import {
  ApolloClient,
  ApolloProvider as Provider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Auth } from "aws-amplify";
import React from "react";

export const ApolloProvider = ({ children }) => {
  const deployment = {
    staging: "https://8v9u4dvn1b.execute-api.us-east-1.amazonaws.com/graphql",
    prod: "https://doo1z471si.execute-api.us-east-1.amazonaws.com/graphql",
  };

  const httpLink = createHttpLink({
    uri: deployment?.staging,
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await Auth.currentSession();
    const token = session.getIdToken().getJwtToken();
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <Provider client={client}>{children}</Provider>;
};
