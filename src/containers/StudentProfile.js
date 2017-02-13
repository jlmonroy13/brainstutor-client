import { connect } from 'react-redux';
import StudentProfile from '../components/StudentProfile';
import { getUserInfo } from '../actions/authentication';

const mapStateToProps = (state) => {
	const { id, email, role, created_at: created } = state.userInfo;

	return {
		id,
		email,
		role,
		created,
	};
};

function getLocalStorage() {
	return JSON.parse(localStorage.getItem('BrainsUserInfo'));
}

const getStore = () => (
	(dispatch, getState) => {
		const { userInfo } = getState();
		const id = userInfo.id||getLocalStorage().id;
		const role = userInfo.role||getLocalStorage().role;
		dispatch(getUserInfo(id, role));
	}
);

const mapDispatchToProps = (dispatch) => ({
	getUserInfo: () => {
		dispatch(getStore());
	},
});



export default connect(
	mapStateToProps,
	mapDispatchToProps,
	)(StudentProfile);
