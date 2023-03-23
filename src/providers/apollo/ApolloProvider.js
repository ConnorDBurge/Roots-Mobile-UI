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
  const httpLink = createHttpLink({
    uri: "https://4u71cpdrx3.execute-api.us-east-1.amazonaws.com/graphql",
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
