import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';
import { MultiSelect } from 'react-selectize';
import { uniq, sort } from 'ramda';
import subjectsLocal from '../consts/subjects';
import universities from '../consts/universities';

function validateForm(e) {
	if(e.email && e.firstName && e.lastName && e.university && e.dob && e.level && e.phone && e.about && e.country && e.city && e.gender && e.subjects.length>0) {
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
			availability: { morning, afternoon, evening, night },
		} = this.props.userInfo;
		let morningAvailability = [false,false,false,false,false,false,false];
		let	afternoonAvailability = [false,false,false,false,false,false,false];
		let	eveningAvailability = [false,false,false,false,false,false,false];
		let	nightAvailability = [false,false,false,false,false,false,false];

		morning.forEach((day) => { morningAvailability[day] = true; });
		afternoon.forEach((day) => { afternoonAvailability[day] = true; });
		evening.forEach((day) => { eveningAvailability[day] = true; });
		night.forEach((day) => { nightAvailability[day] = true; });


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
			morning,
			afternoon,
			evening,
			night,
			morningAvailability,
			afternoonAvailability,
			eveningAvailability,
			nightAvailability,
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
		const day = e.target.id.substring(e.target.id.indexOf("-") + 1);
		const workingDay = e.target.id.substring(0, e.target.id.indexOf("-"));
		if(e.target.checked) {
			const workingDayArray = this.state[workingDay];
			let availabilityArray = this.state[`${workingDay}Availability`];
			availabilityArray[day] = true;
			const diff = function(a, b) { return a - b; };
			this.setState({
				[workingDay]: sort(diff, uniq([...workingDayArray, day])),
				[`${workingDay}Availability`]: availabilityArray,
			});
		} else {
			const workingDayArray2 = this.state[workingDay];
			let availabilityArray2 = this.state[`${workingDay}Availability`];
			availabilityArray2[day] = false;
			const filterArray = workingDayArray2.filter(dayArr => dayArr !== day);
			this.setState({
				[workingDay]: filterArray,
				[`${workingDay}Availability`]: availabilityArray2,
			});
		}
	}

	onSubmitForm(e) {
		e.preventDefault();
		const subjects = this.state.subjects.reduce((acc, subject) => {
			acc = `${subject},${acc}`;
			return acc;
		}, '');
		const lenghtArray = subjects.length-1;
		const newSubjects = subjects.substr(0, lenghtArray);

		if (validateForm(this.state)) {
			this.props.userUpdateProfile({...this.state, subjects: newSubjects});
		} else {
			Alert.error(`Todos los campos deben ser completados`);
		}
	}

	render() {
		const { type, onLoading } = this.props;
		const {
			subjects: subjectsState,
			morningAvailability,
			afternoonAvailability,
			eveningAvailability,
			nightAvailability,
		} = this.state;
		const subjects = subjectsState && subjectsState.map(subject => ({value: subject, label: subject}));
		const text = `Actualizar datos ${this.props.type}`;
		const colorClass = type === "Estudiante" ? 'dark-green' : 'blue';
		const renderUOptions = (u) => {
			return <option value={u} key={u}>{u}</option>;
    };
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
											{universities.map(renderUOptions)}
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
							<label className="main-form__label">Acerca de ti</label>
							<textarea
								className="main-form__textarea"
								value={this.state.about}
								onChange={this.onChangeForm}
								name="about"
							/>
						</div>
					</div>
					{type !== 'Estudiante' ?
						<div className="section__auth-container section__auth-container--form section__auth-container--large section__auth-container--with-tab">
							<span className="section__tab section__tab--blue">Conocimientos en</span>
							<span className="main-form__label">Asignaturas</span>
							<MultiSelect
								options={subjectsLocal.map(subject=>({label: subject, value: subject}))}
								placeholder="Selecciona tus asignaturas"
								onValuesChange={this.onChangeSubjects}
								defaultValues={subjects}
							/>
						</div>
					: null}
					{type !== 'Estudiante' ?
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
										<p className="schedule-circle__text">5:00am</p> 
										<p className="schedule-circle__text">12:00m</p>
									</div>
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-0"  checked={morningAvailability[0]}/>
									<label htmlFor="morning-0" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-1"  checked={morningAvailability[1]}/>
									<label htmlFor="morning-1" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-2"  checked={morningAvailability[2]}/>
									<label htmlFor="morning-2" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-3"  checked={morningAvailability[3]}/>
									<label htmlFor="morning-3" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-4"  checked={morningAvailability[4]}/>
									<label htmlFor="morning-4" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-5"  checked={morningAvailability[5]}/>
									<label htmlFor="morning-5" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="morning-6"  checked={morningAvailability[6]}/>
									<label htmlFor="morning-6" className="schedule-checkbox__label" />
								</div>
							</div>
							<div className="schedule-line">
								<div className="schedule-circle">
									<div className="schedule-circle__container">
										<p className="schedule-circle__text">Tarde</p> 
										<p className="schedule-circle__text">12:00m</p> 
										<p className="schedule-circle__text">5:00pm</p>
									</div>
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-0" checked={afternoonAvailability[0]}/>
									<label htmlFor="afternoon-0" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-1" checked={afternoonAvailability[1]}/>
									<label htmlFor="afternoon-1" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-2" checked={afternoonAvailability[2]}/>
									<label htmlFor="afternoon-2" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-3" checked={afternoonAvailability[3]}/>
									<label htmlFor="afternoon-3" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-4" checked={afternoonAvailability[4]}/>
									<label htmlFor="afternoon-4" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-5" checked={afternoonAvailability[5]}/>
									<label htmlFor="afternoon-5" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="afternoon-6" checked={afternoonAvailability[6]}/>
									<label htmlFor="afternoon-6" className="schedule-checkbox__label" />
								</div>
							</div>
							<div className="schedule-line">
								<div className="schedule-circle">
									<div className="schedule-circle__container">
										<p className="schedule-circle__text">Tarde-Noche</p> 
										<p className="schedule-circle__text">5:00pm</p> 
										<p className="schedule-circle__text">9:00pm</p>
									</div>
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-0" checked={eveningAvailability[0]}/>
									<label htmlFor="evening-0" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-1" checked={eveningAvailability[1]}/>
									<label htmlFor="evening-1" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-2" checked={eveningAvailability[2]}/>
									<label htmlFor="evening-2" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-3" checked={eveningAvailability[3]}/>
									<label htmlFor="evening-3" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-4" checked={eveningAvailability[4]}/>
									<label htmlFor="evening-4" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-5" checked={eveningAvailability[5]}/>
									<label htmlFor="evening-5" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="evening-6" checked={eveningAvailability[6]}/>
									<label htmlFor="evening-6" className="schedule-checkbox__label" />
								</div>
							</div>
							<div className="schedule-line">
								<div className="schedule-circle">
									<div className="schedule-circle__container">
										<p className="schedule-circle__text">Noche</p> 
										<p className="schedule-circle__text">9:00pm</p> 
										<p className="schedule-circle__text">4:00am</p>
									</div>
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-0" checked={nightAvailability[0]}/>
									<label htmlFor="night-0" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-1" checked={nightAvailability[1]}/>
									<label htmlFor="night-1" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-2" checked={nightAvailability[2]}/>
									<label htmlFor="night-2" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-3" checked={nightAvailability[3]}/>
									<label htmlFor="night-3" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-4" checked={nightAvailability[4]}/>
									<label htmlFor="night-4" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-5" checked={nightAvailability[5]}/>
									<label htmlFor="night-5" className="schedule-checkbox__label" />
								</div>
								<div className="schedule-checkbox__group">
									<input type="checkbox" onChange={this.onChangeHours} id="night-6" checked={nightAvailability[6]}/>
									<label htmlFor="night-6" className="schedule-checkbox__label" />
								</div>
							</div>
						</div>
					: null}
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
