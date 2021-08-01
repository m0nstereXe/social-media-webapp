import React, { useState } from "react";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NickAuth.css";

const DUMMY_LOGINS = [
  { email: "nickbelov2003@gmail.com", password: "poop1234" },
  { email: "jamesbelov2003@gmail.com", password: "stinky1234" },
];

const Auth = () => {
  const [formState, inputHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const [showLoginError,setShowLoginError] = useState(false);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    const correctLogin = DUMMY_LOGINS.filter(user => user.email===formState.inputs.email.value &&  user.password===formState.inputs.password.value).length == 1;
    if(!correctLogin)
    {
        setShowLoginError(true);
    }
    else{
        setShowLoginError(false);
    }
    console.log(correctLogin);
    //Send stuff to server!!!
    //Check if user is good
    //if so, route to home page
  };
  return (
    <form className="auth-form" onSubmit={authSubmitHandler}>
        <h3 className="auth-form__error" hidden={!showLoginError}>Login didn't work, please try again.</h3>
      <Input
        id="email"
        type="text"
        label="Email"
        element="input"
        errorText="Please enter a valid email."
        validators={[VALIDATOR_EMAIL()]}
        onInput={inputHandler}
      ></Input>
      <Input
        id="password"
        type="text"
        label="Password"
        element="input"
        errorText="Please enter a valid password."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      ></Input>
      <Button type="submit" disabled={!formState.isValid}>
        LOGIN
      </Button>
      <Button to="/">CANCEL</Button>  
    </form>
  );
};

export default Auth;
