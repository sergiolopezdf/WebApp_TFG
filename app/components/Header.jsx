import React from 'react';
import './../assets/css/style.css';
import Title from "./Title";
import Navbar from "./Navbar";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="headerWrapper">
                <Title/>
                <Navbar myself={this.props.myself}/>
            </div>
        );

    }
}
