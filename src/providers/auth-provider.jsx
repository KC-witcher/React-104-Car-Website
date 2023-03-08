import { createContext, useContext, useState, useEffect } from "react";
import { registerUser } from "../api/users/registerUser";
import { getUser } from "../api/users/getUser";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = ({ username, password }) => {
    return registerUser({ username, password }).then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return setUser(user);
    });
  };

  const login = async ({ username, password }) => {
    const user = await getUser({ username });
    if (user.password != password) {
      throw new Error("Incorrect Password");
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const maybeUser = localStorage.getItem("user");
    if (maybeUser) {
      setUser(JSON.parse(maybeUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return {
    user: context.user,
    registerUser: context.register,
    login: context.login,
    logOut: context.logOut,
  };
};
