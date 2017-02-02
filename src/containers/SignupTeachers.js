import { connect } from 'react-redux';
import Signup from '../components/Signup';
import { userSignupRequest } from '../actions/authentication';


const mapStateToProps = () => {
	const type = 'Profesor';

  return {
    type,
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
