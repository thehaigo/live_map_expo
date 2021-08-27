import React, { useContext, useEffect } from "react";
import AuthForm from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";

const SignupScreen = () => {
  const {
    state: { errorMessage },
    signup,
    clearErrorMessage,
  } = useContext(AuthContext);
  useEffect(() => {
    clearErrorMessage();
  });
  return (
    <AuthForm
      headerText="Sign Up"
      submitButtonText="Sign Up"
      errorMessage={errorMessage}
      onSubmit={signup}
    />
  );
};

export default SignupScreen;
