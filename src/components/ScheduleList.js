import React, { PropTypes, Component } from 'react';
import Footer from './Footer';
import ScheduleItemContainer from '../containers/ScheduleItem';
import ModalScheduleActionContainer from '../containers/ModalScheduleAction';

class ScheduleList extends Component {
  constructor() {
    super();

    this.onRenderSchedules = this.onRenderSchedules.bind(this);
  }

  componentWillMount() {
    const { onFetchScheduleList, userInfo } = this.props;
    onFetchScheduleList(userInfo.role);
  }

  onRenderSchedules(schedule) {
    const { userInfo: { role } } = this.props;
    return (
      <ScheduleItemContainer
        schedule={schedule}
        role={role}
        key={schedule.id}
      />
    );
  }

  render() {
    const scheduleList = this.props.scheduleList || [];
    const { userInfo: { role } } = this.props;
    const gridClass = role === 'student' ? 'three-quarters' : 'five-sixths';

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
            <div className={`grid__item ${gridClass}`}>
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
        <ModalScheduleActionContainer />
      </div>
    );
  }
}

ScheduleList.propTypes = {
  onFetchScheduleList: PropTypes.func,
  userInfo: PropTypes.object,
  scheduleList: PropTypes.array,
  scheduleAction: PropTypes.object,
};

export default ScheduleList;
