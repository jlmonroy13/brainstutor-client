import React, { PropTypes } from 'react';
import DashboardClientContainer from '../containers/DashboardClient';
import ScheduleItemContainer from '../containers/ScheduleItem';
import ModalBeforeOpenTokContainer from '../containers/ModalBeforeOpenTok';
import ModalScheduleActionContainer from '../containers/ModalScheduleAction';

class TutorsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: '',
    };
    this.onRenderDashboardClient = this.onRenderDashboardClient.bind(this);
    this.onRenderDashboardSchedule = this.onRenderDashboardSchedule.bind(this);
  }

  onRenderDashboardClient(client) {
    const { role } = this.props;
    return (
      <DashboardClientContainer 
        client={client}
        key={client.id}
        role={role}
      />
    );
  }

  onRenderDashboardSchedule(schedule) {
    const { role } = this.props;
    return (
      <ScheduleItemContainer
        schedule={schedule}
        role={role}
        key={schedule.id}
      />
    );
  }

  render() {
    const { role, dashboard: { students, schedules, teachers } } = this.props;
    return (
      <div className="dashboard">
        <div className="container container--small">
          <div className="dashboard__container">
            <div className="dashboard__box-title">
              <img className="dashboard__icon" src={require('../assets/images/calendar-icon.png')} />
              <span className="dashboard__title">Proximas Tutorias</span>
            </div>
            <div className="box box--dashboard">
              { schedules && schedules.length ? 
                <table className="schedule-list__table">
                  <tbody>
                    {schedules.map(this.onRenderDashboardSchedule)}
                  </tbody>
                </table>
              : <div>
                  <p className="dashboard__subtitle">No tienes ninguna tutoria agendanda...</p>
                  <p className="dashboard__description">Ponte en contacto con un tutor y agenda un cita gratuita o una tutoria para hoy.</p>
              </div>}
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
              <span className="dashboard__title">{role === 'teacher' ? 'Mis Estudiantes' : 'Mis Tutores'}</span>
            </div>
            <div className="box box--dashboard">
              { students && students.length || teachers && teachers.length ?
                <table className="schedule-list__table">
                  <tbody>
                    {students ? students.map(this.onRenderDashboardClient) : teachers.map(this.onRenderDashboardClient)}
                  </tbody>
                </table>
              : <span className="box__description">En este espacio encontraras los estudiantes a los que mas les has dado tutorias.</span>}
            </div>
          </div>
        </div>
        <ModalBeforeOpenTokContainer />
        <ModalScheduleActionContainer 
          status={''}
          selectedPage={1}
        />
      </div>
    );
  }
}

TutorsDashboard.propTypes = {
  role: PropTypes.string.isRequired,
  dashboard: PropTypes.object.isRequired,
};

export default TutorsDashboard;
