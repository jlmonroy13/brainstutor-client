import React, { PropTypes } from 'react';
import HeaderContainer from '../containers/Header';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <HeaderContainer children={this.props.children} />
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
