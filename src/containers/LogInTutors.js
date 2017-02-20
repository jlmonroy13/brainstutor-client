import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import { userLogInRequest } from '../actions/authentication';

const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { onLoading } = state.userInfo;
  return {
    type,
    onLoading,
  };
};

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData, 'teacher'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn);