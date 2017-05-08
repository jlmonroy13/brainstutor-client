import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';
import { MultiSelect } from 'react-selectize';
import subjectsLocal from '../consts/subjects';

function validateForm(e) {
	if(e.email && e.firstName && e.lastName && e.university && e.dob && e.level && e.phone && e.about && e.country && e.city && e.gender && e.address &&e.subjects.length>0) {
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
			profile: { university, dob, level, phone, about, country, city, gender, address, rate },
			subjects,
		} = this.props.userInfo;

		this.state = {
			email,
			firstName,
			lastName,
			university,
			dob,
			level,
			phone,
			about,
			country,
			city,
			gender,
			address,
			rate,
			subjects,
		};

		this.onChangeForm = this.onChangeForm.bind(this);
		this.onSubmitForm = this.onSubmitForm.bind(this);
		this.onChangeSubjects = this.onChangeSubjects.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeSubjects(data) {
		const subjects = data.map(subject => subject.value);
		this.setState({subjects});
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
		const { subjects: subjectsState } = this.state;
		const subjects = subjectsState.map(subject => ({value: subject, label: subject}));
		const text = `Actualizar datos ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<div className="section__auth-container section__auth-container--form section__auth-container--large">
					<form onSubmit={this.onSubmitForm} autoComplete="off">
						<h1 className="section__auth-title section__auth-title--form">Perfil</h1>
						<div className="grid">
							<div className="grid__item one-half">
								<div className="gravatar-section">
									<Gravatar email={this.state.email} size={120} className="profile__main-image" />
									<div className="gravatar-section__description">
										<p className="hola">Imagen cargada por Gravatar.</p>
										<a href="http://gravatar.com" target="_blank" className="gravatar-section__button">Cambiar</a>
									</div>
								</div>
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
									value={this.state.dob}
									onChange={this.onChangeForm}
									type="date"
									field="dob"
									label="Fecha de Nacimiento"
								/>
							</div>
							<div className="grid__item one-half">
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
								<TextFieldGroup
									value={this.state.address}
									onChange={this.onChangeForm}
									type="text"
									field="address"
									label="Dirección"
								/>
								<div>
									<label className="main-form__label">Nivel (Profesor/Monitor)</label>
									<select
										className="main-form__input"
										value={this.state.level}
										onChange={this.onChangeForm}
										name="level"
									>
										<option value="">Seleccina tu nivel</option>
										<option value="Profesor">Profesor</option>
										<option value="Monitor">Monitor</option>
									</select>
								</div>
								<div>
									<label className="main-form__label">Valor hora tutoria</label>
									{this.state.level === 'Profesor' ?
										<select
											className="main-form__input"
											value={this.state.rate}
											onChange={this.onChangeForm}
											name="rate"
										>
											<option value="">Selecciona un valor</option>
											<option value="45000">$45.000</option>
											<option value="50000">$50.000</option>
											<option value="55000">$55.000</option>
										</select>
									:
										<select
											className="main-form__input"
											value={this.state.rate}
											onChange={this.onChangeForm}
											name="rate"
										>
											<option value="">Selecciona un valor</option>
											<option value="35000">$35.000</option>
											<option value="40000">$40.000</option>
										</select>
									}
								</div>
							</div>
						</div>
						<div className="push-half--bottom">
							<span className="main-form__label">Asignaturas</span>
							{type !== 'Estudiante' ?
								<MultiSelect
									options={subjectsLocal.map(subject=>({label: subject, value: subject}))}
									value={subjects}
									placeholder="Selecciona tus asignaturas"
									onValuesChange={this.onChangeSubjects}
								/>
							: null}
							<label className="main-form__label">Acerca de ti</label>
							<textarea
								className="main-form__textarea"
								value={this.state.about}
								onChange={this.onChangeForm}
								name="about"
							/>
						</div>
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
	userInfo: PropTypes.object,
	userUpdateProfile: PropTypes.func.isRequired,
	onLoading: PropTypes.bool,
};

export default UpdateUser;
