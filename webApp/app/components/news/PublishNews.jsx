import React from 'react';
import $ from 'jquery';

export default class PublishNews extends React.Component {

    constructor(props) {
        super(props);
        this._submitNew = this._submitNew.bind(this);
    }

    _submitNew() {

        let data = {
            authorId: parseInt(this.props.userId),
            title: $('input#title').val(),
            content: $('textarea#content').val(),
        };

        this.props.submitNew(data);
    }

    render() {
        return (
            <div className="bodyWrapper">
                <span className="newTitle">Title: </span>
                <input name={"Name"} type={"text"} id={"title"}/>
                <span className="newTitle">Content: </span>
                <textarea name={"Content"} id={"content"}/>
                <button id="newButton" action="submit" onClick={this._submitNew}>Submit</button>
            </div>

        );
    }

}
