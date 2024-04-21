import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userInfos: null,
  login: () => {},
  logout: () => {},
  countBuy: 0,
});

export default AuthContext;
