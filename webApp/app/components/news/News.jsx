import React from 'react';
import './../../assets/css/style.css';
import NewsItem from "./NewsItem";

export default class News extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.news === null) {
            return (
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
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