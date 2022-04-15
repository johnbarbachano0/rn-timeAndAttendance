import React from "react";
import HomeNav from "./HomeNav";
import AuthStackNav from "./AuthStackNav";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { isLoggedIn } = useSelector((state) => state.auth.authData);

  return isLoggedIn ? <HomeNav /> : <AuthStackNav />;
};

export default Navigation;
