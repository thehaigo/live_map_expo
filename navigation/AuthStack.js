import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/Auth/WelcomeScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import SigninScreen from "../screens/Auth/SigninScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{ headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="SignIn"
        component={SigninScreen}
        options={{ headerBackTitle: "Back" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
