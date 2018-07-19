import * as React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from '../containers/Home';
import Projects from '../containers/Projects';
import AboutMe from '../containers/AboutMe';


class App extends React.Component {
    render() {
        return (
            <Router>
                {/*<Navbar/>*/}
                <div>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/projects" component={Projects}/>
                    <Route path='/aboutMe' component={AboutMe}/>
                </div>
                {/*<FloatingdActionButton/>*/}
            </Router>
        );
    }
}

export default App;
