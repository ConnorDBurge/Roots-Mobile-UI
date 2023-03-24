import { Amplify, Auth, Hub } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";

import config from "../../aws-exports";

Amplify.configure(config);
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
