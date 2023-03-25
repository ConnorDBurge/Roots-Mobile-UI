import { Amplify, Auth, Hub } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import Constants from "expo-constants";

import config from "../../aws-exports";

console.log(Constants.experienceUrl);

console.warn(Constants);

const isLocalhost = !Boolean(
  Constants.experienceUrl.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] =
  config.oauth.redirectSignIn.split(",");

const [localRedirectSignOut, productionRedirectSignOut] =
  config.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

console.log({ isLocalhost });

Amplify.configure(updatedAwsConfig);
const AmplifyContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customState, setCustomState] = useState(null);

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
