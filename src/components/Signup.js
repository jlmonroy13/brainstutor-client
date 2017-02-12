import React, { PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			passwordConfirmation: '',
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitForm(e) {
		e.preventDefault();
		this.props.userSignupRequest(this.state);
	}


	render() {
		const { type } = this.props;
		const text = `Registro ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<div className="section__auth-container section__auth-container--form">
					<form onSubmit={this.onSubmitForm} autoComplete="off">
						<h1 className="section__auth-title section__auth-title--form">Registro</h1>
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
						<TextFieldGroup
							value={this.state.passwordConfirmation}
							onChange={this.onChangeForm}
							type="password"
							field="passwordConfirmation"
							label="Confirmar Contraseña"
						/>
						<button className={`button button--large button--block button--${colorClass} push-half--top push--bottom`}>{text}</button>
					</form>
				</div>
			</div>
		);
	}
}

Signup.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	type: PropTypes.string,
};

export default Signup;
