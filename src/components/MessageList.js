import React, { PropTypes, Component } from 'react';
import Footer from './Footer';
import MessageItem from './MessageItem';

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
			<MessageItem 
				message={message}
				email={email}
				role={role}
				name={name}
			/>
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