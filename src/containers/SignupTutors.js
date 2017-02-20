import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { userSignupRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { profile: { university }, onLoading } = state.userInfo;
  return {
    type,
    university,
    onLoading,
  };
}; 

const mapDispatchToProps = dispatch => ({
	userSignupRequest: (formData) => {
		dispatch(userSignupRequest(formData, 'teacher'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
