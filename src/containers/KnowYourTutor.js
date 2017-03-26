import { connect } from 'react-redux';
import KnowYourTutor from '../components/KnowYourTutor';

const getLocalStorage = () => {
  const localData = localStorage.getItem('tutorInfo');
  if (localData) return JSON.parse(localData);
  return '';
};

const mapStateToProps = (state) => {
  let scheduleTutor = state.scheduleTutor;
  scheduleTutor = scheduleTutor.first_name ? scheduleTutor : getLocalStorage();
	const { first_name: firstName, last_name: lastName, id } = scheduleTutor;
  return {
    firstName,
    lastName,
    id,
  };
}; 

export default connect(
  mapStateToProps,
  null,
)(KnowYourTutor);