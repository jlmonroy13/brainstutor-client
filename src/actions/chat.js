import {
	requestCreateMessage,
	requestGetChats,
	requestGetMessages,
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

const setChats = (chats) => ({
	type: 'SET_CHATS',
	payload: chats,
});

const setMessages = (messages) => ({
	type: 'SET_MESSAGES',
	payload: messages,
});

const reqCreateMessage = (idReceiver, message, chatId) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestCreateMessage(idReceiver, message)
			.then(successreqCreateMessage);

		function successreqCreateMessage() {
			Alert.success('Tu mensaje ha sido enviado.');
			dispatch(setStatusRequestFalse());
			if(chatId) {
				dispatch(reqGetMessagesAlone(chatId));
			}
		}
	};
};

const reqGetChats = () => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestGetChats()
			.then(successreqGetChats);

		function successreqGetChats({ data: { chats } }) {
			dispatch(setChats(chats));
			dispatch(setStatusRequestFalse());
		}
	};
};

const reqGetMessages = (chatId, callback) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestGetMessages(chatId)
			.then(successreqGetMessages);

		function successreqGetMessages({ data: { messages } }) {
			callback();
			dispatch(setMessages(messages));
			dispatch(setStatusRequestFalse());
		}
	};
};

const reqGetMessagesAlone = (chatId) => {
	return (dispatch) => {
		dispatch(setStatusRequestTrue());
		requestGetMessages(chatId)
			.then(successreqGetMessages);

		function successreqGetMessages({ data: { messages } }) {
			dispatch(setMessages(messages));
			dispatch(setStatusRequestFalse());
		}
	};
};

export {
	reqCreateMessage,
	reqGetChats,
	reqGetMessages,
	reqGetMessagesAlone,
};
