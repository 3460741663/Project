import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
import Header from './components/Header';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

class App extends Component {
  render() {
    const props = this.props
    return (
      <div>
        {
          renderRoutes(props.route.routes)
        }
      </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}
export default connect(mapStateToProps,null)(App);
