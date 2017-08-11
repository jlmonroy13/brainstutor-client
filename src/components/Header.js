import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Alert from 'react-s-alert';
import { Spinner } from 'react-redux-spinner';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

import 'react-s-alert/dist/s-alert-default.css';

class Header extends React.Component {
	constructor(props) {
		super(props);

		this.onOpenMobileMenu = this.onOpenMobileMenu.bind(this);
	}

	componentDidMount() {
		const { onShowMenu } = this.props;
		if(window.innerWidth > 1180) onShowMenu(true);
	}

	onOpenMobileMenu() {
		const { showMenu, onShowMenu } = this.props;
		onShowMenu(!showMenu);

		const preventDef = () => {
			return false;
		};

		const deletePreventDef = () => {
			return true;
		};

		if(!showMenu) {
			document.body.classList.add('navbar__body');
			document.addEventListener('touchmove', preventDef);
		} else {
			document.body.classList.remove('navbar__body');
			document.removeEventListener('touchmove', deletePreventDef);
		}
	}

	render() {
		const { authInProcess, first_name: firstName, role, activated, status } = this.props.userInfo;
		const { onLogOut, showMenu } = this.props;
		const imageClass = authInProcess ? 'header__logo--center' : '';
		const headerClass = authInProcess ? 'header--center' : '';
		const logOutFn = info => {
			if (info.key === "4") onLogOut();
		};
		const studentMenu = (
			<Menu className="dropdown-header__menu" onClick={logOutFn} >
			<MenuItem key="1"><Link className="dropdown-header__link" to="/perfil-estudiante">Perfil</Link></MenuItem>
			<MenuItem key="2">Facturas</MenuItem>
			<MenuItem key="3"><Link className="dropdown-header__link" to="/codigo-promocional">Código promo</Link></MenuItem>
			<MenuItem key="4">Salir</MenuItem>
			</Menu>
			);
		const teacherMenu = (
			<Menu className="dropdown-header__menu" onClick={logOutFn} >
			<MenuItem key="1"><Link className="dropdown-header__link" to="/tutores/perfil">Perfil</Link></MenuItem>
			<MenuItem key="2"><Link className="dropdown-header__link" to="/tutores/informacion-bancaria">Cuenta Bancaria</Link></MenuItem>
			<MenuItem key="4">Salir</MenuItem>
			</Menu>
			);

		function renderSubMenu() {
			switch(role) {
				case 'student':
				return (
					<span>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/estudiantes/inicio">Inicio</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/mensajes">Mensajes</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/estudiantes/tutorias-agendadas">Tutorias agendadas</Link>
					</span>
					);
				case 'teacher':
				return (
					<span>
					{ status === 'complete' ?
					<Link className="button navbar__item button--link-upper button--link-gray" to="/tutores/inicio">Inicio</Link>
					:
					<Link className="button navbar__item button--link-upper button--link-gray" to="/tutores/home">Inicio</Link>
				}
				<Link className="button navbar__item button--link-upper button--link-gray" to="/mensajes">Mensajes</Link>
				<Link className="button navbar__item button--link-upper button--link-gray" to="/tutores/tutorias-agendadas">Tutorias agendadas</Link>
				<Link className="button navbar__item button--link-upper button--link-gray" to="/">Mis reportes</Link>
				</span>
				);
				default:
				return (
					<span>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/precios">Precios</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/ver-tutores">Ver tutores</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/como-funciona">¿Cómo funciona?</Link>
					<Link className="button navbar__item button--link-upper button--link-gray" to="/como-ser-tutor">¿Cómo ser Tutor?</Link>
					</span>
					);
			}
		}

		return (
			<nav className={`header ${headerClass}`}>
			<IndexLink to="/" className={`main-logo header__logo ${imageClass}`} />
			{authInProcess && firstName ? 
				<button className="button button--blue header__button header__button--alone button--abs-right" onClick={onLogOut}>Salir</button>
				: null}
				{!authInProcess && showMenu ?
					<div className="navbar navbar--right">
					<div className="navbar__menu">
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
						<button className="button navbar__item navbar__item--main button--blue header__button header__button--alone">{firstName}</button>
						</Dropdown>
						</span>
						: role === 'teacher' && !activated ?
						<span>
						<Link className="button navbar__item navbar__item--main button--blue header__button" to="/ingresar">Ingresar</Link>
						<Link
						className="button navbar__item navbar__item--main button--dark-green header__button"
						to="/registro"
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
						<button className="button navbar__item navbar__item--main button--blue header__button header__button--alone">{firstName}</button>
						</Dropdown>
						</span>
					}
					</span>
					:
					<span>
					<Link className="button navbar__item navbar__item--main button--blue header__button" to="/ingresar">Ingresar</Link>
					<Link className="button navbar__item navbar__item--main button--dark-green header__button" to="/registro">Registrarse</Link>
					</span>
				}
				</div>
				: ''}
				<Alert stack={{limit: 3}} />
				<Spinner />
				{this.props.children}
				{!authInProcess ?
					<span
					className={`navbar__hamburger ${showMenu ? 'open' : ''}`}
					onClick={this.onOpenMobileMenu}
					>
						<span />
						<span />
						<span />
						<span />
					</span>
				: null}
			</nav>
		);
	}
}

Header.propTypes = {
	children: PropTypes.element,
	userInfo: PropTypes.shape(),
	onLogOut: PropTypes.func,
	onShowMenu: PropTypes.func,
	showMenu: PropTypes.bool,
};

export default Header;
