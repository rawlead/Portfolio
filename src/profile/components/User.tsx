import * as React from 'react';

const User = (props: any) => (
    <div>
        {props.user.id}
        <br/>

        {props.user.name}
        <br/>

        {props.user.username}
        <br/>
        <br/>
    </div>
)
export default User;