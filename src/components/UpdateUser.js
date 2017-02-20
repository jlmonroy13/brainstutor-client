import React, { PropTypes } from 'react';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';

function validateForm(e) {
	if(e.email && e.firstName && e.lastName && e.university && e.dob && e.level && e.phone && e.about && e.country && e.city && e.gender && e.address) {
		return true;
	}
	return false;
}

class UpdateUser extends React.Component {
	constructor(props) {
		super(props);
		const { 
			first_name: firstName,
			last_name: lastName,
			email,
			profile: { university },
		} = this.props.userInfo;

		this.state = {
			email,
			firstName,
			lastName,
			university,
			dob: '',
			level: '',
			phone: '',
			about: '',
			country: '',
			city: '',
			gender: '',
			address: '',
			rate: '',
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmitForm(e) {
		e.preventDefault();
		if (validateForm(this.state)) {
			this.props.userUpdateProfile(this.state);
		} else {
			Alert.error(`Todos los campos deben ser completados`);
		}
	}

	render() {
		const { type, onLoading } = this.props;
		const text = `Actualizar datos ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<div className="section__auth-container section__auth-container--form">
					<form onSubmit={this.onSubmitForm} autoComplete="off">
						<h1 className="section__auth-title section__auth-title--form">Perfil</h1>
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
									<option value="Pascual Bravo">Pascual Bravo</option>
									<option value="ITM(Instituto Tecnológico Metropolitano)">ITM(Instituto Tecnológico Metropolitano)</option>
									<option value="Colegio Mayor de Antioquia">Colegio Mayor de Antioquia</option>
								</select>
							</div>
						: ''}
						<TextFieldGroup
							value={this.state.dob}
							onChange={this.onChangeForm}
							type="date"
							field="dob"
							label="Fecha de Nacimiento"
						/>
						<TextFieldGroup
							value={this.state.level}
							onChange={this.onChangeForm}
							type="text"
							field="level"
							label="Nivel (Profesor/Tutor)"
						/>
						<TextFieldGroup
							value={this.state.phone}
							onChange={this.onChangeForm}
							type="tel"
							field="phone"
							label="Celular"
						/>
						<TextFieldGroup
							value={this.state.country}
							onChange={this.onChangeForm}
							type="text"
							field="country"
							label="País"
						/>
						<TextFieldGroup
							value={this.state.city}
							onChange={this.onChangeForm}
							type="text"
							field="city"
							label="Ciudad"
						/>
						<div>
							<label className="main-form__label">Acerca de ti</label>
							<textarea
								className="main-form__input"
								value={this.state.about}
								onChange={this.onChangeForm}
								name="about"
							/>
						</div>
						<div>
							<label className="main-form__label">Genero</label>
							<select
								className="main-form__input"
								value={this.state.gender}
								onChange={this.onChangeForm}
								name="gender"
							>
								<option value="">Elige tu genero</option>
								<option value="Hombre">Hombre</option>
								<option value="Mujer">Mujer</option>
							</select>
						</div>
						<TextFieldGroup
							value={this.state.address}
							onChange={this.onChangeForm}
							type="text"
							field="address"
							label="Dirección"
						/>
						<TextFieldGroup
							value={this.state.rate}
							onChange={this.onChangeForm}
							type="text"
							field="rate"
							label="Rate"
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

UpdateUser.propTypes = {
	type: PropTypes.string,
	userInfo: PropTypes.shape,
	userUpdateProfile: PropTypes.func.isRequired,
	onLoading: PropTypes.bool,
};

export default UpdateUser;
