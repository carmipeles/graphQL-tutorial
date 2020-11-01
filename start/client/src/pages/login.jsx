import React from "react";
import { gql, useMutation } from "@apollo/client";

import { LoginForm, Loading } from "../components";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) 
  }
`;

export default function Login() {
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      console.log("oncomplete");
      console.log(login);
      localStorage.setItem('token', login);
      window.location.reload();
      // localStorage.setItem('token', login.token);
      // localStorage.setItem('userId', login.id);
    }, 
    onError( error ) {console.log(error)}
  });
  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
