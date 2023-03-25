import { Amplify, Auth, Hub } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";

import config from "../../aws-exports";

Amplify.configure(config);
const AmplifyContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (
        data?.payload?.event === "signIn" ||
        data?.payload?.event === "signOut"
      ) {
        checkUser();
      }
    };
    Hub.listen("auth", listener);
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
