import * as React from 'react';
import {Link} from "react-router-dom";
// import {Link} from "react-router-dom";

const UserListItem = ({user} : any  ) => (

    <Link to={"/user/" + user.username} className="user-list-item hoverable">
        <p><b>ID:</b> {user.id}</p>

        <p><b>FULL NAME:</b> {user.name}</p>

        <p><b>USERNAME:</b> {user.username}</p>
    </Link>
);


export default UserListItem;