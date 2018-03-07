import React from 'react';
import './../../assets/css/style.css';

export default class NewsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div className="new">


                <span className="newTitle">{this.props.new.title}</span>

                <div className="newAuthorWrapper"><span className="newAuthor">Author: </span>{this.props.new.authorId}
                </div>
                <p>{this.props.new.content}</p>

            </div>

        );

    }
}
