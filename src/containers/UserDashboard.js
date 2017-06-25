import { connect } from 'react-redux';
import UserDashboard from '../components/UserDashboard';

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
)(UserDashboard);
