import * as React from 'react';
import './NotFound.css';
import {Link} from "react-router-dom";

const NotFound = () => (
    <div id="not-found-root">
        <div className="fake-nav-background"/>
        <h1 className="center">Error 404</h1>
        <h4 className="center">Page Not Found</h4>
        <p className="center">
            <Link to="/">go bach to home page</Link>
        </p>

    </div>
);

export default NotFound;