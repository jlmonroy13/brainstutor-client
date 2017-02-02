import { brainsAuthentication, brains } from '../utils/requests';
import Alert from 'react-s-alert';

const createUser = (userData, type) => {
  const { email, password } = userData;
  return brainsAuthentication
    .post(`${type}s?${type}[email]=${email}&${type}[password]=${password}`)
    .catch(catchRequestError);
};

const updateUser = (id, type) => (
  brains
    .put(`${type}s/${id}`)
    .catch(catchRequestError)
);

const showUser = (id, type) => (
  brains
    .get(`${type}s/${id}`)
    .catch(catchRequestError)
);

const showTeachers = () => (
  brains
    .get(`/teachers`)
    .catch(catchRequestError)
);

const logIn = (userData) => {
  const { email, password } = userData;
  return brainsAuthentication
    .post(`/session?username=${email}&password=${password}`)
    .catch(catchRequestError);
};

function catchRequestError(e) {
  Alert.error(`Se presentó incovenientes con la petición. ${e}`);
}

export {
  createUser,
  updateUser,
  showUser,
  showTeachers,
  logIn,
};