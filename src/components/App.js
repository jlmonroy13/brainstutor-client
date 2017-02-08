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
      <nav className="header">
        <IndexLink to="/">
          <img className="main-logo header__logo" src={require('../assets/images/logo-brains.png')} />
        </IndexLink>
        <div className="navbar navbar--right">
          <div className="inline-block push--right soft--right">
            <Link className="button button--link-upper button--link-gray" to="/">Materias</Link>
            <Link className="button button--link-upper button--link-gray" to="/">Contacto</Link>
            <Link className="button button--link-upper button--link-gray" to="/">Tutores</Link>
          </div>
          <Link className="button button--dark-green header__button" to="/ingresar">Ingresar</Link>
          <Link className="button button--blue header__button" to="/ingresar">Registrarse</Link>
        </div>
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
