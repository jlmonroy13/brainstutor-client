import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import HowToBeTutor from '../components/HowToBeTutor';
import { setTeacherUniversity } from '../actions/authentication';

const mapDispatchToProps = dispatch => ({
	setTeacherUniversity: university => {
		const userInfo = { university };
		dispatch(setTeacherUniversity(university));
		localStorage.setItem('BrainsUserInfo', JSON.stringify(userInfo));
		browserHistory.push('/registro-tutores');
	},
});

export default connect(
  null,
  mapDispatchToProps,
)(HowToBeTutor);