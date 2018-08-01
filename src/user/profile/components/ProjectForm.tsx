import * as React from 'react';
import './ProjectForm.css';
import {uploadSingleFile} from "../../../util/APIUtils";
import * as M from "materialize-css";


interface ProjectFormState {
    file: any,
    filePreview: any,
    uploadFileResponse: any
}

class ProjectForm extends React.Component<any, ProjectFormState> {
    constructor(props: any) {
        super(props);
        this.state = {file: undefined, filePreview: undefined, uploadFileResponse: {}};
        this.handleSingleFileUpload = this.handleSingleFileUpload.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleSingleFileUpload(events: any) {
        events.preventDefault();


        const formData = new FormData();
        formData.append("file", this.state.file);

        uploadSingleFile(formData)
            .then(response => {
                this.setState({uploadFileResponse: response})
                M.toast({html: 'Photo has been uploaded'});
            }).catch(error => {
            M.toast({html: 'Error while uploading photo'}
            );

        })
    }

    handleFileChange(event: any) {
        // const target = event.target;
        const file = event.target.files[0];

        this.setState({file, filePreview: URL.createObjectURL(file)})
    }

    render() {
        return (
            <div id="project-form-root">
                <div className="tab-container-header valign-wrapper">
                    <p>Max image size: 10mb | ...</p>
                </div>

                <div className="tab-container-body">


                    <div className="row">
                        <div className="col s12 m6">
                            <img src={this.state.filePreview} className="responsive-img" alt=""/>
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


                            <form id="projectUploadForm" onSubmit={this.handleSingleFileUpload}
                                  encType="multipart/form-data" name="projectUploadForm">
                                <div className="file-field input-field">
                                    <div className="btn file-btn">
                                        <span><i className="material-icons">image</i></span>
                                        <input type="file"
                                               required={true}
                                               onChange={this.handleFileChange}
                                        />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text"
                                               placeholder="Upload one or more images"/>
                                    </div>
                                </div>

                                <button className="btn black" type="submit">submit</button>
                            </form>

                            <div className="upload-response">
                                <div id="projectUploadError"/>
                                <div id="projectUploadSuccess"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ProjectForm;