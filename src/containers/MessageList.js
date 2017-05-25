import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const mapStateToProps = (state) => {
	const { messages, userInfo: { id: userId, role: userRole } } = state;
  return {
		messages,
		userId,
		userRole,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MessageList);
