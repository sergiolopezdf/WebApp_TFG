import React from 'react';

export default class Alerts extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.alertMessages) {
            return (
                <div className={"alert"}>{this.props.alertMessages}</div>

            );

        }

    }
}
