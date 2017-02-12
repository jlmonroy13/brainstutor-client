import { connect } from 'react-redux';
import LogIn from '../components/LogIn';
import { userLogInRequest } from '../actions/authentication';

const mapStateToProps = () => {
	const type = 'Estudiante';

  return {
    type,
  };
}; 

const mapDispatchToProps = dispatch => ({
	userLogInRequest: (formData) => {
		dispatch(userLogInRequest(formData));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogIn);