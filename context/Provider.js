import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import { Provider as AuthProvider } from "./AuthContext";
import { Provider as MapsProvider } from "./MapsContext";
import { Provider as PointsProvider } from "./PointsContext";
const Provider = () => {
  return (
    <AuthProvider>
      <MapsProvider>
        <PointsProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </PointsProvider>
      </MapsProvider>
    </AuthProvider>
  );
};

export default Provider;
