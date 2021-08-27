import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import { Provider as AuthProvider } from "./AuthContext";

const Provider = () => {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AuthProvider>
  );
};

export default Provider;
