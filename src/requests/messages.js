import { brains } from '../utils/requests';
import Alert from 'react-s-alert';

const requestCreateMessage = (idReceiver, message) => {
  return brains
    .post(`/messages?chat[recipient_id]=${idReceiver}&message[body]=${message}`)
    .catch(catchRequestError);
};

const requestGetChats = () => {
  return brains
    .get(`/chats`)
    .catch(catchRequestError);
};

const requestGetMessages = (chatId) => {
  return brains
    .get(`/messages?chat_id=${chatId}`)
    .catch(catchRequestError);
};

function catchRequestError({ response }) {
  const errorMsg = response.data.error && response.data.error.user_authentication[0];
  Alert.error(errorMsg);
}

export {
  requestCreateMessage,
  requestGetChats,
  requestGetMessages,
};
