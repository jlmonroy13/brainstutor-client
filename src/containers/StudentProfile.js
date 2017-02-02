import { connect } from 'react-redux';
import StudentProfile from '../components/StudentProfile';
import { getUserInfo } from '../actions/authentication';

const mapStateToProps = (state) => {
	const { user_id: id, email, role, created_at: created } = state.userInfo;

  return {
    id,
    email,
    role,
    created,
  };
}; 

const mapDispatchToProps = dispatch => ({
	getUserInfo: id => {
		dispatch(getUserInfo(id, 'student'));
	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentProfile);
