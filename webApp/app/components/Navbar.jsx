import React from 'react';
import NavbarItem from "./NavbarItem";

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav>
                <ul>
                    <NavbarItem link={"Forum"} title={"Forum"} iconName={"forum"}/>
                    <NavbarItem link={"Video"} title={"Video"} iconName={"video_library"}/>
                    <NavbarItem link={"Settings"} title={"Settings"} iconName={"settings"}/>
                </ul>
            </nav>
        );

    }
}
