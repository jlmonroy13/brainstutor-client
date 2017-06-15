import { connect } from 'react-redux';
import FindTutor from '../components/FindTutor';
import { userLogInRequest } from '../actions/authentication';
import { getTutorsRequest } from '../actions/teacher';

const mapStateToProps = (state) => {
	const { teachers: { totalPages, list, currentPage } } = state;
	const arrayPages = [];
	for (let i = 0; i < totalPages; i++) {
		arrayPages.push(i+1);
	}

  return {
    teachers: list,
    totalPages: arrayPages,
    currentPage,
  };
};

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData, 'student'));
	},
	onGetTutorsRequest: (page, subjects) => {
		dispatch(getTutorsRequest(page, subjects));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindTutor);