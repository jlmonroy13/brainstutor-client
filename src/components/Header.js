import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Header extends React.Component {
  render() {
    const { authInProcess } = this.props;
    const imageClass = authInProcess ? 'header__logo--center' : '';
    const headerClass = authInProcess ? 'header--center' : '';
    return (
      <nav className={`header ${headerClass}`}>
        <IndexLink to="/">
          <img
            className={`main-logo header__logo ${imageClass}`}
            src={require('../assets/images/logo-brains.png')}
          />
        </IndexLink>
        {!authInProcess ?
          <div className="navbar navbar--right">
            <div className="inline-block push--right soft--right">
              <Link className="button button--link-upper button--link-gray" to="/">Materias</Link>
              <Link className="button button--link-upper button--link-gray" to="/">Contacto</Link>
              <Link className="button button--link-upper button--link-gray" to="/como-ser-tutor">¿Cómo ser Tutor?</Link>
            </div>
            <Link className="button button--dark-green header__button" to="/registro-estudiantes">Registrarse</Link>
            <Link className="button button--blue header__button" to="/ingresar">Ingresar</Link>
          </div>
          : ''}
        <Alert stack={{limit: 3}} />
        {this.props.children}
      </nav>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
  authInProcess: PropTypes.bool,
};

export default Header;
