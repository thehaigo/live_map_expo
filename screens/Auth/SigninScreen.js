import React, { useContext, useEffect } from "react";
import AuthForm from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";

const SigninScreen = () => {
  const {
    state: { errorMessage },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  return (
    <AuthForm
      headerText="Sign In"
      submitButtonText="Sign In"
      errorMessage={errorMessage}
      onSubmit={signin}
    />
  );
};

export default SigninScreen;
