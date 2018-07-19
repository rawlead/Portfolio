import * as React from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from '../containers/Home';
import Projects from '../containers/Projects';
import AboutMe from '../containers/AboutMe';

import Navbar from '../components/Navbar';
import FloatingActionButton from '../components/FloatingActionButton';


class App extends React.Component {
    componentDidMount() {
        // document.addEventListener('DOMContentLoaded', () => {
        //     const elems = document.querySelectorAll('.parallax');
        //     M.Parallax.init(elems);
        // });

    }

    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact={true} path="/" component={Home}/>
                    <Route path="/projects" component={Projects}/>
                    <Route path='/aboutMe' component={AboutMe}/>
                    <FloatingActionButton/>
                </div>
            </Router>
        );
    }
}

export default App;
