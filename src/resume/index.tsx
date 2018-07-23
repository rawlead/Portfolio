import * as React from 'react';
import './Resume.css'

class Resume extends React.Component {


    render() {

        return (
            <div id="resume-root">
                {/*<h1>RESUME</h1>*/}

                <iframe src="https://standardresume.co/ivanshyrai" frameBorder={0}/>
            </div>
        )
    }


}

export default Resume;