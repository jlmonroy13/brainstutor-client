import { connect } from 'react-redux';
import UpdateUser from '../components/UpdateUser';
import { userUpdateProfileRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Student';
	const { userInfo } = state;
  return {
    type,
    userInfo,
    onLoading: userInfo.onLoading,
  };
};

const mapDispatchToProps = dispatch => ({
	userUpdateProfile: (formData) => {
		dispatch(userUpdateProfileRequest(formData, 'student'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
