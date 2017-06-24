import { connect } from 'react-redux';
import TutorsDashboard from '../components/TutorsDashboard';

const mapStateToProps = (state) => {
  const { userInfo: { role }, dashboard } = state;
  return {
    role,
    dashboard,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TutorsDashboard);
