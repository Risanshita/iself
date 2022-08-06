import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

import AppRoutes, { Protected } from "./AppRoutes";
import Layout from "./layout";
import "./custom.css";
import { AccountContext } from "./context/accountContext";

const App = () => {
  const { state, actions } = useContext(AccountContext);
  const { login } = state.account;
  const { setLogin } = actions.account;
  const [isInitialLoad, setInitialLoad] = useState(true);

  ConfigProvider.config({
    theme: {
      primaryColor: "#4361EE",
      errorColor: "#ff4d4f",
      warningColor: "#faad14",
      successColor: "#52c41a",
      infoColor: "#1890ff",
    },
  });

  if (isInitialLoad) {
    const firebaseConfig = {
      appName: "iself",
      apiKey: "AIzaSyDcAN1dUuM_fuJ0LzxfNttO1J09SIJlsj8",
      authDomain: "iself-a253a.firebaseapp.com",
      projectId: "iself-a253a",
      storageBucket: "iself-a253a.appspot.com",
      messagingSenderId: "723474402559",
      appId: "1:723474402559:web:94ea94ef6a16a4e63ed0ca",
      measurementId: "G-JTVXJ7G4QL",
    };

    var app = firebase.initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log(analytics);
    setInitialLoad(false);

    const auth = getAuth(app);
 
    onAuthStateChanged(auth, (user) => {
      setLogin(user && user.accessToken ? true : false);
    });
  }
  // useEffect(function () {});

  return (
    <ConfigProvider componentSize="large">
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, isProtected, ...rest } = route;
            return (
              <Route
                key={index}
                {...rest}
                element={
                  isProtected ? (
                    <Protected isLoggedIn={login} children={element} />
                  ) : (
                    element
                  )
                }
              />
            );
          })}
        </Routes>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
