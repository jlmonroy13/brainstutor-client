import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import moment from 'moment-timezone';
import { Link, browserHistory } from 'react-router';

class ScheduleItem extends Component {
  constructor() {
    super();


    this.onClickAcceptAction = this.onClickAcceptAction.bind(this);
    this.onClickRejectAction = this.onClickRejectAction.bind(this);
    this.onClickRescheduleAction = this.onClickRescheduleAction.bind(this);
    this.onEnterRoom = this.onEnterRoom.bind(this);
  }

  onClickAcceptAction() {
    const { schedule, schedule: { modality }, onSetScheduleAction } = this.props;
    const action = modality === 'paid' ? 'accepted_awaiting_payment' : 'confirmed';
    onSetScheduleAction({ action, scheduleId: schedule.id });
  }

  onClickRejectAction() {
    const { schedule, onSetScheduleAction } = this.props;
    onSetScheduleAction({ action: 'rejected', scheduleId: schedule.id });
  }

  onClickRescheduleAction() {
    const { schedule, onSetAppointmenteType } = this.props;
    onSetAppointmenteType(schedule.modality);
    browserHistory.push(`/estudiantes/agendar-tutoria/${schedule.id}`);
  }

  onEnterRoom() {
    const { onGetSessionStatus, role, schedule } = this.props;
    onGetSessionStatus(role, schedule.id);
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
          <p className="schedule-list__description-txt">{ schedule.modality === 'free' ? 'Entrevista Gratuita' : 'Tutoria'}</p>
          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
        </td>
        <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
          <span className="schedule-list__description-highlight">{
            role === 'student' ?
              schedule.status === 'awaiting_tutor' ?
                'Esperando confirmación del tutor'
              : schedule.status === 'accepted_awaiting_payment' ?
                'Esperando tu pago'
                : schedule.status === 'rejected' ?
                  'Tutoría Rechazada'
                  : 'Tutoría confirmada'
            : role === 'teacher' ?
              schedule.status === 'awaiting_tutor' ?
                'Esperando tu confirmación'
              : schedule.status === 'accepted_awaiting_payment' ?
                'Esperando el pago del estudiante'
                : schedule.status === 'rejected' ?
                  'Tutoría Rechazada'
                  : 'Tutoría confirmada'
            : ''
          }</span>
        </td>
        { role === 'student' ?
          <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
            {schedule.status === 'accepted_awaiting_payment' ?
              <button className="button button--light-green">Pagar Tutoria</button>
              :  schedule.status !== 'confirmed' ?
                <button className="button button--blue" onClick={this.onClickRescheduleAction} >Volver a Agendar</button>
                :
            <button
              className="button button--dark-green"
              onClick={this.onEnterRoom}
            >Entrar al salón de clases</button>
        }
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
                >Enviar mensaje</button>
              </div>
            : schedule.status === 'confirmed' ?
              <button
                className="button button--dark-green"
                onClick={this.onEnterRoom}
              >Entrar al salón de clases</button>
              :
              <button
                className="button button--transparent-blue"
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
  onSetAppointmenteType: PropTypes.func,
  onGetSessionStatus: PropTypes.func,
};

export default ScheduleItem;
