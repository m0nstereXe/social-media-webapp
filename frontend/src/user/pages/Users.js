import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    //get request by defualt
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedUsers(responseData.users);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  };
  const USERS = [
    {
      id: "u1",
      name: "Nick Belov",
      image: "https://images.emojiterra.com/twitter/v13.0/512px/1f9a7.png",
      places: 3,
    },
  ];

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && <div className="center">
        <LoadingSpinner/>
        </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
