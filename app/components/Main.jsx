import React from 'react';
import './../assets/css/style.css';
import News from "./news/News";
import NewsBar from "./news/NewsBar";
import PublishNews from "./news/PublishNews";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this._submitNew = this._submitNew.bind(this);
    }

    _getNews() {
        this.props.getNews();
    }

    _submitNew(data) {
        this.props.submitNew(data);
    }

    render() {

        return (
            <div className="mainWrapper">
                {this.props.modules.news && <NewsBar/>}
                {this.props.modules.news && <News getNews={this._getNews} news={this.props.news}/>}
                {this.props.modules.publishNew && <NewsBar/>}
                {this.props.modules.publishNew && <PublishNews submitNew={this._submitNew} userId={this.props.userId}/>}
            </div>
        );

    }
}
