import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Link, browserHistory } from 'react-router';
import { showUser } from '../requests/users';

class DashboardClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goTo: '',
      tutor: {},
    };

    this.onGoToScheduleTutor = this.onGoToScheduleTutor.bind(this);
    this.onClickSendMessageAction = this.onClickSendMessageAction.bind(this);
  }

  componentWillMount() {
    const { client: { id }, role } = this.props;
    if(role === 'student') {
      showUser(id, 'teacher').then((response) => {
        this.setState({ tutor: response.data.teacher });
      });
    }
  }

  onGoToScheduleTutor() {
    this.setState({ goTo: 'schedule-tutor' });
    const { tutor } = this.state;
    delete tutor.bank_information;
    this.props.storeTutorInfo(tutor);
    this.props.onSetAppointmenteType('paid');
    browserHistory.push('/estudiantes/agendar-tutoria');
  }

  onClickSendMessageAction() {
    const { onSetScheduleAction, client } = this.props;
    onSetScheduleAction({ action: 'message', scheduleId: '', receiverId: client.id});
  }

  render() {
    const { client, role } = this.props;
    return (
      <tr>
        <td className={`schedule-list__row schedule-list__row--client ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
          <Gravatar className="schedule-list__photo" email={client.email} />
          <div className="schedule-list__description">
            <p className="schedule-list__description-txt">
              <Link className="schedule-list__link">{client.first_name + ' ' + client.last_name}</Link>
            </p>
            <p className="schedule-list__description-txt">{client.university}</p>
          </div>
        </td>
        <td className={`schedule-list__row schedule-list__row__dashboard ${role === 'student' ? '' : 'schedule-list__row--teacher' }`} >
          {role === 'student' ? 
            <button
              className="button button--blue push-half--right"
              onClick={this.onGoToScheduleTutor}
            >agendar</button>
          : null}
          <button
            className="button button--transparent-blue"
            onClick={this.onClickSendMessageAction}
          >Enviar mensaje</button>
        </td>
      </tr>
    );
  }
}

DashboardClient.propTypes = {
  role: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
  storeTutorInfo: PropTypes.func.isRequired,
  onSetAppointmenteType: PropTypes.func.isRequired,
  onSetScheduleAction: PropTypes.func.isRequired,
};

export default DashboardClient;
