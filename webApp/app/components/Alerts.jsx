import React from 'react';
import './../assets/css/style.css';

export default class Alerts extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {


        console.log("Alert")

        if (this.props.alertMessages) {
            return (
                <div id={"alert"}>{this.props.alertMessages}</div>

            );
            this.props.removeAlerts();
        }

    }
}