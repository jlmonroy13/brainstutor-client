import { connect } from 'react-redux';
import UpdateUser from '../components/UpdateUser';
import { userUpdateProfileRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { userInfo } = state;
  console.log(userInfo);
  return {
    type,
    userInfo,
  };
}; 

const mapDispatchToProps = dispatch => ({
	userUpdateProfile: (formData) => {
		dispatch(userUpdateProfileRequest(formData, 'teacher'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
