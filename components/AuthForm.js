import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";

const AuthForm = ({ headerText, onSubmit, submitButtonText, errorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text h3>{headerText}</Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password(latest 12 characters)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage
        ? errorMessage.map((error) => {
            return (
              <Text style={styles.error} key={error[0]}>
                {error[0]} : {error[1].join()}
              </Text>
            );
          })
        : null}
      <Button
        title={submitButtonText}
        onPress={() => {
          onSubmit({ email, password });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
  },
  error: {
    color: "red",
  },
});

export default AuthForm;
