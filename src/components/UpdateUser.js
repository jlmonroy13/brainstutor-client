import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import TextFieldGroup from './TextFieldGroup';
import Alert from 'react-s-alert';
import { MultiSelect } from 'react-selectize';
import { uniq, sort } from 'ramda';
import subjectsLocal from '../consts/subjects';
import universities from '../consts/universities';
import Availability from './Availability';

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

		const { morning, afternoon, evening, night } = this.props;

		let morningAvailability = [false,false,false,false,false,false,false];
		let	afternoonAvailability = [false,false,false,false,false,false,false];
		let	eveningAvailability = [false,false,false,false,false,false,false];
		let	nightAvailability = [false,false,false,false,false,false,false];

		morning && morning.forEach((day) => { morningAvailability[day] = true; });
		afternoon && afternoon.forEach((day) => { afternoonAvailability[day] = true; });
		evening && evening.forEach((day) => { eveningAvailability[day] = true; });
		night && night.forEach((day) => { nightAvailability[day] = true; });


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
		this.validateForm = this.validateForm.bind(this);
	}

	validateForm(e) {
		const { type } = this.props;
		if(type === 'Tutor' && e.email && e.firstName && e.lastName && e.university && e.dob && e.level && e.phone && e.about && e.country && e.city && e.gender && e.subjects.length>0) {
			return true;
		}
		if(type === 'Student' && e.email && e.firstName && e.lastName && e.university && e.dob && e.phone && e.country && e.city && e.gender) {
			return true;
		}
		return false;
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

		if (this.validateForm(this.state)) {
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
		const colorClass = type !== "Tutor" ? 'dark-green' : 'blue';
		const renderUOptions = (u) => {
			return <option value={u} key={u}>{u}</option>;
    };
		return (
			<div className="section__auth">
				<img className="full-width push--bottom" src={require('../assets/images/hero-authentication.jpg')} />
				<form onSubmit={this.onSubmitForm} autoComplete="off">
					<div className="section__auth-container section__auth-container--form section__auth-container--large section__auth-container--with-tab">
						<span className="section__tab">{type !== "Tutor" ? 'Perfil del Estudiante' : 'Perfil del Tutor'}</span>
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
								<TextFieldGroup
									value={this.state.country}
									onChange={this.onChangeForm}
									type="text"
									field="country"
									label="País"
								/>
								{type === 'Tutor' ?
									<div>
										<label className="main-form__label">Nivel (Profesor/Monitor)</label>
										<select
											className="main-form__input"
											value={this.state.level || ''}
											onChange={this.onChangeForm}
											name="level"
										>
											<option value="">Seleccina tu nivel</option>
											<option value="Profesor">Profesor</option>
											<option value="Monitor">Monitor</option>
										</select>
									</div>
								: null}
							</div>
							<div className="grid__item one-half">
								<TextFieldGroup
									value={this.state.phone}
									onChange={this.onChangeForm}
									type="tel"
									field="phone"
									label="Celular"
								/>
								<TextFieldGroup
									value={this.state.city}
									onChange={this.onChangeForm}
									type="text"
									field="city"
									label="Ciudad"
								/>
								{type === 'Tutor' ?
									<div>
										<label className="main-form__label">Valor hora tutoria</label>
										{this.state.level === 'Profesor' ?
											<select
												className="main-form__input"
												value={this.state.rate || ''}
												onChange={this.onChangeForm}
												name="rate"
											>
												<option value="">Selecciona un valor</option>
												<option value="30000">$30.000</option>
												<option value="35000">$35.000</option>
												<option value="40000">$40.000</option>
												<option value="45000">$45.000</option>
												<option value="50000">$50.000</option>
											</select>
										:
											<select
												className="main-form__input"
												value={this.state.rate||''}
												onChange={this.onChangeForm}
												name="rate"
											>
												<option value="">Selecciona un valor</option>
												<option value="30000">$30.000</option>
												<option value="35000">$35.000</option>
												<option value="40000">$40.000</option>
											</select>
										}
									</div>
								: null}
							</div>
						</div>
						{type === 'Tutor' ?
							<div className="push-half--bottom">
								<label className="main-form__label">Acerca de ti</label>
								<textarea
									className="main-form__textarea"
									value={this.state.about || ''}
									onChange={this.onChangeForm}
									name="about"
								/>
							</div>
						: null}
					</div>
					{type === 'Tutor' ?
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
					{type === 'Tutor' ?
						<Availability 
							onChangeHours={this.onChangeHours}
							morningAvailability={morningAvailability}
							afternoonAvailability={afternoonAvailability}
							eveningAvailability={eveningAvailability}
							nightAvailability={nightAvailability}
						/>
					: null}
					<div className="section__auth-container section__auth-container--form section__auth-container--large">
						<button
							className={`button button--large button--block button--${colorClass} push-half--top push--bottom`}
							disabled={onLoading}
						>Actualizar datos</button>
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
	morning: PropTypes.array,
	afternoon: PropTypes.array,
	evening: PropTypes.array,
	night: PropTypes.array,
};

export default UpdateUser;
