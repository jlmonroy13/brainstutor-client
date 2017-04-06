import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';
import { Spinner } from 'react-redux-spinner';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import 'react-s-alert/dist/s-alert-default.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class Header extends React.Component {
	render() {
		const { authInProcess, first_name: firstName, role, activated, status } = this.props.userInfo;
		const { onLogOut } = this.props;
		const imageClass = authInProcess ? 'header__logo--center' : '';
		const headerClass = authInProcess ? 'header--center' : '';
		const logOutFn = info => {
			if (info.key === "3") onLogOut();
		};
		const studentMenu = (
			<Menu className="dropdown-header__menu" onClick={logOutFn} >
				<MenuItem key="1"><Link to="/perfil-estudiante">Perfil</Link></MenuItem>
				<MenuItem key="2">Facturas</MenuItem>
				<MenuItem key="3">Salir</MenuItem>
			</Menu>
		);
		const teacherMenu = (
			<Menu className="dropdown-header__menu" onClick={logOutFn} >
				<MenuItem key="1"><Link to="/tutores/perfil">Perfil</Link></MenuItem>
				<MenuItem key="2">Cuenta Bancaria</MenuItem>
				<MenuItem key="3">Salir</MenuItem>
			</Menu>
		);

		function renderSubMenu() {
			switch(role) {
				case 'student':
					return (
						<span>
							<Link className="button button--link-upper button--link-gray" to="/estudiantes/inicio">Inicio</Link>
							<Link className="button button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Mensajes</Link>
							<Link className="button button--link-upper button--link-gray" to="/estudiantes/tutorias-agendadas">Tutorias agendadas</Link>
						</span>
					);
				case 'teacher':
					return (
						<span>
							{ status === 'complete' ?
								<Link className="button button--link-upper button--link-gray" to="/tutores/inicio">Inicio</Link>
							:
								<Link className="button button--link-upper button--link-gray" to="/tutores/home">Inicio</Link>
							}
							<Link className="button button--link-upper button--link-gray" to="/">Mensajes</Link>
							<Link className="button button--link-upper button--link-gray" to="/tutores/tutorias-agendadas">Tutorias agendadas</Link>
							<Link className="button button--link-upper button--link-gray" to="/">Mis reportes</Link>
						</span>
					);
				default:
					return (
						<span>
							<Link className="button button--link-upper button--link-gray" to="/precios">Precios</Link>
							<Link className="button button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
							<Link className="button button--link-upper button--link-gray" to="/como-funciona">¿Cómo funciona?</Link>
							<Link className="button button--link-upper button--link-gray" to="/como-ser-tutor">¿Cómo ser Tutor?</Link>
						</span>
					);
			}
		}

		return (
			<nav className={`header ${headerClass}`}>
				<IndexLink to="/" className={`main-logo header__logo ${imageClass}`} />
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
											overlay={teacherMenu}
											animation="slide-up"
											overlayClassName="dropdown-header"
										>
											<button className="button button--blue header__button header__button--alone">{firstName}</button>
										</Dropdown>
									</span>
								: role === 'teacher' && !activated ?
									<span>
										<Link className="button button--blue header__button" to="/ingresar">Ingresar</Link>
										<Link
											className="button button--dark-green header__button"
											to="/estudiantes/registrarse"
										>Registrarse</Link>
									</span>
								:
									<span>
										<Dropdown
											trigger={['click']}
											overlay={studentMenu}
											animation="slide-up"
											overlayClassName="dropdown-header"
										>
											<button className="button button--blue header__button header__button--alone">{firstName}</button>
										</Dropdown>
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
