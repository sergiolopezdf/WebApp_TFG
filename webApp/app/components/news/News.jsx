import React from 'react';
import NewsItem from "./NewsItem";

export default class News extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.news) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
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
