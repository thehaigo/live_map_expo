import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LiveScreen from "../screens/LiveScreen";
import LiveMapScreen from "../screens/LiveMapScreen";

const Stack = createStackNavigator();
const LiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LiveMaps" component={LiveScreen} />
      <Stack.Screen name="LiveMap" component={LiveMapScreen} />
    </Stack.Navigator>
  );
};

export default LiveStack;
