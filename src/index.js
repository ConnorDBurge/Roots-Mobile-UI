import "react-native-gesture-handler";

import { Navigation } from "./navigation";
import { AuthenticationProvider } from "./contexts";

export const TheApp = () => {
  return (
    <AuthenticationProvider>
      <Navigation />
    </AuthenticationProvider>
  );
};
