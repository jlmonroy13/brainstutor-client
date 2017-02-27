import { connect } from 'react-redux';
import FindTutor from '../components/FindTutor';
import { userLogInRequest } from '../actions/authentication';

const mapStateToProps = (state) => {
	const { teachers } = state;
  return {
    teachers,
  };
};

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData, 'student'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FindTutor);