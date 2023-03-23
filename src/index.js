import "react-native-gesture-handler";

import { Navigation } from "./screens";
import { AuthenticationProvider, ApolloProvider } from "./providers";

export const TheApp = () => {
  return (
    <AuthenticationProvider>
      <ApolloProvider>
        <Navigation />
      </ApolloProvider>
    </AuthenticationProvider>
  );
};
