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
		this.onChangeHours = this.onChangeHours.bind(this);
	}

	onChangeForm(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onChangeSubjects(data) {
		const subjects = data.map(subject => subject.value);
		this.setState({subjects});
	}

	onChangeHours(e) {
		console.warn(e.target.id);
		console.warn(e.target.checked);
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
				<form onSubmit={this.onSubmitForm} autoComplete="off">
					<div className="section__auth-container section__auth-container--form section__auth-container--large section__auth-container--with-tab">
						<span className="section__tab">Perfil del Tutor</span>
						<div className="grid">
							<div className="grid__item one-fifth">
								<div className="gravatar-section">
									<Gravatar email={this.state.email} size={120} className="profile__main-image" />
									<div className="gravatar-section__description">
										<a href="http://gravatar.com" target="_blank">Cambiar Imagen</a>
									</div>
								</div>
							</div>
							<div className="grid__item four-fifths">
								<div className="grid">
									<div className="grid__item one-half">
										<TextFieldGroup
											value={this.state.firstName}
											onChange={this.onChangeForm}
											type="text"
											field="firstName"
											label="Nombre"
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
									</div>
									<div className="grid__item one-half">
										<TextFieldGroup
											value={this.state.lastName}
											onChange={this.onChangeForm}
											type="text"
											field="lastName"
											label="Apellido"
										/>
										<TextFieldGroup
											value={this.state.dob}
											onChange={this.onChangeForm}
											type="date"
											field="dob"
											label="Fecha de Nacimiento"
										/>
									</div>
									<div className="grid__item one-whole">
										<TextFieldGroup
											value={this.state.email}
											onChange={this.onChangeForm}
											type="email"
											field="email"
											label="Correo Electrónico"
										/>
									</div>
								</div>
							</div>
						</div>	
					</div>		
					<div className="section__auth-container section__auth-container--form section__auth-container--large">
						<div className="grid">		
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
							</div>
							<div className="grid__item one-half">
								<TextFieldGroup
									value={this.state.phone}
									onChange={this.onChangeForm}
									type="tel"
									field="phone"
									label="Celular"
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
							<TextFieldGroup
								value={this.state.address}
								onChange={this.onChangeForm}
								type="text"
								field="address"
								label="Dirección"
							/>
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
					</div>
					<div className="section__auth-container section__auth-container--form section__auth-container--large section__auth-container--with-tab">
						<span className="section__tab section__tab--blue">Disponibilidad Horaria</span>
						<div>
							<span className="schedule-day">Lunes</span>
							<span className="schedule-day">Martes</span>
							<span className="schedule-day">Miercoles</span>
							<span className="schedule-day">Jueves</span>
							<span className="schedule-day">Viernes</span>
							<span className="schedule-day">Sábado</span>
							<span className="schedule-day">Domingo</span>
						</div>
						<div className="schedule-line">
							<div className="schedule-circle">
								<div className="schedule-circle__container">
									<p className="schedule-circle__text">Mañana</p> 
									<p className="schedule-circle__text">8:00am</p> 
									<p className="schedule-circle__text">12:00m</p>
								</div>
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-monday" />
								<label htmlFor="morning-monday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-tuesday" />
								<label htmlFor="morning-tuesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-wednesday" />
								<label htmlFor="morning-wednesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-thursday" />
								<label htmlFor="morning-thursday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-friday" />
								<label htmlFor="morning-friday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-saturday" />
								<label htmlFor="morning-saturday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="morning-sunday" />
								<label htmlFor="morning-sunday" className="schedule-checkbox__label" />
							</div>
						</div>
						<div className="schedule-line">
							<div className="schedule-circle">
								<div className="schedule-circle__container">
									<p className="schedule-circle__text">Tarde</p> 
									<p className="schedule-circle__text">2:00pm</p> 
									<p className="schedule-circle__text">6:00pm</p>
								</div>
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-monday" />
								<label htmlFor="afternoon-monday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-tuesday" />
								<label htmlFor="afternoon-tuesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-wednesday" />
								<label htmlFor="afternoon-wednesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-thursday" />
								<label htmlFor="afternoon-thursday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-friday" />
								<label htmlFor="afternoon-friday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-saturday" />
								<label htmlFor="afternoon-saturday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="afternoon-sunday" />
								<label htmlFor="afternoon-sunday" className="schedule-checkbox__label" />
							</div>
						</div>
						<div className="schedule-line">
							<div className="schedule-circle">
								<div className="schedule-circle__container">
									<p className="schedule-circle__text">Noche</p> 
									<p className="schedule-circle__text">6:00pm</p> 
									<p className="schedule-circle__text">10:00pm</p>
								</div>
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-monday" />
								<label htmlFor="night-monday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-tuesday" />
								<label htmlFor="night-tuesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-wednesday" />
								<label htmlFor="night-wednesday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-thursday" />
								<label htmlFor="night-thursday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-friday" />
								<label htmlFor="night-friday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-saturday" />
								<label htmlFor="night-saturday" className="schedule-checkbox__label" />
							</div>
							<div className="schedule-checkbox__group">
								<input type="checkbox" onChange={this.onChangeHours} id="night-sunday" />
								<label htmlFor="night-sunday" className="schedule-checkbox__label" />
							</div>
						</div>
					</div>
					<div className="section__auth-container section__auth-container--form section__auth-container--large">
						<button
							className={`button button--large button--block button--${colorClass} push-half--top push--bottom`}
							disabled={onLoading}
						>{text}</button>
					</div>
				</form>
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
