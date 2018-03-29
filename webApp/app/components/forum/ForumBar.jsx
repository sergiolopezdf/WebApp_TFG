import React from 'react';
import ForumBarItem from "./ForumBarItem";

export default class ForumBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBar">
            <ForumBarItem icon="add" link="publish_new"/>
        </div>;

    }
}
