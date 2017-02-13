import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import { userLogInRequest } from '../actions/authentication';

const mapStateToProps = () => {
	const type = 'Tutor';

  return {
    type,
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