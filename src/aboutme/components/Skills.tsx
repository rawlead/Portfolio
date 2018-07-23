import * as React from 'react';
import * as M from "materialize-css";
import './Skills.css';

import skillsSectionImgBottom from '../../assets/night-edge.png'

class Skills extends React.Component {
    private scrollSpy: any;

    componentDidMount() {
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            <div>
                <div id="skills" className="section scrollspy"
                     ref={(scrollSpy) => {
                         this.scrollSpy = scrollSpy
                     }}>
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m11">
                                <h3>Skills</h3>
                                <table className="striped">
                                    <tbody>
                                    <tr data-aos="fade-right">
                                        <td>Programming languages:</td>
                                        <td>Java 8 / SQL</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Technologies:</td>
                                        <td>JavaScript / HTML5 / CSS3 / jQuery / Vue.js / Bootstrap / REST / ReactJS
                                        </td>
                                    </tr>
                                    <tr data-aos="fade-right">

                                        <td>Frameworks</td>
                                        <td>Spring Framework (MVC, Data, Security) / Hibernate ORM</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Databases:</td>
                                        <td>MySQL / PostgreSQL</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Version Control Systems:</td>
                                        <td>GIT</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Build tools:</td>
                                        <td>Gradle / Maven</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Cloud computing:</td>
                                        <td>Amazon AWS (EC2, EB, RDS, S3)</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Tools:</td>
                                        <td>IntelliJ IDEA / VSC / Microsoft Office (Word, Excel, PowerPoint)</td>
                                    </tr>
                                    <tr data-aos="fade-right">
                                        <td>Operating systems:</td>
                                        <td>macOS / Linux / Windows</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <img src={skillsSectionImgBottom} className="responsive-img night__edge--img" alt=""/>
            </div>
        )
    }
}

export default Skills;