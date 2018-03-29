import React from 'react';
import {Link} from 'react-router-dom';

export default class ForumBarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <Link to={this.props.link}><i class="forumNavElement material-icons">{this.props.icon}</i></Link>;

    }
}
