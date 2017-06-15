import { connect } from 'react-redux';
import UpdateUser from '../components/UpdateUser';
import { userUpdateProfileRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { userInfo } = state;
  const { availability } = userInfo;

  return {
    type,
    userInfo,
    onLoading: userInfo.onLoading,
    morning: availability ? availability.morning : [],
    afternoon: availability ? availability.afternoon : [],
    evening: availability ? availability.evening : [],
    night: availability ? availability.night : [],
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
