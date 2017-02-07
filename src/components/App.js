import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <nav>
        <IndexLink to="/">
          <img className="main-logo" src={require('../assets/images/logo-brains.png')} />
        </IndexLink>
        {' | '}
        <Link to="/ingresar">Ingresar</Link>
        {' | '}
        <Link to="/registro-estudiantes">Registro Esudiantes</Link>
        {' | '}
        <Link to="/registro-profesores">Registro Profesores</Link>
        <br/>
        <Alert stack={{limit: 3}} />
        {this.props.children}
      </nav>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
