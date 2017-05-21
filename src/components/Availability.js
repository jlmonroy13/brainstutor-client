import React, { PropTypes } from 'react';

const Availability = ({onChangeHours, morningAvailability, afternoonAvailability, eveningAvailability, nightAvailability}) => {
  return (
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
					<input type="checkbox" onChange={onChangeHours} id="morning-0"  checked={morningAvailability[0]}/>
					<label htmlFor="morning-0" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-1"  checked={morningAvailability[1]}/>
					<label htmlFor="morning-1" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-2"  checked={morningAvailability[2]}/>
					<label htmlFor="morning-2" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-3"  checked={morningAvailability[3]}/>
					<label htmlFor="morning-3" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-4"  checked={morningAvailability[4]}/>
					<label htmlFor="morning-4" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-5"  checked={morningAvailability[5]}/>
					<label htmlFor="morning-5" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="morning-6"  checked={morningAvailability[6]}/>
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
					<input type="checkbox" onChange={onChangeHours} id="afternoon-0" checked={afternoonAvailability[0]}/>
					<label htmlFor="afternoon-0" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-1" checked={afternoonAvailability[1]}/>
					<label htmlFor="afternoon-1" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-2" checked={afternoonAvailability[2]}/>
					<label htmlFor="afternoon-2" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-3" checked={afternoonAvailability[3]}/>
					<label htmlFor="afternoon-3" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-4" checked={afternoonAvailability[4]}/>
					<label htmlFor="afternoon-4" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-5" checked={afternoonAvailability[5]}/>
					<label htmlFor="afternoon-5" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="afternoon-6" checked={afternoonAvailability[6]}/>
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
					<input type="checkbox" onChange={onChangeHours} id="evening-0" checked={eveningAvailability[0]}/>
					<label htmlFor="evening-0" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-1" checked={eveningAvailability[1]}/>
					<label htmlFor="evening-1" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-2" checked={eveningAvailability[2]}/>
					<label htmlFor="evening-2" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-3" checked={eveningAvailability[3]}/>
					<label htmlFor="evening-3" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-4" checked={eveningAvailability[4]}/>
					<label htmlFor="evening-4" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-5" checked={eveningAvailability[5]}/>
					<label htmlFor="evening-5" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="evening-6" checked={eveningAvailability[6]}/>
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
					<input type="checkbox" onChange={onChangeHours} id="night-0" checked={nightAvailability[0]}/>
					<label htmlFor="night-0" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-1" checked={nightAvailability[1]}/>
					<label htmlFor="night-1" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-2" checked={nightAvailability[2]}/>
					<label htmlFor="night-2" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-3" checked={nightAvailability[3]}/>
					<label htmlFor="night-3" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-4" checked={nightAvailability[4]}/>
					<label htmlFor="night-4" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-5" checked={nightAvailability[5]}/>
					<label htmlFor="night-5" className="schedule-checkbox__label" />
				</div>
				<div className="schedule-checkbox__group">
					<input type="checkbox" onChange={onChangeHours} id="night-6" checked={nightAvailability[6]}/>
					<label htmlFor="night-6" className="schedule-checkbox__label" />
				</div>
			</div>
		</div>
  );
};

Availability.propTypes = {
	onChangeHours: PropTypes.func,
	morningAvailability: PropTypes.array,
	afternoonAvailability: PropTypes.array,
	eveningAvailability: PropTypes.array,
	nightAvailability: PropTypes.array,
};

export default Availability;