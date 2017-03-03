import { connect } from 'react-redux';
import TutorProfile from '../components/TutorProfile';


const mapStateToProps = () => {
	const type = 'Tutor';
  return {
    type,
  };
}; 

const mapDispatchToProps = () => ({
	getTutorProfile: () => {

	},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TutorProfile);