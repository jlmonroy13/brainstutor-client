import React, { PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';

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
		Alert.error('Test message 3');
		// this.props.userSignupRequest(this.state);
	}


	render() {
		return (
			<form onSubmit={this.onSubmitForm}>
				<h1>Registrate a nuestra plataforma</h1>
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
				<button>Registrarse</button>
			</form>
		);
	}
}

Signup.propTypes = {
	userSignupRequest: PropTypes.func.isRequired
};

export default Signup;