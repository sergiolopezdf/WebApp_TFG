import React from 'react';
import './../assets/css/style.css';
import {connect} from 'react-redux';


class App extends React.Component {
  render() {
    return (
      <h2 id="heading">Hello ReactJSsdfsdfsdsdsdfsdf</h2>
    );
  }

}


function mapStateToProps(state) {
    return {
        initialState: state.initialState,
    };
}

export default connect(mapStateToProps)(App);
