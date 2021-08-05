import React from "react";

import UsersList from "../components/UsersList";
const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Nick Belov",
      image: "https://images.emojiterra.com/twitter/v13.0/512px/1f9a7.png",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
 