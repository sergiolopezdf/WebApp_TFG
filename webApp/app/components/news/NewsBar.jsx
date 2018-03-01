import React from 'react';
import './../../assets/css/style.css';
import NewsBarItem from "./NewsBarItem";

export default class NewsBar extends React.Component {

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
