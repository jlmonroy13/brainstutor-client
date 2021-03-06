import React, {PropTypes} from 'react';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';

class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitForm(e) {
		e.preventDefault();
		const { email, password } = this.state;
		if (email && password) {
			this.props.userLogInRequest(this.state);
		} else {
			Alert.error(`Debes llenar todos los campos`);
		}
	}


	render() {
		const { type, onLoading } = this.props;
		const text = `Ingreso ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<div className="section__auth-container section__auth-container--form">
					<form onSubmit={this.onSubmitForm}>
						<h1 className="section__auth-title section__auth-title--form">Ingresar</h1>
						<TextFieldGroup
							value={this.state.email}
							onChange={this.onChangeForm}
							type="email"
							field="email"
							label="Correo Electrónico"
						/>
						<TextFieldGroup
							value={this.state.password}
							onChange={this.onChangeForm}
							type="password"
							field="password"
							label="Contraseña"
						/>
						<button
							className={`button button--large button--block button--${colorClass} push-half--top push--bottom`}
							disabled={onLoading}
						>{text}</button>
					</form>
				</div>
			</div>
		);
	}
}

LogIn.propTypes = {
	userLogInRequest: PropTypes.func.isRequired,
	type: PropTypes.string,
	onLoading: PropTypes.bool,
};

export default LogIn;
