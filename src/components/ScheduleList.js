import React, { PropTypes, Component } from 'react';
import Footer from './Footer';
import ScheduleItemContainer from '../containers/ScheduleItem';
import ModalScheduleActionContainer from '../containers/ModalScheduleAction';
import ModalBeforeOpenTokContainer from '../containers/ModalBeforeOpenTok';

class ScheduleList extends Component {
  constructor() {
    super();

    this.state = {
      tab: 'upcoming',
      status: 'awaiting_tutor',
      selectedPage: 1,
    };

    this.onRenderSchedules = this.onRenderSchedules.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onOpenCompleted = this.onOpenCompleted.bind(this);
    this.onOpenUpcoming = this.onOpenUpcoming.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentWillMount() {
    const { onFetchScheduleList, userInfo } = this.props;
    onFetchScheduleList(userInfo.role, 'awaiting_tutor', 1);
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

  onChangeFilter(e) {
    const { onFetchScheduleList, userInfo } = this.props;
    this.setState({ status: e.target.value });
    onFetchScheduleList(userInfo.role, e.target.value, 1);
  }

  renderPagination(page) {
    const { currentPage, onFetchScheduleList, userInfo } = this.props;
    const { status } = this.state;
    const activeClass = page === currentPage ? 'active' : '';
    const onChangeSchedulesPage = (page) => () => {
      onFetchScheduleList(userInfo.role, status, page);
      this.state({ selectedPage: page });
    };

    return (
      <span
        className={`pagination__item ${activeClass}`}
        onClick={onChangeSchedulesPage(page)}
        key={page}
      >{page}</span>
    );
  }

  onOpenCompleted() {
    const { onFetchScheduleList, userInfo } = this.props;
    this.setState({ tab: 'completed', status: 'completed' });
    onFetchScheduleList(userInfo.role, 'completed', 1);   
  }

  onOpenUpcoming() {
    const { onFetchScheduleList, userInfo } = this.props;
    this.setState({ tab: 'upcoming', status: 'awaiting_tutor' });
    onFetchScheduleList(userInfo.role, 'awaiting_tutor', 1);
  }

  render() {
    const scheduleList = this.props.scheduleList || [];
    const { userInfo: { role }, totalPages } = this.props;
    const { tab, status, selectedPage } = this.state;
    const gridClass = role === 'student' ? 'three-quarters' : 'five-sixths';

    return (
      <div>
        <div className="hero__blue">
          <h1 className="hero__blue-title flush--bottom">Tutorias Agendadas</h1>
        </div>
        <div className="schedule-list">
          <div className="grid grid--center">
            <div className={`grid__item ${gridClass}`}>
              <div className="schedule-list__box">
                <div className="schedule-list__menu">
                  <button 
                    className={tab === 'upcoming' ? 'button schedule-list__menu-btn' : 'button schedule-list__menu-btn disable'}
                    onClick={this.onOpenUpcoming}
                  >Próximas</button>
                  <button 
                    className={tab === 'completed' ? 'button schedule-list__menu-btn' : 'button schedule-list__menu-btn disable'}
                    onClick={this.onOpenCompleted}
                  >Completadas</button>
                </div>
                { tab === 'upcoming' ?
                  <select
                    className="hero__tutor-selector hero__tutor-selector--medium push--top push--left"
                    onChange={this.onChangeFilter}
                    value={status}
                  >
                    <option value="">Selecciona un filtro</option>
                    <option value="awaiting_tutor">Esperando Tutor</option>
                    <option value="accepted_awaiting_payment">Esperando Confirmación del Pago</option>
                    <option value="confirmed">Confirmadas</option>
                  </select>
                :
                  <select
                    className="hero__tutor-selector push--top push--left"
                    onChange={this.onChangeFilter}
                    value={status}
                  >
                    <option value="">Selecciona un filtro</option>
                    <option value="completed">Completadas</option>
                    <option value="canceled">Canceladas</option>
                    <option value="rejected">Rechazadas</option>
                    <option value="expired">Vencidas</option>
                  </select>
                }
                  
                <div className="schedule-list__body">
                  <table className="schedule-list__table">
                    <tbody>
                      {scheduleList.map(this.onRenderSchedules)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pagination">
                {totalPages.map(this.renderPagination)}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ModalBeforeOpenTokContainer />
        <ModalScheduleActionContainer 
          status={status}
          selectedPage={selectedPage}
        />
      </div>
    );
  }
}

ScheduleList.propTypes = {
  onFetchScheduleList: PropTypes.func,
  userInfo: PropTypes.object,
  scheduleList: PropTypes.array,
  scheduleAction: PropTypes.object,
  currentPage: PropTypes.number,
  totalPages: PropTypes.array,
};

export default ScheduleList;
