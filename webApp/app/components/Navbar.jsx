import React from 'react';
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav>
                <NavbarItem link={"Forum"} title={"Forum"}/>
                <NavbarItem link={"Video"} title={"Video"}/>
                <NavbarItem link={"Settings"} title={"Settings"}/>
                {/*{
                    this.props.myself.admin && <NavbarItem link={"Users"} title={"Users"}/>
                }*/}

            </nav>
        );

    }
}
