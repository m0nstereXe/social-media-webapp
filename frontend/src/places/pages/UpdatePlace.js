import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "big huge tower!!!!!",
    imageUrl: "https://images.emojiterra.com/twitter/v13.0/512px/1f9a7.png",
    address: "376 Lakeview Drive, Wyckoff NJ",
    location: {
      lat: 40.9894912,
      lng: -74.1605376,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Poop",
    description: "look at this cool stuff!",
    imageUrl:
      "https://hips.hearstapps.com/edc.h-cdn.co/assets/16/45/1478626107-white-house-driveway.jpg",
    address: "1600 Pensylvania Ave, Washington DC",
    location: {
      lat: 38.8977,
      lng: -77.0365,
    },
    creator: "u2",
  },
];

const UpdatePlace = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
      false
  );
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place.</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min length of 5)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
