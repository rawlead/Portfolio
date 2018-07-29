import * as React from 'react';
import {Redirect, Route} from "react-router";

class PrivateRoute extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.renderComponent = this.renderComponent.bind(this);
    }

    renderComponent() {
        if (this.props.authenticated) {
            return <this.props.component {...this.props.rest} {...this.props} />
        } else {
            return <Redirect to={{
                pathname: '/',
                state: {from: this.props.location}
            }}
            />
        }
    }

    render() {
        return (
            <Route
                {...this.props.rest}
                render={this.renderComponent}
            />
        )
    }
};

export default PrivateRoute;