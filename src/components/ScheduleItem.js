import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import moment from 'moment-timezone';
import { Link } from 'react-router';

class ScheduleItem extends Component {
  constructor() {
    super();


    this.onClickAcceptAction = this.onClickAcceptAction.bind(this);
    this.onClickRejectAction = this.onClickRejectAction.bind(this);
    this.onClickRescheduleAction = this.onClickRescheduleAction.bind(this);
  }

  onClickAcceptAction() {
    const { schedule, onSetScheduleAction } = this.props;
    onSetScheduleAction({ action: 'confirmed', scheduleId: schedule.id });
  }

  onClickRejectAction() {
    const { schedule, onSetScheduleAction } = this.props;
    onSetScheduleAction({ action: 'rejected', scheduleId: schedule.id });
  }

  onClickRescheduleAction() {
    const { schedule, onSetScheduleAction } = this.props;
    onSetScheduleAction({ action: 'awaiting_tutor', scheduleId: schedule.id });
  }

  render() {
    const { role, schedule } = this.props;
    return (
      <tr>
        <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <Gravatar  className="schedule-list__photo" email={role === 'student' ? schedule.teacher_email : schedule.student_email} size={50} />
          <div className="schedule-list__description">
            <p className="schedule-list__description-txt">{moment(schedule.start_at.substring(0,10)).tz(moment.tz.guess()).format('ddd, MMMM Do YYYY')} - {schedule.start_at.substring(11,16)}</p>
            <p className="schedule-list__description-txt"><Link className="schedule-list__link">{role === 'student' ? schedule.teacher_name : schedule.student_name}</Link></p>
          </div>
        </td>
        <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <p className="schedule-list__description-txt">{ schedule.modality === 'free' ? 'Entrevista Gratuita' : ''}</p>
          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
        </td>
        <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
          <span className="schedule-list__description-highlight">{
            schedule.status === 'awaiting_tutor' ?
              role === 'student' ? 'Esperando confirmación del tutor' : 'Esperando tu confirmación'
            :
              schedule.status === 'confirmed' ? 'Tutoría confirmada' : 'Tutoría rechazada'
          }</span>
        </td>
        { role === 'student' ?
          <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
            {schedule.status !== 'confirmed' ?
              <Link className="button button--blue" to={`/estudiantes/agendar-tutoria/${schedule.id}`}>Volver a Agendar</Link>
              : ''}
          </td>
        :
          <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
            {schedule.status === 'awaiting_tutor' ?
              <div>
                <button
                  className="button button--blue push-half--right"
                  onClick={this.onClickAcceptAction}
                >Aceptar</button>
                <button
                  className="button button--light-green push-half--right"
                  onClick={this.onClickRejectAction}
                >Rechazar</button>
                <button
                  className="button button--transparent-blue"
                  onClick={this.onClickRescheduleAction}
                >Enviar mensaje</button>
              </div>
            :
              <button
                className="button button--transparent-blue"
                onClick={this.onClickRescheduleAction}
              >Enviar mensaje</button>
            }
          </td>
        }
      </tr>
    );
  }
}

ScheduleItem.propTypes = {
  schedule: PropTypes.object,
  role: PropTypes.string,
  onSetScheduleAction: PropTypes.func,
};

export default ScheduleItem;
