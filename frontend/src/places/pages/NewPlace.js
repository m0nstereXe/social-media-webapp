import React from "react";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/FormElements/Button";
import Input from "../../shared/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const NewPlace = () => {
  const [formState,inputHandler] = useForm(
    {
      title: {
        value: " ",
        isValid: false,
      },
      description: {
        value: " ",
        isValid: false,
      },
      address: {
        value: " ",
        isValid: false,
      },
    },
    false
  );

  //USECALL BACK TO AVOID INFINITE LOOPS


  const placeSubmitHandler = (event) => {
    event.preventDefault();
    //send data to server!!!!!
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid Description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        label="Address"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};
export default NewPlace;
