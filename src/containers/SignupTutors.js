import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { userSignupRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { userInfo: { university } } = state;
  return {
    type,
    university,
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
