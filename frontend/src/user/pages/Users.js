import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    //get request by defualt
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users");

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }

    };
    fetchUsers();
  }, [sendRequest]);

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
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && <div className="center">
        <LoadingSpinner/>
        </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
