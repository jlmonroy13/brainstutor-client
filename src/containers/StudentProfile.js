import { connect } from 'react-redux';
import StudentProfile from '../components/StudentProfile';
import { getUserInfo } from '../actions/authentication';

const mapStateToProps = (state) => {
	const { id, email, role, created_at: created } = state.userInfo;
	console.log(state);

  return {
    id,
    email,
    role,
    created,
  };
}; 

const mapDispatchToProps = dispatch => ({
	getUserInfo: id => {
		const userId = id || getLocalStorage();
		dispatch(getUserInfo(userId, 'student'));
	},
});

function getLocalStorage() {
	const userInfo = JSON.parse(localStorage.getItem('BrainsUserInfo'));
	return userInfo.user_id || userInfo.id;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentProfile);
