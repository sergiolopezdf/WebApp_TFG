import React from 'react';
import './../assets/css/style.css';
import Header from "./Header";
import News from "./news/News";
import NewsBar from "./news/NewsBar";

export default class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    _getNews() {
        this.props.getNews()
    }


    render() {

        return (
            <div className="mainWrapper">


                {
                    this.props.modules.news && <NewsBar/>
                }

                {
                    this.props.modules.news && <News getNews={this._getNews} news={this.props.news}/>

                }
            </div>
        );

    }
}
