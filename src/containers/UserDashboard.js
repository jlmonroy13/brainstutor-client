import { connect } from 'react-redux';
import UserDashboard from '../components/UserDashboard';

const mapStateToProps = (state) => {
  const { userInfo: { role, id: userId }, dashboard } = state;
  return {
		userId,
    role,
    dashboard,
  };
};

export default connect(
  mapStateToProps,
  null,
)(UserDashboard);
