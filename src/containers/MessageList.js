import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const mapStateToProps = (state) => {
	const { chat: { chatsList }, userInfo: { id: userId, role: userRole } } = state;
  return {
		chatsList,
		userId,
		userRole,
  };
};

export default connect(
  mapStateToProps,
  null,
)(MessageList);
