import React, { PropTypes } from 'react';
import Footer from './Footer';

const MessageList = () => {
  return (
		<div>
			<div className="schedule-list">
				<div className="grid grid--center">
					<div className={`grid__item ${'three-quarters'}`}>
						<div className="schedule-list__box">
							<div className="schedule-list__body">
								<h1>hoadasdasd</h1>
							</div>
						</div>
						<div className="pagination" />
					</div>
				</div>
			</div>
			<Footer />
		</div>
  );
};

MessageList.propTypes = {
	onChangeHours: PropTypes.func,
	morningAvailability: PropTypes.array,
	afternoonAvailability: PropTypes.array,
	eveningAvailability: PropTypes.array,
	nightAvailability: PropTypes.array,
	smallClass: PropTypes.string,
};

export default MessageList;