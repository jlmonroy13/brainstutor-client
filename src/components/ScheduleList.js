import React, { PropTypes, Component } from 'react';
import Gravatar from 'react-gravatar';
import Footer from './Footer';
import moment from 'moment-timezone';
import { Link } from 'react-router';

class ScheduleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scheduleList: [],
    }

    this.onRenderSchedules = this.onRenderSchedules.bind(this);
  }

  componentWillMount() {
    const { onFetchScheduleList, userInfo } = this.props;
    onFetchScheduleList(userInfo.role);
  }

  onRenderSchedules(schedule) {
    return (
      <tr key={schedule.id}>
        <td className="schedule-list__row">
          <Gravatar  className="schedule-list__photo" email={schedule.teacher_email} size={50} />
          <div className="schedule-list__description">
            <p className="schedule-list__description-txt">{moment(schedule.start_at.substring(0,10)).tz(moment.tz.guess()).format('ddd, MMMM Do YYYY')}</p>
            <p className="schedule-list__description-txt">{schedule.start_at.substring(11,16)} - <Link className="schedule-list__link">{schedule.teacher_name}</Link></p>
          </div>
        </td>
        <td className="schedule-list__row">
          <p className="schedule-list__description-txt">{ schedule.modality === 'free' ? 'Entrevista Gratuita' : ''}</p>
          <p className="schedule-list__description-txt">Cálculo Diferencial</p>
        </td>
        <td className="schedule-list__row">
          <img className="schedule-list__icon" src={require('../assets/images/calendar-icon.png')} />
          <span className="schedule-list__description-highlight">{ schedule.status === 'awaiting_tutor' ? 'Esperando confirmación del tutor' : ''}</span>
        </td>
        <td className="schedule-list__row">
          <button className="button button--blue">Volver a Agendar</button>
        </td>
      </tr>
    )
  }

  render() {
    const scheduleList = this.props.scheduleList || [];
    console.warn(scheduleList);

    return (
      <div>
        <div className="hero__blue">
          <h1 className="hero__blue-title">Tutorias Agendadas</h1>
          <div className="grid grid--center">
            <div className="grid__item one-half">
              <div className="grid">
                <div className="grid__item one-half">
                  <button
                    className="button button--light-green button--block button--large"
                    onClick={this.onGoToKnowUTutor}
                  >Conoce a tu tutor</button>
                </div>
                <div className="grid__item one-half">
                  <button
                    className="button button--blue button--block button--large"
                    onClick={this.onGoToScheduleTutor}
                  >Agendar Tutoria</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="schedule-list">
          <div className="grid grid--center">
            <div className="grid__item two-thirds">
              <div className="schedule-list__box">
                <div className="schedule-list__menu">
                  <button className="button schedule-list__menu-btn">Próximas</button>
                  <button className="button schedule-list__menu-btn disable">Completadas</button>
                </div>
                <div className="schedule-list__body">
                  <table className="schedule-list__table">
                    <tbody>
                      {scheduleList.map(this.onRenderSchedules)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ScheduleList.propTypes = {
  onFetchScheduleList: PropTypes.func,
  userInfo: PropTypes.object,
  scheduleList: PropTypes.array,
};

export default ScheduleList;