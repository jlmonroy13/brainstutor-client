import { connect } from 'react-redux';
import Chat from '../components/Chat';
import { reqCreateMessage } from '../actions/chat';

const mapStateToProps = state => {
  const { chat: { messagesList, chatsList }, userInfo: { first_name: firstName, id: senderId } } = state;

  return {
    messagesList,
    chatsList,
    firstName,
    senderId,
  };
};

const mapDispatchToProps = dispatch => ({
	onCreateMessage: (receiverId, textMessage, chatId) => {
		dispatch(reqCreateMessage(receiverId, textMessage, chatId));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
