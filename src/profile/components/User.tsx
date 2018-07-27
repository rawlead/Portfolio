import * as React from 'react';

const User = (props: any) => (
    <div className="user-list-item hoverable">
        <p><b>ID:</b> {props.user.id}</p>

        <p><b>FULL NAME:</b> {props.user.name}</p>

        <p><b>USERNAME:</b> {props.user.username}</p>
    </div>
)
export default User;