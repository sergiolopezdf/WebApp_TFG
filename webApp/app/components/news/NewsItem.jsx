import React from 'react';

export default class NewsItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (

            <div className="new">


                <h1>{this.props.new.title}</h1>

                <div className="smallTextAuthorWrapper"><span
                    className="smallTextAuthor">Author: </span>{this.props.new.user.username}
                </div>
                <p>{this.props.new.content}</p>

            </div>

        );

    }
}
