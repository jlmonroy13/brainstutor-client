import { connect } from 'react-redux';
import StudentProfile from '../components/StudentProfile';


const mapStateToProps = (state) => {
	const { id, email, role, created_at: created } = state.userInfo;

	return {
		id,
		email,
		role,
		created,
	};
};

export default connect(
	mapStateToProps,
	null,
)(StudentProfile);
