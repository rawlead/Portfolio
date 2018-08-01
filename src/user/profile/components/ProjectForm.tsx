import * as React from 'react';
import './ProjectForm.css';

class ProjectForm extends React.Component {
    render() {
        return (
            <div id="project-form-root">
                <div className="tab-container-header valign-wrapper">
                    <p>Max image size: 10mb | ...</p>
                </div>

                <div className="tab-container-body">


                    <div className="row">
                        <div className="col s12 m6">
                            <img src="http://via.placeholder.com/1000x500" className="responsive-img" alt=""/>
                        </div>

                        <div className="col s12 m6">
                            <div className="input-field">
                                <i className="material-icons prefix">mode_edit</i>
                                <input id="input1" type="text"/>
                                <label htmlFor="input1">Project title</label>
                            </div>
                            <br/>
                            <div className="input-field">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="textarea1" className="materialize-textarea"/>
                                <label htmlFor="textarea1">Project description</label>
                            </div>
                            <br/>
                            <div className="file-field input-field">
                                <div className="btn file-btn">
                                    <span><i className="material-icons">image</i></span>
                                    <input type="file" multiple={true}/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"
                                           placeholder="Upload one or more images"/>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <button className="btn black">submit</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProjectForm;