import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

const DashboardClient = (props) => {
  const { client, role } = props;
  return (
    <tr>
      <td className={`schedule-list__row ${role === 'student' ? '' : 'schedule-list__row--teacher' }`}>
        <Gravatar className="schedule-list__photo" email={client.email} />
        <div className="schedule-list__description">
          <p className="schedule-list__description-txt">
            <Link className="schedule-list__link">{client.first_name + ' ' + client.last_name}</Link>
          </p>
          <p className="schedule-list__description-txt">{client.university}</p>
        </div>
      </td>
      <td className={`schedule-list__row schedule-list__row__dashboard ${role === 'student' ? '' : 'schedule-list__row--teacher' }`} >
        <button
          className="button button--transparent-blue"
        >Enviar mensaje</button>
      </td>
    </tr>
  );
};

DashboardClient.propTypes = {
  role: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
};

export default DashboardClient;
