import { connect } from 'react-redux';
import UpdateUser from '../components/UpdateUser';
import { userUpdateProfileRequest } from '../actions/authentication';


const mapStateToProps = (state) => {
	const type = 'Tutor';
	const { userInfo } = state;
  const { availability: { morning, afternoon, evening, night } } = userInfo;
  return {
    type,
    userInfo,
    onLoading: userInfo.onLoading,
    morning,
    afternoon,
    evening,
    night,
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
