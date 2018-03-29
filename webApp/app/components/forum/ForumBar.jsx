import React from 'react';
import NewsBarItem from "./ForumBarItem";

export default class ForumBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div id="newsBar">

            <div id="newsBarOptions">
                <NewsBarItem title="Show" link="news"/>
                <NewsBarItem title="Write new" link="publish_new"/>
            </div>
        </div>;

    }
}
