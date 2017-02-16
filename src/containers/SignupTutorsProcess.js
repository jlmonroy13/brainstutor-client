import { connect } from 'react-redux';
import SignupTutorsProcess from '../components/SignupTutorsProcess';

const mapStateToProps = (state) => {
  const { status } = state.userInfo;

  return {
    status,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SignupTutorsProcess);
