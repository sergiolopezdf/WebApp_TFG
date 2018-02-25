import React from 'react';
import './../assets/css/style.css';
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id="navBar">
                <NavbarItem link={"News"} title={"News"}/>
                <NavbarItem link={"publish_new"} title={"Publish new"}/>
            </div>
        );

    }
}
