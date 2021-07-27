import React from 'react';
import './UsersList.css';
import UserItem from './UserItem';
const UsersList = (props) => {
    //handling the case that we have no users yet
    if (props.items.length === 0) {
        return (
            <div className="center">
                <h2>No users found</h2>
            </div>)
    }
    //handling the case that we have users
    return <ul>
        {props.items.map(user => {
            return <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.places} />;
        })}
    </ul>
};

export default UsersList;