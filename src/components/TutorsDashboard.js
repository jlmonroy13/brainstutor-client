import React from 'react';

class TutorsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: '',
    };
  }

  render() {
    return (
      <div className="dashboard">
        <div className="container container--small">
          <div className="dashboard__container">
            <div className="dashboard__box-title">
              <img className="dashboard__icon" src={require('../assets/images/calendar-icon.png')} />
              <span className="dashboard__title">Proximas Tutorias</span>
            </div>
            <div className="box box--dashboard">
              <p className="dashboard__subtitle">No tienes ninguna tutoria agendanda...</p>
              <p className="dashboard__description">Ponte en contacto con un tutor y agenda un cita gratuita o una tutoria para hoy.</p>
            </div>
            <div className="dashboard__box-title">
              <img className="dashboard__icon" src={require('../assets/images/mail2-icon.png')} />
              <span className="dashboard__title">Nuevos Mensajes</span>
            </div>
            <div className="box box--dashboard">
              <p className="dashboard__subtitle">No tienes ningún mensaje nuevo.</p>
              <a href="">Ver todos los mensajes</a>
            </div>
            <div className="dashboard__box-title">
              <img className="dashboard__icon" src={require('../assets/images/star-icon.png')} />
              <span className="dashboard__title">Mis Estudiantes</span>
            </div>
            <div className="box box--dashboard">
              <span className="box__description">En este espacio encontraras los estudiantes a los que mas les has dado tutorias.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorsDashboard;
