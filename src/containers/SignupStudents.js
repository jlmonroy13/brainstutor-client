import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { userSignupRequest } from '../actions/authentication';

const mapStateToProps = (state) => {
	const type = 'Estudiante';
	const { onLoading } = state.userInfo;
  return {
    type,
    onLoading,
  };
}; 

const mapDispatchToProps = dispatch => ({
	userSignupRequest: (formData) => {
		dispatch(userSignupRequest(formData, 'student'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
