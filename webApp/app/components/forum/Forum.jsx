import React from 'react';
import NewsItem from "./ForumItem";

let querystring = require('querystring');

export default class Forum extends React.Component {

    constructor(props) {
        super(props);

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        let params = {
            access_token: this.props.myself.token,
        };

        let token = querystring.stringify(params);

        let news = await fetch("http://" + this.props.forumServer.url + ':' + this.props.forumServer.port + '/api/getposts?' + token);

        let parsedNews = await news.json();

        this.props.setNews(parsedNews);

    }

    render() {

        if (!this.props.news) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            );
        }

        let news = this.props.news;

        return (
            <div className="bodyWrapper">
                {
                    news.map((element, key) => {
                        return (
                            <NewsItem new={element} key={key}/>
                        );
                    })
                }

            </div>
        );

    }
}
