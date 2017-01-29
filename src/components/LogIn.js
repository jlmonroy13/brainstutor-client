import React, {PropTypes} from 'react';
import TextFieldGroup from './TextFieldGroup';

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
		this.props.userLogInRequest(this.state);
	}


	render() {
		return (
			<form onSubmit={this.onSubmitForm}>
				<h1>¡Ingresa Ya!</h1>
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
				<button>Ingresar</button>
			</form>
		);
	}
}

LogIn.propTypes = {
	userLogInRequest: PropTypes.func.isRequired
};

export default LogIn;