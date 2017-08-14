import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import { Link, browserHistory } from 'react-router';

class ScheduleItem extends Component {
  constructor() {
    super();


    this.onClickAcceptAction = this.onClickAcceptAction.bind(this);
    this.onClickRejectAction = this.onClickRejectAction.bind(this);
    this.onClickSendMessageAction = this.onClickSendMessageAction.bind(this);
    this.onClickUsePromo = this.onClickUsePromo.bind(this);
    this.onClickRescheduleAction = this.onClickRescheduleAction.bind(this);
    this.onEnterRoom = this.onEnterRoom.bind(this);
  }

  onClickAcceptAction() {
    const { schedule, schedule: { modality }, onSetScheduleAction } = this.props;
    const action = modality === 'paid' ? 'accepted_awaiting_payment' : 'confirmed';
    onSetScheduleAction({ action, scheduleId: schedule.id, receiverId: '' });
  }

  onClickRejectAction() {
    const { schedule, onSetScheduleAction, userInfo } = this.props;
    const receiverId = userInfo === schedule.student_id ? schedule.teacher_id : schedule.student_id;
    onSetScheduleAction({ action: 'rejected', scheduleId: schedule.id, receiverId});
  }

  onClickSendMessageAction() {
    const { schedule, onSetScheduleAction, userInfo } = this.props;
    const receiverId = userInfo === schedule.student_id ? schedule.teacher_id : schedule.student_id;
    onSetScheduleAction({ action: 'message', scheduleId: schedule.id, receiverId});
  }

  onClickUsePromo() {
    const { schedule, onSetScheduleAction, userInfo } = this.props;
    const receiverId = userInfo === schedule.student_id ? schedule.teacher_id : schedule.student_id;
    onSetScheduleAction({ action: 'promo', scheduleId: schedule.id, receiverId});
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
    const { role, schedule, pathname, couponsList } = this.props;
    const columnTableClass = pathname === '/tutores/tutorias-agendadas' ? 'schedule-list__row--teacher--large' : '';

    return (
      <tr>
        <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <Gravatar className="schedule-list__photo" email={role === 'student' ? schedule.teacher_email||schedule.email : schedule.student_email||schedule.email} size={50} />
          <div className="schedule-list__description">
            <p className="schedule-list__description-txt">{schedule.start_at}</p>
            <p className="schedule-list__description-txt"><Link className="schedule-list__link">{role === 'student' ? schedule.teacher_name||`${schedule.first_name} ${schedule.last_name}` : schedule.student_name||`${schedule.first_name} ${schedule.last_name}`}</Link></p>
          </div>
        </td>
        <td className={`schedule-list__row ${role === 'student' ? '' : `schedule-list__row--teacher ${columnTableClass}` }`}>
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
              <span>
                <a className="button button--light-green push-half--right" target="_blank" href={`https://brainsapi.herokuapp.com/order/${schedule.order&&schedule.order.number}`}>Pagar Tutoria</a>
                {couponsList.length > 0 ?
                  <a className="button button--transparent-blue" onClick={this.onClickUsePromo}>Usar Promo</a>
                : null}
              </span>  
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
                  className={`button button--transparent-blue ${pathname !== '/tutores/tutorias-agendadas' ? 'push-half--top' : ''}`}
                  onClick={this.onClickSendMessageAction}
                >Enviar mensaje</button>
              </div>
            : schedule.status === 'confirmed' ?
              <button
                className="button button--dark-green"
                onClick={this.onEnterRoom}
              >Entrar al salón de clases</button>
              :
              <button
                className={`button button--transparent-blue ${pathname !== '/tutores/tutorias-agendadas' ? 'push-half--top' : ''}`}
                onClick={this.onClickSendMessageAction}
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
  pathname: PropTypes.string,
  userInfo: PropTypes.object,
  onSetScheduleAction: PropTypes.func,
  onSetAppointmenteType: PropTypes.func,
  onGetSessionStatus: PropTypes.func,
  couponsList: PropTypes.array,
};

export default ScheduleItem;