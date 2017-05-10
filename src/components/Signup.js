import React, { PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';
import universities from '../consts/universities';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		const { university } = this.props;
		this.state = {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			passwordConfirmation: '',
			university,
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.validateEmptyFields = this.validateEmptyFields.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	validateEmptyFields() {
		const { state } = this;
		return !!state.email && !!state.firstName && !!state.lastName && !!state.password && !!state.passwordConfirmation;
	}

	onSubmitForm(e) {
		e.preventDefault();
		if (this.state.password === this.state.passwordConfirmation && this.validateEmptyFields()) {
			this.props.userSignupRequest(this.state);
		} else  if (!this.validateEmptyFields()) {
			Alert.error(`Todos los campos deben ser completados.`);
		} else {
			Alert.error(`Las contraseñas no coinciden`);
		}
	}

	render() {
		const { type, onLoading } = this.props;
		const text = `Registro ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		const renderUOptions = (u) => {
			return <option value={u} key={u}>{u}</option>;
    };
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<div className="section__auth-container section__auth-container--form">
					<form onSubmit={this.onSubmitForm} autoComplete="off">
						<h1 className="section__auth-title section__auth-title--form">Registro</h1>
						<TextFieldGroup
							value={this.state.firstName}
							onChange={this.onChangeForm}
							type="text"
							field="firstName"
							label="Nombre"
						/>
						<TextFieldGroup
							value={this.state.lastName}
							onChange={this.onChangeForm}
							type="text"
							field="lastName"
							label="Apellido"
						/>
						<TextFieldGroup
							value={this.state.email}
							onChange={this.onChangeForm}
							type="email"
							field="email"
							label="Correo Electrónico"
						/>
						{type !== 'Estudiante' ?
							<div>
								<label className="main-form__label">Universidad</label>
								<select
									className="main-form__input"
									value={this.state.university}
									onChange={this.onChangeForm}
									name="university"
								>
									<option value="">Elige tu Universidad</option>
									{universities.map(renderUOptions)}
								</select>
							</div>
						: ''}
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

Signup.propTypes = {
	userSignupRequest: PropTypes.func.isRequired,
	type: PropTypes.string,
	university: PropTypes.string,
	onLoading: PropTypes.bool,
};

export default Signup;
