import {
	requestCreateMessage,
	requestGetChats,
} from '../requests/messages';
import { pendingTask, begin, end } from 'react-redux-spinner';
import Alert from 'react-s-alert';

const setStatusRequestFalse = () => ({
	type: 'SET_STATUS_REQUEST',
	payload: false,
	[ pendingTask ]: end,
});

const setStatusRequestTrue = () => ({
	type: 'SET_STATUS_REQUEST',
	payload: true,
	[ pendingTask ]: begin,
});

const setMessages = (messages) => ({
	type: 'SET_MESSAGES',
	payload: messages,
});

const reqCreateMessage = (idReceiver, message) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestCreateMessage(idReceiver, message)
			.then(successreqCreateMessage);

		function successreqCreateMessage() {
			Alert.success('Tu mensaje ha sido enviado.');
			dispatch(setStatusRequestFalse());
		}
	};
};

const reqGetChats = () => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestGetChats()
			.then(successreqCreateMessage);

		function successreqCreateMessage({ data: { chats } }) {
			dispatch(setMessages(chats));
			dispatch(setStatusRequestFalse());
		}
	};
};

export {
	reqCreateMessage,
	reqGetChats,
};
