import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';
import { Spinner } from 'react-redux-spinner';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Header extends React.Component {
  render() {
    const { authInProcess, first_name: firstName, role } = this.props.userInfo;
    const { onLogOut } = this.props;
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
            {firstName ?
              <span>
                {role === 'teacher' ?
                  <Link className="button button--blue header__button" to="/tutores/home">{firstName}</Link>
                :
                  <Link className="button button--blue header__button" to="/perfil-estudiante">{firstName}</Link>
                }
                <button
                  className="button button--dark-green header__button"
                  onClick={onLogOut}
                >Cerrar sesión</button>
              </span>
            :
              <span>
                <Link className="button button--blue header__button" to="/ingresar">Ingresar</Link>
                <Link className="button button--dark-green header__button" to="/estudiantes/registrarse">Registrarse</Link>
              </span>
            }
          </div>
          : ''}
        <Alert stack={{limit: 3}} />
        <Spinner />
        {this.props.children}
      </nav>
    );
  }
}

Header.propTypes = {
  children: PropTypes.element,
  userInfo: PropTypes.shape(),
  onLogOut: PropTypes.func,
};

export default Header;
