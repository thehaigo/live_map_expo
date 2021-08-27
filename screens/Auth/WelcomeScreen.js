import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to LiveMap</Text>
      <Button title="SignUp" onPress={() => navigation.navigate("SignUp")} />
      <Button title="SignIn" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignSelf: "center",
    flex: 1,
  },
});

export default WelcomeScreen;
