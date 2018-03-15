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
                <NavbarItem link={"Video"} title={"Video"}/>
                <NavbarItem link={"Management"} title={"Management"}/>
                {
                    this.props.myself.admin && <NavbarItem link={"Users"} title={"Users"}/>
                }

            </div>
        );

    }
}
