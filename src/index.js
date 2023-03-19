import "react-native-gesture-handler";

import { Navigation } from "./screens";
import { AuthenticationProvider } from "./providers";

export const TheApp = () => {
  return (
    <AuthenticationProvider>
      <Navigation />
    </AuthenticationProvider>
  );
};
