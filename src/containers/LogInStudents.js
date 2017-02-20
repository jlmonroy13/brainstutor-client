import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import { userLogInRequest } from '../actions/authentication';

const mapStateToProps = (state) => {
	const type = 'Estudiante';
	const { onLoading } = state.userInfo;
  return {
    type,
    onLoading,
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
)(LogIn);