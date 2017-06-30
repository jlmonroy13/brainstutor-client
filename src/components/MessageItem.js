import React, { PropTypes } from 'react';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, role, name, email } = this.props;
    return (
      <Link to={`/chat/${message.id}`} className="message-item">
        <Gravatar email={email} className="message-image" />
        <div className="message-description">
          <p className="message-title"><span className="message-title message-title--bold">{name}</span> {role}</p>
          <p className="message-text">{message.last_message}</p>
          {message.updated_at ? <span className="message-corner">{message.updated_at}</span> : null}
        </div>
      </Link>
    );
  }
}

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default MessageItem;
