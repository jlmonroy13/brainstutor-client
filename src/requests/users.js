import { brainsAuthentication, brains } from '../utils/requests';
import Alert from 'react-s-alert';

const createUser = (userData, type) => {
  const { email, password, firstName, lastName, university } = userData;
  return brainsAuthentication
    .post(`${type}s?${type}[email]=${email}&${type}[password]=${password}&${type}[first_name]=${firstName}&${type}[last_name]=${lastName}&${type}[profile_attributes[university]]=${university}`)
    .catch(catchRequestError);
};

const updateUser = (id, profileId, userData, type) => {
  const {
    email,
    firstName,
    lastName,
    university,
    dob,
    level,
    phone,
    about,
    city,
    country,
    gender,
    address,
    rate,
    subjects,
    morning,
    night,
    afternoon,
    evening,
  } = userData;
  return brains
    .put(`${type}s/${id}?${type}[email]=${email}&${type}[first_name]=${firstName}&${type}[subjects]=${subjects}&${type}[last_name]=${lastName}&${type}[profile_attributes[university]]=${university}&${type}[profile_attributes[dob]]=${dob}&${type}[profile_attributes[level]]=${level}&${type}[profile_attributes[phone]]=${phone}&${type}[profile_attributes[about]]=${about}&${type}[profile_attributes[city]]=${city}&${type}[profile_attributes[country]]=${country}&${type}[profile_attributes[gender]]=${gender}&${type}[profile_attributes[address]]=${address}&${type}[profile_attributes[id]]=${profileId}&${type}[profile_attributes[rate]]=${rate}&${type}[availability_attributes[morning]]=${JSON.stringify(morning)}&${type}[availability_attributes[afternoon]]=${JSON.stringify(afternoon)}&${type}[availability_attributes[night]]=${JSON.stringify(night)}&${type}[availability_attributes[evening]]=${JSON.stringify(evening)}`)
    .catch(catchRequestError);
};

const updateBankInfo = (bankFormId, userData) => {
  const {
    accountNumber,
    ownerId,
    accountType,
    ownerName,
    bankName,
  } = userData;
  return brains
    .put(`teachers/bank_informations/${bankFormId}?bank_information[account_number]=${accountNumber}&bank_information[owner_id]=${ownerId}&bank_information[account_type]=${accountType}&bank_information[owner_name]=${ownerName}&bank_information[bank_name]=${bankName}`)
    .catch(catchRequestError);
};

const showUser = (id, type) => {
  if (type === 'student') {
    return brains
      .get(`${type}s/${id}`)
      .catch(catchRequestError);
  }
  return brainsAuthentication
    .get(`${type}s/${id}`)
    .catch(catchRequestError);
};

const showTeachers = (page, subjects) => (
  brainsAuthentication
    .get(`/teachers?subject=${subjects}&page=${page}`)
    .catch(catchRequestError)
);

const getTeacherDashboard = (role) => (
  brains
    .get(`/${role}s/dashboards`)
    .catch(catchRequestError)
);

const logIn = (userData, role) => {
  const { email, password } = userData;
  return brainsAuthentication
    .post(`/session?username=${email}&password=${password}&role=${role}`)
    .catch(catchRequestError);
};

const logOut = () => {
  return brains
    .delete(`/session`)
    .catch(catchRequestError);
};

function catchRequestError({ response }) {
  let errorMsg = response.data.error && response.data.error.user_authentication[0];
  if(!errorMsg) {
    errorMsg = response.data.errors.map((err) => {
      Alert.error(err.title);
    });
  } else {
    Alert.error(errorMsg);
  }
}

export {
  createUser,
  updateUser,
  showUser,
  showTeachers,
  logIn,
  logOut,
  updateBankInfo,
  getTeacherDashboard,
};
