import React, { useCallback, useEffect, useState } from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import AuthContext from "./Context/authContext";

function App() {
  const router = useRoutes(routes);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userInfos, setUserInfos] = useState(false);
  const [countBuy, setCountBuy] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const login = (userInfos, token) => {
    setToken(token);
    setIsLoggedIn(true);
    setUserInfos(userInfos);
    localStorage.setItem("user", JSON.stringify({ token: token }));
  };

  const logout = useCallback(() => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: { Authorization: `Bearer ${localStorageData.token}` },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          setUserInfos(userData);
        });

      fetch("http://localhost:4000/v1/orders", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCountBuy(data.length);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [login, logout]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //   }
  // }, [isLoggedIn, login, logout]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        countBuy,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
