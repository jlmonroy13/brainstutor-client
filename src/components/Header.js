import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';
import { Spinner } from 'react-redux-spinner';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Header extends React.Component {
  render() {
    const { authInProcess, first_name: firstName, role, activated } = this.props.userInfo;
    const { onLogOut } = this.props;
    const imageClass = authInProcess ? 'header__logo--center' : '';
    const headerClass = authInProcess ? 'header--center' : '';
    const menu = (
      <Menu>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem key="1">one</MenuItem>
        <Divider />
        <MenuItem key="2">two</MenuItem>
      </Menu>
    );

    function renderSubMenu() {
			switch(role) {
				case 'student':
					return (
						<span>
							<Link className="button button--link-upper button--link-gray" to="/">Inicio</Link>
							<Link className="button button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Mensajes</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Tutorias agendadas</Link>
						</span>
					);
				case 'teacher':
					return (
						<span>
							<Link className="button button--link-upper button--link-gray" to="/">Inicio</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Mensajes</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Tutorias agendadas</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Mis reportes</Link>
						</span>
					);
				default:
					return (
						<span>
							<Link className="button button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
							<Link className="button button--link-upper button--link-gray" to="/como-funciona">¿Cómo funciona?</Link>
							<Link className="button button--link-upper button--link-gray" to="/como-ser-tutor">¿Cómo ser Tutor?</Link>
						</span>
					);
			}
    }

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
              {renderSubMenu()}
            </div>
            {firstName ?
              <span>
                {role === 'teacher' && activated ?
                  <span>
                    <Dropdown
                      trigger={['click']}
                      overlay={menu}
                      animation="slide-up"
                    >
											<button className="button button--blue header__button">{firstName}</button>
                    </Dropdown>
                    <button
                      className="button button--dark-green header__button"
                      onClick={onLogOut}
                    >Cerrar sesión</button>
                  </span>  
                : role === 'teacher' && !activated ?
                  <span>
                    <Link className="button button--blue header__button" to="/ingresar">Ingresar</Link>
                    <button
                      className="button button--dark-green header__button"
                      to="/estudiantes/registrarse"
                    >Registrarse</button>
                  </span>
                :
                  <span>
                    <Dropdown
                      trigger={['click']}
                      overlay={menu}
                      animation="slide-up"
                    >
                      <button className="button button--blue header__button">{firstName}</button>
                    </Dropdown>
                    <button
                      className="button button--dark-green header__button"
                      onClick={onLogOut}
                    >Cerrar sesión</button>
                  </span>
                }
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
