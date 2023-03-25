import { Amplify, Auth, Hub } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";

import config from "../../aws-exports";

const isLocalhost = Boolean(
  Constants.experienceUrl.match(/exp:\/\/10.0.0.8:19000/)
);

const updatedAwsConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? config.oauth.redirectSignIn
      : Constants.experienceUrl,
    redirectSignOut: isLocalhost
      ? config.oauth.redirectSignOut
      : Constants.experienceUrl,
  },
};

Amplify.configure(updatedAwsConfig);
const AmplifyContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
        case "customOAuthState":
          setUser(null);
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser))
      .catch(() => console.log("Not signed in"));

    return unsubscribe;
  }, []);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  return (
    <AmplifyContext.Provider value={{ user }}>
      {children}
    </AmplifyContext.Provider>
  );
};

export const useAuth = () => useContext(AmplifyContext);
