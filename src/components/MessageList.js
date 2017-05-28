import React, { PropTypes, Component } from 'react';
import Footer from './Footer';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router';

class MessageList extends Component {
	constructor() {
		super();

		this.renderChats = this.renderChats.bind(this);
	}
	renderChats(message) {
		const { userId, userRole } = this.props;
		const name = userId === message.recipient_id ? message.sender_name : message.recipient_name;
		const role = userRole === 'teacher' ? 'Estudiante' : 'Tutor';
		const email = userId === message.recipient_id ? message.sender_email : message.recipient_email;
		return (
			<Link to={`/chat/${message.id}`} className="message-item" key={message.id}>
				<Gravatar email={email} className="message-image" />
				<div className="message-description">
					<p className="message-title"><span className="message-title message-title--bold">{name}</span> {role}</p>
					<p className="message-text">{message.last_message}</p>
				</div>
			</Link>
		);
	}
	render() {
		const { chatsList } = this.props;
		return (
			<div>
				<div className="message-list">
					<div className="grid grid--center">
						<div className={`grid__item ${'three-quarters'}`}>
							<div className="schedule-list__box">
								<div className="schedule-list__body hard">
									<h2 className="message-header">Mensajes</h2>
									{chatsList.map(this.renderChats)}
								</div>
							</div>
							<div className="pagination" />
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

MessageList.propTypes = {
	chatsList: PropTypes.array,
	userRole: PropTypes.string,
	userId: PropTypes.number, 
};

export default MessageList;