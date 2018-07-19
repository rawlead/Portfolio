import * as React from 'react';


import * as  M from "materialize-css";

interface ParallaxProps {
    parallaxContainerId: string,
    parallaxContainerStyle: string,
    parallaxImgStyle: string,
    parallaxImg: string
}

class Parallax extends React.Component<ParallaxProps> {
    private parallax: any;
    private scrollSpy: any;

    componentDidMount() {
        M.Parallax.init(this.parallax);
        M.ScrollSpy.init(this.scrollSpy);
    }

    render() {
        return (
            // Parallax container wrapper
            <div id={this.props.parallaxContainerId}
                 className={this.props.parallaxContainerStyle}
                 ref={(scrollSpy) => {
                     this.scrollSpy = scrollSpy
                 }}>

                {/*parallax image section*/}
                <div className={this.props.parallaxImgStyle}
                     ref={(parallax) => {
                         this.parallax = parallax
                     }}>

                    <img src={this.props.parallaxImg}
                         alt="Parallax"/>
                </div>

                {/* parallax title/content */}
                {this.props.children}
            </div>
        )
    }
}

export default Parallax;