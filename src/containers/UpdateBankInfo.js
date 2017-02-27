import { connect } from 'react-redux';
import UpdateBankInfo from '../components/UpdateBankInfo';
import { updateBankInfoRequest } from '../actions/teacher';


const mapStateToProps = (state) => {
  const { userInfo } = state;
  return {
    userInfo,
    onLoading: userInfo.onLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  userUpdateBankInfo: (formData) => {
    dispatch(updateBankInfoRequest(formData));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateBankInfo);
